/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    appDir: true,
  },
  // 确保在Vercel上正确工作
  output: 'standalone',
  // 允许所有环境变量
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    DEEPSEEK_BASE_URL: process.env.DEEPSEEK_BASE_URL,
  },
};

module.exports = nextConfig; 