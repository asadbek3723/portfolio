import { createFileRoute } from "@tanstack/react-router";
import { Certificates } from "@/portfolio/pages/Certificates";

export const Route = createFileRoute("/certificates/")({
  head: () => ({
    meta: [
      { title: "Certificates — Asadbek Jumanazarov" },
      { name: "description", content: "Certificates from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Certificates — Asadbek Jumanazarov" },
      { property: "og:description", content: "Certificates from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Certificates,
});
