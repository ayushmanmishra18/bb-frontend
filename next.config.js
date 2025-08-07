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

  // Headers for CORS and cookies
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },

  // Optional: Configure webpack
  webpack: (config, { isServer }) => {
    // Add custom webpack configuration here if needed
    return config;
  },
};

module.exports = nextConfig; // Only one export line is needed