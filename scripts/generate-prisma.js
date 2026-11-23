const { execSync } = require("child_process");

// Fallback so prisma generate never fails even if DATABASE_URL is not yet set in Vercel
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=require";
}

process.env.PRISMA_HIDE_UPDATE_MESSAGE = "true";
process.env.CHECKPOINT_DISABLE = "1";

try {
  const isWindows = process.platform === "win32";
  const cmd = isWindows ? "npx.cmd prisma generate" : "npx prisma generate";
  execSync(cmd, { stdio: "inherit", env: process.env });
} catch (error) {
  console.warn("Prisma generate warning during postinstall:", error.message);
  process.exit(0);
}
