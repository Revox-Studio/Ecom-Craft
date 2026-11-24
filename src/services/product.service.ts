import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { deleteMultipleImagesFromS3 } from "@/lib/s3";
import { getPublicImageUrl } from "@/lib/image-url";

export const fallbackProducts: Product[] = [
  {
    id: "prod-1",
    name: "Cozy Snowman Wool Beanie",
    slug: "cozy-snowman-wool-beanie",
    description: "Handcrafted winter crochet beanie with adorable mini snowman motif.",
    category: "Winter Crochet",
    images: ["/images/categories/winter-crochet.webp"],
    featured: true,
    price: "₹599",
    originalPrice: "₹799",
    rating: 4.9,
    reviewCount: 38,
    tags: ["Winter", "Crochet", "Handmade"],
  },
  {
    id: "prod-2",
    name: "Royal Bal Gopal Deity Poshak",
    slug: "royal-bal-gopal-deity-poshak",
    description: "Festive woolen deity poshak with intricate pearl lace and matching mukut.",
    category: "Deity Poshak",
    images: ["/images/categories/deity-poshak.jpg"],
    featured: true,
    price: "₹799",
    originalPrice: "₹999",
    rating: 5.0,
    reviewCount: 52,
    tags: ["Deity", "Poshak", "Laddu Gopal"],
  },
  {
    id: "prod-3",
    name: "Hooded Bunny Amigurumi Doll",
    slug: "hooded-bunny-amigurumi-doll",
    description: "Super soft collectible handcrafted plush doll with knitted bunny ears.",
    category: "Amigurumi & Dolls",
    images: ["/images/categories/amigurumi-dolls.jpg"],
    featured: true,
    price: "₹649",
    originalPrice: "₹849",
    rating: 4.9,
    reviewCount: 29,
    tags: ["Amigurumi", "Doll", "Handmade"],
  },
  {
    id: "prod-4",
    name: "Crochet Sunflower Charm Keychain",
    slug: "crochet-sunflower-charm-keychain",
    description: "Evergreen hand-knitted vibrant yellow sunflower with sturdy gold keyring.",
    category: "Crochet Keychains",
    images: ["/images/categories/crochet-keychains.jpg"],
    featured: true,
    price: "₹249",
    originalPrice: "₹349",
    rating: 4.8,
    reviewCount: 64,
    tags: ["Keychains", "Sunflower", "Gift"],
  },
  {
    id: "prod-5",
    name: "Forever Royal Blue Rose Bouquet",
    slug: "forever-royal-blue-rose-bouquet",
    description: "Everlasting hand-knitted floral bouquet with royal blue roses and white gypsophila.",
    category: "Crochet Bouquets",
    images: ["/images/categories/crochet-bouquets.jpg"],
    featured: true,
    price: "₹1,199",
    originalPrice: "₹1,499",
    rating: 5.0,
    reviewCount: 41,
    tags: ["Bouquet", "Roses", "Everlasting"],
  },
  {
    id: "prod-6",
    name: "Cozy Chunky Knitted Winter Scarf",
    slug: "cozy-chunky-knitted-winter-scarf",
    description: "Extra warm dual-tone woolen winter scarf made from plush anti-pilling yarn.",
    category: "Winter Crochet",
    images: ["/images/categories/winter-crochet.webp"],
    featured: true,
    price: "₹699",
    originalPrice: "₹899",
    rating: 4.9,
    reviewCount: 23,
    tags: ["Scarf", "Winter", "Warm"],
  },
  {
    id: "prod-7",
    name: "Festive Radha Krishna Woolen Set",
    slug: "festive-radha-krishna-woolen-set",
    description: "Artisanal twin deity dress set embellished with golden zari and delicate embroidery.",
    category: "Deity Poshak",
    images: ["/images/categories/deity-poshak.jpg"],
    featured: true,
    price: "₹1,299",
    originalPrice: "₹1,699",
    rating: 5.0,
    reviewCount: 46,
    tags: ["Deity Poshak", "Festive", "Handcrafted"],
  },
  {
    id: "prod-8",
    name: "Handmade Tulip Floral Bunch",
    slug: "handmade-tulip-floral-bunch",
    description: "Vibrant pastel pink and ivory knitted tulips wrapped in premium kraft paper.",
    category: "Crochet Bouquets",
    images: ["/images/categories/crochet-bouquets.jpg"],
    featured: true,
    price: "₹899",
    originalPrice: "₹1,199",
    rating: 4.9,
    reviewCount: 35,
    tags: ["Tulips", "Bouquet", "Gift"],
  },
];

interface ProductQueryOptions {
  category?: string;
  search?: string;
  sort?: string;
}

export const productService = {
  async getAll(params?: ProductQueryOptions): Promise<Product[]> {
    try {
      const where: Record<string, unknown> = {};

      if (params?.category && params.category !== "All Crafts") {
        where.category = {
          equals: params.category,
          mode: "insensitive",
        };
      }

      if (params?.search) {
        where.OR = [
          { name: { contains: params.search, mode: "insensitive" } },
          { description: { contains: params.search, mode: "insensitive" } },
        ];
      }

      const orderBy: Record<string, "asc" | "desc"> = {};
      if (params?.sort === "newest") {
        orderBy.createdAt = "desc";
      } else if (params?.sort === "name-asc") {
        orderBy.name = "asc";
      } else {
        orderBy.createdAt = "desc";
      }

      const products = await db.product.findMany({
        where,
        orderBy,
      });

      if (products.length === 0) {
        let list = [...fallbackProducts];
        if (params?.category && params.category !== "All Crafts") {
          const cat = params.category.toLowerCase();
          list = list.filter(
            (p) =>
              p.category.toLowerCase().includes(cat) ||
              cat.includes(p.category.toLowerCase())
          );
        }
        if (params?.search) {
          const s = params.search.toLowerCase();
          list = list.filter(
            (p) =>
              p.name.toLowerCase().includes(s) ||
              p.description.toLowerCase().includes(s)
          );
        }
        return list;
      }

      return products.map((p) => {
        const specs = (p.specifications as Record<string, any>) || {};
        const safeImages =
          p.images && p.images.length > 0
            ? p.images.map(getPublicImageUrl)
            : ["/images/categories/winter-crochet.webp"];

        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          category: p.category,
          images: safeImages,
          featured: p.featured,
          price: specs.price || "₹599",
          originalPrice: specs.originalPrice || "₹799",
          rating: 4.9,
          reviewCount: 32,
          specifications: specs,
          tags: p.tags,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        };
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      let list = [...fallbackProducts];
      if (params?.category && params.category !== "All Crafts") {
        const cat = params.category.toLowerCase();
        list = list.filter(
          (p) =>
            p.category.toLowerCase().includes(cat) ||
            cat.includes(p.category.toLowerCase())
        );
      }
      if (params?.search) {
        const s = params.search.toLowerCase();
        list = list.filter(
          (p) =>
            p.name.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s)
        );
      }
      return list;
    }
  },

  async getFeatured(): Promise<Product[]> {
    try {
      // First try to fetch products marked as featured
      let products = await db.product.findMany({
        where: { featured: true },
        take: 8,
        orderBy: { createdAt: "desc" },
      });

      // If no product is explicitly marked featured, display real products from DB
      if (products.length === 0) {
        products = await db.product.findMany({
          take: 8,
          orderBy: { createdAt: "desc" },
        });
      }

      // If database has no products, return fallback featured products
      if (products.length === 0) {
        return fallbackProducts.filter((p) => p.featured);
      }

      return products.map((p) => {
        const specs = (p.specifications as Record<string, any>) || {};
        const safeImages =
          p.images && p.images.length > 0
            ? p.images.map(getPublicImageUrl)
            : ["/images/categories/winter-crochet.webp"];

        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          category: p.category,
          images: safeImages,
          featured: p.featured,
          price: specs.price || "₹599",
          originalPrice: specs.originalPrice || "₹799",
          rating: 4.9,
          reviewCount: 32,
          specifications: specs,
          tags: p.tags,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
        };
      });
    } catch (error) {
      console.error("Error fetching featured products:", error);
      return fallbackProducts.filter((p) => p.featured);
    }
  },

  async getById(id: string): Promise<Product | null> {
    try {
      const p = await db.product.findUnique({
        where: { id },
      });

      if (!p) {
        const fallback = fallbackProducts.find((item) => item.id === id);
        return fallback || null;
      }

      const specs = (p.specifications as Record<string, any>) || {};
      const safeImages =
        p.images && p.images.length > 0
          ? p.images.map(getPublicImageUrl)
          : ["/images/categories/winter-crochet.webp"];

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.category,
        images: safeImages,
        featured: p.featured,
        price: specs.price || "₹599",
        originalPrice: specs.originalPrice || "₹799",
        specifications: specs,
        tags: p.tags,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error fetching product by id:", error);
      return null;
    }
  },

  async getBySlug(slug: string): Promise<Product | null> {
    try {
      const p = await db.product.findUnique({
        where: { slug },
      });

      if (!p) {
        const fallback = fallbackProducts.find((item) => item.slug === slug);
        return fallback || null;
      }

      const specs = (p.specifications as Record<string, any>) || {};
      const safeImages =
        p.images && p.images.length > 0
          ? p.images.map(getPublicImageUrl)
          : ["/images/categories/winter-crochet.webp"];

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.category,
        images: safeImages,
        featured: p.featured,
        price: specs.price || "₹599",
        originalPrice: specs.originalPrice || "₹799",
        specifications: specs,
        tags: p.tags,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      return null;
    }
  },

  async create(data: {
    name: string;
    slug: string;
    description: string;
    category: string;
    price?: number | string;
    originalPrice?: number | string;
    images?: string[];
    featured?: boolean;
    specifications?: Record<string, string>;
    tags?: string[];
  }): Promise<Product | null> {
    try {
      const specs = {
        ...(data.specifications || {}),
        ...(data.price ? { price: String(data.price) } : {}),
        ...(data.originalPrice ? { originalPrice: String(data.originalPrice) } : {}),
      };

      const p = await db.product.create({
        data: {
          name: data.name,
          slug: data.slug,
          description: data.description,
          category: data.category,
          images: data.images || [],
          featured: data.featured ?? false,
          specifications: specs,
          tags: data.tags || [],
        },
      });

      const safeImages =
        p.images && p.images.length > 0
          ? p.images.map(getPublicImageUrl)
          : [];

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.category,
        images: safeImages,
        featured: p.featured,
        price: specs.price || "₹599",
        originalPrice: specs.originalPrice || "₹799",
        specifications: specs,
        tags: p.tags,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error creating product:", error);
      return null;
    }
  },

  async update(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      description: string;
      category: string;
      price: number | string;
      originalPrice: number | string;
      images: string[];
      featured: boolean;
      specifications: Record<string, string>;
      tags: string[];
    }>
  ): Promise<Product | null> {
    try {
      const existing = await db.product.findUnique({ where: { id } });

      // If updating images, delete any removed images from S3 bucket
      if (existing && data.images && Array.isArray(existing.images)) {
        const removedImages = existing.images.filter(
          (img) => !data.images?.includes(img)
        );
        if (removedImages.length > 0) {
          console.log("[S3] Cleaning up removed images:", removedImages);
          await deleteMultipleImagesFromS3(removedImages);
        }
      }

      // Merge price/originalPrice into specifications
      const existingSpecs = (existing?.specifications as Record<string, any>) || {};
      const updatedSpecs = {
        ...existingSpecs,
        ...(data.specifications || {}),
        ...(data.price !== undefined ? { price: String(data.price) } : {}),
        ...(data.originalPrice !== undefined ? { originalPrice: String(data.originalPrice) } : {}),
      };

      const updatePayload: Record<string, any> = {
        specifications: updatedSpecs,
      };

      if (data.name !== undefined) updatePayload.name = data.name;
      if (data.slug !== undefined) updatePayload.slug = data.slug;
      if (data.description !== undefined) updatePayload.description = data.description;
      if (data.category !== undefined) updatePayload.category = data.category;
      if (data.images !== undefined) updatePayload.images = data.images;
      if (data.featured !== undefined) updatePayload.featured = data.featured;
      if (data.tags !== undefined) updatePayload.tags = data.tags;

      const p = await db.product.update({
        where: { id },
        data: updatePayload,
      });

      const safeImages =
        p.images && p.images.length > 0
          ? p.images.map(getPublicImageUrl)
          : [];

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        category: p.category,
        images: safeImages,
        featured: p.featured,
        price: updatedSpecs.price || "₹599",
        originalPrice: updatedSpecs.originalPrice || "₹799",
        specifications: updatedSpecs,
        tags: p.tags,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      };
    } catch (error) {
      console.error("Error updating product:", error);
      return null;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const existing = await db.product.findUnique({ where: { id } });
      if (!existing) {
        console.warn(`Product with ID ${id} not found in DB`);
        return false;
      }

      // Delete associated product images from Neon S3 bucket
      if (existing.images && existing.images.length > 0) {
        console.log(
          `[S3] Deleting ${existing.images.length} images for product ${id} from bucket`
        );
        await deleteMultipleImagesFromS3(existing.images);
      }

      // Delete product record from database
      await db.product.delete({ where: { id } });
      console.log(`[DB] Deleted product ${id} from database`);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      return false;
    }
  },
};
