/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@/components"],
  },
  // Các cấu hình khác nếu có
}

module.exports = nextConfig 