import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/portfolio/pages/Gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Asadbek Jumanazarov" },
      { name: "description", content: "Gallery from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Gallery — Asadbek Jumanazarov" },
      { property: "og:description", content: "Gallery from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});
