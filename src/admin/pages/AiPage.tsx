import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Sparkles, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { translateContent } from "@/lib/translate.functions";
import { collections } from "../collections";
import { useContent, setContent, logHistory } from "../data/store";
import { LANGS, collectLocalized, pathId, setAt, sourceText, type Loc, type Path } from "../lib/localize";
import { PageTitle } from "../components/ui";

type Section = { key: string; label: string; count: number };
type Meta = { key: string; itemId: string; itemTitle: string; path: Path; before: Loc };
type Change = Meta & { id: string; after: Loc; on: boolean };

const ERR: Record<string, string> = {
  busy: "AI hozir band. Bir daqiqadan so'ng qayta urinib ko'ring.",
  credits: "AI kreditlari tugagan.",
  unavailable: "AI ulanmagan. Serverga LOVABLE_API_KEY yoki OPENAI_API_KEY qo'shing.",
  unauthorized: "Qayta kiring: admin sessiyasi topilmadi.",
  forbidden: "Bu amal faqat admin uchun.",
};

const CHUNK_CHARS = 6000;
const CHUNK_ITEMS = 25;

/** One page, one button: AI polishes every text and fills uz/en/ru, you review the changes and apply. */
export function AiPage() {
  const c = useContent();
  const run = useServerFn(translateContent);
  const sections = useMemo<Section[]>(() => {
    const list: Section[] = [{ key: "profile", label: "Profil", count: collectLocalized(c.profile).length }];
    for (const cfg of collections) list.push({ key: cfg.key, label: cfg.label, count: (c[cfg.key] as unknown[]).reduce<number>((n, x) => n + collectLocalized(x).length, 0) });
    return list.filter((s) => s.count > 0);
  }, [c]);
  const [picked, setPicked] = useState<string[] | null>(null);
  const active = picked ?? sections.map((s) => s.key);
  const [instruction, setInstruction] = useState("");
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [changes, setChanges] = useState<Change[] | null>(null);
  const busy = progress !== null;

  const toggle = (key: string) => setPicked(active.includes(key) ? active.filter((k) => k !== key) : [...active, key]);

  async function start() {
    const metas = new Map<string, Meta>();
    const entries: { id: string; text: string }[] = [];
    for (const s of sections.filter((x) => active.includes(x.key))) {
      const cfg = collections.find((x) => x.key === s.key);
      const items = s.key === "profile" ? [c.profile as unknown as Record<string, unknown>] : (c[s.key as "projects"] as unknown as Record<string, unknown>[]);
      for (const item of items) {
        const itemId = s.key === "profile" ? "profile" : String(item["id"]);
        const itemTitle = cfg ? cfg.title(item) : "Profil";
        for (const { path, value } of collectLocalized(item)) {
          const text = sourceText(value, "uz");
          if (!text.trim()) continue;
          const id = `${s.key}|${itemId}|${pathId(path)}`;
          metas.set(id, { key: s.key, itemId, itemTitle, path, before: value });
          entries.push({ id, text });
        }
      }
    }
    if (!entries.length) { toast.info("Yaxshilanadigan matn topilmadi."); return; }

    const chunks: { id: string; text: string }[][] = [];
    let cur: { id: string; text: string }[] = []; let size = 0;
    for (const e of entries) {
      if (cur.length && (size + e.text.length > CHUNK_CHARS || cur.length >= CHUNK_ITEMS)) { chunks.push(cur); cur = []; size = 0; }
      cur.push(e); size += e.text.length;
    }
    if (cur.length) chunks.push(cur);

    setChanges(null); setProgress({ done: 0, total: entries.length });
    const found: Change[] = [];
    try {
      let done = 0;
      for (const chunk of chunks) {
        const res = await run({ data: { entries: chunk, context: "Portfolio", mode: "improve", instruction } });
        if (!res.ok) { toast.error(ERR[res.error] ?? ERR["unavailable"]!); return; }
        for (const item of res.items) {
          const meta = metas.get(item.id);
          if (!meta) continue;
          const after = Object.fromEntries(LANGS.map((l) => [l, item[l]?.trim() ? item[l] : meta.before[l]])) as Loc;
          if (LANGS.some((l) => after[l].trim() !== meta.before[l].trim())) found.push({ ...meta, id: item.id, after, on: true });
        }
        done += chunk.length; setProgress({ done, total: entries.length });
      }
      setChanges(found);
      toast.success(found.length ? `${found.length} ta o'zgarish taklif qilindi. Ko'rib chiqing.` : "Hammasi allaqachon yaxshi holatda.");
    } catch {
      toast.error(ERR["unavailable"]);
    } finally { setProgress(null); }
  }

  function apply() {
    const chosen = (changes ?? []).filter((x) => x.on);
    if (!chosen.length) return;
    const now = new Date().toISOString();
    for (const key of [...new Set(chosen.map((x) => x.key))]) {
      const mine = chosen.filter((x) => x.key === key);
      const edit = <T,>(item: T) => mine.reduce((acc, ch) => setAt(acc, ch.path, ch.after), item);
      if (key === "profile") setContent("profile", edit(c.profile));
      else {
        const ids = new Set(mine.map((x) => x.itemId));
        const list = (c[key as "projects"] as unknown as Record<string, unknown>[]).map((item) => {
          if (!ids.has(String(item["id"]))) return item;
          const mineForItem = mine.filter((x) => x.itemId === String(item["id"]));
          return { ...mineForItem.reduce((acc, ch) => setAt(acc, ch.path, ch.after), item), _updatedAt: now };
        });
        setContent(key as "projects", list as never);
      }
    }
    logHistory({ action: "translate", collection: "ai", label: `AI ${chosen.length} ta matnni yaxshiladi` });
    toast.success(`${chosen.length} ta o'zgarish saqlandi`);
    setChanges(null);
  }

  const grouped = useMemo(() => {
    const map = new Map<string, Change[]>();
    for (const ch of changes ?? []) map.set(ch.key, [...(map.get(ch.key) ?? []), ch]);
    return [...map.entries()];
  }, [changes]);
  const chosenCount = (changes ?? []).filter((x) => x.on).length;

  return (
    <>
      <PageTitle eyebrow="AI" title="AI bilan yaxshilash" subtitle="Bitta tugma: AI barcha matnlarni professional qiladi, xatolarni tuzatadi va uz / en / ru tarjimalarini to'ldiradi. Siz o'zgarishlarni ko'rib chiqib qabul qilasiz." />

      <div className="max-w-3xl space-y-6">
        <section>
          <h2 className="mb-2 text-sm font-semibold">Nimani yaxshilaymiz?</h2>
          <div className="flex flex-wrap gap-2">
            {sections.map((s) => {
              const on = active.includes(s.key);
              return (
                <Button key={s.key} type="button" size="sm" variant={on ? "default" : "outline"} aria-pressed={on} disabled={busy} onClick={() => toggle(s.key)}>
                  {on && <Check className="size-3.5" />} {s.label}
                </Button>
              );
            })}
          </div>
        </section>

        <section>
          <label htmlFor="ai-note" className="mb-2 block text-sm font-semibold">Qo'shimcha ko'rsatma <span className="font-normal text-muted-foreground">(ixtiyoriy)</span></label>
          <Input id="ai-note" value={instruction} disabled={busy} onChange={(e) => setInstruction(e.target.value)} placeholder="Masalan: rasmiyroq va qisqaroq yoz" maxLength={300} />
        </section>

        <Button size="lg" onClick={start} disabled={busy || !active.length} className="h-12 w-full sm:w-auto">
          {busy ? <><Loader2 className="size-4 animate-spin" /> Yaxshilanmoqda… {progress ? `${progress.done}/${progress.total}` : ""}</> : <><Sparkles className="size-4" /> Hammasini yaxshilash</>}
        </Button>
      </div>

      {changes && (
        <section className="mt-10 max-w-4xl" aria-live="polite">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="font-display text-xl font-bold">Taklif qilingan o'zgarishlar</h2>
            <span className="text-sm text-muted-foreground">{chosenCount} / {changes.length} tanlandi</span>
            <div className="ml-auto flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setChanges(changes.map((x) => ({ ...x, on: chosenCount !== changes.length })))}>{chosenCount === changes.length ? "Hech birini" : "Hammasini"}</Button>
              <Button onClick={apply} disabled={!chosenCount}><Check className="size-4" /> Qabul qilish va saqlash</Button>
            </div>
          </div>
          {grouped.map(([key, list]) => (
            <div key={key} className="mb-6">
              <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-primary">{sections.find((s) => s.key === key)?.label ?? key}</h3>
              <ul className="divide-y divide-border">
                {list.map((ch) => (
                  <li key={ch.id} className="flex gap-3 py-4">
                    <Checkbox aria-label="Tanlash" checked={ch.on} onCheckedChange={(v) => setChanges((all) => (all ?? []).map((x) => (x.id === ch.id ? { ...x, on: v === true } : x)))} className="mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{ch.itemTitle} <span className="font-normal text-muted-foreground">· {pathId(ch.path)}</span></p>
                      <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-xs text-muted-foreground line-through decoration-muted-foreground/40">{ch.before.uz || ch.before.en || ch.before.ru}</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm">{ch.after.uz}</p>
                      <details className="mt-1 text-xs text-muted-foreground">
                        <summary className="cursor-pointer">EN va RU</summary>
                        <p className="mt-1 whitespace-pre-wrap">EN: {ch.after.en}</p>
                        <p className="mt-1 whitespace-pre-wrap">RU: {ch.after.ru}</p>
                      </details>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
