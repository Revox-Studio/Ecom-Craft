import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET_NAME } from "@/lib/s3";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ key: string[] }> }
) {
  try {
    const { key: keySegments } = await context.params;

    if (!keySegments || keySegments.length === 0) {
      return new NextResponse("Image key required", { status: 400 });
    }

    const key = keySegments.join("/");

    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const s3Res = await s3Client.send(command);

    if (!s3Res.Body) {
      return new NextResponse("Image body empty", { status: 404 });
    }

    const bytes = await s3Res.Body.transformToByteArray();
    const contentType = s3Res.ContentType || "image/jpeg";

    return new Response(Buffer.from(bytes), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(bytes.length),
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(s3Res.ETag ? { ETag: s3Res.ETag } : {}),
      },
    });
  } catch (error: any) {
    if (error?.name === "NoSuchKey" || error?.$metadata?.httpStatusCode === 404) {
      return new NextResponse("Image not found", { status: 404 });
    }

    console.error("Error streaming image from S3:", error);
    return new NextResponse("Failed to load image", { status: 500 });
  }
}
