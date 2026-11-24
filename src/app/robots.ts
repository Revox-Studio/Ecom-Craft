import { MetadataRoute } from "next";
import { brandConfig } from "@/config/brand";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = brandConfig.url || "https://crochetcradle.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
