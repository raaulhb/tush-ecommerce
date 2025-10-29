/**
 * Checkout API Route
 * Creates a Stripe PaymentIntent for the checkout process
 */

import { NextRequest, NextResponse } from "next/server";
import { createPaymentIntent } from "@/lib/stripe/server";
import { z } from "zod";

// Request validation schema
const checkoutSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default("gbp"),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { amount, currency } = checkoutSchema.parse(body);

    // Create payment intent
    const paymentIntent = await createPaymentIntent(amount, currency);

    // Return client secret for frontend
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
