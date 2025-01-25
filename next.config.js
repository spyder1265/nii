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
    domains: ["lh3.googleusercontent.com"], // Allow Google profile images
  },
};

module.exports = nextConfig;
