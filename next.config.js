const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "picsum.photos" },
      { hostname: "i.picsum.photos" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

module.exports = nextConfig;
