import "server-only";
import groq from "groq";
import type { Product } from "@/types/product";
import { getMockProducts } from "@/lib/mock-data";
import { getServerClient, isSanityConfigured, urlFor } from "@/sanity/lib/client";

type SanityProductDoc = {
  _id: string;
  title: string;
  slug: string;
  price: number;
  condition: Product["condition"];
  category: Product["category"] | null;
  brand?: string | null;
  model?: string | null;
  image?: SanityImageRef;
  images?: SanityImageRef[];
  description?: string | null;
  isFeatured?: boolean;
  inStock?: boolean;
  stockQuantity?: number;
  warranty?: string | null;
  verifiedStatus?: boolean;
};

type SanityImageRef = {
  _type: "image";
  asset: { _ref: string };
};

const PRODUCT_PROJECTION = groq`{
  _id,
  title,
  "slug": slug.current,
  price,
  condition,
  "category": category->slug.current,
  brand,
  model,
  "image": images[0],
  images,
  description,
  isFeatured,
  inStock,
  stockQuantity,
  warranty,
  verifiedStatus,
  createdAt
}`;

function mapProduct(doc: SanityProductDoc): Product {
  const imageUrl = doc.image ? urlFor(doc.image) : "";
  return {
    id: doc._id,
    title: doc.title ?? "",
    slug: doc.slug ?? "",
    price: Number.isFinite(Number(doc.price)) ? Number(doc.price) : 0,
    condition: doc.condition === "used" ? "used" : "new",
    category:
      doc.category === "accessory" || doc.category === "laptop"
        ? doc.category
        : "phone",
    image: imageUrl || "/images/placeholder-product.svg",
    description: doc.description ?? "",
    isFeatured: doc.isFeatured ?? false,
    inStock: doc.inStock ?? (doc.stockQuantity ?? 0) > 0,
    brand: doc.brand ?? undefined,
    model: doc.model ?? undefined,
    warranty: doc.warranty ?? undefined,
    verifiedStatus: doc.verifiedStatus ?? false,
    stockQuantity: doc.stockQuantity ?? 0,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured()) {
    return getMockProducts();
  }

  const client = getServerClient();
  if (!client) {
    return getMockProducts();
  }

  try {
    const docs = await client.fetch<SanityProductDoc[]>(
      groq`*[_type == "product" && defined(slug.current)] | order(isFeatured desc, createdAt desc) ${PRODUCT_PROJECTION}`,
    );
    return docs.map(mapProduct);
  } catch (error) {
    console.error("[sanity] getProducts failed, falling back to mock data:", error);
    return getMockProducts();
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured()) {
    const mock = await getMockProducts();
    return mock.find((product) => product.slug === slug) ?? null;
  }

  const client = getServerClient();
  if (!client) {
    const mock = await getMockProducts();
    return mock.find((product) => product.slug === slug) ?? null;
  }

  try {
    const doc = await client.fetch<SanityProductDoc | null>(
      groq`*[_type == "product" && slug.current == $slug][0] ${PRODUCT_PROJECTION}`,
      { slug },
    );
    return doc ? mapProduct(doc) : null;
  } catch (error) {
    console.error(
      `[sanity] getProductBySlug("${slug}") failed, falling back to mock data:`,
      error,
    );
    const mock = await getMockProducts();
    return mock.find((product) => product.slug === slug) ?? null;
  }
}

export type ProductFilter = {
  category?: Product["category"];
  condition?: Product["condition"];
  featured?: boolean;
  query?: string;
};

function applyFilter(products: Product[], filter: ProductFilter): Product[] {
  const query = filter.query?.trim().toLowerCase();
  return products.filter((product) => {
    if (filter.category && product.category !== filter.category) return false;
    if (filter.condition && product.condition !== filter.condition) return false;
    if (filter.featured && !product.isFeatured) return false;
    if (query) {
      const haystack =
        `${product.title} ${product.description} ${product.category}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });
}

export async function getProductsByFilter(
  filter: ProductFilter = {},
): Promise<Product[]> {
  if (!isSanityConfigured()) {
    return applyFilter(await getMockProducts(), filter);
  }

  const client = getServerClient();
  if (!client) {
    return applyFilter(await getMockProducts(), filter);
  }

  try {
    const filters: string[] = [];
    const params: Record<string, string> = {};

    if (filter.category) {
      filters.push("category->slug.current == $category");
      params.category = filter.category;
    }
    if (filter.condition) {
      filters.push("condition == $condition");
      params.condition = filter.condition;
    }
    if (filter.featured) {
      filters.push("isFeatured == true");
    }
    if (filter.query?.trim()) {
      filters.push("title match $query || description match $query");
      params.query = `*${filter.query.trim()}*`;
    }

    const filterClause = filters.length
      ? ` && (${filters.join(" && ")})`
      : "";

    const docs = await client.fetch<SanityProductDoc[]>(
      groq`*[_type == "product" && defined(slug.current)${filterClause}] | order(isFeatured desc, createdAt desc) ${PRODUCT_PROJECTION}`,
      params,
    );
    return docs.map(mapProduct);
  } catch (error) {
    console.error(
      "[sanity] getProductsByFilter failed, falling back to mock data:",
      error,
    );
    return applyFilter(await getMockProducts(), filter);
  }
}
