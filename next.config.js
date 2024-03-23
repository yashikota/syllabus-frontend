/** @type {import("next").NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import("next").NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  distDir: "out",
});
