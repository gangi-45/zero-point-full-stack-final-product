"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterBar } from "@/components/filters/FilterBar";
import type {
  CategoryFilterValue,
  ConditionFilterValue,
} from "@/components/filters/FilterBar";
import { SearchInput } from "@/components/filters/SearchInput";
import type { SiteSettings } from "@/types/content";

type ProductsExplorerProps = {
  products: Product[];
  site: SiteSettings;
};

export function ProductsExplorer({ products, site }: ProductsExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilterValue>("all");
  const [condition, setCondition] = useState<ConditionFilterValue>("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery =
        normalized === "" ||
        product.title.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized);
      const matchesCategory = category === "all" || product.category === category;
      const matchesCondition =
        condition === "all" || product.condition === condition;
      return matchesQuery && matchesCategory && matchesCondition;
    });
  }, [products, query, category, condition]);

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-card p-4 sm:p-5">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search by name… (e.g. iPhone, MacBook)"
        />
        <div className="mt-4">
          <FilterBar
            category={category}
            onCategoryChange={setCategory}
            condition={condition}
            onConditionChange={setCondition}
          />
        </div>
      </div>

      <p className="text-sm font-medium text-ink-muted" aria-live="polite">
        Showing <span className="font-bold text-ink">{filtered.length}</span> of{" "}
        {products.length} products
      </p>

      <ProductGrid
        products={filtered}
        site={site}
        emptyMessage="অন্য কোনো কীওয়ার্ড দিয়ে খোঁজার চেষ্টা করুন বা ফিল্টার পরিবর্তন করুন।"
      />
    </div>
  );
}
