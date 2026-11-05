import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/portfolio/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Asadbek Jumanazarov" },
      { name: "description", content: "About from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "About — Asadbek Jumanazarov" },
      { property: "og:description", content: "About from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});
