/**
 * Product Actions Component
 * Add to cart, quantity selector, and stock status
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const inStock = product.stock_quantity > 0;
  const maxQuantity = Math.min(product.stock_quantity, 10);

  const handleAddToCart = async () => {
    setLoading(true);
    await addItem(product, quantity);
    setLoading(false);
  };

  const incrementQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <p className="text-4xl font-bold">
          {formatPrice(Number(product.price))}
        </p>
        {product.category && (
          <Badge
            variant="outline"
            className="mt-2 capitalize"
          >
            {product.category}
          </Badge>
        )}
      </div>

      {/* Stock Status */}
      <div>
        {inStock ? (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">
              {product.stock_quantity} in stock
            </span>
          </div>
        ) : (
          <Badge variant="destructive">Out of Stock</Badge>
        )}
      </div>

      {/* Quantity Selector */}
      {inStock && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= maxQuantity}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={loading}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      )}

      {/* Product Features */}
      <div className="border-t pt-6 space-y-3">
        <div className="flex items-start gap-3">
          <div className="h-5 w-5 rounded-full bg-tush-yellow flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Travel-sized & Leak-proof</p>
            <p className="text-sm text-muted-foreground">
              Perfectly designed for your handbag
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="h-5 w-5 rounded-full bg-tush-yellow flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Unscented & Safe</p>
            <p className="text-sm text-muted-foreground">
              Gentle on skin, effective on surfaces
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="h-5 w-5 rounded-full bg-tush-yellow flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Made in the UK</p>
            <p className="text-sm text-muted-foreground">
              Quality you can trust
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
