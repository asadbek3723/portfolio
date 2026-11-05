import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/portfolio/pages/Services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Asadbek Jumanazarov" },
      { name: "description", content: "Services from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Services — Asadbek Jumanazarov" },
      { property: "og:description", content: "Services from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});
