import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Save, ArrowLeft, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Link } from "@/lib/router-compat";
import { blankItem, profileFields, type CollectionConfig, type Field } from "../collections";
import { repo, type AnyItem } from "../data/repository";
import { getContent, logHistory, setContent } from "../data/store";
import { FieldEditor } from "../components/FieldEditor";
import { PageTitle } from "../components/ui";
import { completeness } from "../lib/localize";

export function ContentEditor({ cfg, id }: { cfg?: CollectionConfig; id?: string }) {
  const navigate = useNavigate();
  const [value, setValue] = useState<Record<string, unknown>>(() => cfg ? structuredClone(id === "new" ? blankItem(cfg) : repo.get(cfg.key, id ?? "") ?? {}) : structuredClone(getContent().profile) as unknown as Record<string, unknown>);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const before = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    window.addEventListener("beforeunload", before);
    return () => window.removeEventListener("beforeunload", before);
  }, [dirty]);
  if (cfg && id !== "new" && !value["id"]) return <><PageTitle title="Element topilmadi" /><Button asChild><Link to={`/admin/content/${cfg.key}`}>Ro'yxatga qaytish</Link></Button></>;
  const fields = cfg?.fields ?? profileFields;
  const change = (next: Record<string, unknown>) => { setValue(next); setDirty(true); };
  const save = async () => {
    const missing = fields.find((f) => {
      if (f.optional) return false;
      if (f.type === "text") return !String(value[f.key] ?? "").trim();
      if (f.type === "localized") { const r = completeness(value[f.key]); return r.uz + r.en + r.ru === 0; }
      return false;
    });
    if (missing) { toast.error(`${missing.label} maydonini to'ldiring`); return; }
    if (cfg && "slug" in value) {
      const slug = String(value["slug"] ?? "");
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) { toast.error("Slug: kichik lotin harflari, raqam va tire ishlating"); return; }
      if (repo.list(cfg.key).some((x) => x["id"] !== value["id"] && x["slug"] === slug)) { toast.error("Bu manzil allaqachon mavjud"); return; }
    }
    setSaving(true);
    try {
      if (cfg) {
        const item = value as AnyItem;
        if (id === "new") {
          const created = repo.create(cfg.key, item, cfg.title(value));
          setDirty(false);
          await navigate({ to: "/admin/content/$collection/$id", params: { collection: cfg.key, id: created.id } });
        } else { repo.update(cfg.key, item, cfg.title(value)); setDirty(false); }
      } else { setContent("profile", value as unknown as ReturnType<typeof getContent>["profile"]); logHistory({ action: "update", collection: "profile", label: "Profil yangilandi" }); setDirty(false); }
      toast.success("Saqlandi");
    } catch { toast.error("Saqlanmadi. Qayta urinib ko‘ring."); }
    finally { setSaving(false); }
  };
  const root: Field = { key: "", label: "", type: "object", fields };
  return <>
    <Button asChild variant="ghost" size="sm" className="mb-1 -ml-2 sm:mb-3"><Link to={cfg ? `/admin/content/${cfg.key}` : "/admin"}><ArrowLeft className="size-4" /> Orqaga</Link></Button>
    <PageTitle eyebrow={cfg?.label ?? "Shaxsiy ma'lumot"} title={cfg ? id === "new" ? `Yangi ${cfg.singular}` : cfg.title(value) : "Profil"} actions={<>
      {cfg?.sitePath && id !== "new" && <Button asChild variant="outline" size="icon" title="Saytda ochish"><a href={cfg.sitePath(value)} target="_blank" rel="noreferrer"><ExternalLink className="size-4" /></a></Button>}
      <Button onClick={save} disabled={saving}><Save className="size-4" /> Saqlash</Button>
    </>} />
    {cfg && (
      <div className="mb-4 flex items-center gap-3 border-y border-border py-2 text-sm sm:mb-6 sm:py-3">
        <span className="text-xs text-muted-foreground">{dirty ? "Saqlanmagan o'zgarishlar" : "Barcha o'zgarishlar saqlangan"}</span>
        <label className="ml-auto flex items-center gap-2"><Switch checked={value["_status"] !== "draft"} onCheckedChange={(checked) => change({ ...value, _status: checked ? "published" : "draft" })} />{value["_status"] === "draft" ? "Qoralama" : "Chop etilgan"}</label>
      </div>
    )}
    <div className="max-w-4xl"><FieldEditor field={root} value={value} onChange={(v) => change(v as Record<string, unknown>)} path={[]} ctx={{ lang: "uz" }} /></div>
    <div className="sticky bottom-4 mt-6 flex justify-end md:static md:mt-8"><Button onClick={save} disabled={saving}><Save className="size-4" /> Saqlash</Button></div>
  </>;
}
