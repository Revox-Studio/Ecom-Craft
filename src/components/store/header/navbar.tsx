"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/ui/brand-logo";
import { brandConfig } from "@/config/brand";

/**
 * Clean SVG icons for store navigation links
 */
const navIcons: Record<string, React.ReactNode> = {
  "/": (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  "/categories": (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  "/products": (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  "/reviews": (
    <svg className="h-4 w-4 flex-shrink-0 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  "/about": (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  "/contact": (
    <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
};

export default function StoreNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white transition-all">
      {/* =========================================================================
       * ROW 1: Centered Brand Name | Right: Category & Review Nav + Phone & Socials
       * ========================================================================= */}
      <div className="w-full border-b border-gray-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-4">
          
         {/* Category & Review Nav Links (Only these two, clean with no active underline needed) */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-bold text-gray-700 hover:text-brand-primary rounded-full hover:bg-gray-50 transition-colors"
              title="Browse Categories"
            >
              <svg className="h-3.5 w-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
              <span>Categories</span>
            </Link>

            <Link
              href="/reviews"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-bold text-gray-700 hover:text-brand-primary rounded-full hover:bg-gray-50 transition-colors"
              title="Client Reviews & Testimonials"
            >
              <svg className="h-3.5 w-3.5 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>Reviews</span>
            </Link>
          </div>

          {/* Center: Brand Name (WOOLCARFT) */}
          <div className="flex items-center justify-center mx-auto">
            <Link
              href="/"
              className="group flex items-center hover:opacity-95 active:scale-[0.99] transition-all"
              title={`${brandConfig.name} - Home`}
            >
              <BrandLogo
                theme="light"
                size="lg"
                showSymbol={false}
                showPip={false}
                className="tracking-[0.08em]"
              />
            </Link>
          </div>

          {/* Right Section: Category & Review Nav Links + Phone + Social Media */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 flex-shrink-0">

            {/* Phone Number Pill Button */}
            <a
              href={`tel:${brandConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-2 rounded-full border border-gray-200 bg-white hover:border-brand-primary hover:bg-brand-primary text-gray-700 hover:text-white px-3 sm:px-3.5 py-1.5 transition-all duration-200 group shadow-xs"
              title={`Call ${brandConfig.contact.phone}`}
            >
              {/* Phone Icon */}
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-700 group-hover:bg-white/20 group-hover:text-white transition-colors flex-shrink-0">
                <svg
                  className="h-3 w-3 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
                </svg>
              </div>

              {/* Phone Number Only */}
              <span className="text-xs sm:text-[13px] font-bold tracking-wide font-heading text-gray-800 group-hover:text-white whitespace-nowrap transition-colors">
                {brandConfig.contact.phone}
              </span>
            </a>

            {/* Social Media Circular Buttons (Facebook, Instagram, YouTube) */}
            <div className="hidden sm:flex items-center gap-1.5 border-l border-gray-200 pl-2.5 sm:pl-3">
              {/* Facebook */}
              <a
                href={brandConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-brand-primary hover:bg-brand-primary hover:text-white hover:scale-105 active:scale-95 transition-all shadow-xs"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={brandConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-brand-primary hover:bg-brand-primary hover:text-white hover:scale-105 active:scale-95 transition-all shadow-xs"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={brandConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:border-brand-primary hover:bg-brand-primary hover:text-white hover:scale-105 active:scale-95 transition-all shadow-xs"
                title="YouTube"
                aria-label="YouTube"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary transition-colors"
              aria-label="Toggle navigation menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
       * ROW 2: All Nav Links CENTERED with Underline Active Indicator
       * (Font color + Underline bar for active tab - No solid background)
       * ========================================================================= */}
      <div className="hidden md:block w-full bg-white border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Main Navigation"
            className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-8"
          >
            {brandConfig.navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group relative inline-flex items-center gap-2 py-3 px-3.5 sm:px-4 text-xs sm:text-[13px] font-bold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-brand-primary font-black"
                      : "text-gray-600 hover:text-brand-primary"
                  }`}
                >
                  <span
                    className={
                      isActive
                        ? "text-brand-primary transition-colors"
                        : "text-gray-400 group-hover:text-brand-primary transition-colors"
                    }
                  >
                    {navIcons[link.href]}
                  </span>
                  <span>{link.label}</span>

                  {/* Active Underline Bar */}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2.5px] rounded-full bg-brand-primary transition-all duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* =========================================================================
       * MOBILE NAVIGATION DRAWER
       * ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 bg-white px-4 py-4 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {brandConfig.navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? "text-brand-primary font-black bg-brand-primary/[0.06] border-l-4 border-brand-primary"
                      : "text-gray-700 hover:bg-gray-50 hover:text-brand-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-brand-primary" : "text-gray-400 group-hover:text-brand-primary transition-colors"}>
                      {navIcons[link.href]}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                  )}
                </Link>
              );
            })}

            {/* Mobile Review Link */}
            <Link
              href="/reviews"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`group flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                pathname === "/reviews"
                  ? "text-brand-primary font-black bg-brand-primary/[0.06] border-l-4 border-brand-primary"
                  : "text-gray-700 hover:bg-gray-50 hover:text-brand-primary"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-amber-400">
                  {navIcons["/reviews"]}
                </span>
                <span>Reviews</span>
              </div>
            </Link>
          </nav>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <a
              href={`tel:${brandConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="font-bold text-gray-800 hover:text-brand-primary transition-colors flex items-center gap-2"
            >
              <svg className="h-3.5 w-3.5 fill-brand-primary" viewBox="0 0 24 24">
                <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z" />
              </svg>
              <span>{brandConfig.contact.phone}</span>
            </a>
            
            <div className="flex items-center gap-2">
              <a
                href={brandConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-brand-primary hover:text-white transition-colors"
                title="Facebook"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={brandConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-brand-primary hover:text-white transition-colors"
                title="Instagram"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={brandConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-brand-primary hover:text-white transition-colors"
                title="YouTube"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
