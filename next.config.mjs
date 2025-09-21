/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [new URL('https://api.redseam.redberryinternship.ge/**')],
  },
};

export default nextConfig;
