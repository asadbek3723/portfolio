import { createFileRoute } from "@tanstack/react-router";
import { FAQ } from "@/portfolio/pages/FAQ";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Asadbek Jumanazarov" },
      { name: "description", content: "FAQ from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "FAQ — Asadbek Jumanazarov" },
      { property: "og:description", content: "FAQ from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FAQ,
});
