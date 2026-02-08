import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  proxy: {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|img/).*)'],
  },
};

export default nextConfig;