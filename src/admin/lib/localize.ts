import type { Language } from "@/portfolio/types";

export type Path = (string | number)[];
export type Loc = { uz: string; en: string; ru: string };
export const LANGS: Language[] = ["uz", "en", "ru"];

export function isLocalized(v: unknown): v is Loc {
  if (!v || typeof v !== "object" || Array.isArray(v)) return false;
  const o = v as Record<string, unknown>;
  const keys = Object.keys(o);
  return keys.length === 3 && LANGS.every((l) => typeof o[l] === "string");
}

export function collectLocalized(value: unknown, path: Path = []): { path: Path; value: Loc }[] {
  if (isLocalized(value)) return [{ path, value }];
  if (Array.isArray(value)) return value.flatMap((v, i) => collectLocalized(v, [...path, i]));
  if (value && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([k]) => !k.startsWith("_"))
      .flatMap(([k, v]) => collectLocalized(v, [...path, k]));
  }
  return [];
}

export function sourceText(v: Loc, prefer: Language): string {
  for (const l of [prefer, ...LANGS]) if (v[l]?.trim()) return v[l];
  return "";
}

export function getAt(obj: unknown, path: Path): unknown {
  return path.reduce<unknown>((o, k) => (o == null ? o : (o as Record<string | number, unknown>)[k]), obj);
}

export function setAt<T>(obj: T, path: Path, value: unknown): T {
  if (path.length === 0) return value as T;
  const [head, ...rest] = path;
  if (head === undefined) return value as T;
  const src = (obj ?? (typeof head === "number" ? [] : {})) as Record<string | number, unknown>;
  const copy = (Array.isArray(src) ? [...src] : { ...src }) as Record<string | number, unknown>;
  copy[head] = setAt(src[head], rest, value);
  return copy as T;
}

export function completeness(value: unknown): Record<Language, number> & { total: number } {
  const all = collectLocalized(value);
  const out = { uz: 0, en: 0, ru: 0, total: all.length };
  for (const { value: v } of all) for (const l of LANGS) if (v[l]?.trim()) out[l]++;
  return out;
}

export const pathId = (p: Path) => p.join(".");
