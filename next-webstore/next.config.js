/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
  return [
    {
      source: '/api/:slug*',
      destination: 'http://192.168.3.172:8080/api/:slug*'
    },
  ]
}
}

module.exports = nextConfig
