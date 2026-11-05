import { createFileRoute } from "@tanstack/react-router";
import { CertificateDetail } from "@/portfolio/pages/CertificateDetail";
import { detailHead, getRequestOrigin } from "@/lib/seo";

export const Route = createFileRoute("/certificates/$slug")({
  loader: async () => ({ origin: await getRequestOrigin().catch(() => undefined) }),
  head: ({ params, loaderData }) => detailHead("certificates", params.slug, loaderData?.origin),
  component: CertificateDetail,
});
