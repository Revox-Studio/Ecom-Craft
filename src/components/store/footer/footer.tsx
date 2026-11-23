import Link from "next/link";
import BrandLogo from "@/components/ui/brand-logo";
import { brandConfig } from "@/config/brand";

export default function StoreFooter() {
  return (
    <footer className="border-t border-white/10 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Info & Direct Contact */}
          <div className="space-y-4">
            <BrandLogo theme="dark" size="md" />
            <p className="text-xs text-white/70 leading-relaxed">
              {brandConfig.description}
            </p>
            <div className="space-y-1.5 text-xs text-white/70">
              <p>
                <span className="font-semibold text-white/90">Phone:</span>{" "}
                <a
                  href={`tel:${brandConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-brand-primary transition-colors"
                >
                  {brandConfig.contact.phone}
                </a>
              </p>
              <p>
                <span className="font-semibold text-white/90">Email:</span>{" "}
                <a
                  href={`mailto:${brandConfig.contact.email}`}
                  className="hover:text-brand-primary transition-colors"
                >
                  {brandConfig.contact.email}
                </a>
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={brandConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-brand-primary hover:text-white transition-all"
                title="Follow on Instagram"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={brandConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-brand-primary hover:text-white transition-all"
                title="Follow on Facebook"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={brandConfig.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-brand-primary hover:text-white transition-all"
                title="Watch on YouTube"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links / Explore */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/" className="hover:text-brand-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-brand-primary transition-colors">
                  Craft Categories
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-brand-primary transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-primary transition-colors">
                  About Our Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care / Studio Contact */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/contact" className="hover:text-brand-primary transition-colors">
                  Direct Studio Inquiry
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-primary transition-colors">
                  Custom Orders & Gifting
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-primary transition-colors">
                  Crafting Process
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-brand-primary transition-colors">
                  Studio Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Policies (Nav links to policies - displays Not Found until implemented) */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Store Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-brand-primary transition-colors">
                  Return & Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-brand-primary transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Clean real brand copyright */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} {brandConfig.name}. All rights reserved.
          </p>
          <p className="text-white/40">
            Handcrafted with love & attention to every stitch.
          </p>
        </div>
      </div>
    </footer>
  );
}
