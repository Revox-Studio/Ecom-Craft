import Link from "next/link";
import { Product } from "@/types/product";

interface ProductCardProps {
  product?: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const item: Product = product || {
    id: "sample-1",
    name: "Cozy Snowman Wool Beanie",
    slug: "cozy-snowman-wool-beanie",
    description: "Handcrafted winter crochet beanie",
    category: "Winter Crochet",
    images: ["/images/categories/winter-crochet.webp"],
    price: "₹599",
    originalPrice: "₹799",
    rating: 4.9,
    reviewCount: 38,
  };

  const price = item.price || "₹599";
  const originalPrice = item.originalPrice || "₹799";
  const rating = item.rating || 4.9;
  const reviewCount = item.reviewCount || 28;

  return (
    <Link
      href={`/products/${item.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-3.5 sm:p-4 shadow-xs hover:border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div>
        {/* Top Row: Left side Category Badge | Right side Nothing */}
        <div className="flex items-center justify-between mb-1.5">
          {/* Top Left: Category Badge */}
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-brand-primary">
            <span>🏷️</span>
            <span className="line-clamp-1">{item.category}</span>
          </span>

          {/* Top Right: Nothing */}
          <div aria-hidden="true" />
        </div>

        {/* Center: Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50/70 p-3 flex items-center justify-center my-2">
          {item.images && item.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.images[0]}
              alt={item.name}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="text-4xl transition-transform duration-300 group-hover:scale-110">
              🧶
            </span>
          )}
        </div>

        {/* Middle Info (Centered) */}
        <div className="text-center pt-2 px-1">
          {/* Product Name */}
          <h3 className="font-heading font-bold text-sm sm:text-[15px] text-gray-900 line-clamp-1 group-hover:text-brand-primary transition-colors">
            {item.name}
          </h3>

          {/* Subtitle / Short Description */}
          <p className="mt-0.5 text-xs text-gray-400 line-clamp-1">
            {item.description}
          </p>

          {/* Price (Sale Price + Strike-through Original Price) */}
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="font-bold text-sm sm:text-base text-gray-900">
              {price}
            </span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Replaces 2 Buttons with Star Review Rating */}
      <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5">
        {/* 5 Golden Stars */}
        <div className="flex items-center text-amber-400 gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="h-3.5 w-3.5 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Rating Score */}
        <span className="text-xs font-bold text-gray-800">
          {typeof rating === "number" ? rating.toFixed(1) : rating}
        </span>
      </div>
    </Link>
  );
}
