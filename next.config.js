import { RecoilEnv } from "recoil";
/** @type {import("next").NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import("next").NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
