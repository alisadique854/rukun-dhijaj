import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://rukundhijaj.com/sitemap.xml",
    host: "https://rukundhijaj.com",
  };
}