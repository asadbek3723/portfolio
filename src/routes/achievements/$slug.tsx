import { createFileRoute } from "@tanstack/react-router";
import { AchievementDetail } from "@/portfolio/pages/AchievementDetail";
import { detailHead, getRequestOrigin } from "@/lib/seo";

export const Route = createFileRoute("/achievements/$slug")({
  loader: async () => ({ origin: await getRequestOrigin().catch(() => undefined) }),
  head: ({ params, loaderData }) => detailHead("achievements", params.slug, loaderData?.origin),
  component: AchievementDetail,
});
