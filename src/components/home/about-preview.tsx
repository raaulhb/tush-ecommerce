/**
 * About Preview Section
 * Brief introduction to TUSH brand on home page
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AboutPreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-display text-5xl">Redefining Public Hygiene</h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            We&apos;ve all been there. You open the door to a public toilet and
            immediately regret every life choice. It&apos;s 2025 — why are women
            still out here risking their dignity for a pee?
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            That&apos;s exactly why{" "}
            <span className="font-bold text-foreground">TUSH</span> was born. We
            make beautifully designed, discreet hygiene essentials that actually
            work and look good doing it. Because hygiene doesn&apos;t have to be
            clinical or cringe. It can be bold, cheeky, and even — dare we say —
            a little iconic.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <Link href="/about">Read Our Story</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t">
            <div>
              <p className="font-display text-4xl text-primary mb-2">30ml</p>
              <p className="text-sm text-muted-foreground">Compact Size</p>
            </div>
            <div>
              <p className="font-display text-4xl text-primary mb-2">100%</p>
              <p className="text-sm text-muted-foreground">Leak-proof</p>
            </div>
            <div>
              <p className="font-display text-4xl text-primary mb-2">UK</p>
              <p className="text-sm text-muted-foreground">Made In</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
