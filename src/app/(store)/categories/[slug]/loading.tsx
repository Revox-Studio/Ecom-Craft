import React from "react";

export default function CategoryDetailLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-48 rounded bg-gray-200" />

      {/* Banner Skeleton */}
      <div className="rounded-3xl bg-gray-100 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-3 w-full md:w-1/2">
          <div className="h-4 w-32 rounded-full bg-brand-primary/20" />
          <div className="h-8 w-64 rounded-xl bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-150" />
          <div className="h-4 w-3/4 rounded bg-gray-150" />
        </div>
        <div className="w-40 h-40 rounded-2xl bg-gray-200 shrink-0 animate-shimmer" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-100 bg-white p-3 space-y-3"
          >
            <div className="aspect-square rounded-xl bg-gray-100 animate-shimmer" />
            <div className="h-5 w-3/4 mx-auto rounded bg-gray-200" />
            <div className="h-4 w-1/2 mx-auto rounded bg-brand-primary/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
