/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['colorful-frog-ca64baff3b'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
        pathname: '/uploads/**',
      },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '1337',
      //   pathname: '/uploads/**',
      // },
    ],
  },
};

module.exports = nextConfig;
