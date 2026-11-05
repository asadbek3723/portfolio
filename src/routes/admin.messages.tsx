import { createFileRoute } from "@tanstack/react-router";
import { MessagesPage } from "@/admin/pages/SystemPages";
import { adminHead } from "@/admin/lib/head";
export const Route = createFileRoute("/admin/messages")({ head: () => adminHead("Xabarlar"), component: MessagesPage });