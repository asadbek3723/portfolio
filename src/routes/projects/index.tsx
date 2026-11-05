import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/portfolio/pages/Projects";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Asadbek Jumanazarov" },
      { name: "description", content: "Projects from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Projects — Asadbek Jumanazarov" },
      { property: "og:description", content: "Projects from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Projects,
});
