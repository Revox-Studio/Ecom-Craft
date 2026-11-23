import React from "react";
import Link from "next/link";
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

const categoryBanners: CategoryBanner[] = [
  {
    id: "cat-banner-1",
    brand: "WINTER CROCHET",
    brandSubtitle: "Cozy Woolen Collection",
    offer: "Order any Cozy Winter Beanie and choose a free handcrafted snowman keychain",
    buttonText: "View More",
    image: "/images/categories/winter-crochet.webp",
    bgTint: "bg-[#faf5f0]",
    link: "/products?category=Winter%20Crochet%20%26%20Snowmen"
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
    brand: "ROYAL BOUQUETS",
    brandSubtitle: "Everlasting Florals",
    offer: "Order any 2 everlasting rose or tulip bouquets and receive free luxury satin gift wrapping",
    buttonText: "View More",
    image: "/images/categories/crochet-bouquets.jpg",
    bgTint: "bg-[#f3f9f6]",
    link: "/products?category=Crochet%20Flower%20Bouquets",
  },
];

export default function CategorySection() {
  return (
    <section className="py-2" aria-label="Shop by Category">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
            Permanent Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight mt-0.5">
            Shop by Category
          </h2>
        </div>
        <Link
          href="/categories"
          className="text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors"
        >
          View All ({categoryBanners.length}) &rarr;
        </Link>
      </div>

      {/* 2x2 Grid of Split Category Banner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {categoryBanners.map((card) => (
          <div key={card.id} className="flex flex-col">
            {/* Split Banner Card */}
            <div className="group relative flex flex-col sm:flex-row items-stretch rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
              {/* Left Side: Brand/Category Name, Offer Description, Button */}
              <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <h3 className="font-brand font-black text-xl sm:text-2xl tracking-wider text-gray-900 uppercase">
                    {card.brand}
                  </h3>
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
    </section>
  );
}
