/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
  return [
    {
      source: '/api/:slug*',
      destination: 'http://backend:8080/api/:slug*'
    },
  ]
}
}

module.exports = nextConfig
