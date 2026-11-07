// Repository interface used by the admin. Reads and writes go through the content store,
// which syncs to Supabase (see store.ts, remote.ts and supabase/migrations).
import { getContent, logHistory, setContent, type ListKey } from "./store";

export type AnyItem = { id: string; _status?: "published" | "draft"; _updatedAt?: string; [k: string]: unknown };

export interface Repository {
  list(key: ListKey): AnyItem[];
  get(key: ListKey, id: string): AnyItem | undefined;
  create(key: ListKey, item: AnyItem, label: string): AnyItem;
  update(key: ListKey, item: AnyItem, label: string): void;
  remove(key: ListKey, ids: string[]): AnyItem[];
  restore(key: ListKey, items: AnyItem[], index?: number): void;
  reorder(key: ListKey, ids: string[]): void;
}

const arr = (key: ListKey) => getContent()[key] as unknown as AnyItem[];
const save = (key: ListKey, items: AnyItem[]) => setContent(key, items as never);

export const localRepository: Repository = {
  list: (key) => arr(key),
  get: (key, id) => arr(key).find((x) => x.id === id),
  create(key, item, label) {
    const next = { ...item, id: item.id || crypto.randomUUID(), _updatedAt: new Date().toISOString() };
    save(key, [next, ...arr(key)]);
    logHistory({ action: "create", collection: key, label });
    return next;
  },
  update(key, item, label) {
    save(key, arr(key).map((x) => (x.id === item.id ? { ...item, _updatedAt: new Date().toISOString() } : x)));
    logHistory({ action: "update", collection: key, label });
  },
  remove(key, ids) {
    const removed = arr(key).filter((x) => ids.includes(x.id));
    save(key, arr(key).filter((x) => !ids.includes(x.id)));
    logHistory({ action: "delete", collection: key, label: `${removed.length} ta` });
    return removed;
  },
  restore(key, items) {
    save(key, [...items, ...arr(key)]);
    logHistory({ action: "restore", collection: key, label: `${items.length} ta` });
  },
  reorder(key, ids) {
    const map = new Map(arr(key).map((x) => [x.id, x]));
    const ordered = ids.flatMap((id) => { const item = map.get(id); if (!item) return []; map.delete(id); return [item]; });
    save(key, [...ordered, ...map.values()]);
    logHistory({ action: "reorder", collection: key, label: "tartib" });
  },
};

export const repo: Repository = localRepository;
