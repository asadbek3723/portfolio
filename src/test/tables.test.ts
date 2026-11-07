import { describe, expect, it } from "vitest";
import { LIST_TABLES, itemToRow, rowToItem } from "@/admin/data/tables";

describe("tables mapping", () => {
  it("round-trips an item, keeping unlisted fields in extra", () => {
    const t = LIST_TABLES.find((x) => x.key === "faq")!;
    const item = { id: "q1", q: { uz: "S", en: "Q", ru: "В" }, a: { uz: "J", en: "A", ru: "О" }, customField: 7, _status: "draft" as const };
    const row = itemToRow(t, item, 3);
    expect(row["position"]).toBe(3);
    expect(row["status"]).toBe("draft");
    expect(row["extra"]).toEqual({ customField: 7 });
    expect(rowToItem(t, row)).toMatchObject({ id: "q1", customField: 7, _status: "draft" });
  });
  it("every list table has a unique table name", () => {
    const names = LIST_TABLES.map((t) => t.table);
    expect(new Set(names).size).toBe(names.length);
  });
});
