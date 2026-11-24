import type { Metadata } from "next";
import HeroBanner from "@/components/store/home/hero-banner";
import SlidingBar from "@/components/store/home/sliding-bar";
import TrustSection from "@/components/store/home/trust-section";
import FeaturedProducts from "@/components/store/home/featured-products";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: `${brandConfig.name.toUpperCase()} | Handcrafted Wool, Deity Poshak & Crochet Toys`,
  description:
    "Discover handcrafted crochet creations by Crochet Cradle: festive deity poshak, adorable amigurumi character dolls, everlasting flower bouquets, and cozy winter knits.",
  alternates: {
    canonical: "/",
  },
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Banner: Edge-to-Edge Full Screen Width */}
      <HeroBanner />

      {/* Full Screen Width Sliding Bar (Brand Secondary Color, Sliding Left to Right) */}
      <SlidingBar />

      {/* Body Content with Container Spacing & Breathing Room */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
        {/* Real Products Section */}
        <FeaturedProducts />

        {/* Why Trust Us Section (Very Good Quality • On-Time Delivery Promise • Pan-India Delivery) */}
        <TrustSection />
      </div>
    </div>
  );
}
