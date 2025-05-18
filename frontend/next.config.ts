import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', 
        hostname: 'localhost',
        port: '5051', 
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
