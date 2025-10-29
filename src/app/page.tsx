"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { items, itemCount, total, addItem, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Mock product for testing
  const mockProduct = {
    id: "test-1",
    name: "TUSH Sanitizing Spray",
    slug: "tush-spray",
    description: "Test product",
    price: 9.99,
    stock_quantity: 100,
    images: [],
    category: "spray",
    featured: true,
    active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Test Stripe payment intent creation
  const testStripeCheckout = async () => {
    if (total === 0) {
      toast.error("Add items to cart first!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          currency: "gbp",
        }),
      });

      const data = await response.json();

      if (data.clientSecret) {
        toast.success("✅ Stripe Payment Intent Created!");
        console.log("Payment Intent ID:", data.paymentIntentId);
        console.log("Client Secret:", data.clientSecret);
      } else {
        toast.error("Failed to create payment intent");
      }
    } catch (error) {
      console.error("Stripe test error:", error);
      toast.error("Error testing Stripe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="font-display text-6xl">TUSH</h1>
          <p className="text-muted-foreground text-lg">Cart & Stripe Test</p>
        </div>

        {/* Cart Summary */}
        <div className="bg-primary text-primary-foreground p-6 rounded-lg">
          <h2 className="font-display text-2xl mb-4">Cart Summary</h2>
          <div className="space-y-2">
            <p>Items: {itemCount}</p>
            <p className="text-2xl font-bold">Total: {formatPrice(total)}</p>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={() => addItem(mockProduct)}
            variant="default"
          >
            Add Test Product
          </Button>

          <Button
            onClick={() => clearCart()}
            variant="destructive"
          >
            Clear Cart
          </Button>

          <Button
            onClick={testStripeCheckout}
            disabled={loading || total === 0}
            className="bg-tush-yellow text-black hover:opacity-90"
          >
            {loading ? "Testing..." : "💳 Test Stripe Checkout"}
          </Button>
        </div>

        {/* Cart Items Display */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="font-display text-xl">Cart Items:</h3>

          {items.length === 0 ? (
            <p className="text-muted-foreground">Cart is empty</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between items-center p-4 bg-muted rounded"
                >
                  <div>
                    <p className="font-bold">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold">
                      {formatPrice(Number(item.product.price) * item.quantity)}
                    </p>
                    <Button
                      onClick={() =>
                        removeItem(item.product.id, item.product.name)
                      }
                      variant="ghost"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
