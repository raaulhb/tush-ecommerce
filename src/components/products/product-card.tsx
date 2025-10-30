/**
 * Product Card Component
 * Reusable card for displaying products in grids
 */

"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { formatPrice, getProductThumbnail } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const thumbnail = getProductThumbnail(product.images);
  const inStock = product.stock_quantity != null && product.stock_quantity > 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-4xl text-muted-foreground/20">
                TUSH
              </span>
            </div>
          )}

          {/* Featured Badge */}
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-tush-yellow text-black">
              Featured
            </Badge>
          )}

          {/* Out of Stock Overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            {formatPrice(Number(product.price))}
          </span>

          {product.category && (
            <Badge
              variant="outline"
              className="capitalize"
            >
              {product.category}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          disabled={!inStock}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}
