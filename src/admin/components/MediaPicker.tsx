import { useMemo, useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useContent, setContent, getContent, isRemote, type MediaAsset } from "../data/store";

export const MAX_UPLOAD = 1_500_000;

/** Every image path used anywhere in site content + uploaded assets. */
export function useAllImages() {
  const c = useContent();
  return useMemo(() => {
    const found = new Set<string>();
    const walk = (v: unknown) => {
      if (typeof v === "string") { if (/^(\/|https?:|data:image)/.test(v) && /\.(jpe?g|png|webp|gif|svg|avif)($|\?)|^data:image/i.test(v)) found.add(v); }
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    walk({ ...c, media: [], history: [] });
    return { uploads: c.media, site: [...found] };
  }, [c]);
}

const readAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const r = new FileReader();
  r.onload = () => resolve(String(r.result));
  r.onerror = () => reject(r.error);
  r.readAsDataURL(file);
});

/** Stores each image in Supabase Storage (public URL); falls back to an inline data URL offline/in tests. */
async function toAsset(file: File): Promise<MediaAsset> {
  const base = { id: crypto.randomUUID(), name: file.name, size: file.size, createdAt: new Date().toISOString() };
  if (isRemote) {
    const { uploadMedia } = await import("../data/remote");
    const { src, path } = await uploadMedia(file);
    return { ...base, src, path };
  }
  return { ...base, src: await readAsDataUrl(file) };
}

export function uploadFiles(files: FileList | File[]) {
  return Promise.all([...files].map(async (file) => {
    if (!file.type.startsWith("image/")) return void toast.error(`${file.name}: faqat rasm`);
    if (file.size > MAX_UPLOAD) return void toast.error(`${file.name}: 1.5 MB dan katta`);
    try {
      const asset = await toAsset(file);
      setContent("media", [asset, ...getContent().media]);
      toast.success(`${file.name} yuklandi`);
    } catch (e) {
      console.error("Upload failed", e);
      toast.error(`${file.name}: yuklab bo'lmadi`);
    }
  }));
}

/** Removes an uploaded asset from the library and, when it lives in Storage, from the bucket. */
export async function deleteAsset(id: string) {
  const asset = getContent().media.find((m) => m.id === id);
  if (!asset) return;
  setContent("media", getContent().media.filter((m) => m.id !== id));
  if (asset.path && isRemote) {
    try { await (await import("../data/remote")).removeMedia(asset.path); }
    catch (e) { console.error("Storage delete failed", e); }
  }
}

export function MediaPicker({ open, onOpenChange, onPick }: { open: boolean; onOpenChange: (o: boolean) => void; onPick: (src: string) => void }) {
  const { uploads, site } = useAllImages();
  const [q, setQ] = useState("");
  const items = [...uploads.map((u) => ({ src: u.src, name: u.name })), ...site.map((s) => ({ src: s, name: s.split("/").pop() ?? s }))]
    .filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-3xl overflow-hidden p-4 sm:p-6">
        <DialogHeader><DialogTitle>Rasm tanlash</DialogTitle></DialogHeader>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input placeholder="Qidirish…" value={q} onChange={(e) => setQ(e.target.value)} />
          <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground">
            <Upload className="size-4" /> Yuklash
            <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => e.target.files && uploadFiles(e.target.files)} />
          </label>
        </div>
        <div className="grid max-h-[60dvh] grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4 md:grid-cols-5">
          {items.map((i) => (
            <button key={i.src} type="button" onClick={() => onPick(i.src)} className="group overflow-hidden rounded-lg border border-border text-left hover:border-primary focus-visible:border-primary">
              <img src={i.src} alt={i.name} loading="lazy" className="aspect-square w-full object-cover transition-transform group-hover:scale-105" />
              <span className="block truncate px-1.5 py-1 text-[10px] text-muted-foreground">{i.name}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
