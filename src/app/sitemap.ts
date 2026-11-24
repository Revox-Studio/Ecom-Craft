import { MetadataRoute } from "next";
import { brandConfig } from "@/config/brand";
import { productService, fallbackProducts } from "@/services/product.service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = brandConfig.url || "https://crochetcradle.in";
  const now = new Date();

  // Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Category Dynamic Routes
  const categoryRoutes: MetadataRoute.Sitemap = brandConfig.categories.map(
    (cat) => ({
      url: `${baseUrl}/categories/${cat.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  // Product Dynamic Routes
  let products = await productService.getAll();
  if (!products || products.length === 0) {
    products = fallbackProducts;
  }

  const productRoutes: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: prod.updatedAt ? new Date(prod.updatedAt) : now,
    changeFrequency: "daily",
    priority: 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
