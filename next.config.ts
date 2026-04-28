import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  images: { unoptimized: true }, 
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/:path((?!(?:en|zh)(?:/|$)).*)',
        destination: '/en/:path*',
        permanent: true,
      }
    ]
  },
};


const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
