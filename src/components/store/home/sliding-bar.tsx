import React from "react";
import { brandConfig } from "@/config/brand";

interface SlidingBarProps {
  text?: string;
  className?: string;
}

export default function SlidingBar({ text, className = "" }: SlidingBarProps) {
  const content = text || brandConfig.slidingBarText || brandConfig.tagline;

  // Repeat items 8 times per track to seamlessly cover standard, wide, and 4K displays
  const items = Array(8).fill(content);

  return (
    <section
      aria-label="Handcrafted Studio Announcement"
      className={`w-full overflow-hidden bg-brand-primary text-white py-2.5 sm:py-3 select-none shadow-xs transition-colors ${className}`}
    >
      <div className="flex w-max animate-slide-right-to-left">
        {/* Track 1 */}
        <div className="flex shrink-0 items-center">
          {items.map((phrase, idx) => (
            <div key={`track-1-${idx}`} className="flex items-center">
              <span className="text-sm sm:text-base font-semibold tracking-wider whitespace-nowrap px-6 sm:px-8 drop-shadow-xs">
                {phrase}
              </span>
              {/* White dot separator between texts */}
              <span
                className="inline-block h-2 w-2 rounded-full bg-white shrink-0 shadow-xs"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Track 2 (Identical mirror track for a 100% seamless infinite loop) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {items.map((phrase, idx) => (
            <div key={`track-2-${idx}`} className="flex items-center">
              <span className="text-sm sm:text-base font-semibold tracking-wider whitespace-nowrap px-6 sm:px-8 drop-shadow-xs">
                {phrase}
              </span>
              {/* White dot separator between texts */}
              <span
                className="inline-block h-2 w-2 rounded-full bg-white shrink-0 shadow-xs"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
