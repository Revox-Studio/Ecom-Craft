import React from "react";
import { brandConfig } from "@/config/brand";

export default function RootLoading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center px-4 py-16">
      <div className="relative flex flex-col items-center text-center max-w-sm space-y-6">
        
        {/* Soft Ambient Glow */}
        <div className="absolute -top-10 w-36 h-36 bg-brand-primary/15 rounded-full blur-2xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-6 w-32 h-32 bg-brand-secondary/15 rounded-full blur-2xl pointer-events-none animate-pulse delay-500" />

        {/* Artisan Spinning Rings */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Track Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-primary/10" />

          {/* Primary Spinning Arc */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-primary border-r-brand-primary animate-spin" />

          {/* Secondary Spinning Arc (Reverse) */}
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-brand-secondary border-l-brand-secondary animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.6s" }}
          />

          {/* Inner Yarn Center Icon */}
          <div className="relative text-2xl transform scale-100 hover:scale-110 transition-transform select-none animate-pulse">
            🧶
          </div>
        </div>

        {/* Brand Text & Status */}
        <div className="space-y-1.5 relative z-10">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-brand-primary">
            {brandConfig.name}
          </p>
          <h2 className="text-sm font-semibold text-brand-dark/80">
            Weaving Handcrafted Wonders
          </h2>
          <div className="flex justify-center items-center gap-1.5 pt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-ping delay-150" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping delay-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
