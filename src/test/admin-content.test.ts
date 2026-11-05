import { beforeEach, describe, expect, it } from "vitest";
import { repo } from "@/admin/data/repository";
import { getContent, publishedItems, resetAll, setContent, importBackup, exportBackup } from "@/admin/data/store";
import { collectLocalized, setAt, sourceText } from "@/admin/lib/localize";

beforeEach(() => resetAll());
describe("Admin content", () => {
  it("creates, edits and deletes portfolio content", () => {
    const item = repo.create("faq", { id: "check", q: { uz: "Savol", en: "Question", ru: "Вопрос" }, a: { uz: "Javob", en: "Answer", ru: "Ответ" } }, "Savol");
    expect(getContent().faq.find((x) => x.id === "check")?.q.en).toBe("Question");
    repo.update("faq", { ...item, q: { uz: "Yangilandi", en: "Updated", ru: "Обновлено" } }, "Edit");
    expect(getContent().faq.find((x) => x.id === "check")?.q.en).toBe("Updated");
    repo.remove("faq", ["check"]);
    expect(getContent().faq.some((x) => x.id === "check")).toBe(false);
  });
  it("only exposes published items on the site", () => {
    expect(publishedItems([{ id: "a", _status: "draft" }, { id: "b", _status: "published" }]).map((x) => x.id)).toEqual(["b"]);
  });
  it("keeps content when reorder receives an empty or partial order", () => {
    const ids = repo.list("faq").map((x) => x.id);
    repo.reorder("faq", []);
    expect(repo.list("faq").map((x) => x.id)).toEqual(ids);
    repo.reorder("faq", ids.slice(-1));
    expect(repo.list("faq")).toHaveLength(ids.length);
    expect(repo.list("faq")[0]?.id).toBe(ids.at(-1));
  });
  it("uses the chosen source language and fills all three translation fields", () => {
    const value = { title: { uz: "Old", en: "New source", ru: "" } };
    expect(sourceText(value.title, "en")).toBe("New source");
    const translated = setAt(value, ["title"], { uz: "Yangi", en: "New", ru: "Новый" });
    expect(collectLocalized(translated)[0]?.value).toEqual({ uz: "Yangi", en: "New", ru: "Новый" });
    expect(value.title.uz).toBe("Old");
  });
  it("validates backups without replacing content on invalid input", () => {
    const backup = exportBackup();
    setContent("faq", []);
    importBackup(backup);
    expect(getContent().faq.length).toBeGreaterThan(0);
    expect(() => importBackup('{"faq":null}')).toThrow("invalid-backup");
    expect(getContent().faq.length).toBeGreaterThan(0);
  });
});