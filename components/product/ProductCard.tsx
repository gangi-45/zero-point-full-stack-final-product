import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import type { Product } from "@/types/product";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import type { SiteSettings } from "@/types/content";
import { waLink } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  site: SiteSettings;
  priority?: boolean;
};

export function ProductCard({
  product,
  site,
  priority = false,
}: ProductCardProps) {
  const isUsed = product.condition === "used";

  return (
    <article className="glass-card group flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1">
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${product.title}`}
        className="relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
      >
        <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={product.image}
            alt={product.title}
            width={800}
            height={800}
            loading={priority ? "eager" : "lazy"}
            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <Badge tone={isUsed ? "amber" : "green"}>
              {isUsed ? "Used" : "New"}
            </Badge>
            {!product.inStock && (
              <Badge tone="neutral">Stock Out</Badge>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-ink">
            {product.title}
          </h3>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-lg font-extrabold text-brand-600 dark:text-brand-400">
              {formatPrice(product.price)}
            </p>
            {product.isFeatured && (
              <span className="text-xs font-semibold text-amber-500">
                ★ Featured
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-auto space-y-2 px-4 pb-4">
        <div className="flex items-center gap-3 border-t border-slate-100 pt-3 text-[11px] font-semibold text-ink-muted dark:border-slate-700">
          <span className="flex items-center gap-1">✅ Tested &amp; Verified</span>
          <span className="flex items-center gap-1">🛡️ ৭ দিন Warranty</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            href={waLink(site.whatsapp, `আসসালামু আলাইকুম, আমি "${product.title}" সম্পর্কে জানতে চাই। দাম: ${formatPrice(product.price)}`)}
            variant="primary"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp inquiry for ${product.title}`}
          >
            <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </Button>
          <Button
            href={`tel:${site.phone}`}
            variant="outline"
            size="sm"
            aria-label={`Call shop about ${product.title}`}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call Shop
          </Button>
        </div>
      </div>
    </article>
  );
}
