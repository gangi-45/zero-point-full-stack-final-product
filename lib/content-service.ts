import "server-only";
import { cache } from "react";
import groq from "groq";
import type { SanityImageSource } from "@sanity/image-url";
import { getServerClient, isSanityConfigured, urlFor } from "@/sanity/lib/client";
import { formatPhoneDisplay } from "@/lib/constants";
import type {
  HomepageContent,
  HeroContent,
  SeoSettings,
  SiteSettings,
} from "@/types/content";
import {
  DEFAULT_HERO_CONTENT,
  DEFAULT_HOMEPAGE_CONTENT,
  DEFAULT_SEO_SETTINGS,
  DEFAULT_SITE_SETTINGS,
} from "@/lib/mock-content";

type SiteSettingsDoc = {
  logo?: SanityImageSource;
  favicon?: SanityImageSource;
  logoInitials?: string;
  businessName?: string;
  brandName?: string;
  tagline?: string;
  domain?: string;
  description?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  addressShort?: string;
  businessHours?: string;
  mapsUrl?: string;
  mapsEmbed?: string;
  findUsTitle?: string;
  findUsText?: string;
  getDirectionsLabel?: string;
  socialLinks?: { label?: string; url?: string }[];
  copyrightSuffix?: string;
};

type HeroContentDoc = {
  badge?: string;
  headline?: { text?: string; isAccent?: boolean }[];
  subtitle?: string;
  heroImage?: SanityImageSource;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  featuredProductTitle?: string;
  featuredProductSubtitle?: string;
  featuredProductPrice?: string;
  ticker?: string[];
};

type HomepageContentDoc = {
  customerStats?: { value?: string; label?: string }[];
  trustBadges?: { icon?: string; label?: string }[];
  featuredProductsSection?: { title?: string; subtitle?: string };
  categoryShowcase?: {
    title?: string;
    subtitle?: string;
    categories?: {
      title?: string;
      emoji?: string;
      description?: string;
      href?: string;
    }[];
  };
  exchangeSection?: {
    title?: string;
    subtitle?: string;
    points?: { title?: string; description?: string }[];
    bonusAmount?: string;
    bonusCaption?: string;
    bonusSubtitle?: string;
  };
  videoSection?: {
    title?: string;
    subtitle?: string;
    videos?: { title?: string; youtubeId?: string }[];
  };
  testimonials?: { name?: string; text?: string; rating?: number }[];
};

type SeoSettingsDoc = {
  pageTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageSource;
  keywords?: string[];
};

const SETTINGS_QUERY = groq`*[_id == "siteSettings"][0]{
  logo,
  favicon,
  logoInitials,
  businessName,
  brandName,
  tagline,
  domain,
  description,
  phone,
  whatsapp,
  email,
  address,
  addressShort,
  businessHours,
  mapsUrl,
  mapsEmbed,
  findUsTitle,
  findUsText,
  getDirectionsLabel,
  socialLinks[] { label, url },
  copyrightSuffix
}`;

const HERO_QUERY = groq`*[_id == "heroContent"][0]{
  badge,
  headline[] { text, isAccent },
  subtitle,
  heroImage,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  featuredProductTitle,
  featuredProductSubtitle,
  featuredProductPrice,
  ticker
}`;

const HOMEPAGE_QUERY = groq`*[_id == "homepageContent"][0]{
  customerStats[] { value, label },
  trustBadges[] { icon, label },
  featuredProductsSection { title, subtitle },
  categoryShowcase {
    title,
    subtitle,
    categories[] { title, emoji, description, href }
  },
  exchangeSection {
    title,
    subtitle,
    points[] { title, description },
    bonusAmount,
    bonusCaption,
    bonusSubtitle
  },
  videoSection {
    title,
    subtitle,
    videos[] { title, youtubeId }
  },
  testimonials[] { name, text, rating }
}`;

const SEO_QUERY = groq`*[_id == "seoSettings"][0]{
  pageTitle,
  metaDescription,
  ogImage,
  keywords
}`;

async function fetchDoc<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured()) return null;
  const client = getServerClient();
  if (!client) return null;
  try {
    return await client.fetch<T>(query);
  } catch (error) {
    console.error("[content-service] Sanity fetch failed:", error);
    return null;
  }
}

function mapSiteSettings(doc: SiteSettingsDoc | null): SiteSettings {
  const defaults = DEFAULT_SITE_SETTINGS;
  if (!doc) return defaults;

  const phone = doc.phone || defaults.phone;
  const whatsapp = doc.whatsapp || defaults.whatsapp;

  return {
    logo: urlFor(doc.logo) || defaults.logo,
    logoInitials: doc.logoInitials || defaults.logoInitials,
    favicon: urlFor(doc.favicon) || defaults.favicon,
    businessName: doc.businessName || defaults.businessName,
    brandName: doc.brandName || defaults.brandName,
    tagline: doc.tagline || defaults.tagline,
    domain: doc.domain || defaults.domain,
    description: doc.description || defaults.description,
    phone,
    phoneDisplay: phone ? formatPhoneDisplay(phone) : defaults.phoneDisplay,
    whatsapp,
    email: doc.email || defaults.email,
    address: doc.address || defaults.address,
    addressShort: doc.addressShort || defaults.addressShort,
    businessHours: doc.businessHours || defaults.businessHours,
    mapsUrl: doc.mapsUrl || defaults.mapsUrl,
    mapsEmbed: doc.mapsEmbed || defaults.mapsEmbed,
    findUsTitle: doc.findUsTitle || defaults.findUsTitle,
    findUsText: doc.findUsText || defaults.findUsText,
    getDirectionsLabel: doc.getDirectionsLabel || defaults.getDirectionsLabel,
    socialLinks:
      doc.socialLinks && doc.socialLinks.length > 0
        ? doc.socialLinks
            .filter((link) => link.label && link.url)
            .map((link) => ({ label: link.label as string, url: link.url as string }))
        : defaults.socialLinks,
    copyrightSuffix: doc.copyrightSuffix || defaults.copyrightSuffix,
  };
}

function mapHeadline(
  headline: { text?: string; isAccent?: boolean }[] | undefined,
): HeroContent["headline"] {
  if (!headline || headline.length === 0) return DEFAULT_HERO_CONTENT.headline;
  return headline.map((segment) => ({
    text: segment.text ?? "",
    isAccent: Boolean(segment.isAccent),
  }));
}

function mapHeroContent(doc: HeroContentDoc | null): HeroContent {
  const defaults = DEFAULT_HERO_CONTENT;
  if (!doc) return defaults;

  return {
    badge: doc.badge || defaults.badge,
    headline: mapHeadline(doc.headline),
    subtitle: doc.subtitle || defaults.subtitle,
    heroImage: urlFor(doc.heroImage) || defaults.heroImage,
    primaryCtaLabel: doc.primaryCtaLabel || defaults.primaryCtaLabel,
    primaryCtaHref: doc.primaryCtaHref || defaults.primaryCtaHref,
    secondaryCtaLabel: doc.secondaryCtaLabel || defaults.secondaryCtaLabel,
    featuredProduct: {
      title: doc.featuredProductTitle || defaults.featuredProduct.title,
      subtitle: doc.featuredProductSubtitle || defaults.featuredProduct.subtitle,
      price: doc.featuredProductPrice || defaults.featuredProduct.price,
    },
    ticker:
      doc.ticker && doc.ticker.length > 0 ? doc.ticker : defaults.ticker,
  };
}

function mapHomepageContent(doc: HomepageContentDoc | null): HomepageContent {
  const defaults = DEFAULT_HOMEPAGE_CONTENT;
  if (!doc) return defaults;

  const featuredProductsSection = doc.featuredProductsSection ?? {};
  const categoryShowcase = doc.categoryShowcase ?? {};
  const exchangeSection = doc.exchangeSection ?? {};
  const videoSection = doc.videoSection ?? {};

  return {
    customerStats:
      doc.customerStats && doc.customerStats.length > 0
        ? doc.customerStats
            .filter((stat) => stat.value && stat.label)
            .map((stat) => ({
              value: stat.value as string,
              label: stat.label as string,
            }))
        : defaults.customerStats,
    trustBadges:
      doc.trustBadges && doc.trustBadges.length > 0
        ? doc.trustBadges
            .filter((badge) => badge.label)
            .map((badge) => ({
              icon: badge.icon ?? "shield",
              label: badge.label as string,
            }))
        : defaults.trustBadges,
    featuredProducts: {
      title:
        featuredProductsSection.title || defaults.featuredProducts.title,
      subtitle:
        featuredProductsSection.subtitle || defaults.featuredProducts.subtitle,
    },
    categoryShowcase: {
      title: categoryShowcase.title || defaults.categoryShowcase.title,
      subtitle:
        categoryShowcase.subtitle || defaults.categoryShowcase.subtitle,
      categories:
        categoryShowcase.categories && categoryShowcase.categories.length > 0
          ? categoryShowcase.categories
              .filter((category) => category.title)
              .map((category) => ({
                title: category.title as string,
                emoji: category.emoji ?? "",
                description: category.description ?? "",
                href: category.href || "/products",
              }))
          : defaults.categoryShowcase.categories,
    },
    exchangeSection: {
      title: exchangeSection.title || defaults.exchangeSection.title,
      subtitle: exchangeSection.subtitle || defaults.exchangeSection.subtitle,
      points:
        exchangeSection.points && exchangeSection.points.length > 0
          ? exchangeSection.points
              .filter((point) => point.title)
              .map((point) => ({
                title: point.title as string,
                description: point.description ?? "",
              }))
          : defaults.exchangeSection.points,
      bonusAmount: exchangeSection.bonusAmount || defaults.exchangeSection.bonusAmount,
      bonusCaption:
        exchangeSection.bonusCaption || defaults.exchangeSection.bonusCaption,
      bonusSubtitle:
        exchangeSection.bonusSubtitle || defaults.exchangeSection.bonusSubtitle,
    },
    videoSection: {
      title: videoSection.title || defaults.videoSection.title,
      subtitle: videoSection.subtitle || defaults.videoSection.subtitle,
      videos:
        videoSection.videos && videoSection.videos.length > 0
          ? videoSection.videos
              .filter((video) => video.youtubeId)
              .map((video) => ({
                title: video.title ?? "",
                youtubeId: video.youtubeId as string,
              }))
          : defaults.videoSection.videos,
    },
    testimonials:
      doc.testimonials && doc.testimonials.length > 0
        ? doc.testimonials.map((testimonial) => ({
            name: testimonial.name ?? "",
            text: testimonial.text ?? "",
            rating: Number(testimonial.rating) || 5,
          }))
        : defaults.testimonials,
  };
}

function mapSeoSettings(doc: SeoSettingsDoc | null): SeoSettings {
  const defaults = DEFAULT_SEO_SETTINGS;
  if (!doc) return defaults;

  return {
    pageTitle: doc.pageTitle || defaults.pageTitle,
    metaDescription: doc.metaDescription || defaults.metaDescription,
    ogImage: urlFor(doc.ogImage) || defaults.ogImage,
    keywords:
      doc.keywords && doc.keywords.length > 0
        ? doc.keywords
        : defaults.keywords,
  };
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  return mapSiteSettings(await fetchDoc<SiteSettingsDoc>(SETTINGS_QUERY));
});

export const getHeroContent = cache(async (): Promise<HeroContent> => {
  return mapHeroContent(await fetchDoc<HeroContentDoc>(HERO_QUERY));
});

export const getHomepageContent = cache(async (): Promise<HomepageContent> => {
  return mapHomepageContent(await fetchDoc<HomepageContentDoc>(HOMEPAGE_QUERY));
});

export const getSeoSettings = cache(async (): Promise<SeoSettings> => {
  return mapSeoSettings(await fetchDoc<SeoSettingsDoc>(SEO_QUERY));
});
