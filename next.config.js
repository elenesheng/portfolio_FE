/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'colorful-frog-ca64baff3b.strapiapp.com',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'colorful-frog-ca64baff3b.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
