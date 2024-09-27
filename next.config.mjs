import nextPwa from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  reactStrictMode: false
};

const withPWA = nextPwa({
	dest: "public",
	register: true,
});

const config = withPWA({
	...nextConfig,
});

export default config;
