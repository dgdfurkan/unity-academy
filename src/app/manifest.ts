import type { MetadataRoute } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Unity Academy",
    short_name: "Unity Academy",
    description:
      "A guided track through C#, Unity, and the production patterns behind mobile games.",
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    orientation: "any",
    background_color: "#0a0d14",
    theme_color: "#0a0d14",
    categories: ["education", "developer"],
    icons: [
      {
        src: `${basePath}/icons/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${basePath}/icons/maskable-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
