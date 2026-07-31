import { getProducts } from "@/sanity/product-service";
import {
  getHeroContent,
  getHomepageContent,
  getSiteSettings,
} from "@/lib/content-service";
import Hero from "@/components/hero/Hero";
import {
  CategoryShowcase,
  ExchangePromo,
  FeaturedProducts,
} from "@/components/product/FeaturedProducts";
import { VideoSection } from "@/components/video/VideoSection";

export default async function HomePage() {
  const [products, hero, homepage, site] = await Promise.all([
    getProducts(),
    getHeroContent(),
    getHomepageContent(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Hero content={hero} homepage={homepage} site={site} />
      <FeaturedProducts
        products={products}
        content={homepage.featuredProducts}
        site={site}
      />
      <CategoryShowcase content={homepage.categoryShowcase} />
      <ExchangePromo content={homepage.exchangeSection} />
      <VideoSection content={homepage.videoSection} />
    </>
  );
}
