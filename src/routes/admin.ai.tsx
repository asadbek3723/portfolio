import { createFileRoute } from "@tanstack/react-router";
import { AiPage } from "@/admin/pages/AiPage";
import { adminHead } from "@/admin/lib/head";

export const Route = createFileRoute("/admin/ai")({ head: () => adminHead("AI bilan yaxshilash"), component: AiPage });
