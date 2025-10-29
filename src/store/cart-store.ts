/**
 * Cart Store - Zustand
 * Global state management for shopping cart
 * Uses localStorage for persistence across sessions
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

// Cart item interface
export interface CartItem {
  product: Product;
  quantity: number;
}

// Cart store state
interface CartStore {
  items: CartItem[];

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed values
  getItemCount: () => number;
  getTotal: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

/**
 * Create cart store with persistence
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      /**
       * Add product to cart or increase quantity if already exists
       */
      addItem: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          // If item already in cart, increase quantity
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          // Add new item to cart
          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      /**
       * Remove product from cart
       */
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      /**
       * Update quantity of a cart item
       * If quantity is 0, remove the item
       */
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      /**
       * Clear all items from cart
       */
      clearCart: () => {
        set({ items: [] });
      },

      /**
       * Get total number of items in cart
       */
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      /**
       * Calculate total price of all items in cart
       */
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + Number(item.product.price) * item.quantity,
          0
        );
      },

      /**
       * Get specific item from cart
       */
      getItem: (productId: string) => {
        return get().items.find((item) => item.product.id === productId);
      },
    }),
    {
      name: "tush-cart-storage", // localStorage key
      // Only persist the items array
      partialize: (state) => ({ items: state.items }),
    }
  )
);
