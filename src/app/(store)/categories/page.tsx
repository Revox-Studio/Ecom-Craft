import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryBanner {
  id: string;
  brand: string;
  brandSubtitle: string;
  offer: string;
  buttonText: string;
  image: string;
  bgTint: string;
  link: string;
}

const allCategories: CategoryBanner[] = [
  {
    id: "cat-banner-1",
    brand: "WINTER CROCHET",
    brandSubtitle: "Cozy Woolen Collection",
    offer: "Order any Cozy Winter Beanie and choose a free handcrafted snowman keychain",
    buttonText: "View More",
    image: "/images/categories/winter-crochet.webp",
    bgTint: "bg-[#faf5f0]",
    link: "/products?category=Winter%20Crochet%20%26%20Snowmen",
  },
  {
    id: "cat-banner-2",
    brand: "DEITY POSHAK",
    brandSubtitle: "Bal Gopal Atelier",
    offer: "Custom order any festive Deity Poshak and receive a matching pearl-beaded mukut free",
    buttonText: "View More",
    image: "/images/categories/deity-poshak.jpg",
    bgTint: "bg-[#f8f9fa]",
    link: "/products?category=Deity%20Poshak%20%26%20Dresses",
  },
  {
    id: "cat-banner-3",
    brand: "AMIGURUMI DOLLS",
    brandSubtitle: "Plush Handcrafted Friends",
    offer: "Spend ₹999 on Amigurumi dolls and receive a free pair of handcrafted mini tulip charms",
    buttonText: "View More",
    image: "/images/categories/amigurumi-dolls.jpg",
    bgTint: "bg-[#faf4f2]",
    link: "/products?category=Amigurumi%20%26%20Dolls",
  },
  {
    id: "cat-banner-4",
    brand: "KEYCHAINS & CHARMS",
    brandSubtitle: "Mini Knitted Accessories",
    offer: "Handmade mini floral keyrings, sunflowers, tulip bouquets, bunny charms, and bag pendants",
    buttonText: "View More",
    image: "/images/categories/crochet-keychains.jpg",
    bgTint: "bg-[#fef9ee]",
    link: "/products?category=Crochet%20Keychains%20%26%20Charms",
  },
  {
    id: "cat-banner-5",
    brand: "ROYAL BOUQUETS",
    brandSubtitle: "Everlasting Florals",
    offer: "Order any 2 everlasting rose or tulip bouquets and receive free luxury satin gift wrapping",
    buttonText: "View More",
    image: "/images/categories/crochet-bouquets.jpg",
    bgTint: "bg-[#f3f9f6]",
    link: "/products?category=Crochet%20Flower%20Bouquets",
  },
];

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Permanent Collections</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight">
          Shop by Category
        </h1>
        <p className="text-sm sm:text-base text-brand-dark/70 max-w-2xl leading-relaxed">
          Explore all 5 of our permanent handcrafted collections — from festive deity poshak and adorable amigurumi dolls to everlasting floral bouquets.
        </p>
      </div>

      {/* 5 Split Category Banner Cards (Matches Home Page Card Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {allCategories.map((card, idx) => (
          <div
            key={card.id}
            className={`flex flex-col ${
              idx === allCategories.length - 1
                ? "md:col-span-2 md:max-w-xl md:mx-auto w-full"
                : ""
            }`}
          >
            {/* Split Banner Card */}
            <div className="group relative flex flex-col sm:flex-row items-stretch rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 h-full">
              {/* Left Side: Brand/Category Name, Offer Description, Button */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <h2 className="font-brand font-black text-xl sm:text-2xl tracking-wider text-gray-900 uppercase">
                    {card.brand}
                  </h2>
                  {card.brandSubtitle && (
                    <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase block -mt-0.5 mb-2.5">
                      {card.brandSubtitle}
                    </span>
                  )}
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-[240px]">
                    {card.offer}
                  </p>
                </div>

                <div className="mt-6">
                  <Link href={card.link}>
                    <Button variant="default" size="sm">
                      {card.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Side: Product Photography on Tinted Canvas */}
              <div
                className={`w-full sm:w-[52%] aspect-[4/3] sm:aspect-auto relative overflow-hidden flex items-center justify-center p-3 sm:p-4 ${card.bgTint}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.brand}
                  className="h-full w-full object-cover sm:object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Commission Banner */}
      <div className="rounded-3xl bg-brand-dark text-white p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Bespoke Orders
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Looking for a custom size or specific piece?
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            Our artisans accept bespoke commissions for personalized amigurumi toys, tailored deity dresses, and unique floral combinations.
          </p>
        </div>
        <Link href="/contact">
          <Button variant="default" size="md" className="gap-2 shrink-0">
            <span>Contact Our Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
