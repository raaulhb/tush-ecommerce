/**
 * Cart Page
 * Shopping cart with items, quantities, and checkout
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { useCart } from "@/hooks/use-cart";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, itemCount, total, clearCart } = useCart();

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-4xl">Your Cart is Empty</h1>
            <p className="text-muted-foreground">
              Time to add some TUSH essentials to your collection!
            </p>
          </div>

          <Button
            asChild
            size="lg"
          >
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Cart with items
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          asChild
          className="mb-4"
        >
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>

        <h1 className="font-display text-4xl">Shopping Cart</h1>
        <p className="text-muted-foreground mt-2">
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border p-6">
            {/* Clear Cart Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Items</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                Clear Cart
              </Button>
            </div>

            {/* Items List */}
            <div>
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary - Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <CartSummary
              subtotal={total}
              itemCount={itemCount}
            />

            {/* Trust Badges */}
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-tush-yellow" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-tush-yellow" />
                <span>Free shipping over £50</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-tush-yellow" />
                <span>Easy returns within 30 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
