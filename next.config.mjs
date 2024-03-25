/** @type {import('next').NextConfig} */
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.chec.io",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "www.tartcollections.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      }));
    }

    return config;
  },

};

export default nextConfig;
