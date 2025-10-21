/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  env: {
    PORT: "3012"
  }
}

module.exports = nextConfig