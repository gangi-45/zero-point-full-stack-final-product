import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/shared/Button";
import type { SiteSettings } from "@/types/content";

type ProductGridProps = {
  products: Product[];
  site: SiteSettings;
  emptyMessage?: string;
  showAllLink?: boolean;
};

export function ProductGrid({
  products,
  site,
  emptyMessage = "কোনো পণ্য পাওয়া যায়নি।",
  showAllLink = false,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 px-6 py-16 text-center">
        <p className="text-4xl" aria-hidden="true">
          🔍
        </p>
        <h3 className="text-lg font-bold text-ink">কোনো পণ্য পাওয়া যায়নি</h3>
        <p className="max-w-sm text-sm text-ink-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            site={site}
            priority={index < 4}
          />
        ))}
      </div>
      {showAllLink && (
        <div className="mt-10 flex justify-center">
          <Button href="/products" variant="outline" size="lg">
            View All Products
          </Button>
        </div>
      )}
    </div>
  );
}
