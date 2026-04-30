// @ts-check
import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: { unoptimized: true }, 
  reactCompiler: true,
};


const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);

