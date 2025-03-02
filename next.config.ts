import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: false,
  },
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true
};

export default nextConfig;
