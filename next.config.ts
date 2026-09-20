import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dodvqpaihggvwrmrqdyt.supabase.co",
        pathname: "/**",
      },
    ],

    formats: ["image/avif", "image/webp"],

    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],

    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 Days
  },

  compress: true,

  poweredByHeader: false,

  reactStrictMode: true,
};

export default nextConfig;