import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/admin/pages/SystemPages";
import { adminHead } from "@/admin/lib/head";
export const Route = createFileRoute("/admin/settings")({ head: () => adminHead("Sozlamalar"), component: SettingsPage });