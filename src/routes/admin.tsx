import { createFileRoute, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import { AdminShell } from "@/admin/components/AdminShell";
import { checkAdmin } from "@/admin/auth";

const isLoginPath = (pathname: string) => pathname === "/admin/login" || pathname === "/admin/login/";

function AdminPending() {
  return <div className="admin-root min-h-dvh bg-background p-8 text-muted-foreground" role="status">Yuklanmoqda…</div>;
}

export const Route = createFileRoute("/admin")({
  ssr: false,
  // Runs before anything under /admin renders, so a signed-out visitor is
  // redirected to the login page without ever seeing the panel (UX only; the
  // real authorization is RLS / has_role in the database).
  beforeLoad: async ({ location }) => {
    if (isLoginPath(location.pathname)) return;
    if (!(await checkAdmin().catch(() => false))) throw redirect({ to: "/admin/login", replace: true });
  },
  pendingMs: 0,
  pendingComponent: AdminPending,
  head: () => ({ meta: [{ name: "robots", content: "noindex,nofollow" }, { title: "Admin" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const login = useRouterState({ select: (s) => isLoginPath(s.location.pathname) });
  if (login) return <Outlet />;
  return <AdminShell><Outlet /></AdminShell>;
}
