import { createFileRoute } from "@tanstack/react-router";
import { CertificateDetail } from "@/portfolio/pages/CertificateDetail";
import { detailHead, loadSeo } from "@/lib/seo";

export const Route = createFileRoute("/certificates/$slug")({
  loader: () => loadSeo(),
  head: ({ params, loaderData }) => detailHead("certificates", params.slug, loaderData),
  component: CertificateDetail,
});
