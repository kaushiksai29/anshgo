import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rewrite any /media/{section}/{uuid}_rw_{size}.{ext} to the _rw_600 version
  // This way we only need one copy of each image regardless of what size the code references
  async rewrites() {
    return [
      {
        // Match any _rw_XXXX pattern and rewrite to _rw_600
        // Handles .jpg, .JPG, .jpeg, .png variants
        source: "/media/:section/:uuid([\\w-]+)_rw_:size(\\d+).:ext(jpg|jpeg|png|JPG|JPEG|PNG)",
        destination: "/media/:section/:uuid_rw_600.:ext",
      },
      {
        // Handle uppercase .JPG -> lowercase .jpg fallback
        source: "/media/:section/:uuid([\\w-]+)_rw_:size(\\d+).JPG",
        destination: "/media/:section/:uuid_rw_600.jpg",
      },
    ];
  },
};

export default nextConfig;
