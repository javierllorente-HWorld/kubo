import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_MOCK_AUDIT: process.env.NEXT_PUBLIC_MOCK_AUDIT ?? "",
  },
};

export default nextConfig;
