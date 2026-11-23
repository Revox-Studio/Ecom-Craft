import Link from "next/link";
import NoticeBar from "@/components/store/header/notice-bar";
import StoreNavbar from "@/components/store/header/navbar";
import StoreFooter from "@/components/store/footer/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50/60 text-gray-800">
      <NoticeBar />
      <StoreNavbar />

      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
        <div className="w-full max-w-lg text-center bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50">
          {/* Subtle Craft/Yarn Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary text-3xl">
            🧶
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-secondary/10 px-3.5 py-1 text-xs font-bold text-brand-secondary uppercase tracking-wider mb-3">
            404 • Page Not Found
          </div>

          <h1 className="font-brand text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-3">
            Page Under Preparation
          </h1>

          <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto mb-8">
            The page or policy document you are looking for is currently being crafted and will be published soon. In the meantime, feel free to explore our handcrafted wool & crochet collections.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-primary/20 hover:opacity-95 active:scale-95 transition-all"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Return to Home
            </Link>

            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-brand-secondary px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-secondary/20 hover:opacity-95 active:scale-95 transition-all"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Explore Products
            </Link>
          </div>
        </div>
      </main>

      <StoreFooter />
    </div>
  );
}
