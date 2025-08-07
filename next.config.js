/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings (re-enabled)
  images: {
    // You can configure domains here if using external images
    // domains: ['example.com'],
  },

  // Add trailing slashes to URLs for better compatibility
  trailingSlash: true,

  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Optional: Configure webpack
  webpack: (config, { isServer }) => {
    // Add custom webpack configuration here if needed
    return config;
  },
};

module.exports = nextConfig; // Only one export line is needed