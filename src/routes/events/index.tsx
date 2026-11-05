import { createFileRoute } from "@tanstack/react-router";
import { Events } from "@/portfolio/pages/Events";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events — Asadbek Jumanazarov" },
      { name: "description", content: "Events from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Events — Asadbek Jumanazarov" },
      { property: "og:description", content: "Events from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Events,
});
