import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialProducts = [
  {
    name: "Handcrafted Ceramic Vase",
    slug: "handcrafted-ceramic-vase",
    description: "Wheel-thrown earthenware vase featuring reactive plum and gold glaze with volcanic texture.",
    category: "Ceramics",
    images: [],
    featured: true,
    specifications: {
      Material: "Natural Terracotta Clay",
      Height: "26 cm",
      Diameter: "14 cm",
      Glaze: "Reactive Volcanic Plum & Gold",
    },
    tags: ["Handmade", "Ceramics", "Vase", "Glazed"],
  },
  {
    name: "Woven Bamboo Basket",
    slug: "woven-bamboo-basket",
    description: "Traditional double-weave bamboo basket crafted by master artisans using sustainable forest bamboo.",
    category: "Weaving",
    images: [],
    featured: true,
    specifications: {
      Material: "Sustainable Bamboo",
      Dimensions: "30 x 30 x 20 cm",
      Technique: "Double-Weave Twill",
    },
    tags: ["Weaving", "Bamboo", "Eco-friendly", "Home Decor"],
  },
  {
    name: "Carved Walnut Table Lamp",
    slug: "carved-walnut-table-lamp",
    description: "Solid black walnut lamp base with hand-turned smooth geometric silhouette and brass fittings.",
    category: "Woodwork",
    images: [],
    featured: true,
    specifications: {
      Wood: "Solid American Black Walnut",
      Fitting: "Brushed Solid Brass",
      Height: "38 cm",
    },
    tags: ["Woodwork", "Walnut", "Lighting", "Artisan"],
  },
  {
    name: "Hammered Brass Bowl",
    slug: "hammered-brass-bowl",
    description: "Hand-forged pure brass bowl with oxidized dark patina exterior and mirror polished interior.",
    category: "Metals",
    images: [],
    featured: true,
    specifications: {
      Material: "100% Solid Brass",
      Finish: "Hand-Hammered Patina",
      Diameter: "22 cm",
    },
    tags: ["Metals", "Brass", "Hand-forged"],
  },
  {
    name: "Stoneware Tea Set",
    slug: "stoneware-tea-set",
    description: "Artisan teapot and two matching cups with speckled matte glaze and bamboo handle.",
    category: "Ceramics",
    images: [],
    featured: false,
    specifications: {
      Clay: "Speckled Mountain Stoneware",
      Capacity: "650 ml",
      Handle: "Natural Bent Bamboo",
    },
    tags: ["Ceramics", "Tea", "Stoneware"],
  },
  {
    name: "Linen Fringe Throw Blanket",
    slug: "linen-fringe-throw-blanket",
    description: "100% organic unbleached linen with hand-tied fringe edges dyed with natural madder root.",
    category: "Textiles",
    images: [],
    featured: false,
    specifications: {
      Material: "100% French Flax Linen",
      Dye: "Natural Plant-based Madder",
      Dimensions: "150 x 200 cm",
    },
    tags: ["Textiles", "Linen", "Organic", "Hand-dyed"],
  },
];

const initialCategories = [
  { name: "Ceramics", slug: "ceramics", description: "Wheel-thrown & sculpted pottery" },
  { name: "Woodwork", slug: "woodwork", description: "Hand-carved timber and hardwood crafts" },
  { name: "Weaving", slug: "weaving", description: "Baskets, cane, and fiber weaving" },
  { name: "Metals", slug: "metals", description: "Hand-forged brass, copper & bronze" },
  { name: "Textiles", slug: "textiles", description: "Natural linen and woven blankets" },
];

async function seed() {
  console.log("Seeding Neon PostgreSQL database...");

  for (const cat of initialCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  for (const prod of initialProducts) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }

  console.log("Seeding complete! Added products and categories.");
  await prisma.$disconnect();
}

seed().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
