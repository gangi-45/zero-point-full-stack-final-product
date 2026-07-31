import type {
  HomepageContent,
  HeroContent,
  SeoSettings,
  SiteSettings,
} from "@/types/content";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  logo: null,
  logoInitials: "ZP",
  favicon: null,
  businessName: "Zero Point",
  brandName: "Zero Point Buy Sell Exchange",
  tagline: "Buy · Sell · Exchange",
  domain: "zeropointbyx.com",
  description:
    "Zero Point Buy Sell Exchange — Mymensingh এর নির্ভরযোগ্য ফোন, ল্যাপটপ ও এক্সেসরিজ কেনাবেচার ঠিকানা। সব পণ্য টেস্টেড ও ওয়ারেন্টিসহ।",
  phone: "+8801781685200",
  phoneDisplay: "01781-685200",
  whatsapp: "8801781685200",
  email: "support@zeropointbyx.com",
  address: "Chorpara Road, Mymensingh Sadar, Mymensingh 2200, Bangladesh",
  addressShort: "Chorpara Road, Mymensingh",
  businessHours: "প্রতিদিন সকাল ১০টা থেকে রাত ৯টা",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chorpara+Road+Mymensingh",
  mapsEmbed: "https://www.google.com/maps?q=Chorpara+Road+Mymensingh&output=embed",
  findUsTitle: "কীভাবে আমাদের খুঁজে পাবেন?",
  findUsText:
    "আমরা Mymensingh শহরের Chorpara Road এ অবস্থিত। শপে এসে সরাসরি পণ্য দেখে কিনতে পারবেন, আবার WhatsApp এ অর্ডার করলে হাতে হাতে ডেলিভারিও আছে।",
  getDirectionsLabel: "Get Directions",
  socialLinks: [
    { label: "Facebook", url: "https://www.facebook.com/zeropointbyx" },
    { label: "Instagram", url: "https://www.instagram.com/zeropointbyx" },
    { label: "YouTube", url: "https://www.youtube.com/@zeropointbyx" },
  ],
  copyrightSuffix: "Mymensingh, Bangladesh",
};

export const DEFAULT_HERO_CONTENT: HeroContent = {
  badge: "Mymensingh এর বিশ্বস্ত Buy · Sell · Exchange শপ",
  headline: [
    { text: "সেরা দামে ", isAccent: false },
    { text: "কিনুন", isAccent: true },
    { text: ", ", isAccent: false },
    { text: "বিক্রি করুন", isAccent: true },
    { text: ", আর ", isAccent: false },
    { text: "এক্সচেঞ্জ", isAccent: true },
    { text: " করুন", isAccent: false },
  ],
  subtitle:
    "ফোন, ল্যাপটপ ও এক্সেসরিজ — সব টেস্টেড, গ্যারান্টি সহ। পুরনো ডিভাইস এক্সচেঞ্জ করে নতুন প্রযুক্তিতে আপগ্রেড করুন, আজই।",
  heroImage:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80&auto=format&fit=crop",
  primaryCtaLabel: "Browse Inventory",
  primaryCtaHref: "/products",
  secondaryCtaLabel: "Instant Exchange Quote",
  featuredProduct: {
    title: "iPhone 13 Pro — 128GB",
    subtitle: "Like New · Tested & Verified",
    price: "৳82,000",
  },
  ticker: [
    "🔥 এক্সচেঞ্জ বোনাস — পুরনো ফোনে ৩,০০০৳ পর্যন্ত অতিরিক্ত মূল্য",
    "⚡ আজই এক্সচেঞ্জ করুন, সাথে সাথে অফার",
    "🛡️ সব প্রোডাক্ট টেস্টেড ও ৭ দিনের ওয়ারেন্টি",
    "💬 WhatsApp এ অর্ডার করুন — দ্রুত ডেলিভারি",
    "💰 সেরা দামের নিশ্চয়তা — Mymensingh এ",
  ],
};

export const DEFAULT_HOMEPAGE_CONTENT: HomepageContent = {
  customerStats: [{ value: "৫০০+", label: "সন্তুষ্ট কাস্টমার" }],
  trustBadges: [{ icon: "shield", label: "টেস্টেড ও ৭ দিনের ওয়ারেন্টি" }],
  featuredProducts: {
    title: "Featured Products",
    subtitle: "আমাদের সেরা নির্বাচিত ডিভাইসগুলো — সব টেস্টেড ও ওয়ারেন্টিসহ।",
  },
  categoryShowcase: {
    title: "যা যা পাবেন আমাদের এখানে",
    subtitle: "নতুন হোক বা ইউজড — প্রতিটি পণ্য কেনার আগে পরীক্ষা করা হয়।",
    categories: [
      {
        title: "Phones",
        emoji: "📱",
        description:
          "iPhone, Samsung, Xiaomi ও আরও অনেক ব্র্যান্ডের ফোন — নতুন ও ইউজড।",
        href: "/products",
      },
      {
        title: "Laptops",
        emoji: "💻",
        description: "MacBook, Dell, HP — স্টাডি ও অফিসের জন্য সেরা ল্যাপটপ।",
        href: "/products",
      },
      {
        title: "Accessories",
        emoji: "🎧",
        description:
          "হেডফোন, ইয়ারবাড, চার্জার, পাওয়ার ব্যাংক ও আরও অনেক কিছু।",
        href: "/products",
      },
    ],
  },
  exchangeSection: {
    title: "পুরনো ডিভাইস = নতুন আপগ্রেড",
    subtitle:
      "পুরনো ফোন, ল্যাপটপ বা ট্যাবলেট এনে এক্সচেঞ্জ করে নিয়ে যান নতুন ডিভাইস — অথবা বিক্রি করে নিন নগদ টাকা। কোনো ঝামেলা ছাড়াই।",
    points: [
      {
        title: "মূল্যায়ন ফ্রি",
        description: "আপনার পুরনো ডিভাইসের মূল্য নির্ধারণ সম্পূর্ণ ফ্রি।",
      },
      {
        title: "সাথে সাথে অফার",
        description: "ডিভাইস দেখালেই সাথে সাথে অফার পেয়ে যাবেন।",
      },
      {
        title: "সেরা দামের নিশ্চয়তা",
        description: "বাজারের তুলনায় সেরা এক্সচেঞ্জ ভ্যালু।",
      },
      {
        title: "নগদে ক্রয়",
        description: "পুরনো ডিভাইস বিক্রি করে সরাসরি নগদ টাকা নিন।",
      },
    ],
    bonusAmount: "৳3,000",
    bonusCaption: "পর্যন্ত অতিরিক্ত এক্সচেঞ্জ বোনাস",
    bonusSubtitle: "আজকের বিশেষ অফার — শুধু এই সপ্তাহের জন্য",
  },
  videoSection: {
    title: "ডিভাইস রিভিউ ও আনবক্সিং",
    subtitle:
      "কেনার আগে আমাদের ভিডিও রিভিউ দেখে নিশ্চিন্ত হোন — বাস্তব অভিজ্ঞতা, বাস্তব পরীক্ষা।",
    videos: [
      { title: "iPhone Unboxing & Review", youtubeId: "ZQ_c2q8FcFc" },
      { title: "Galaxy S23 Ultra Camera Test", youtubeId: "V3VQ0GzMPqE" },
      { title: "Redmi Note 13 Pro Unboxing", youtubeId: "fGX1mFhX3uY" },
    ],
  },
  testimonials: [],
};

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  pageTitle: "Zero Point — Buy Sell Exchange | Mymensingh",
  metaDescription:
    "Zero Point Buy Sell Exchange — Mymensingh এর নির্ভরযোগ্য ফোন, ল্যাপটপ ও এক্সেসরিজ বাই-সেল-এক্সচেঞ্জ শপ। সেরা দামে কিনুন, নিরাপদে বিক্রি করুন।",
  ogImage: null,
  keywords: [
    "Zero Point",
    "buy sell exchange",
    "Mymensingh",
    "ফোন বিক্রি",
    "ল্যাপটপ কেনাবেচা",
    "mobile exchange",
    "used phone Mymensingh",
    "iPhone Mymensingh",
  ],
};
