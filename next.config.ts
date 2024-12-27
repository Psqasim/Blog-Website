import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */images: {
        domains: ["cdn.sanity.io"], // Add the Sanity CDN domain here
      },
      eslint: {
        ignoreDuringBuilds: true, // Temporarily disable ESLint during build
      },
};

export default nextConfig;
