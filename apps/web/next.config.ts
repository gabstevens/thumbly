import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // The TODO mentioned "Static Export"
  basePath: isProd ? "/thumbly" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
