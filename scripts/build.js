const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=require";
}
process.env.PRISMA_HIDE_UPDATE_MESSAGE = "true";
process.env.CHECKPOINT_DISABLE = "1";

console.log("Generating Prisma client...");
try {
  const isWindows = process.platform === "win32";
  const cmd = isWindows ? "npx.cmd prisma generate" : "npx prisma generate";
  execSync(cmd, { stdio: "inherit", env: process.env });
  console.log("Prisma client generated successfully.");
} catch (error) {
  const isWindows = process.platform === "win32";
  const clientPath = path.join(__dirname, "..", "node_modules", "@prisma", "client");
  if (isWindows && fs.existsSync(clientPath)) {
    console.warn("Prisma generate encountered a lock on Windows, but existing client was found. Continuing build...");
  } else {
    console.error("Prisma generate failed:", error.message);
    process.exit(1);
  }
}

console.log("Building Next.js application...");
const isWindows = process.platform === "win32";
const nextCmd = isWindows ? "npx.cmd next build" : "npx next build";
execSync(nextCmd, { stdio: "inherit", env: process.env });
