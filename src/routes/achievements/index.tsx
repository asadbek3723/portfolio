import { createFileRoute } from "@tanstack/react-router";
import { Achievements } from "@/portfolio/pages/Achievements";

export const Route = createFileRoute("/achievements/")({
  head: () => ({
    meta: [
      { title: "Achievements — Asadbek Jumanazarov" },
      { name: "description", content: "Achievements from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Achievements — Asadbek Jumanazarov" },
      { property: "og:description", content: "Achievements from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Achievements,
});
