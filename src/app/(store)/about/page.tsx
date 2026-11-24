import React from "react";
import type { Metadata } from "next";
import { brandConfig } from "@/config/brand";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Our Story & Handcrafted Passion",
  description: `Learn about ${brandConfig.name} - our passion for artisanal crochet creations, export-grade wool yarns, and heartfelt hand-knitted toys, deity poshak, and everlasting flower bouquets.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About Us | ${brandConfig.name.toUpperCase()}`,
    description: `Learn about ${brandConfig.name} - our passion for artisanal crochet creations, export-grade wool yarns, and heartfelt hand-knitted creations.`,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
          Our Story & Craftsmanship
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-dark">
          About {brandConfig.name}
        </h1>
        <p className="text-base text-brand-dark/75 max-w-2xl mx-auto leading-relaxed">
          {brandConfig.tagline}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-brand-dark">crochetcradle.in</h2>
        <p className="text-sm text-brand-dark/70 leading-relaxed">
          {brandConfig.description}
        </p>
        <p className="text-sm text-brand-dark/70 leading-relaxed">
          Every piece is patiently hand-knitted and crocheted with premium plush yarns, meticulous stitching, and heartfelt dedication. From festive deity poshak and adorable amigurumi toys to everlasting floral bouquets and cozy winter crochet, our creations bring warmth and artistic joy into every home.
        </p>
        
        <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
          <div className="text-xs text-brand-dark/60">
            Direct orders & studio inquiries: <span className="font-bold text-brand-primary">{brandConfig.contact.phone}</span>
          </div>
          <Link
            href="/products"
            className="rounded-full bg-brand-primary text-white text-xs font-bold px-5 py-2 hover:opacity-90 transition-opacity"
          >
            Explore Catalog &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
