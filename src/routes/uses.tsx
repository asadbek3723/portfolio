import { createFileRoute } from "@tanstack/react-router";
import { Uses } from "@/portfolio/pages/Uses";

export const Route = createFileRoute("/uses")({
  head: () => ({
    meta: [
      { title: "Uses — Asadbek Jumanazarov" },
      { name: "description", content: "Uses from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Uses — Asadbek Jumanazarov" },
      { property: "og:description", content: "Uses from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Uses,
});
