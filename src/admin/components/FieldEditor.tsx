import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, ImageIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Field } from "../collections";
import { blankFor } from "../collections";
import type { Language } from "@/portfolio/types";
import { pathId, type Loc, type Path } from "../lib/localize";
import { MediaPicker } from "./MediaPicker";

export interface EditorCtx { lang: Language }

const LANG_LABEL: Record<Language, string> = { uz: "UZ", en: "EN", ru: "RU" };

export function FieldEditor({ field, value, onChange, path, ctx }: {
  field: Field; value: unknown; onChange: (v: unknown) => void; path: Path; ctx: EditorCtx;
}) {
  const id = `f-${pathId(path)}`;
  const label = field.label ? (
    <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{field.label}</label>
  ) : null;

  switch (field.type) {
    case "localized":
      return <LocalizedInput id={id} label={field.label} value={value as Loc | undefined} multiline={field.multiline} onChange={onChange} path={path} ctx={ctx} optional={field.optional} />;
    case "textarea":
      return <div>{label}<Textarea id={id} rows={5} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} /></div>;
    case "number":
      return <div>{label}<Input id={id} type="number" inputMode="decimal" value={Number(value ?? 0)} onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))} /></div>;
    case "boolean":
      return (
        <div className="flex min-h-10 items-center justify-between gap-3 rounded-xl bg-background/40 px-4 py-2">
          <label htmlFor={id} className="text-sm font-medium">{field.label}</label>
          <Switch id={id} checked={Boolean(value)} onCheckedChange={onChange} />
        </div>
      );
    case "select":
      return (
        <div>{label}
          <select id={id} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} className="h-10 w-full rounded-md bg-muted/40 px-3 text-sm">
            {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      );
    case "image":
      return <ImageInput id={id} label={field.label} value={(value as string) ?? ""} onChange={onChange} />;
    case "tags":
      return <TagsInput id={id} label={field.label} value={(value as string[]) ?? []} onChange={onChange} />;
    case "object": {
      if (value == null) {
        return (
          <div className="rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold">{field.label}</span>
              <Button type="button" size="sm" variant="secondary" onClick={() => onChange(blankFor({ ...field, optional: false }))}><Plus className="size-4" /> Qo'shish</Button>
            </div>
          </div>
        );
      }
      const obj = value as Record<string, unknown>;
      return (
        <fieldset className={field.label ? "space-y-3 py-2 sm:space-y-4 sm:py-5" : ""}>
          {field.label && (
            <legend className="flex w-full items-center justify-between gap-2 px-1 text-sm font-semibold">
              <span>{field.label}</span>
              {field.optional && <Button type="button" size="sm" variant="ghost" className="text-destructive" onClick={() => onChange(undefined)}><Trash2 className="size-4" /></Button>}
            </legend>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {(field.fields ?? []).map((sub) => (
              <div key={sub.key} className={sub.wide || sub.type === "object" || sub.type === "array" ? "md:col-span-2" : ""}>
                {sub.optional && obj[sub.key] === undefined && sub.type !== "object" ? (
                  <Button variant="ghost" type="button" onClick={() => onChange({ ...obj, [sub.key]: blankFor(sub) })} className="flex h-10 w-full items-center gap-2 rounded-xl bg-muted/30 px-4 text-sm text-muted-foreground hover:text-foreground">
                    <Plus className="size-4" /> {sub.label}
                  </Button>
                ) : (
                  <FieldEditor field={sub} value={obj[sub.key]} path={[...path, sub.key]} ctx={ctx} onChange={(v) => onChange({ ...obj, [sub.key]: v })} />
                )}
              </div>
            ))}
          </div>
        </fieldset>
      );
    }
    case "array": {
      const list = (value as unknown[]) ?? [];
      const item = field.item;
      if (!item) return null;
      const move = (i: number, d: number) => {
        const j = i + d; if (j < 0 || j >= list.length) return;
        const n = [...list]; [n[i], n[j]] = [n[j], n[i]]; onChange(n);
      };
      return (
        <div className="space-y-3 py-2 sm:space-y-4 sm:py-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-sm font-semibold">{field.label} <Badge variant="secondary" className="ml-1">{list.length}</Badge></span>
            <Button type="button" size="sm" variant="secondary" onClick={() => onChange([...list, blankFor(item)])}><Plus className="size-4" /> Qo'shish</Button>
          </div>
          <div className="space-y-3">
            {list.map((v, i) => (
              <div key={i} className="flex gap-2 rounded-lg bg-muted/30 p-3 sm:p-4">
                <div className="min-w-0 flex-1">
                  <FieldEditor field={{ ...item, label: "" }} value={v} path={[...path, i]} ctx={ctx} onChange={(nv) => { const n = [...list]; n[i] = nv; onChange(n); }} />
                </div>
                <div className="flex shrink-0 flex-col gap-1">
                  <Button type="button" size="icon" variant="ghost" className="size-8" aria-label="Yuqoriga" onClick={() => move(i, -1)}><ChevronUp className="size-4" /></Button>
                  <Button type="button" size="icon" variant="ghost" className="size-8" aria-label="Pastga" onClick={() => move(i, 1)}><ChevronDown className="size-4" /></Button>
                  <Button type="button" size="icon" variant="ghost" className="size-8 text-destructive" aria-label="O'chirish" onClick={() => onChange(list.filter((_, k) => k !== i))}><Trash2 className="size-4" /></Button>
                </div>
              </div>
            ))}
            {!list.length && <p className="text-sm text-muted-foreground">Hali hech narsa yo'q.</p>}
          </div>
        </div>
      );
    }
    default:
      return <div>{label}<Input id={id} type={field.type === "url" ? "url" : field.type === "email" ? "email" : field.type === "date" ? "date" : "text"} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} /></div>;
  }
}

function LocalizedInput({ id, label, value, multiline, onChange, path, ctx, optional }: {
  id: string; label: string; value: Loc | undefined; multiline?: boolean | undefined; onChange: (v: unknown) => void; path: Path; ctx: EditorCtx; optional?: boolean | undefined;
}) {
  const [tab, setTab] = useState<Language>(ctx.lang);
  const v = value ?? { uz: "", en: "", ru: "" };
  const Comp = multiline ? Textarea : Input;
  return (
    <div>
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
        {label ? <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label> : <span />}
        <div className="flex items-center gap-1">
          <div role="tablist" className="flex rounded-lg bg-muted/40 p-0.5">
            {(["uz", "en", "ru"] as Language[]).map((l) => (
              <Button variant="ghost" key={l} type="button" role="tab" aria-selected={tab === l} onClick={() => setTab(l)}
                className={`relative min-h-7 min-w-9 rounded-md px-2 text-[11px] font-bold transition-colors ${tab === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {LANG_LABEL[l]}
                {!v[l]?.trim() && <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-destructive" aria-label="bo'sh" />}
              </Button>
            ))}
          </div>
          {optional && <Button type="button" size="icon" variant="ghost" className="size-8" aria-label="Olib tashlash" onClick={() => onChange(undefined)}><X className="size-4" /></Button>}
        </div>
      </div>
      <Comp id={id} {...(multiline ? { rows: 6 } : {})} value={v[tab] ?? ""} placeholder={`${LANG_LABEL[tab]} tilida yozing…`}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...v, [tab]: e.target.value })} />
    </div>
  );
}

function ImageInput({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: unknown) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {label && <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>}
      <div className="flex items-center gap-2">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
          {value ? <img src={value} alt="" className="size-full object-cover" /> : <ImageIcon className="size-4 text-muted-foreground" />}
        </div>
        <Input id={id} value={value} placeholder="/assets/… yoki https://…" onChange={(e) => onChange(e.target.value)} className="min-w-0" />
        <Button type="button" variant="secondary" onClick={() => setOpen(true)}>Tanlash</Button>
      </div>
      <MediaPicker open={open} onOpenChange={setOpen} onPick={(src) => { onChange(src); setOpen(false); }} />
    </div>
  );
}

function TagsInput({ id, label, value, onChange }: { id: string; label: string; value: string[]; onChange: (v: unknown) => void }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const parts = draft.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) onChange([...value, ...parts.filter((p) => !value.includes(p))]);
    setDraft("");
  };
  return (
    <div>
      {label && <label htmlFor={id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>}
      <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-md bg-background px-2 py-1.5">
        {value.map((t) => (
          <Badge key={t} variant="secondary" className="gap-1">{t}
            <Button variant="ghost" type="button" aria-label={`${t} ni o'chirish`} onClick={() => onChange(value.filter((x) => x !== t))}><X className="size-3" /></Button>
          </Badge>
        ))}
        <input id={id} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={add}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); } else if (e.key === "Backspace" && !draft && value.length) onChange(value.slice(0, -1)); }}
          placeholder="Yozing va Enter" className="min-w-24 flex-1 bg-transparent text-sm outline-none" />
      </div>
    </div>
  );
}
