import Link from "next/link";
import type { Product } from "@/types/product";
import type { HomepageContent, SiteSettings } from "@/types/content";
import { Container } from "@/components/shared/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/shared/Button";

type FeaturedProductsProps = {
  products: Product[];
  content: HomepageContent["featuredProducts"];
  site: SiteSettings;
};

export function FeaturedProducts({
  products,
  content,
  site,
}: FeaturedProductsProps) {
  const featured = products.filter((product) => product.isFeatured);

  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              {content.title}
            </h2>
            <p className="mt-2 text-sm text-ink-muted sm:text-base">
              {content.subtitle}
            </p>
          </div>
          <Button href="/products" variant="outline" size="sm">
            View All
          </Button>
        </div>
        <ProductGrid products={featured} site={site} />
      </Container>
    </section>
  );
}

type CategoryShowcaseProps = {
  content: HomepageContent["categoryShowcase"];
};

export function CategoryShowcase({ content }: CategoryShowcaseProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="mb-8 text-center">
          <h2 className="text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-muted sm:text-base">
            {content.subtitle}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {content.categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="glass-card group p-6 transition-all hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
            >
              <span className="text-3xl" aria-hidden="true">
                {category.emoji}
              </span>
              <h3 className="mt-3 text-lg font-bold text-ink">{category.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {category.description}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand-600">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

type ExchangePromoProps = {
  content: HomepageContent["exchangeSection"];
};

export function ExchangePromo({ content }: ExchangePromoProps) {
  return (
    <section className="py-16">
      <Container>
        <div className="glass-card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 sm:p-10">
              <h2 className="text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                {content.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                {content.subtitle}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {content.points.map((point) => (
                  <li
                    key={point.title}
                    className="rounded-2xl border border-slate-100 bg-white/70 px-4 py-3"
                  >
                    <p className="text-sm font-bold text-ink">{point.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                      {point.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-500/10 via-white/40 to-indigo-400/10 p-10">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
              >
                <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />
              </div>
              <div className="relative max-w-sm text-center">
                <p className="text-5xl font-extrabold text-brand-600">
                  {content.bonusAmount}
                </p>
                <p className="mt-2 text-base font-semibold text-ink">
                  {content.bonusCaption}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  {content.bonusSubtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
