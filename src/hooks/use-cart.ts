/**
 * Custom Cart Hook
 * Provides easy access to cart functionality with toast notifications
 */

import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import type { Product } from "@/types";

export function useCart() {
  const store = useCartStore();

  /**
   * Add item to cart with success notification
   */
  const addItem = (product: Product, quantity: number = 1) => {
    // Check if product has stock
    if (product.stock_quantity != null && product.stock_quantity < quantity) {
      toast.error("Not enough stock available");
      return;
    }

    store.addItem(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  /**
   * Remove item from cart with confirmation
   */
  const removeItem = (productId: string, productName?: string) => {
    store.removeItem(productId);
    toast.success(
      productName
        ? `${productName} removed from cart`
        : "Item removed from cart"
    );
  };

  /**
   * Update quantity with validation
   */
  const updateQuantity = (
    productId: string,
    quantity: number,
    maxStock?: number
  ) => {
    if (maxStock && quantity > maxStock) {
      toast.error(`Only ${maxStock} items available`);
      return;
    }

    store.updateQuantity(productId, quantity);
  };

  /**
   * Clear cart with confirmation
   */
  const clearCart = () => {
    store.clearCart();
    toast.success("Cart cleared");
  };

  return {
    // State
    items: store.items,
    itemCount: store.getItemCount(),
    total: store.getTotal(),

    // Actions with notifications
    addItem,
    removeItem,
    updateQuantity,
    clearCart,

    // Utilities
    getItem: store.getItem,
  };
}
