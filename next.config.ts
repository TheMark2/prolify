import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dubai-immo.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
