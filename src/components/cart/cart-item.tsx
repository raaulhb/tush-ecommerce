/**
 * Cart Item Component
 * Individual cart item with quantity controls and remove button
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice, getProductThumbnail } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import type { CartItem as CartItemType } from "@/store/cart-store";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const thumbnail = getProductThumbnail(item.product.images);

  const itemTotal = Number(item.product.price) * item.quantity;

  const handleIncrement = () => {
    if (
      item.product.stock_quantity &&
      item.quantity < item.product.stock_quantity
    ) {
      updateQuantity(
        item.product.id,
        item.quantity + 1,
        item.product.stock_quantity ?? undefined
      );
    }
  };

  const handleDecrement = () => {
    updateQuantity(item.product.id, item.quantity - 1);
  };

  return (
    <div className="flex gap-4 py-6 border-b">
      {/* Product Image */}
      <Link
        href={`/product/${item.product.slug}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border"
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-xs text-muted-foreground">TUSH</span>
          </div>
        )}
      </Link>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div className="flex-1">
            <Link
              href={`/product/${item.product.slug}`}
              className="font-semibold hover:text-primary transition-colors"
            >
              {item.product.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {formatPrice(Number(item.product.price))} each
            </p>
          </div>

          {/* Item Total */}
          <div className="text-right">
            <p className="font-bold">{formatPrice(itemTotal)}</p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-12 text-center text-sm font-medium">
              {item.quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleIncrement}
              disabled={
                !item.product.stock_quantity ||
                item.quantity >= item.product.stock_quantity
              }
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeItem(item.product.id, item.product.name)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>

        {/* Stock Warning */}
        {item.product.stock_quantity &&
          item.quantity >= item.product.stock_quantity && (
            <p className="text-xs text-orange-600 mt-2">
              Only {item.product.stock_quantity} left in stock
            </p>
          )}
      </div>
    </div>
  );
}
