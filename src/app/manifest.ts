
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Uganda Buildcon International Expo",
    short_name: "Uganda Buildcon",
    description:
      "Uganda's building and construction B2B trade exhibition in Kampala.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#123472",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
