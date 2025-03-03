/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async rewrites() {
    return [
      {
        source: '/api/webhook/:path*',
        destination: 'https://morefire2.app.n8n.cloud/webhook/smartpresent'
      }
    ];
  }
};

module.exports = nextConfig; 