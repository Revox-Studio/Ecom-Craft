import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";

const endpoint =
  process.env.AWS_ENDPOINT_URL_S3 ||
  "https://br-jolly-tree-azsa8u8h.storage.c-3.ap-southeast-1.aws.neon.tech";
const region = process.env.AWS_REGION || "ap-southeast-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
export const BUCKET_NAME = process.env.AWS_BUCKET_NAME || "ecom-products";

export const s3Client = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true,
});

/**
 * Upload a file/buffer to S3 storage
 */
export async function uploadToS3(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  bucket = BUCKET_NAME
): Promise<string> {
  // Sanitize filename and create unique timestamped key
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const key = `products/${Date.now()}-${safeName}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
  });

  await s3Client.send(command);

  // Return public accessibility URL for the uploaded object
  return `${endpoint}/${bucket}/${key}`;
}

/**
 * Delete a file by raw key from S3 storage
 */
export async function deleteFromS3(
  key: string,
  bucket = BUCKET_NAME
): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  await s3Client.send(command);
}

/**
 * Helper to extract S3 key from full URL or key string
 */
export function extractS3Key(urlOrKey: string, bucket = BUCKET_NAME): string | null {
  if (!urlOrKey || typeof urlOrKey !== "string") return null;

  const trimmed = urlOrKey.trim();

  // If local static asset, do not treat as S3 object
  if (trimmed.startsWith("/") && !trimmed.startsWith(`/${bucket}/`)) {
    return null;
  }

  // If already starts with products/
  if (trimmed.startsWith("products/")) {
    return trimmed;
  }

  // Check if URL contains /<bucket>/
  const bucketSubstr = `/${bucket}/`;
  if (trimmed.includes(bucketSubstr)) {
    const keyPart = trimmed.split(bucketSubstr)[1];
    return keyPart ? decodeURIComponent(keyPart.split("?")[0]) : null;
  }

  // Regex fallback: find products/<filename>
  const match = trimmed.match(/(products\/[^?#]+)/);
  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  return null;
}

/**
 * Delete an image by its full S3 URL or S3 key
 */
export async function deleteImageFromS3(
  urlOrKey: string,
  bucket = BUCKET_NAME
): Promise<boolean> {
  try {
    const key = extractS3Key(urlOrKey, bucket);
    if (!key) {
      console.log(`[S3] Skipping deletion, not an S3 object: ${urlOrKey}`);
      return false;
    }

    console.log(`[S3] Deleting object from S3: Bucket=${bucket}, Key=${key}`);
    await deleteFromS3(key, bucket);
    console.log(`[S3] Successfully deleted: ${key}`);
    return true;
  } catch (error) {
    console.error(`[S3] Failed to delete object ${urlOrKey}:`, error);
    return false;
  }
}

/**
 * Delete an array of image URLs or keys from S3
 */
export async function deleteMultipleImagesFromS3(
  urlsOrKeys: string[],
  bucket = BUCKET_NAME
): Promise<void> {
  if (!urlsOrKeys || !urlsOrKeys.length) return;

  await Promise.allSettled(
    urlsOrKeys.map((url) => deleteImageFromS3(url, bucket))
  );
}

/**
 * Test S3 connectivity & list available buckets
 */
export async function testS3Connection(): Promise<string[]> {
  try {
    const res = await s3Client.send(new ListBucketsCommand({}));
    return (res.Buckets || []).map((b) => b.Name || "");
  } catch (error) {
    console.error("S3 connection error:", error);
    return [];
  }
}
