/** @type {import('next').NextConfig} */
const nextConfig = {
  // 简化配置，确保与Next.js 13兼容
  experimental: {
    appDir: true,
  },
  // 移除output: 'standalone'，这可能导致部署问题
};

module.exports = nextConfig; 