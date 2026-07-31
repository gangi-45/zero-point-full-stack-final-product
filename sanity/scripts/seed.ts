/* eslint-disable no-console */
/**
 * Migrates the existing mock product listings into Sanity documents.
 *
 * Usage:
 *   npm run seed
 *
 * Requires .env.local with:
 *   SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN
 *
 * Creates missing category documents (phone / accessory / laptop),
 * uploads product images to the asset library and upserts products
 * by slug so the migration is safe to re-run.
 */

import dotenv from "dotenv";
import { createClient, type SanityClient } from "@sanity/client";
import { MOCK_PRODUCTS } from "../../lib/mock-data";
import type { Product } from "../../types/product";
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_HOMEPAGE_CONTENT,
  DEFAULT_SEO_SETTINGS,
  DEFAULT_SITE_SETTINGS,
} from "../../lib/mock-content";

dotenv.config({ path: ".env.local" });

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing Sanity configuration. Set SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local",
  );
  process.exit(1);
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-06-01",
  useCdn: false,
  token,
});

type CategoryDoc = {
  _id: string;
  slug: string;
};

const CATEGORY_SLUGS = ["phone", "accessory", "laptop"] as const;

async function ensureCategories(): Promise<Map<string, string>> {
  const map = new Map<string, string>();

  for (const slug of CATEGORY_SLUGS) {
    const existing = await client.fetch<CategoryDoc | null>(
      `*[_type == "category" && slug.current == $slug][0] { _id, "slug": slug.current }`,
      { slug },
    );

    if (existing) {
      map.set(slug, existing._id);
      console.log(`✓ Category exists: ${slug} (${existing._id})`);
      continue;
    }

    const doc = await client.create({
      _type: "category",
      title: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug: { _type: "slug", current: slug },
    });
    map.set(slug, doc._id);
    console.log(`+ Created category: ${slug} (${doc._id})`);
  }

  return map;
}

async function uploadImage(slug: string, url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`  ⚠ Image fetch failed (${response.status}) for ${slug}`);
      return null;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      filename: `${slug}.jpg`,
      contentType: response.headers.get("content-type") ?? "image/jpeg",
    });
    console.log(`  + Uploaded image for ${slug} (${asset._id})`);
    return asset._id;
  } catch (error) {
    console.warn(`  ⚠ Image upload failed for ${slug}:`, error);
    return null;
  }
}

async function upsertProduct(
  product: Product,
  categoryRefs: Map<string, string>,
): Promise<void> {
  const categoryId = categoryRefs.get(product.category);

  if (!categoryId) {
    console.warn(`  ⚠ Skipping ${product.slug}: no category reference`);
    return;
  }

  let imageRef: string | null = null;
  if (product.image) {
    imageRef = await uploadImage(product.slug, product.image);
  }

  const document = {
    _type: "product",
    title: product.title,
    slug: { _type: "slug", current: product.slug },
    price: product.price,
    condition: product.condition,
    category: { _type: "reference", _ref: categoryId },
    brand: product.brand,
    model: product.model,
    images: imageRef
      ? [
          {
            _type: "image",
            asset: { _type: "reference", _ref: imageRef },
            alt: product.title,
          },
        ]
      : [],
    description: product.description,
    isFeatured: product.isFeatured,
    inStock: product.inStock,
    stockQuantity: product.stockQuantity ?? 0,
    warranty: product.warranty ?? "৭ দিন",
    verifiedStatus: product.verifiedStatus ?? true,
    createdAt: new Date().toISOString(),
  };

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "product" && slug.current == $slug][0] { _id }`,
    { slug: product.slug },
  );

  if (existing) {
    await client.patch(existing._id).set(document).commit();
    console.log(`~ Updated product: ${product.slug} (${existing._id})`);
  } else {
    const doc = await client.create(document);
    console.log(`+ Created product: ${product.slug} (${doc._id})`);
  }
}

async function upsertSingleton(
  id: string,
  type: string,
  document: Record<string, unknown>,
): Promise<void> {
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_id == $id][0] { _id }`,
    { id },
  );

  if (existing) {
    await client.patch(existing._id).set(document).commit();
    console.log(`~ Updated singleton: ${id} (${existing._id})`);
  } else {
    await client.create({ _id: id, _type: type, ...document });
    console.log(`+ Created singleton: ${id}`);
  }
}

async function seedContent(): Promise<void> {
  const site = { ...DEFAULT_SITE_SETTINGS };
  delete (site as Partial<typeof site>).phoneDisplay;
  site.logo = null;
  site.favicon = null;
  site.socialLinks = DEFAULT_SITE_SETTINGS.socialLinks.map((link) => ({
    ...link,
  }));

  await upsertSingleton("siteSettings", "siteSettings", site as unknown as Record<string, unknown>);

  const heroImageRef = await uploadImage(
    "hero-showcase",
    DEFAULT_HERO_CONTENT.heroImage,
  );

  await upsertSingleton("heroContent", "heroContent", {
    badge: DEFAULT_HERO_CONTENT.badge,
    headline: DEFAULT_HERO_CONTENT.headline.map((segment) => ({ ...segment })),
    subtitle: DEFAULT_HERO_CONTENT.subtitle,
    heroImage: heroImageRef
      ? {
          _type: "image",
          asset: { _type: "reference", _ref: heroImageRef },
          alt: `${DEFAULT_SITE_SETTINGS.businessName} hero showcase`,
        }
      : undefined,
    primaryCtaLabel: DEFAULT_HERO_CONTENT.primaryCtaLabel,
    primaryCtaHref: DEFAULT_HERO_CONTENT.primaryCtaHref,
    secondaryCtaLabel: DEFAULT_HERO_CONTENT.secondaryCtaLabel,
    featuredProductTitle: DEFAULT_HERO_CONTENT.featuredProduct.title,
    featuredProductSubtitle: DEFAULT_HERO_CONTENT.featuredProduct.subtitle,
    featuredProductPrice: DEFAULT_HERO_CONTENT.featuredProduct.price,
    ticker: DEFAULT_HERO_CONTENT.ticker,
  });

  await upsertSingleton("homepageContent", "homepageContent", {
    customerStats: DEFAULT_HOMEPAGE_CONTENT.customerStats.map((stat) => ({
      ...stat,
    })),
    trustBadges: DEFAULT_HOMEPAGE_CONTENT.trustBadges.map((badge) => ({
      ...badge,
    })),
    featuredProductsSection: DEFAULT_HOMEPAGE_CONTENT.featuredProducts,
    categoryShowcase: {
      ...DEFAULT_HOMEPAGE_CONTENT.categoryShowcase,
      categories: DEFAULT_HOMEPAGE_CONTENT.categoryShowcase.categories.map(
        (category) => ({ ...category }),
      ),
    },
    exchangeSection: {
      ...DEFAULT_HOMEPAGE_CONTENT.exchangeSection,
      points: DEFAULT_HOMEPAGE_CONTENT.exchangeSection.points.map((point) => ({
        ...point,
      })),
    },
    videoSection: {
      ...DEFAULT_HOMEPAGE_CONTENT.videoSection,
      videos: DEFAULT_HOMEPAGE_CONTENT.videoSection.videos.map((video) => ({
        ...video,
      })),
    },
    testimonials: [],
  });

  await upsertSingleton("seoSettings", "seoSettings", {
    pageTitle: DEFAULT_SEO_SETTINGS.pageTitle,
    metaDescription: DEFAULT_SEO_SETTINGS.metaDescription,
    keywords: DEFAULT_SEO_SETTINGS.keywords,
  });
}

async function main() {
  console.log("== Zero Point CMS: mock data migration ==\n");
  console.log(`Target: ${projectId} / ${dataset}\n`);

  const categoryRefs = await ensureCategories();

  console.log("\n-- Products --");
  for (const product of MOCK_PRODUCTS) {
    await upsertProduct(product, categoryRefs);
  }

  console.log("\n-- Content settings --");
  await seedContent();

  console.log("\n== Migration complete ==");
}

main().catch((error) => {
  console.error("\nMigration failed:", error);
  process.exit(1);
});
