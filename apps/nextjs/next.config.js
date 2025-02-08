import { fileURLToPath } from "url";
import MillionLint from "@million/lint";
import createBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@acme/api", "@acme/db", "@acme/ui", "@acme/validators"],

  // Allow optimizing avatar images from GitHub
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default MillionLint.next({
  enabled: true,
  rsc: true,
})(
  withSentryConfig(withBundleAnalyzer(config), {
    // https://github.com/getsentry/sentry-webpack-plugin#options
    silent: true,
    org: process.env.SENTRY_ORG,
    project: "web",
    authToken: process.env.SENTRY_AUTH_TOKEN,
    widenClientFileUpload: true,
    hideSourceMaps: true,
    disableLogger: true,
    // we don't use vercel
    automaticVercelMonitors: false,
    // Automatically annotate React components to show their full name in breadcrumbs and session replay
    reactComponentAnnotation: {
      enabled: true,
    },
    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",
  }),
);
