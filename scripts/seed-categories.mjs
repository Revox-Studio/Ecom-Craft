import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialCategories = [
  {
    name: "Winter Crochet & Snowmen",
    slug: "winter-crochet",
    description: "Cozy handcrafted winter beanies, warm scarves, and adorable crochet snowmen collection.",
    image: "/images/categories/winter-crochet.webp",
  },
  {
    name: "Deity Poshak & Dresses",
    slug: "deity-poshak",
    description: "Bespoke handcrafted Laddu Gopal woolen dresses, festive poshak, and pearl-beaded accessories.",
    image: "/images/categories/deity-poshak.jpg",
  },
  {
    name: "Amigurumi & Dolls",
    slug: "amigurumi-dolls",
    description: "Cute collectible crochet character dolls, hooded animal companions, and plush handcrafted friends.",
    image: "/images/categories/amigurumi-dolls.jpg",
  },
  {
    name: "Crochet Keychains & Charms",
    slug: "crochet-keychains",
    description: "Handmade mini floral keyrings, sunflowers, tulip bouquets, bunny charms, and bag pendants.",
    image: "/images/categories/crochet-keychains.jpg",
  },
  {
    name: "Crochet Flower Bouquets",
    slug: "crochet-bouquets",
    description: "Everlasting hand-knitted floral bouquets featuring royal blue roses, white daisies & satin ribbons.",
    image: "/images/categories/crochet-bouquets.jpg",
  },
];

async function seed() {
  console.log("Syncing categories in Neon PostgreSQL database...");

  for (const cat of initialCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  console.log("Categories synchronized successfully!");
  await prisma.$disconnect();
}

seed().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
