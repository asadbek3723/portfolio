import { createFileRoute } from "@tanstack/react-router";
import { Match } from "@/portfolio/pages/Match";

export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "AI project match — Asadbek Jumanazarov" },
      { name: "description", content: "Describe your project goals and get AI-powered recommendations for the right services and relevant past work." },
      { property: "og:title", content: "AI project match — Asadbek Jumanazarov" },
      { property: "og:description", content: "Describe your goals and get matched with the right services and past projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Match,
});
