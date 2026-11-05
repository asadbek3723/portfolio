import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/content/$collection")({ component: Outlet });