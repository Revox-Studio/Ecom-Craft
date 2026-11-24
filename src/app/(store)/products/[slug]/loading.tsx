import React from "react";

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl animate-pulse space-y-6">
      {/* Back Link Skeleton */}
      <div className="h-4 w-36 rounded-md bg-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Media Showcase Skeleton */}
        <div className="relative aspect-square rounded-2xl bg-gray-100 overflow-hidden animate-shimmer border border-gray-100 flex items-center justify-center">
          <div className="text-4xl opacity-20">🧶</div>
          <div className="absolute top-4 left-4 h-6 w-24 rounded-full bg-white/80" />
        </div>

        {/* Details Column Skeleton */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="h-4 w-28 rounded-full bg-brand-primary/20" />
            <div className="h-9 w-4/5 rounded-xl bg-gray-200 animate-shimmer" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full rounded-md bg-gray-100" />
              <div className="h-4 w-5/6 rounded-md bg-gray-100" />
              <div className="h-4 w-2/3 rounded-md bg-gray-100" />
            </div>

            {/* Spec Box Skeleton */}
            <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-3">
              <div className="h-4 w-32 rounded-md bg-gray-200" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-3.5 w-24 rounded bg-gray-100" />
                <div className="h-3.5 w-20 rounded bg-gray-100" />
                <div className="h-3.5 w-28 rounded bg-gray-100" />
                <div className="h-3.5 w-16 rounded bg-gray-100" />
              </div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex gap-2 pt-2">
              <div className="h-5 w-16 rounded-full bg-gray-100" />
              <div className="h-5 w-20 rounded-full bg-gray-100" />
              <div className="h-5 w-14 rounded-full bg-gray-100" />
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="space-y-3 border-t border-gray-100 pt-6">
            <div className="h-3 w-48 rounded bg-gray-150" />
            <div className="h-11 w-full rounded-xl bg-brand-primary/30 animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}
