import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { DndContext, PointerSensor, KeyboardSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toast } from "sonner";
import { Plus, Search, GripVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { CollectionConfig } from "../collections";
import { useContent } from "../data/store";
import { repo, type AnyItem } from "../data/repository";
import { PageTitle } from "../components/ui";

export function CollectionList({ cfg }: { cfg: CollectionConfig }) {
  const c = useContent();
  const items = c[cfg.key] as unknown as AnyItem[];
  const [q, setQ] = useState("");
  const [confirm, setConfirm] = useState<AnyItem | null>(null);

  const visible = useMemo(() => items.filter((x) => !q || JSON.stringify(x).toLowerCase().includes(q.toLowerCase())), [items, q]);
  const canDrag = !q;
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
  const onDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const ids = items.map((x) => x.id);
    repo.reorder(cfg.key, arrayMove(ids, ids.indexOf(String(e.active.id)), ids.indexOf(String(e.over.id))));
  };

  const doDelete = (item: AnyItem) => {
    const before = items;
    const removed = repo.remove(cfg.key, [item.id]);
    const undo = () => {
      const keep = repo.list(cfg.key);
      const map = new Map([...keep, ...removed].map((x) => [x.id, x]));
      const merged = before.flatMap((x) => { const it = map.get(x.id); return it ? [it] : []; });
      repo.restore(cfg.key, removed);
      repo.reorder(cfg.key, merged.map((x) => x.id));
    };
    toast.success("O'chirildi", { duration: 5000, action: { label: "Qaytarish", onClick: undo } });
  };

  return (
    <>
      <PageTitle title={cfg.label} subtitle={`${items.length} ta ${cfg.singular}`}
        actions={<Button asChild><Link to="/admin/content/$collection/$id" params={{ collection: cfg.key, id: "new" }}><Plus className="size-4" /> Yangi {cfg.singular}</Link></Button>} />

      <div className="relative mb-4 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Qidirish…" aria-label="Qidirish" className="pl-9" />
      </div>

      {visible.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Hech narsa topilmadi.</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={visible.map((x) => x.id)} strategy={verticalListSortingStrategy} disabled={!canDrag}>
            <ul className="divide-y divide-border">
              {visible.map((x) => <Row key={x.id} x={x} cfg={cfg} canDrag={canDrag} onDelete={() => setConfirm(x)} />)}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <AlertDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>O'chirasizmi?</AlertDialogTitle>
            <AlertDialogDescription>{confirm ? cfg.title(confirm) : ""}. 5 soniya ichida "Qaytarish" bilan tiklashingiz mumkin.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => { if (confirm) doDelete(confirm); setConfirm(null); }}>O'chirish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function Row({ x, cfg, canDrag, onDelete }: { x: AnyItem; cfg: CollectionConfig; canDrag: boolean; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: x.id, disabled: !canDrag });
  const img = cfg.image?.(x);
  return (
    <li ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 py-3 ${isDragging ? "relative z-10 bg-accent shadow-lg" : ""}`}>
      <Button variant="ghost" {...attributes} {...listeners} aria-label="Sudrab tartiblash" disabled={!canDrag} className="flex w-6 cursor-grab touch-none justify-center text-muted-foreground disabled:cursor-not-allowed disabled:opacity-30">
        <GripVertical className="size-4" />
      </Button>
      <Link to="/admin/content/$collection/$id" params={{ collection: cfg.key, id: x.id }} className="flex min-w-0 flex-1 items-center gap-3">
        {img ? <img src={img} alt="" loading="lazy" className="size-12 shrink-0 rounded-lg object-cover" /> : null}
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{cfg.title(x)}</span>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            {cfg.subtitle && <span className="truncate">{cfg.subtitle(x)}</span>}
            {x._status === "draft" && <Badge variant="outline">Qoralama</Badge>}
          </span>
        </span>
      </Link>
      <Button size="icon" variant="ghost" className="size-9 text-muted-foreground hover:text-destructive" aria-label="O'chirish" onClick={onDelete}><Trash2 className="size-4" /></Button>
    </li>
  );
}
