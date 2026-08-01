"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import type { SiteSettings } from "@/types/content";
import { waLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar({ site }: { site: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const waText = `আসসালামু আলাইকুম, আমি ${site.businessName} এ পণ্য সম্পর্কে জানতে চাই।`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "border-b border-white/60 bg-white/70 backdrop-blur-xl shadow-glass dark:border-white/10 dark:bg-slate-900/80"
            : "bg-transparent",
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
            aria-label={`${site.businessName} — home`}
          >
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
            <span className="flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-ink">
                {site.businessName}
              </span>
              <span className="hidden text-[11px] font-medium text-ink-muted sm:block">
                {site.tagline}
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.replace("/#", "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                    active
                      ? "bg-white/80 text-brand-600 shadow-sm dark:bg-white/10 dark:text-brand-400"
                      : "text-ink-muted hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button
              href={`tel:${site.phone}`}
              variant="outline"
              size="sm"
              aria-label={`Call us at ${site.phoneDisplay}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </Button>
            <Button
              href={waLink(site.whatsapp, waText)}
              variant="primary"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 text-ink shadow-sm md:hidden dark:bg-slate-800/70"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-b border-white/60 bg-white/85 backdrop-blur-xl shadow-glass-lg md:hidden dark:border-white/10 dark:bg-slate-900/90"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href.replace("/#", "/"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-2xl px-4 py-3.5 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60",
                    active
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                      : "text-ink hover:bg-slate-100/70 dark:hover:bg-slate-800",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex items-center justify-end gap-3 border-t border-slate-200/70 pt-4 dark:border-slate-700">
              <ThemeToggle />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button
                href={`tel:${site.phone}`}
                variant="outline"
                size="lg"
                fullWidth
                aria-label={`Call us at ${site.phoneDisplay}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </Button>
              <Button
                href={waLink(site.whatsapp, waText)}
                variant="primary"
                size="lg"
                fullWidth
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
