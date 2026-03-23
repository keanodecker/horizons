/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'horizons-cdn.hostinger.com',
      },
      {
        protocol: 'https',
        hostname: 'rrblntehwdzyuqlpcshi.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
