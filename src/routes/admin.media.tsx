import { createFileRoute } from "@tanstack/react-router";
import { MediaPage } from "@/admin/pages/SystemPages";
import { adminHead } from "@/admin/lib/head";
export const Route = createFileRoute("/admin/media")({ head: () => adminHead("Media kutubxonasi"), component: MediaPage });