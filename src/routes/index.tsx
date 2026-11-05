import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/portfolio/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Asadbek Jumanazarov — Software Engineer Portfolio" },
      { name: "description", content: "Asadbek Jumanazarov builds fast, beautiful web products. Projects, skills, services and contact." },
      { property: "og:title", content: "Asadbek Jumanazarov — Software Engineer" },
      { property: "og:description", content: "Fast, beautiful and reliable web products from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
