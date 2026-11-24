/**
 * ==============================================================================
 * BRAND CONFIGURATION FILE - WOOLCARFT
 * ==============================================================================
 * Central configuration for brand name, contact, social media, colors, and
 * pre-made fixed categories. Edit here to update across the entire app.
 */

export const brandConfig = {
  // Brand Name (Rendered as text with no icon in Navbar)
  name: "crochet cradle",

  // Canonical Site URL
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://crochetcradle.in",

  // Short Tagline / Slogan
  tagline: "Handcrafted Artisan Wool & Crochet Creations",

  // SEO Keywords
  keywords: [
    "crochet cradle",
    "crochet",
    "handcrafted crochet",
    "deity poshak",
    "laddu gopal dress",
    "laddu gopal woolen poshak",
    "amigurumi dolls",
    "crochet toys",
    "crochet flower bouquets",
    "forever flowers",
    "crochet keychains",
    "winter crochet",
    "wool crafts",
    "handmade gifts India",
  ],

  // Full-width Sliding Bar Text (Sliding left-to-right below Hero section)
  slidingBarText:
    "100% Handcrafted Artisan Wool & Crochet Creations",

  // Site Description
  description:
    "Explore our curated collection of premium handcrafted crochet toys, deity poshak, flower bouquets, amigurumi dolls, and artisanal wool crafts.",

  // Trust Us / Brand Promises (3 Core Pillars)
  trustPillars: [
    {
      id: "quality",
      title: "Very Good Quality",
      tagline: "100% Handcrafted",
      description:
        "Every creation is lovingly hand-knitted with ultra-soft, export-grade wool yarns. Flawless stitch precision and long-lasting durability you can trust.",
      badge: "Premium Soft Wool",
    },
    {
      id: "delivery-promise",
      title: "On-Time Delivery Promise",
      tagline: "Scheduled Dispatches",
      description:
        "We respect your special celebrations and pooja dates. Every custom order is crafted promptly and dispatched strictly on schedule to arrive on time.",
      badge: "Punctual Delivery",
    },
    {
      id: "pan-india",
      title: "Pan-India Delivery",
      tagline: "All Pin Codes Covered",
      description:
        "Reliable doorstep delivery reaching every state and town across India. Carefully boxed in multi-layer protective packaging for safe arrival.",
      badge: "Safe Doorstep Transit",
    },
  ],

  // Logo Configuration
  logo: {
    image: null as string | null, // e.g. "/images/logo.png" when ready
    symbol: "🧶",
    width: 140,
    height: 40,
  },

  // Contact Details & Phone Support
  contact: {
    phone: "+91 62960 02276",
    email: "rohansaha636@gmail.com",
    address: "Studio Workshop, Craft District",
  },

  // Social Media Links (Facebook, Instagram, YouTube)
  socialLinks: {
    facebook: "https://www.facebook.com/share/1Kc3TTCPGB/",
    instagram: "https://www.instagram.com/crochetcradle.in?bqrl=dGxpY3F2bWd0ZG90",
    youtube: "https://youtube.com/",
  },

  // Pre-made Fixed Categories with actual uploaded images
  categories: [
    {
      id: "cat-1",
      name: "Winter Crochet & Snowmen",
      slug: "winter-crochet",
      image: "/images/categories/winter-crochet.webp",
      description: "Cozy handcrafted winter beanies, warm scarves, and adorable crochet snowmen collection.",
    },
    {
      id: "cat-2",
      name: "Deity Poshak & Dresses",
      slug: "deity-poshak",
      image: "/images/categories/deity-poshak.jpg",
      description: "Bespoke handcrafted Laddu Gopal woolen dresses, festive poshak, and pearl-beaded accessories.",
    },
    {
      id: "cat-3",
      name: "Amigurumi & Dolls",
      slug: "amigurumi-dolls",
      image: "/images/categories/amigurumi-dolls.jpg",
      description: "Cute collectible crochet character dolls, hooded animal companions, and plush handcrafted friends.",
    },
    {
      id: "cat-4",
      name: "Crochet Keychains & Charms",
      slug: "crochet-keychains",
      image: "/images/categories/crochet-keychains.jpg",
      description: "Handmade mini floral keyrings, sunflowers, tulip bouquets, bunny charms, and bag pendants.",
    },
    {
      id: "cat-5",
      name: "Crochet Flower Bouquets",
      slug: "crochet-bouquets",
      image: "/images/categories/crochet-bouquets.jpg",
      description: "Everlasting hand-knitted floral bouquets featuring royal blue roses, white daisies & satin ribbons.",
    },
  ],

  // Navigation Links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: "Shop", href: "/products" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],

  // 2 Brand Colors: Primary & Complementary Secondary
  colors: {
    primary: {
      name: "Berry Pink",
      hex: "#d90368",
      role: "1st Primary Brand Color",
      cssVar: "--primary-color",
    },
    secondary: {
      name: "Emerald Green",
      hex: "#04a777",
      role: "Complementary Secondary Color (Notice bar, highlights, accents)",
      cssVar: "--secondary-color",
    },
    dark: {
      name: "Charcoal Neutral",
      hex: "#291720",
      role: "Deep dark neutral for typography, sidebar, and footer",
    },
  },
};

export const siteConfig = brandConfig;
export default brandConfig;
