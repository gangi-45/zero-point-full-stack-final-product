export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettings = {
  logo: string | null;
  logoInitials: string;
  favicon: string | null;
  businessName: string;
  brandName: string;
  tagline: string;
  domain: string;
  description: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  addressShort: string;
  businessHours: string;
  mapsUrl: string;
  mapsEmbed: string;
  findUsTitle: string;
  findUsText: string;
  getDirectionsLabel: string;
  socialLinks: SocialLink[];
  copyrightSuffix: string;
};

export type HeroHeadlineSegment = {
  text: string;
  isAccent: boolean;
};

export type CustomerStat = {
  value: string;
  label: string;
};

export type TrustBadge = {
  icon: string;
  label: string;
};

export type HeroContent = {
  badge: string;
  headline: HeroHeadlineSegment[];
  subtitle: string;
  heroImage: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  featuredProduct: {
    title: string;
    subtitle: string;
    price: string;
  };
  ticker: string[];
};

export type CategoryItem = {
  title: string;
  emoji: string;
  description: string;
  href: string;
};

export type ExchangePoint = {
  title: string;
  description: string;
};

export type VideoItem = {
  title: string;
  youtubeId: string;
};

export type Testimonial = {
  name: string;
  text: string;
  rating: number;
};

export type HomepageContent = {
  customerStats: CustomerStat[];
  trustBadges: TrustBadge[];
  featuredProducts: {
    title: string;
    subtitle: string;
  };
  categoryShowcase: {
    title: string;
    subtitle: string;
    categories: CategoryItem[];
  };
  exchangeSection: {
    title: string;
    subtitle: string;
    points: ExchangePoint[];
    bonusAmount: string;
    bonusCaption: string;
    bonusSubtitle: string;
  };
  videoSection: {
    title: string;
    subtitle: string;
    videos: VideoItem[];
  };
  testimonials: Testimonial[];
};

export type SeoSettings = {
  pageTitle: string;
  metaDescription: string;
  ogImage: string | null;
  keywords: string[];
};
