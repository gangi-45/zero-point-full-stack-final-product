import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, Phone, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getProductBySlug, getProducts } from "@/sanity/product-service";
import { getSiteSettings } from "@/lib/content-service";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { waLink } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

type ProductPageProps = {
  params: { slug: string };
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: `${product.title} — ${formatPrice(product.price)}`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

function ProductJsonLd({ product }: { product: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: [product.image],
    sku: product.id,
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    category: product.category,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BDT",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const [product, site] = await Promise.all([
    getProductBySlug(params.slug),
    getSiteSettings(),
  ]);

  if (!product) {
    notFound();
  }

  const isUsed = product.condition === "used";

  return (
    <div className="pt-24 pb-16">
      <ProductJsonLd product={product} />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm font-medium text-ink-muted">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/products"
                className="transition-colors hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
              >
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="line-clamp-1 max-w-[12rem] text-ink">
              {product.title}
            </li>
          </ol>
        </nav>

        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to Products
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="glass-card overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={1000}
              height={1000}
              priority
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={isUsed ? "amber" : "green"}>
                {isUsed ? "Used" : "New"}
              </Badge>
              {product.isFeatured && <Badge tone="brand">★ Featured</Badge>}
              <Badge tone={product.inStock ? "green" : "neutral"}>
                {product.inStock ? "In Stock" : "Stock Out"}
              </Badge>
            </div>

            <h1 className="mt-4 text-balance text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">
              {product.title}
            </h1>

            <p className="mt-3 text-3xl font-extrabold text-brand-600">
              {formatPrice(product.price)}
            </p>

            <p className="mt-5 text-base leading-relaxed text-ink-muted">
              {product.description}
            </p>

            <div className="mt-6 space-y-2.5">
              <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                ✅ টেস্টেড ও ভেরিফাইড
              </p>
              <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <ShieldCheck className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                🛡️ ৭ দিনের ওয়ারেন্টি
              </p>
              <p className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                🚚 Mymensingh এ হাতে হাতে ডেলিভারি
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={waLink(site.whatsapp, `আসসালামু আলাইকুম, আমি "${product.title}" কিনতে আগ্রহী। দাম: ${formatPrice(product.price)}`)}
                variant="primary"
                size="lg"
                fullWidth
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp inquiry for ${product.title}`}
              >
                <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />
                WhatsApp Inquiry
              </Button>
              <Button
                href={`tel:${site.phone}`}
                variant="outline"
                size="lg"
                fullWidth
                aria-label={`Call shop at ${site.phoneDisplay}`}
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Shop
              </Button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              শপে এসে সরাসরি পণ্য দেখে কেনার সুযোগ আছে। ঠিকানা: {site.addressShort}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
