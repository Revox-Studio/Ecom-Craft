import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/services/product.service";
import { slugify } from "@/lib/utils";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const sort = searchParams.get("sort") || undefined;

    const products = await productService.getAll({ category, search, sort });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Only authenticated admin can create products
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.name || !body.description || !body.category) {
      return NextResponse.json(
        { error: "Name, description, and category are required" },
        { status: 400 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.name);

    const product = await productService.create({
      name: body.name,
      slug,
      description: body.description,
      category: body.category,
      price: body.price,
      originalPrice: body.originalPrice,
      images: body.images || [],
      featured: Boolean(body.featured),
      specifications: body.specifications || {},
      tags: body.tags || [],
    });

    if (!product) {
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product", details: String(error) },
      { status: 500 }
    );
  }
}
