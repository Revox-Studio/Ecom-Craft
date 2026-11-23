import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/services/product.service";
import { isAuthorizedAdmin } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const product = await productService.getById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching product", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    // Only authenticated admin can update products
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    const updated = await productService.update(id, body);
    if (!updated) {
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating product", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    // Only authenticated admin can delete products
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const deleted = await productService.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Failed to delete product or product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted from database and images removed from S3 bucket",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting product", details: String(error) },
      { status: 500 }
    );
  }
}
