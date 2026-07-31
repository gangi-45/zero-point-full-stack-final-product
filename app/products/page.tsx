import type { Metadata } from "next";
import { getProducts } from "@/sanity/product-service";
import { getSiteSettings } from "@/lib/content-service";
import { ProductsExplorer } from "@/components/filters/ProductsExplorer";
import { Container } from "@/components/shared/Container";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "ব্রাউজ করুন আমাদের ফোন, ল্যাপটপ ও এক্সেসরিজ — সব পণ্য টেস্টেড ও ৭ দিনের ওয়ারেন্টিসহ।",
};

export default async function ProductsPage() {
  const [products, site] = await Promise.all([
    getProducts(),
    getSiteSettings(),
  ]);

  return (
    <div className="pt-24 pb-16">
      <Container>
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-ink-muted sm:text-base">
            সব পণ্য কেনার আগে যাচাই করা হয় — কন্ডিশন, ব্যাটারি ও ফাংশন টেস্ট।
            আগ্রহী হলে WhatsApp এ অর্ডার করুন বা শপে এসে দেখে নিন।
          </p>
        </div>

        <ProductsExplorer products={products} site={site} />
      </Container>
    </div>
  );
}
