import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/portfolio/pages/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Asadbek Jumanazarov" },
      { name: "description", content: "Contact from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:title", content: "Contact — Asadbek Jumanazarov" },
      { property: "og:description", content: "Contact from the portfolio of Asadbek Jumanazarov, software engineer from Uzbekistan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});
