import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#071426",
    description: "mccaigs is Scotland's Elite Technical Studio for practical AI, automation, websites, internal systems, and digital products.",
    display: "standalone",
    icons: [
      {
        sizes: "any",
        src: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        sizes: "any",
        src: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
    name: "mccaigs",
    short_name: "mccaigs",
    start_url: "/",
    theme_color: "#071426",
  };
}
