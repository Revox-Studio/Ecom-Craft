import React from "react";
import { brandConfig } from "@/config/brand";

export default function NoticeBar() {
  return (
    <aside
      aria-label="Announcement"
      className="w-full bg-brand-secondary text-white py-2 sm:py-2.5 px-4 shadow-sm transition-colors duration-300"
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center text-center">
        <p className="text-[11px] sm:text-xs font-semibold tracking-wide">
          Welcome to <span className="font-extrabold tracking-wider">{brandConfig.name}</span>! This winter, get up to 25% off on a minimum order of ₹499.
        </p>
      </div>
    </aside>
  );
}
