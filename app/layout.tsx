import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { StickyCTA } from "@/components/sticky-cta/StickyCTA";
import { getSeoSettings, getSiteSettings } from "@/lib/content-service";
import "./globals.css";

export const revalidate = 60;

function siteBaseUrl(domain: string): string {
  const candidate = /^https?:\/\//.test(domain) ? domain : `https://${domain}`;
  try {
    const parsed = new URL(candidate);
    if (parsed.hostname) return parsed.origin;
  } catch {
    // invalid editable domain — fall back to the default below
  }
  return "https://zeropointbyx.com";
}

export async function generateMetadata(): Promise<Metadata> {
  const [site, seo] = await Promise.all([getSiteSettings(), getSeoSettings()]);
  const url = siteBaseUrl(site.domain);

  return {
    metadataBase: new URL(url),
    title: {
      default: seo.pageTitle,
      template: `%s | ${site.businessName}`,
    },
    description: seo.metaDescription,
    keywords: seo.keywords,
    icons: site.favicon ? { icon: site.favicon } : undefined,
    openGraph: {
      type: "website",
      locale: "bn_BD",
      url,
      siteName: site.brandName,
      title: seo.pageTitle,
      description: seo.metaDescription,
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.pageTitle,
      description: seo.metaDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const site = await getSiteSettings();
  const url = siteBaseUrl(site.domain);

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.brandName,
    image: site.logo ?? `${url}/logo.png`,
    url,
    telephone: site.phone,
    priceRange: "৳৳",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: "BD",
    },
    openingHours: site.businessHours,
    sameAs: site.socialLinks.map((link) => link.url),
  };

  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <Navbar site={site} />
        <main>{children}</main>
        <Footer site={site} />
        <StickyCTA site={site} />
      </body>
    </html>
  );
}
