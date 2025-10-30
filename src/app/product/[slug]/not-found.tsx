/**
 * Product Not Found Page
 * Shown when product slug doesn't exist
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-6xl mb-4">Oops!</h1>
      <p className="text-xl text-muted-foreground mb-8">
        We couldn&apos;t find that product. It might be out of stock or
        unavailable.
      </p>
      <Button
        asChild
        size="lg"
      >
        <Link href="/shop">Browse All Products</Link>
      </Button>
    </div>
  );
}
