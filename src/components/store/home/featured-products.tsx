import React from "react";
import Link from "next/link";
import ProductCard from "@/components/store/product/product-card";
import { productService } from "@/services/product.service";

export default async function FeaturedProducts() {
  const products = await productService.getFeatured();

  return (
    <section className="py-2" aria-label="Featured Crafts">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Curated Selection
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight mt-0.5">
            Featured Crafts
          </h2>
        </div>
        <Link
          href="/products"
          className="text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors"
        >
          View All ({products.length}) &rarr;
        </Link>
      </div>

      {/* 4-column Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
