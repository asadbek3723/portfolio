import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "../data/store";
import { collections } from "../collections";
import { PageTitle } from "../components/ui";
import { Icon } from "../components/AdminShell";

export function Dashboard() {
  const c = useContent();
  const unread = c.messages.filter((m) => !m.read).length;
  return (
    <>
      <PageTitle title={`Salom, ${c.profile.name.split(" ")[0]}`} subtitle="Saytingizni shu yerdan boshqaring." />

      <Link to="/admin/ai" className="mb-6 flex items-center gap-4 rounded-2xl bg-primary/10 p-5 transition-colors hover:bg-primary/15">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="size-5" /></span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-bold">AI bilan yaxshilash</span>
          <span className="block text-sm text-muted-foreground">Bir tugma bilan barcha matnlarni professional qiling va uch tilga tarjima qiling.</span>
        </span>
        <ArrowRight className="size-5 shrink-0 text-primary" />
      </Link>

      {unread > 0 && (
        <Button asChild variant="secondary" className="mb-6"><Link to="/admin/messages"><Inbox className="size-4" /> {unread} ta yangi xabar</Link></Button>
      )}

      <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Bo'limlar</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {collections.map((col) => (
          <Link key={col.key} to="/admin/content/$collection" params={{ collection: col.key }} className="rounded-2xl bg-card p-4 transition-colors hover:bg-accent">
            <Icon name={col.icon} className="size-5 text-primary" />
            <p className="mt-3 text-sm font-semibold">{col.label}</p>
            <p className="text-xs text-muted-foreground">{(c[col.key] as unknown[]).length} ta</p>
          </Link>
        ))}
      </div>
    </>
  );
}
