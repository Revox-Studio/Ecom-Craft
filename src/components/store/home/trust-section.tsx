import React from "react";

export default function TrustSection() {
  return (
    <section
      aria-label="Why Trust Us"
      className="border-y border-gray-100 py-8 sm:py-10 my-2"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 text-center">
        {/* 1. Very Good Quality */}
        <div className="flex flex-col items-center px-4">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              <path d="m9 8 2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-gray-900">
            Very Good Quality
          </h3>
          <p className="mt-1 text-xs text-gray-500 max-w-xs leading-relaxed">
            100% handcrafted with premium, ultra-soft wool.
          </p>
        </div>

        {/* 2. On-Time Delivery Promise */}
        <div className="flex flex-col items-center px-4 sm:border-x sm:border-gray-100">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-secondary">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-gray-900">
            On-Time Delivery Promise
          </h3>
          <p className="mt-1 text-xs text-gray-500 max-w-xs leading-relaxed">
            Dispatched promptly on schedule for your special dates.
          </p>
        </div>

        {/* 3. Pan-India Delivery */}
        <div className="flex flex-col items-center px-4">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="3" width="15" height="13" rx="1.5" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-gray-900">
            Pan-India Delivery
          </h3>
          <p className="mt-1 text-xs text-gray-500 max-w-xs leading-relaxed">
            Safe, protective doorstep delivery across all Indian pin codes.
          </p>
        </div>
      </div>
    </section>
  );
}
