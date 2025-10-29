/**
 * Stripe Configuration
 * Centralized config for Stripe-related settings
 */

export const stripeConfig = {
  // Currency
  currency: "gbp",
  currencySymbol: "£",

  // Payment settings
  minAmount: 0.5, // Minimum £0.50
  maxAmount: 999999.99,

  // Stripe API version
  apiVersion: "2024-12-18.acacia" as const,

  // Checkout settings
  successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
  cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancelled`,
} as const;

/**
 * Validate Stripe environment variables
 */
export function validateStripeEnv(): void {
  const requiredEnvVars = [
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_SECRET_KEY",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required Stripe environment variables: ${missingVars.join(", ")}`
    );
  }
}
