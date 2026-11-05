import { createFileRoute } from "@tanstack/react-router";
import { CV } from "@/portfolio/pages/CV";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "CV — Asadbek Jumanazarov" },
      { name: "description", content: "CV from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "CV — Asadbek Jumanazarov" },
      { property: "og:description", content: "CV from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CV,
});
