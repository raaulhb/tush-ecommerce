/**
 * Application Types
 * Clean, reusable types for the TUSH e-commerce application
 */

import { Database } from "@/lib/database.types";

// Database table types
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["orders"]["Update"];

export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];
export type OrderItemInsert =
  Database["public"]["Tables"]["order_items"]["Insert"];

export type CartItem = Database["public"]["Tables"]["cart_items"]["Row"];
export type CartItemInsert =
  Database["public"]["Tables"]["cart_items"]["Insert"];

// Extended types with computed fields
export interface ProductWithDetails extends Product {
  in_stock: boolean;
  thumbnail: string | null;
}

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface OrderWithItems extends Order {
  order_items: (OrderItem & {
    product: Product | null;
  })[];
}

// Shopping cart state
export interface CartState {
  items: CartItemWithProduct[];
  total: number;
  itemCount: number;
}

// Order creation payload
export interface CreateOrderPayload {
  email: string;
  full_name: string;
  shipping_address: ShippingAddress;
  items: {
    product_id: string;
    quantity: number;
    price_at_purchase: number;
  }[];
  total: number;
  notes?: string;
}

// Shipping address structure
export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string;
}

// Order status options
export type OrderStatus =
  | "pending"
  | "processing"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

// Product category options
export type ProductCategory = "spray" | "towels" | "soap" | "bundle";

// API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
