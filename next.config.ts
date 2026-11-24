import type { NextConfig } from "next";

process.env.PRISMA_HIDE_UPDATE_MESSAGE = "true";
process.env.CHECKPOINT_DISABLE = "1";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
