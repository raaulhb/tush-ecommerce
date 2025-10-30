/**
 * Products Hook
 * Custom hook for fetching and filtering products from Supabase
 */

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types";

interface UseProductsOptions {
  category?: string | null;
  featured?: boolean;
  limit?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const supabase = createClient();
        let query = supabase
          .from("products")
          .select("*")
          .eq("active", true)
          .order("created_at", { ascending: false });

        // Apply filters
        if (options.category) {
          query = query.eq("category", options.category);
        }

        if (options.featured !== undefined) {
          query = query.eq("featured", options.featured);
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          throw fetchError;
        }

        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [options.category, options.featured, options.limit]);

  return { products, loading, error };
}
