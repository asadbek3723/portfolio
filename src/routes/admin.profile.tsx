import { createFileRoute } from "@tanstack/react-router";
import { ContentEditor } from "@/admin/pages/ContentEditor";
import { adminHead } from "@/admin/lib/head";
export const Route = createFileRoute("/admin/profile")({ head: () => adminHead("Profil"), component: ContentEditor });