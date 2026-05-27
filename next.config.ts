import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // TEMP: enables mock audit labels on Vercel Preview deployments
    NEXT_PUBLIC_MOCK_AUDIT:
      process.env.VERCEL_ENV === "preview"
        ? "1"
        : (process.env.NEXT_PUBLIC_MOCK_AUDIT ?? ""),
  },
};

export default nextConfig;
