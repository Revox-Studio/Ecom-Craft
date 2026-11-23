import type { Metadata } from "next";
import { brandConfig } from "@/config/brand";
// @ts-ignore Next.js handles global CSS imports during compilation.
import "./globals.css";

export const metadata: Metadata = {
  title: `${brandConfig.name} - Handcrafted Wool & Crochet Creations`,
  description: brandConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
