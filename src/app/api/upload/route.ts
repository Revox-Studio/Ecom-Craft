import { NextRequest, NextResponse } from "next/server";
import { uploadToS3, deleteImageFromS3 } from "@/lib/s3";
import { isAuthorizedAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Only authenticated admin can upload files to S3 bucket
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileUrl = await uploadToS3(buffer, file.name, file.type);

    return NextResponse.json({
      success: true,
      url: fileUrl,
      fileName: file.name,
    });
  } catch (error) {
    console.error("S3 upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload file to S3 storage", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Only authenticated admin can delete files from S3 bucket
    if (!(await isAuthorizedAdmin(req))) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json(
        { error: "Image URL parameter is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteImageFromS3(url);

    return NextResponse.json({
      success: true,
      deleted,
      message: deleted
        ? "Image successfully deleted from S3"
        : "Image was not in S3 or could not be removed",
    });
  } catch (error) {
    console.error("S3 image deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete image from S3", details: String(error) },
      { status: 500 }
    );
  }
}
