import type { NextConfig } from "next";

process.env.PRISMA_HIDE_UPDATE_MESSAGE = "true";
process.env.CHECKPOINT_DISABLE = "1";

const nextConfig: NextConfig = {
  devIndicators: false,
};

export default nextConfig;
