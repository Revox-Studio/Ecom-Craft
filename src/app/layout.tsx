import type { Metadata, Viewport } from "next";
import { brandConfig } from "@/config/brand";
// @ts-ignore Next.js handles global CSS imports during compilation.
import "./globals.css";

const siteUrl = brandConfig.url || "https://crochetcradle.in";

export const viewport: Viewport = {
  themeColor: "#d90368",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brandConfig.name.toUpperCase()} | Handcrafted Wool & Crochet Creations`,
    template: `%s | ${brandConfig.name.toUpperCase()}`,
  },
  description: brandConfig.description,
  keywords: brandConfig.keywords,
  authors: [{ name: brandConfig.name }],
  creator: brandConfig.name,
  publisher: brandConfig.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: brandConfig.name,
    title: `${brandConfig.name.toUpperCase()} | Handcrafted Wool & Crochet Creations`,
    description: brandConfig.description,
    images: [
      {
        url: "/images/categories/winter-crochet.webp",
        width: 1200,
        height: 630,
        alt: `${brandConfig.name} - Handcrafted Wool & Crochet Creations`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brandConfig.name.toUpperCase()} | Handcrafted Wool & Crochet Creations`,
    description: brandConfig.description,
    images: ["/images/categories/winter-crochet.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD schema for Google Search & rich snippets
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: brandConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/images/categories/winter-crochet.webp`,
    description: brandConfig.description,
    telephone: brandConfig.contact.phone,
    email: brandConfig.contact.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      streetAddress: brandConfig.contact.address,
    },
    sameAs: [
      brandConfig.socialLinks.instagram,
      brandConfig.socialLinks.facebook,
      brandConfig.socialLinks.youtube,
    ].filter(Boolean),
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
