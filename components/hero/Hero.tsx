"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  RefreshCcw,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { ExchangeQuoteModal } from "@/components/modal/ExchangeQuoteModal";
import type { HomepageContent, HeroContent, SiteSettings } from "@/types/content";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

const TRUST_ICON_MAP: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  check: CheckCircle2,
  badge: BadgeCheck,
  star: Star,
  truck: Truck,
};

type HeroProps = {
  content: HeroContent;
  homepage: HomepageContent;
  site: SiteSettings;
};

export default function Hero({ content, homepage, site }: HeroProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="absolute top-40 -left-32 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-slate-50" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-8">
          <motion.div {...fadeUp}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold text-ink-muted shadow-sm backdrop-blur-xl">
              <BadgeCheck className="h-4 w-4 text-brand-600" aria-hidden="true" />
              {content.badge}
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              {content.headline.map((segment, index) => (
                <Fragment key={index}>
                  {segment.isAccent ? (
                    <span className="text-brand-600">{segment.text}</span>
                  ) : (
                    segment.text
                  )}
                </Fragment>
              ))}
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
              {content.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href={content.primaryCtaHref}
                size="lg"
                aria-label="Browse inventory"
              >
                {content.primaryCtaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setQuoteOpen(true)}
                aria-label="Get instant exchange quote"
              >
                <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                {content.secondaryCtaLabel}
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {homepage.customerStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-ink" lang="bn">
                    {stat.value} {stat.label}
                  </p>
                </div>
              ))}
              {homepage.trustBadges.map((badge, index) => {
                const Icon = TRUST_ICON_MAP[badge.icon] ?? ShieldCheck;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-emerald-500" aria-hidden="true" />
                    <p className="text-sm font-semibold text-ink">{badge.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="glass-card overflow-hidden p-3">
              <Image
                src={content.heroImage}
                alt={`Featured showcase at ${site.businessName}`}
                width={900}
                height={900}
                priority
                className="aspect-square w-full rounded-2xl object-cover"
              />
              <div className="flex items-center justify-between px-3 py-4">
                <div>
                  <p className="text-sm font-bold text-ink">
                    {content.featuredProduct.title}
                  </p>
                  <p className="text-xs font-medium text-ink-muted">
                    {content.featuredProduct.subtitle}
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-3 py-1.5 text-sm font-bold text-emerald-600">
                  {content.featuredProduct.price}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 -z-10 h-32 w-32 rounded-3xl bg-gradient-to-br from-brand-500/20 to-indigo-400/20 blur-2xl" />
          </motion.div>
        </div>
      </Container>

      <div
        className="relative overflow-hidden border-y border-white/60 bg-white/50 py-3 backdrop-blur-xl"
        aria-hidden="true"
      >
        <div className="flex w-max animate-ticker gap-10 whitespace-nowrap">
          {[...content.ticker, ...content.ticker].map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-10 text-sm font-semibold text-ink-muted"
            >
              <span>{item}</span>
              <span className="text-brand-500">◆</span>
            </span>
          ))}
        </div>
      </div>

      <ExchangeQuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        whatsapp={site.whatsapp}
      />
    </section>
  );
}
