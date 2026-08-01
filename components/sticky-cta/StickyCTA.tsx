import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import type { SiteSettings } from "@/types/content";
import { waLink } from "@/lib/constants";

export function StickyCTA({ site }: { site: SiteSettings }) {
  const items = [
    {
      label: "Call",
      href: `tel:${site.phone}`,
      icon: <Phone className="h-5 w-5" aria-hidden="true" />,
      classes: "text-ink",
      bg: "bg-white/85 dark:bg-slate-800/85",
    },
    {
      label: "WhatsApp",
      href: waLink(site.whatsapp, `আসসালামু আলাইকুম, আমি ${site.businessName} এ পণ্য সম্পর্কে জানতে চাই।`),
      icon: <WhatsAppIcon className="h-5 w-5" aria-hidden="true" />,
      classes: "text-white",
      bg: "bg-emerald-500",
    },
    {
      label: "Location",
      href: site.mapsUrl,
      icon: <MapPin className="h-5 w-5" aria-hidden="true" />,
      classes: "text-ink",
      bg: "bg-white/85 dark:bg-slate-800/85",
    },
  ];

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/60 bg-white/80 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-slate-900/80"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 py-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={item.label}
            className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2.5 text-[11px] font-bold ${item.bg} ${item.classes} transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
