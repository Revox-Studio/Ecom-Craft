import React from "react";

export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-28 bg-brand-primary/15 rounded-full" />
        <div className="h-8 w-64 bg-gray-200 rounded-xl" />
        <div className="h-4 w-80 bg-gray-100 rounded-lg" />
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="flex flex-wrap gap-2 border-b border-brand-plum/10 pb-4">
        {[80, 110, 130, 95, 120, 100].map((width, idx) => (
          <div
            key={idx}
            className="h-8 rounded-full bg-gray-100 animate-shimmer"
            style={{ width: `${width}px` }}
          />
        ))}
      </div>

      {/* Product Cards Grid Skeleton (6 cards) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-xs"
          >
            {/* Image Placeholder with Category Badge Skeleton */}
            <div className="relative aspect-square w-full rounded-xl bg-gray-100 overflow-hidden animate-shimmer">
              <div className="absolute top-3 left-3 h-5 w-20 rounded-full bg-white/70" />
            </div>

            {/* Product Info Skeletons */}
            <div className="flex flex-col flex-1 p-3 pt-4 text-center space-y-3">
              {/* Title Skeleton */}
              <div className="h-5 w-3/4 mx-auto rounded-lg bg-gray-200 animate-shimmer" />

              {/* Price Skeleton */}
              <div className="flex items-center justify-center gap-2">
                <div className="h-5 w-16 rounded-md bg-brand-primary/20 animate-shimmer" />
                <div className="h-4 w-12 rounded-md bg-gray-150 animate-shimmer" />
              </div>

              {/* 5 Stars Rating Skeleton */}
              <div className="pt-2 flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="h-3.5 w-3.5 rounded-full bg-amber-100" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
