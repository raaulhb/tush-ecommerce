/**
 * Category Filter Component
 * Filter products by category
 */

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: Array<{ value: string; label: string }>;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onCategoryChange(null)}
        size="sm"
      >
        All Products
      </Button>

      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "default" : "outline"}
          onClick={() => onCategoryChange(category.value)}
          size="sm"
          className={cn(selectedCategory === category.value && "bg-primary")}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
