/**
 * Shop Page
 * Browse all TUSH products with category filtering
 */

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CategoryFilter } from "@/components/products/category-filter";
import { ProductsGrid } from "@/components/products/products-grid";
import { useProducts } from "@/hooks/use-products";

const CATEGORIES = [
  { value: "spray", label: "💧 Sanitizing Spray" },
  { value: "towels", label: "🧻 Compressed Towels" },
  { value: "soap", label: "🧼 Soap Sheets" },
  { value: "bundle", label: "📦 Bundles" },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );

  const { products, loading } = useProducts({
    category: selectedCategory,
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="font-display text-5xl mb-4">Shop TUSH</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your confidence kit. Compact, leak-proof, and designed for your
          handbag.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex justify-center">
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Products Count */}
      {!loading && (
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            found
            {selectedCategory && (
              <span className="ml-1">
                in {CATEGORIES.find((c) => c.value === selectedCategory)?.label}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Products Grid */}
      <ProductsGrid
        products={products}
        loading={loading}
      />
    </div>
  );
}
