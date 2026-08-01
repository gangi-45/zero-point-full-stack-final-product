import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Music2,
  Twitter,
  Linkedin,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import type { SiteSettings } from "@/types/content";
import { waLink } from "@/lib/constants";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Videos", href: "/#videos" },
  { label: "Contact", href: "/#contact" },
];

function socialIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();
  if (normalized.includes("facebook")) return Facebook;
  if (normalized.includes("instagram")) return Instagram;
  if (normalized.includes("youtube")) return Youtube;
  if (normalized.includes("tiktok")) return Music2;
  if (normalized.includes("linkedin")) return Linkedin;
  if (normalized.includes("twitter") || normalized === "x") return Twitter;
  return Globe;
}

function BrandLogo({ site }: { site: SiteSettings }) {
  return (
    <div className="flex items-center gap-2">
      {site.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={site.logo}
          alt={site.businessName}
          className="h-9 w-9 rounded-xl object-contain"
        />
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-black text-white shadow-glow">
          {site.logoInitials}
        </span>
      )}
      <div className="leading-tight">
        <p className="text-base font-bold text-ink">{site.businessName}</p>
        <p className="text-[11px] font-medium text-ink-muted">{site.tagline}</p>
      </div>
    </div>
  );
}

export function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="border-t border-white/60 bg-white/60 pt-14 pb-24 backdrop-blur-xl md:pb-14 dark:border-white/10 dark:bg-slate-900/60">
      <Container>
        <div id="contact" className="grid gap-10 scroll-mt-24 lg:grid-cols-3">
          <div>
            <BrandLogo site={site} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {site.description}
            </p>
            {site.socialLinks.length > 0 && (
              <div className="mt-5 flex gap-2.5">
                {site.socialLinks.map((social) => {
                  const Icon = socialIcon(social.label);
                  return (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} — ${site.brandName}`}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/70 text-ink-muted transition-all hover:border-brand-500 hover:text-brand-600 dark:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:text-brand-400"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink">
              Quick Links
            </h2>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-ink-muted transition-colors hover:text-brand-600 dark:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-ink">
              Contact
            </h2>
            <ul className="space-y-3.5 text-sm text-ink-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                <span>{site.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-3 font-semibold text-ink transition-colors hover:text-brand-600 dark:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waLink(site.whatsapp, `আসসালামু আলাইকুম, আমি ${site.businessName} এ পণ্য সম্পর্কে জানতে চাই।`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-semibold text-ink transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                  WhatsApp: {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 font-semibold text-ink transition-colors hover:text-brand-600 dark:text-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden="true" />
                {site.businessHours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          <div className="glass overflow-hidden rounded-3xl">
            <iframe
              title={`${site.brandName} location on Google Maps`}
              src={site.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-56 w-full border-0"
            />
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-ink">{site.findUsTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {site.findUsText}
            </p>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {site.getDirectionsLabel}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200/70 pt-6 text-center text-xs text-ink-muted dark:border-slate-800">
          <p>
            © {new Date().getFullYear()} {site.brandName}. All rights reserved. ·{" "}
            {site.copyrightSuffix}
          </p>
        </div>
      </Container>
    </footer>
  );
}
