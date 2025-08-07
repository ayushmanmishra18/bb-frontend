/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for static site generation
  output: 'export',
  
  // Image optimization settings
  images: {
    // Disable image optimization since we're using 'export' output
    unoptimized: true,
  },
  
  // Add trailing slashes to URLs for better compatibility
  trailingSlash: true,
  
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Uncomment and modify these as needed:
  
  // basePath: '/your-base-path', // For deploying to a subdirectory
  // assetPrefix: '/your-cdn-url', // For deploying assets to a CDN
  
  // Optional: Configure webpack
  webpack: (config, { isServer }) => {
    // Add custom webpack configuration here if needed
    return config;
  },
};

module.exports = nextConfig;