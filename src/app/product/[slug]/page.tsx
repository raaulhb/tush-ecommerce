/**
 * Product Detail Page
 * Individual product page with images, description, and purchase options
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/products/product-gallery";
import { ProductActions } from "@/components/products/product-actions";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("slug", slug)
    .single();

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | TUSH`,
    description: product.description || `Buy ${product.name} from TUSH`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch product by slug
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  // If product not found, show 404
  if (error || !product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        asChild
        className="mb-8"
      >
        <Link href="/shop">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
      </Button>

      {/* Product Details Grid */}
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Product Gallery */}
        <ProductGallery
          images={product.images || []}
          productName={product.name}
        />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-4xl mb-4">{product.name}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Actions */}
          <ProductActions product={product} />
        </div>
      </div>

      {/* Additional Product Info */}
      <div className="mt-16 border-t pt-16">
        <h2 className="font-display text-3xl mb-8 text-center">
          Why Choose TUSH?
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center space-y-2">
            <div className="text-4xl mb-4">🎒</div>
            <h3 className="font-semibold text-lg">Pocket-Sized</h3>
            <p className="text-sm text-muted-foreground">
              Designed for the handbag, not the cleaning aisle
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="font-semibold text-lg">Empowering</h3>
            <p className="text-sm text-muted-foreground">
              Feel confident and in control, wherever you go
            </p>
          </div>

          <div className="text-center space-y-2">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="font-semibold text-lg">Stigma-Free</h3>
            <p className="text-sm text-muted-foreground">
              Bold, cheeky, and honest about personal hygiene
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
