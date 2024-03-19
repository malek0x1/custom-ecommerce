/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.chec.io",
      }, {
        protocol: "https",
        hostname: "media-cdn.paulandshark.com",
      },
    ],
  },

};

export default nextConfig;
