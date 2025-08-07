/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Optional: Add basePath if you're deploying to a subdirectory
  // basePath: '/your-base-path',
  // Optional: Add assetPrefix if you're deploying to a CDN
  // assetPrefix: '/your-cdn-url',
};

module.exports = nextConfig;
