import { NextRequest, NextResponse } from "next/server";
import { inquiryService } from "@/services/inquiry.service";
import { isAuthorizedAdmin } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    // Only authenticated admin can delete inquiries
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const deleted = await inquiryService.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Inquiry not found or could not be deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting inquiry", details: String(error) },
      { status: 500 }
    );
  }
}
