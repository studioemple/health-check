/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Isto kao na rentl.io: styled-components kroz SWC (SSR, displayName, stabilni classNameovi)
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
