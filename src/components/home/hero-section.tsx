/**
 * Hero Section Component
 * Main banner/hero for the home page with CTA
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight">
                Your Pocket
                <span className="block text-primary">Best Friend</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl">
                Design-forward hygiene essentials that help you feel confident,
                clean, and in control — wherever you go.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg"
              >
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-tush-yellow" />
                <span className="text-sm font-medium">Travel-sized</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-tush-yellow" />
                <span className="text-sm font-medium">Leak-proof</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-tush-yellow" />
                <span className="text-sm font-medium">Unscented</span>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary to-secondary/50 p-8 flex items-center justify-center">
              {/* Placeholder for product image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-tush-yellow/20 rounded-full blur-3xl" />
                <span className="relative font-display text-9xl text-primary/30">
                  TUSH
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
