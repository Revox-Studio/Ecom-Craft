import { NextRequest, NextResponse } from "next/server";
import { inquiryService } from "@/services/inquiry.service";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Only authenticated admin can view all inquiries
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const inquiries = await inquiryService.getAll();
    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch inquiries", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const inquiry = await inquiryService.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      productId: body.productId,
      productName: body.productName,
      message: body.message,
    });

    if (!inquiry) {
      return NextResponse.json(
        { error: "Failed to save inquiry" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit inquiry", details: String(error) },
      { status: 500 }
    );
  }
}
