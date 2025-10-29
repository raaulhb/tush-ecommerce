/**
 * Stripe Server Client
 * Used in API routes and server-side operations
 */

import Stripe from "stripe";

/**
 * Initialize Stripe with secret key
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

/**
 * Create a payment intent for checkout
 */
export async function createPaymentIntent(
  amount: number,
  currency: string = "gbp"
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    automatic_payment_methods: {
      enabled: true,
    },
  });
}

/**
 * Retrieve a payment intent
 */
export async function getPaymentIntent(
  paymentIntentId: string
): Promise<Stripe.PaymentIntent> {
  return await stripe.paymentIntents.retrieve(paymentIntentId);
}

/**
 * Create a Stripe customer
 */
export async function createCustomer(
  email: string,
  name?: string
): Promise<Stripe.Customer> {
  return await stripe.customers.create({
    email,
    name,
  });
}
