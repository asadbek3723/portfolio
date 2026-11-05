import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/admin/pages/Dashboard";
import { adminHead } from "@/admin/lib/head";
export const Route = createFileRoute("/admin/")({ head: () => adminHead("Boshqaruv paneli"), component: Dashboard });