import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/admin/",
    name: "Chicken Corner Admin",
    short_name: "CC Admin",

    description:
      "Chicken Corner restaurant administration panel.",

    start_url: "/admin/dashboard",
    scope: "/admin/",

    display: "standalone",
    orientation: "portrait",

    background_color: "#090909",
    theme_color: "#0F0F10",

    categories: ["business", "productivity"],

    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}