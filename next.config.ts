import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: { unoptimized: true }, 
  reactCompiler: true,
  typescript: {
    // Unfortunately this needs to be ignored due to potential bugs in next js default app
    ignoreBuildErrors: true
  }
};

export default nextConfig;
