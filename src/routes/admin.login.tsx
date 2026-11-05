import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/admin/pages/Login";
import { adminHead } from "@/admin/lib/head";
export const Route = createFileRoute("/admin/login")({ head: () => adminHead("Kirish"), component: Login });