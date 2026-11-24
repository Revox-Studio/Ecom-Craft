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
            Real Handcrafted Collection
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight mt-0.5">
            Featured Products
          </h2>
        </div>
        {products.length > 0 && (
          <Link
            href="/products"
            className="text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors"
          >
            View All ({products.length}) &rarr;
          </Link>
        )}
      </div>

      {/* Product Grid or Empty State */}
      {products.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-gray-200 bg-gray-50/50">
          <p className="text-sm font-semibold text-gray-700">
            No products available yet.
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Products added in the admin dashboard will automatically show up here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
