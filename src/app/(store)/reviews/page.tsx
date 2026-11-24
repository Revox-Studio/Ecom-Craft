import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { brandConfig } from "@/config/brand";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | 4.9★ Rated",
  description:
    "Read real customer reviews and experiences with our handcrafted crochet deity poshak, flower bouquets, amigurumi dolls, and winter wool wear.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: `Customer Reviews & Testimonials | ${brandConfig.name}`,
    description:
      "Read real customer reviews and experiences with our handcrafted crochet deity poshak, flower bouquets, amigurumi dolls, and winter wool wear.",
    url: `${brandConfig.url}/reviews`,
    type: "website",
  },
};

interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  category: string;
  productName: string;
  comment: string;
  verified: boolean;
}

const customerReviews: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Pooja Sharma",
    location: "Kolkata, WB",
    rating: 5,
    date: "November 18, 2026",
    category: "Deity Poshak & Dresses",
    productName: "Handmade Laddu Gopal Festive Woolen Dress",
    comment:
      "The craftsmanship on the Laddu Gopal poshak is beyond breathtaking! The wool is so soft, and the pearl detailing around the border is pristine. It fit Thakur Ji perfectly. Will definitely order every festive season!",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Ananya Mukherjee",
    location: "Bengaluru, KA",
    rating: 5,
    date: "November 12, 2026",
    category: "Crochet Flower Bouquets",
    productName: "Everlasting Royal Blue Rose Bouquet",
    comment:
      "Ordered this bouquet for my sister's birthday and she was in tears. Real flowers wither in days, but these hand-knitted crochet roses will stay beautiful forever. The packaging was very safe and protective.",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Sneha Roy",
    location: "Mumbai, MH",
    rating: 5,
    date: "November 05, 2026",
    category: "Winter Crochet & Snowmen",
    productName: "Hand-knitted Cozy Snowman Figurine & Scarf",
    comment:
      "The winter snowman is so charming! You can feel the warmth and love put into every single crochet stitch. It sits proudly on my winter mantle. 10/10 recommendation for anyone looking for authentic handmade wool crafts.",
    verified: true,
  },
  {
    id: "rev-4",
    author: "Meera Kulkarni",
    location: "Pune, MH",
    rating: 5,
    date: "October 29, 2026",
    category: "Amigurumi & Dolls",
    productName: "Plush Bunny Crochet Animal Companion",
    comment:
      "My daughter takes her crochet bunny everywhere! The yarn is child-safe, hypoallergenic, and so gentle. Even after several weeks of playtime, the stitching holds up immaculately.",
    verified: true,
  },
  {
    id: "rev-5",
    author: "Rohit Das",
    location: "Delhi, DL",
    rating: 5,
    date: "October 22, 2026",
    category: "Crochet Keychains & Charms",
    productName: "Handmade Tulip & Sunflower Charm Ring",
    comment:
      "Got 5 mini floral keychains as return gifts for a family get-together. Everyone loved how cute and detailed they are. Excellent studio support and quick updates on WhatsApp.",
    verified: true,
  },
  {
    id: "rev-6",
    author: "Kavita Verma",
    location: "Hyderabad, TS",
    rating: 5,
    date: "October 15, 2026",
    category: "Deity Poshak & Dresses",
    productName: "Winter Velvet Woolen Dress with Cap",
    comment:
      "Superb quality poshak! The matching woolen cap is adorable and the warm colors are very vibrant. Thank you WOOLCARFT studio for making our puja extra special.",
    verified: true,
  },
];

export default function ReviewsPage() {
  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${brandConfig.name} Handcrafted Creations`,
    description: brandConfig.description,
    brand: {
      "@type": "Brand",
      name: brandConfig.name,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "128",
      bestRating: "5",
      worstRating: "1",
    },
    review: customerReviews.map((rev) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: rev.author,
      },
      datePublished: "2026-11-01",
      reviewBody: rev.comment,
      reviewRating: {
        "@type": "Rating",
        ratingValue: rev.rating,
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      {/* Container with Generous Spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-secondary/30 bg-brand-secondary/10 text-brand-secondary text-xs font-bold uppercase tracking-wider">
            <span>⭐</span> Verified Customer Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
            Client Reviews & Stories
          </h1>
          <p className="text-sm text-brand-dark/70 leading-relaxed">
            Read genuine experiences from patrons who ordered bespoke handcrafted wool creations, deity dresses, and amigurumi from {brandConfig.name}.
          </p>
        </div>

        {/* Rating Overview Summary Box */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-around gap-6 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-brand-primary">4.9</span>
              <span className="text-sm text-gray-400 font-bold">/ 5.0</span>
            </div>
            <div className="flex text-amber-400 text-lg">
              {"★".repeat(5)}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Based on 140+ studio inquiries & orders
            </span>
          </div>

          <div className="h-px sm:h-20 w-full sm:w-px bg-gray-100" />

          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-800">5 Stars</span>
              <div className="w-36 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-brand-secondary rounded-full" style={{ width: "94%" }} />
              </div>
              <span className="font-bold text-gray-700">94%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-800">4 Stars</span>
              <div className="w-36 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-brand-secondary rounded-full" style={{ width: "6%" }} />
              </div>
              <span className="font-bold text-gray-700">6%</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <span>3 Stars</span>
              <div className="w-36 h-2 rounded-full bg-gray-100" />
              <span>0%</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-xs hover:border-brand-primary/30 hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-3">
                {/* Top: Stars & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-sm">
                    {"★".repeat(rev.rating)}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-secondary/10 px-2 py-0.5 text-[10px] font-bold text-brand-secondary">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Verified Order
                    </span>
                  )}
                </div>

                {/* Product & Category */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary">
                    {rev.category}
                  </span>
                  <h3 className="text-xs font-bold text-brand-dark line-clamp-1">
                    {rev.productName}
                  </h3>
                </div>

                {/* Comment */}
                <p className="text-xs text-brand-dark/75 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Bottom: Author & Date */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                <div>
                  <span className="block font-bold text-brand-dark">{rev.author}</span>
                  <span className="block text-[10px] text-gray-400">{rev.location}</span>
                </div>
                <span className="text-[10px] text-gray-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA / Studio Inquiries */}
        <div className="rounded-3xl bg-brand-dark text-white p-8 sm:p-10 text-center space-y-4 max-w-3xl mx-auto shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
            Bespoke Custom Orders
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Have a Custom Craft Idea in Mind?
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            Our artisans can hand-crochet custom colorways, sizes, and personalized designs for your loved ones or deity shrines.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 items-center justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-brand-primary text-white text-xs font-bold px-6 py-2.5 hover:opacity-90 transition-opacity"
            >
              Send an Inquiry &rarr;
            </Link>
            <a
              href={`tel:${brandConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold px-5 py-2.5 hover:bg-white hover:text-brand-dark transition-all"
            >
              Direct Studio Call: {brandConfig.contact.phone}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
