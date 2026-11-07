import { defaultStats } from "@/portfolio/data/homePresentation";
// Content store used by the site and the admin. Default content comes from portfolioData; the published
// database content (delivered with the server-rendered page, or fetched by remote.ts) overrides it.
// In the browser localStorage is only a cache; in tests it is the whole store (REMOTE is off).
import { useSyncExternalStore } from "react";
import * as seed from "@/portfolio/data/portfolioData";
import type { Message } from "@/portfolio/types";
import type { RemoteMessage } from "./remote";

const REMOTE = typeof window !== "undefined" && import.meta.env.MODE !== "test";
export const isRemote = REMOTE;
const remote = () => import("./remote");
function reportError(e: unknown) {
  console.error("Content sync failed", e);
  const err = e as { code?: string; message?: string };
  const denied = err?.code === "42501" || err?.code === "PGRST301" || /permission|jwt|row-level/i.test(err?.message ?? "");
  const msg = denied
    ? "Bazaga saqlab bo‘lmadi. Kirish huquqingizni tekshiring."
    : `Bazaga saqlab bo‘lmadi${err?.message ? `: ${err.message}` : "."} O‘zgarishlar bekor qilindi.`;
  void import("sonner").then(({ toast }) => toast.error(msg));
}

// Remote saves run one at a time, in order, so a slow older save can never land after a newer one.
let saveQueue: Promise<void> = Promise.resolve();
let pendingSaves = 0;

export type Status = "published" | "draft";
export type Meta = { _status?: Status; _updatedAt?: string };

export interface MediaAsset { id: string; name: string; src: string; size: number; createdAt: string; /** Storage object path; absent for legacy inline (data URL) uploads. */ path?: string }
export interface HistoryEntry { id: string; at: string; who: string; action: "create" | "update" | "delete" | "reorder" | "translate" | "settings" | "restore"; collection: string; label: string }
export interface SeoEntry { title: string; description: string; image: string }
export interface SiteSettings {
  siteName: string;
  defaultLang: "uz" | "en" | "ru";
  hiddenSections: string[];
  adminTheme: "dark" | "light";
}

export const LIST_KEYS = [
  "projects", "services", "blog", "skills", "certificates", "achievements", "events",
  "gallery", "testimonials", "faq", "timeline", "uses",
] as const;
export type ListKey = (typeof LIST_KEYS)[number];

function buildDefaults() {
  return {
    profile: { ...seed.profileData, stats: seed.profileData.stats ?? defaultStats },
    projects: seed.projectsData,
    services: seed.servicesData,
    blog: seed.blogData,
    skills: seed.skillsData,
    certificates: seed.certificatesData,
    achievements: seed.achievementsData,
    events: seed.eventsData,
    gallery: seed.galleryData,
    testimonials: seed.testimonialsData,
    faq: seed.faqData,
    timeline: seed.timelineData,
    uses: seed.usesData,
    messages: [] as Message[],
    media: [] as MediaAsset[],
    history: [] as HistoryEntry[],
    seo: {} as Record<string, SeoEntry>,
    settings: { siteName: "Asadbek Jumanazarov", defaultLang: "uz", hiddenSections: [], adminTheme: "dark" } as SiteSettings,
  };
}
export type Content = ReturnType<typeof buildDefaults>;

const STORAGE_KEY = "admin-content-v1";
let defaults: Content | null = null;
const getDefaults = () => (defaults ??= buildDefaults());

let current: Content | null = null;
const listeners = new Set<() => void>();

// Published content delivered with the server-rendered page (see hydrateContent): the base for both the
// server snapshot and the first client render, so there is no seed -> database flash.
let ssrBase: Content | null = null;
let ssrRaw: unknown = null;
export function hydrateContent(raw: Record<string, unknown> | undefined | null) {
  if (!raw || raw === ssrRaw || !Object.keys(raw).length) return;
  ssrRaw = raw;
  ssrBase = { ...getDefaults(), ...(raw as Partial<Content>) };
}
const serverSnapshot = () => ssrBase ?? getDefaults();

function load(): Content {
  if (typeof window === "undefined") return serverSnapshot();
  if (current) return current;
  const base = serverSnapshot();
  try {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    current = raw ? { ...base, ...(JSON.parse(raw) as Partial<Content>) } : base;
  } catch {
    current = base;
  }
  return current;
}

function persist(next: Content) {
  const base = getDefaults();
  const diff: Partial<Content> = {};
  (Object.keys(next) as (keyof Content)[]).forEach((k) => {
    if (next[k] !== base[k]) (diff as Record<string, unknown>)[k] = next[k];
  });
  // In remote mode localStorage is only a cache: never store the inbox (personal data) in it,
  // and a full/blocked storage must not stop the database save.
  if (REMOTE) delete diff.messages;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(diff));
  } catch {
    if (!REMOTE) throw new Error("storage-full");
  }
  const prev = current ?? base;
  current = next;
  listeners.forEach((l) => l());
  if (REMOTE) {
    const changed = (Object.keys(next) as (keyof Content)[]).filter((k) => k !== "messages" && next[k] !== prev[k]);
    pendingSaves++;
    saveQueue = saveQueue.then(async () => {
      try {
        const r = await remote();
        await r.saveKeys(changed.map((k) => [k, next[k]]));
        if (next.messages !== prev.messages) await r.syncMessages(prev.messages as unknown as RemoteMessage[], next.messages as unknown as RemoteMessage[]);
      } catch (e) {
        reportError(e); // local state is now ahead of the database; the refresh below restores the truth
      } finally {
        pendingSaves--;
        if (pendingSaves === 0) void refreshContent();
      }
    });
  }
}

let syncing = false;
/** Pull the latest content (and messages, for admins) from the database. */
export async function refreshContent() {
  if (!REMOTE) return;
  // A refresh while edits are still being saved would overwrite them with stale rows;
  // the queue triggers one refresh when it drains.
  if (pendingSaves > 0) return;
  try {
    const r = await remote();
    const [rows, msgs] = await Promise.all([r.fetchContent(), r.fetchMessages()]);
    if (pendingSaves > 0) return;
    const next = { ...getDefaults(), ...(rows as Partial<Content>), messages: (msgs ?? current?.messages ?? []) as unknown as Message[] }; // a failed inbox fetch must not look like an empty inbox
    current = next;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows)); } catch { /* cache only */ }
    listeners.forEach((l) => l());
  } catch (e) { console.error("Content load failed", e); }
}
function startSync() {
  if (!REMOTE || syncing) return;
  syncing = true;
  void refreshContent();
  void remote().then((r) => r.watchContent(() => void refreshContent()));
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  startSync();
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) { current = null; cb(); }
  };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(cb); window.removeEventListener("storage", onStorage); };
}

export const getContent = () => load();
export const getDefaultContent = () => getDefaults();

export function useContent(): Content {
  return useSyncExternalStore(subscribe, load, serverSnapshot);
}

export function setContent<K extends keyof Content>(key: K, value: Content[K]) {
  persist({ ...load(), [key]: value });
}

export function logHistory(e: Omit<HistoryEntry, "id" | "at" | "who">) {
  const entry: HistoryEntry = { ...e, id: crypto.randomUUID(), at: new Date().toISOString(), who: "admin" };
  setContent("history", [entry, ...load().history].slice(0, 300));
}

export function exportBackup(): string {
  return JSON.stringify(load(), null, 2);
}
export function importBackup(json: string) {
  const value: unknown = JSON.parse(json);
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid-backup");
  const parsed = value as Partial<Content>;
  if (!parsed.profile || typeof parsed.profile.name !== "string" || !parsed.settings || LIST_KEYS.some((key) => !Array.isArray(parsed[key]))) throw new Error("invalid-backup");
  // Backups never carry the inbox; keep the current messages so an import cannot delete them.
  persist({ ...getDefaults(), ...parsed, messages: load().messages });
}
export function resetAll() {
  if (REMOTE) { persist({ ...getDefaults(), messages: load().messages }); return; }
  window.localStorage.removeItem(STORAGE_KEY);
  current = null;
  listeners.forEach((l) => l());
}

/** Content the public site renders: drafts removed. */
export function useSiteData() {
  const c = useContent();
  const pub = publishedItems;
  return {
    profileData: c.profile,
    projectsData: pub(c.projects),
    servicesData: pub(c.services),
    blogData: pub(c.blog),
    skillsData: pub(c.skills),
    certificatesData: pub(c.certificates),
    achievementsData: pub(c.achievements),
    eventsData: pub(c.events),
    galleryData: pub(c.gallery),
    testimonialsData: pub(c.testimonials),
    faqData: pub(c.faq),
    timelineData: pub(c.timeline),
    usesData: pub(c.uses),
    settings: c.settings,
  };
}

/** Nav keys whose collection has nothing published, so links to them can be hidden. */
export function useEmptySections(): string[] {
  const d = useSiteData();
  const empty: string[] = [];
  if (!d.achievementsData.length) empty.push("achievements");
  if (!d.eventsData.length) empty.push("events");
  if (!d.galleryData.length) empty.push("gallery");
  if (!d.testimonialsData.length) empty.push("testimonials");
  return empty.length ? empty : NONE;
}
const NONE: string[] = [];

export function publishedItems<T>(arr: T[]): T[] {
  return arr.filter((x) => (x as Meta)._status !== "draft");
}

export async function addMessage(m: Omit<Message, "id" | "date" | "read"> & { website?: string }) {
  if (REMOTE) {
    // Goes through a server function (rate limit + honeypot + validation) instead of a direct anon insert.
    const { sendContactMessage } = await import("@/lib/contact.functions");
    const res = await sendContactMessage({ data: m });
    if (!res.ok) throw new Error(res.error);
    return;
  }
  const { website: _website, ...m2 } = m;
  if (_website) return;
  setContent("messages", [{ ...m2, id: crypto.randomUUID(), date: new Date().toISOString(), read: false }, ...load().messages]);
}
