import type { NextConfig } from "next";
import pkg from "./package.json";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // The TODO mentioned "Static Export"
  basePath: isProd ? "/thumbly" : "",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
