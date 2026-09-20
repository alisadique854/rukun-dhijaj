import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chicken Corner",
    short_name: "Chicken Corner",
    description:
      "Premium restaurant serving delicious broast, fried chicken, burgers, shawarma and grills.",

    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0F0F10",
    theme_color: "#0F0F10",

    categories: ["food", "restaurant"],

    icons: [
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}