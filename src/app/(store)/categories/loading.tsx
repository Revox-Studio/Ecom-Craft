import React from "react";

export default function CategoriesLoading() {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 animate-pulse">
        {/* Header Skeleton */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-5 w-36 mx-auto rounded-full bg-brand-primary/15" />
          <div className="h-9 w-64 mx-auto rounded-xl bg-gray-200" />
          <div className="h-4 w-96 mx-auto rounded-lg bg-gray-100" />
        </div>

        {/* Categories Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-gray-150 bg-white overflow-hidden p-3 space-y-3"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl bg-gray-100 overflow-hidden animate-shimmer" />
              <div className="p-2 space-y-2">
                <div className="h-5 w-3/4 rounded-lg bg-gray-200" />
                <div className="h-3.5 w-full rounded-md bg-gray-100" />
                <div className="h-3.5 w-2/3 rounded-md bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
