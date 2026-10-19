import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * The site is served from https://<user>.github.io/<repo>/, so every route and
 * asset is prefixed with BASE_PATH. Locally (`npm run dev`) the prefix is empty.
 * The GitHub Actions workflow sets NEXT_PUBLIC_BASE_PATH automatically.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
