import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronRight, ArrowLeft, Sparkles } from "lucide-react";
import ProductCard from "@/components/store/product/product-card";
import { productService } from "@/services/product.service";
import { brandConfig } from "@/config/brand";

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = brandConfig.categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} | Handcrafted Crochet Collection`,
    description: category.description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | ${brandConfig.name}`,
      description: category.description,
      url: `${brandConfig.url}/categories/${category.slug}`,
      type: "website",
      images: [
        {
          url: `${brandConfig.url}${category.image}`,
          width: 800,
          height: 800,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = brandConfig.categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Fetch products matching category name or keywords
  const allProducts = await productService.getAll();
  const categoryKeywords = category.name.toLowerCase().split(/[ &,-]+/);
  
  const products = allProducts.filter((p) => {
    const prodCat = (p.category || "").toLowerCase();
    const prodName = (p.name || "").toLowerCase();
    const prodDesc = (p.description || "").toLowerCase();
    
    // Exact or partial category match
    if (prodCat.includes(category.name.toLowerCase()) || category.name.toLowerCase().includes(prodCat)) {
      return true;
    }
    // Keyword match in name or description
    return categoryKeywords.some(
      (kw) => kw.length > 3 && (prodCat.includes(kw) || prodName.includes(kw) || prodDesc.includes(kw))
    );
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: brandConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categories",
        item: `${brandConfig.url}/categories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${brandConfig.url}/categories/${category.slug}`,
      },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Collection`,
    description: category.description,
    url: `${brandConfig.url}/categories/${category.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: brandConfig.name,
      url: brandConfig.url,
    },
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-semibold text-brand-dark/60"
        >
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-brand-dark/40" />
          <Link
            href="/categories"
            className="hover:text-brand-primary transition-colors"
          >
            Categories
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-brand-dark/40" />
          <span className="text-brand-primary font-bold">{category.name}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-primary/10 via-brand-secondary/10 to-brand-primary/5 p-6 sm:p-10 border border-brand-primary/15">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-primary/20 bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Handcrafted Collection
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
                {category.name}
              </h1>
              <p className="text-sm sm:text-base text-brand-dark/75 leading-relaxed">
                {category.description}
              </p>
              <div className="pt-2 flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-brand-dark/60">
                <span>{products.length} Items Available</span>
                <span>•</span>
                <span className="text-brand-secondary font-bold">100% Hand-knitted</span>
              </div>
            </div>

            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-white shadow-xl shrink-0">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 176px, 208px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Products Grid Section */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-brand-plum/10 pb-4">
            <h2 className="text-lg font-bold text-brand-dark">
              Available Pieces in this Collection
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Products
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-brand-plum/20 p-12 text-center space-y-4">
              <p className="text-brand-dark/70 text-sm">
                New artisan designs are being knitted for this collection right now!
              </p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/products"
                  className="rounded-full bg-brand-primary text-white px-5 py-2 text-xs font-bold shadow-md hover:bg-brand-primary/90 transition-all"
                >
                  View All Products
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-brand-secondary text-brand-secondary px-5 py-2 text-xs font-bold hover:bg-brand-secondary/10 transition-all"
                >
                  Request Custom Order
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
