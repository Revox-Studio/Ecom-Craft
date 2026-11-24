/**
 * Client-safe image URL helpers (no AWS SDK dependency)
 */

export const BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME || "ecom-products";

/**
 * Helper to extract S3 key from full URL, proxy URL, or key string
 */
export function extractS3Key(urlOrKey: string, bucket = BUCKET_NAME): string | null {
  if (!urlOrKey || typeof urlOrKey !== "string") return null;

  const trimmed = urlOrKey.trim();

  // If internal proxy image URL e.g. /api/images/products/...
  if (trimmed.startsWith("/api/images/")) {
    return trimmed.replace(/^\/api\/images\//, "");
  }

  // If local static asset, do not treat as S3 object
  if (trimmed.startsWith("/") && !trimmed.startsWith(`/${bucket}/`)) {
    return null;
  }

  // If already starts with products/
  if (trimmed.startsWith("products/")) {
    return trimmed;
  }

  // Check if URL contains /<bucket>/
  const bucketSubstr = `/${bucket}/`;
  if (trimmed.includes(bucketSubstr)) {
    const keyPart = trimmed.split(bucketSubstr)[1];
    return keyPart ? decodeURIComponent(keyPart.split("?")[0]) : null;
  }

  // Regex fallback: find products/<filename>
  const match = trimmed.match(/(products\/[^?#]+)/);
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  return null;
}

/**
 * Converts any S3 direct URL or raw key to a working public proxy URL
 */
export function getPublicImageUrl(urlOrKey?: string | null): string {
  if (!urlOrKey || typeof urlOrKey !== "string") {
    return "/images/categories/winter-crochet.webp";
  }
  const trimmed = urlOrKey.trim();
  if (!trimmed) {
    return "/images/categories/winter-crochet.webp";
  }
  if (trimmed.startsWith("/api/images/")) {
    return trimmed;
  }
  // Local static asset
  if (trimmed.startsWith("/") && !trimmed.includes("/ecom-products/")) {
    return trimmed;
  }

  const key = extractS3Key(trimmed);
  if (key) {
    return `/api/images/${key}`;
  }
  return trimmed;
}
