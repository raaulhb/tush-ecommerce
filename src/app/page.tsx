/**
 * Home Page
 * Main landing page for TUSH e-commerce
 */

import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { AboutPreview } from "@/components/home/about-preview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <AboutPreview />
    </>
  );
}
