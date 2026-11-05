import { createFileRoute } from "@tanstack/react-router";
import { Skills } from "@/portfolio/pages/Skills";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Asadbek Jumanazarov" },
      { name: "description", content: "Skills from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Skills — Asadbek Jumanazarov" },
      { property: "og:description", content: "Skills from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Skills,
});
