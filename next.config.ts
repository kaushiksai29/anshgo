import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/media/:section/:uuid([\\w-]+)_rw_:size(\\d+).:ext(jpg|jpeg|png|JPG|JPEG|PNG)",
        destination: "/media/:section/:uuid_rw_600.:ext",
      },
      {
        source: "/media/:section/:uuid([\\w-]+)_rw_:size(\\d+).JPG",
        destination: "/media/:section/:uuid_rw_600.jpg",
      },
    ];
  },
};

export default nextConfig;
