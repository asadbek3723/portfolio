import type { ReactNode } from "react";

export function PageTitle({ title, subtitle, actions, eyebrow }: { title: string; subtitle?: string; actions?: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:mb-8 sm:gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">{eyebrow}</p>}
        <h1 className="font-display text-xl font-extrabold tracking-tight sm:text-3xl 2xl:text-4xl">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ children, className = "", title, action }: { children: ReactNode; className?: string; title?: string; action?: ReactNode }) {
  return (
    <section className={`min-w-0 py-3 sm:py-7 ${className}`}>
      {(title || action) && (
        <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
          {title && <h2 className="font-display text-base font-bold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function LangDots({ c }: { c: { uz: number; en: number; ru: number; total: number } }) {
  if (!c.total) return null;
  return (
    <span className="inline-flex gap-1" aria-label="Tarjima holati">
      {(["uz", "en", "ru"] as const).map((l) => {
        const full = c[l] === c.total;
        return (
          <span key={l} title={`${l.toUpperCase()}: ${c[l]}/${c.total}`}
            className={`rounded px-1 font-mono text-[9px] font-bold ${full ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"}`}>
            {l.toUpperCase()}
          </span>
        );
      })}
    </span>
  );
}

export const timeAgo = (iso: string) => {
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return "hozirgina";
  if (s < 3600) return `${Math.floor(s / 60)} daqiqa oldin`;
  if (s < 86400) return `${Math.floor(s / 3600)} soat oldin`;
  return new Date(iso).toLocaleDateString("uz-UZ");
};
