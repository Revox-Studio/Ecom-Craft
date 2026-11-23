import React from "react";
import Image from "next/image";
import { brandConfig } from "@/config/brand";

interface BrandLogoProps {
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  showSymbol?: boolean;
  showPip?: boolean;
  className?: string;
}

export default function BrandLogo({
  theme = "light",
  size = "lg",
  showSymbol = false,
  showPip = false,
  className = "",
}: BrandLogoProps) {
  const { name, logo } = brandConfig;

  const textSizes = {
    sm: "text-lg sm:text-xl",
    md: "text-2xl sm:text-3xl",
    lg: "text-2.5xl sm:text-3xl lg:text-[34px]",
    xl: "text-4xl sm:text-5xl",
  }[size];

  if (logo.image) {
    return (
      <div className={`relative flex items-center ${className}`}>
        <Image
          src={logo.image}
          alt={`${name} Logo`}
          width={logo.width || 140}
          height={logo.height || 40}
          className="object-contain"
          priority
        />
      </div>
    );
  }

  const isDarkTheme = theme === "dark";

  return (
    <div className={`flex items-center select-none font-brand font-black tracking-[0.06em] uppercase ${textSizes} ${className}`}>
      {showPip && (
        <span className="h-2.5 w-2.5 rounded-full bg-brand-primary mr-2 flex-shrink-0 animate-pulse" />
      )}
      <span
        className={
          isDarkTheme
            ? "text-white tracking-[0.06em]"
            : "text-brand-primary tracking-[0.06em] drop-shadow-[0_1px_2px_rgba(217,3,104,0.15)] transition-colors"
        }
      >
        {name}
      </span>
      {showSymbol && logo.symbol && (
        <span className="text-base sm:text-lg ml-1.5 normal-case font-normal" title={name}>
          {logo.symbol}
        </span>
      )}
    </div>
  );
}
