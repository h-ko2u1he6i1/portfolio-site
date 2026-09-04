import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence the "inferred workspace root" warning caused by other lockfiles
  // outside this directory. This project IS the deploy root on Vercel.
  turbopack: {
    root: path.join(__dirname),
  },
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
