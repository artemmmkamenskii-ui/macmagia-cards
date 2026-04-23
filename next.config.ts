import type { NextConfig } from "next";

import { BASE_PATH } from "./lib/basePath";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  reactStrictMode: true,
  // Корень сайта ведёт на витрину: без этого при basePath весь контент только под /cards
  async redirects() {
    return [
      {
        source: "/",
        destination: `${BASE_PATH}/`,
        permanent: true,
        basePath: false
      }
    ];
  }
};

export default nextConfig;
