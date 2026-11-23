import { S3Client, ListBucketsCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  region: process.env.AWS_REGION || "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

async function run() {
  try {
    const listRes = await client.send(new ListBucketsCommand({}));
    console.log("Buckets:", (listRes.Buckets || []).map(b => b.Name));

    const bucketName = process.env.AWS_BUCKET_NAME || "ecom-products";
    const exists = (listRes.Buckets || []).some(b => b.Name === bucketName);

    if (!exists) {
      console.log(`Bucket ${bucketName} not found. Attempting to create...`);
      try {
        await client.send(new CreateBucketCommand({ Bucket: bucketName }));
        console.log(`Bucket ${bucketName} created successfully!`);
      } catch (err) {
        console.log("Create bucket note/error:", err.message);
      }
    } else {
      console.log(`Bucket ${bucketName} exists!`);
    }
  } catch (err) {
    console.error("S3 Test Error:", err.message);
  }
}

run();
