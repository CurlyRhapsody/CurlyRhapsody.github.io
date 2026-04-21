import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: { unoptimized: true }, 
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      }
    ]
  },
};


const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
