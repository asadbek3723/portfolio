import { createFileRoute } from "@tanstack/react-router";
import { Blog } from "@/portfolio/pages/Blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Asadbek Jumanazarov" },
      { name: "description", content: "Blog from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Blog — Asadbek Jumanazarov" },
      { property: "og:description", content: "Blog from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Blog,
});
