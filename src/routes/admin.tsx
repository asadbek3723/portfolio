import { useEffect, useState } from "react";
import { createFileRoute, Outlet, Navigate, useRouterState } from "@tanstack/react-router";
import { AdminShell } from "@/admin/components/AdminShell";
import { checkAdmin } from "@/admin/auth";

export const Route = createFileRoute("/admin")({ ssr: false, component: AdminLayout });
function AdminLayout() {
  const login = useRouterState({ select: (s) => s.location.pathname === "/admin/login" });
  const [state, setState] = useState<"loading" | "ok" | "denied">("loading");
  useEffect(() => {
    if (login) return;
    let alive = true;
    checkAdmin().then((ok) => alive && setState(ok ? "ok" : "denied")).catch(() => alive && setState("denied"));
    return () => { alive = false; };
  }, [login]);
  if (login) return <Outlet />;
  if (state === "loading") return <div className="admin-root min-h-dvh bg-background p-8 text-muted-foreground" role="status">Yuklanmoqda…</div>;
  if (state === "denied") return <Navigate to="/admin/login" replace />;
  return <AdminShell><Outlet /></AdminShell>;
}
