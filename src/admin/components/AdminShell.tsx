import { useState, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { Link } from "@/lib/router-compat";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { collections } from "../collections";
import { useContent, setContent } from "../data/store";
import { signOut } from "../auth";

type NavItem = { to: string; label: string; icon: keyof typeof Icons; badge?: number };

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Circle;
  return <C {...(className ? { className } : {})} />;
}

function useNav(): [string, NavItem[]][] {
  const c = useContent();
  const unread = c.messages.filter((m) => !m.read).length;
  const item = (x: (typeof collections)[number]): NavItem => ({ to: `/admin/content/${x.key}`, label: x.label, icon: x.icon as keyof typeof Icons });
  return [
    ["", [
      { to: "/admin", label: "Bosh panel", icon: "LayoutDashboard" },
      { to: "/admin/ai", label: "AI bilan yaxshilash", icon: "Sparkles" },
    ]],
    ["Kontent", [{ to: "/admin/profile", label: "Profil", icon: "UserRound" }, ...collections.map(item)]],
    ["Tizim", [
      { to: "/admin/messages", label: "Xabarlar", icon: "Inbox", badge: unread },
      { to: "/admin/media", label: "Rasmlar", icon: "ImagePlus" },
      { to: "/admin/settings", label: "Sozlamalar", icon: "Settings" },
    ]],
  ];
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const groups = useNav();
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label="Admin menyu" className="space-y-5">
      {groups.map(([title, items]) => (
        <div key={title || "main"}>
          {title && <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">{title}</p>}
          <ul className="space-y-0.5">
            {items.map((it) => {
              const active = it.to === "/admin" ? path === "/admin" || path === "/admin/" : path.startsWith(it.to);
              return (
                <li key={it.to}>
                  <Link to={it.to} onClick={() => onNavigate?.()} aria-current={active ? "page" : undefined}
                    className={`flex min-h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}>
                    <Icon name={it.icon} className="size-[18px] shrink-0" />
                    <span className="truncate">{it.label}</span>
                    {!!it.badge && <span className="ml-auto rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">{it.badge}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const c = useContent();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const light = c.settings.adminTheme === "light";
  const logout = async () => { await signOut(); navigate({ to: "/admin/login", replace: true }); };

  return (
    <div className={`admin-root ${light ? "admin-light" : ""} min-h-dvh bg-background text-foreground`}>
      <a href="#admin-main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Asosiy qismga o'tish</a>

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col bg-surface lg:flex">
        <div className="flex h-16 items-center gap-2 px-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary font-display text-sm font-extrabold text-primary-foreground">AJ</span>
          <span className="font-display font-bold">Admin</span>
        </div>
        <div className="flex-1 overflow-y-auto p-3"><NavLinks /></div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-2 bg-background/80 px-3 backdrop-blur-xl sm:h-16 sm:px-6">
          <Button variant="ghost" className="size-10 rounded-xl lg:hidden" aria-label="Menyu" onClick={() => setOpen(true)}><Icons.Menu className="size-5" /></Button>
          <div className="ml-auto flex items-center gap-1">
            <a href="/" target="_blank" rel="noreferrer" className="flex h-10 items-center gap-2 rounded-xl px-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"><Icons.ExternalLink className="size-4" /><span className="hidden sm:inline">Saytni ochish</span></a>
            <Button variant="ghost" aria-label="Mavzuni almashtirish" onClick={() => setContent("settings", { ...c.settings, adminTheme: light ? "dark" : "light" })} className="size-10 rounded-xl">
              {light ? <Icons.Moon className="size-[18px]" /> : <Icons.Sun className="size-[18px]" />}
            </Button>
            <Button variant="ghost" aria-label="Chiqish" onClick={logout} className="size-10 rounded-xl"><Icons.LogOut className="size-[18px]" /></Button>
          </div>
        </header>
        <main id="admin-main" key={path} className="mx-auto w-full max-w-5xl px-4 pb-16 pt-4 sm:px-6 sm:pt-8">{children}</main>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className={`admin-root ${light ? "admin-light" : ""} w-[85vw] max-w-xs overflow-y-auto bg-surface p-4`}>
          <SheetTitle className="mb-4 font-display">Admin menyu</SheetTitle>
          <NavLinks onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
