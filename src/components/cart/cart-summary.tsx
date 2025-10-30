/**
 * Cart Summary Component
 * Order summary with subtotal, shipping, and total
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
}

export function CartSummary({ subtotal, itemCount }: CartSummaryProps) {
  const shipping = subtotal > 50 ? 0 : 4.99; // Free shipping over £50
  const total = subtotal + shipping;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">FREE</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {shipping > 0 && subtotal > 0 && (
          <p className="text-xs text-muted-foreground">
            Spend {formatPrice(50 - subtotal)} more for free shipping!
          </p>
        )}

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          asChild
          size="lg"
          className="w-full"
        >
          <Link href="/checkout">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Proceed to Checkout
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
