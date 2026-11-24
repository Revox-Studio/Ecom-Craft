import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/store/product/product-card";
import { productService } from "@/services/product.service";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "All Handcrafted Crochet Products & Catalog",
  description:
    "Browse our complete catalog of handcrafted crochet items: deity poshak, amigurumi dolls, forever flower bouquets, cute keychains, and winter knitwear.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: `All Handcrafted Crochet Products | ${brandConfig.name}`,
    description:
      "Browse our complete catalog of handcrafted crochet items: deity poshak, amigurumi dolls, forever flower bouquets, cute keychains, and winter knitwear.",
    url: `${brandConfig.url}/products`,
    type: "website",
  },
};

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}

const categories = ["All Crafts", ...brandConfig.categories.map((c) => c.name)];

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category, search, sort } = await searchParams;
  const products = await productService.getAll({ category, search, sort });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
          Product Catalog
        </span>
        <h1 className="text-3xl font-black text-brand-dark">Artisan Showcase</h1>
        <p className="text-sm text-brand-dark/70 mt-1">
          Explore handmade artifacts from our studio. {products.length} items currently on display.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-plum/10 pb-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isSelected = (!category && cat === "All Crafts") || category === cat;
            return (
              <Link
                key={cat}
                href={cat === "All Crafts" ? "/products" : `/products?category=${encodeURIComponent(cat)}`}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-brand-primary text-white shadow-sm shadow-brand-primary/20"
                    : "bg-brand-plum/[0.05] text-brand-dark hover:bg-brand-plum/15"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-brand-plum/20 p-12 text-center text-brand-dark/60">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
