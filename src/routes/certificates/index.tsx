import { createFileRoute } from "@tanstack/react-router";
import { Certificates } from "@/portfolio/pages/Certificates";
import { loadSeo, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/certificates/")({
  loader: () => loadSeo(),
  head: ({ loaderData }) => pageHead("/certificates", loaderData),
  component: Certificates,
});
