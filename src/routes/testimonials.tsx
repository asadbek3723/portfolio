import { createFileRoute } from "@tanstack/react-router";
import { Testimonials } from "@/portfolio/pages/Testimonials";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Asadbek Jumanazarov" },
      { name: "description", content: "Testimonials from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Testimonials — Asadbek Jumanazarov" },
      { property: "og:description", content: "Testimonials from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Testimonials,
});
