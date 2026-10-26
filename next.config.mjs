/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable the Next.js Dev Tools "N" logo and overlay for this project
  devIndicators: false,
  images: {
    // Next.js 16 only allows quality 75 by default; the portrait needs a higher one to stay sharp
    qualities: [75, 95],
  },
};

export default nextConfig;
