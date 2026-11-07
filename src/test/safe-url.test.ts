import { describe, expect, it } from "vitest";
import { jsonForScript, safeIso, safeUrl } from "@/lib/safe-url";

describe("safeUrl", () => {
  it("allows web, mail and phone links and in-app paths", () => {
    expect(safeUrl("https://example.org/a")).toBe("https://example.org/a");
    expect(safeUrl("mailto:a@b.uz")).toBe("mailto:a@b.uz");
    expect(safeUrl("tel:+998901234567")).toBe("tel:+998901234567");
    expect(safeUrl("/projects/x")).toBe("/projects/x");
    expect(safeUrl("#top")).toBe("#top");
  });
  it("blocks script-capable and malformed values", () => {
    expect(safeUrl("javascript:alert(1)")).toBe("#");
    expect(safeUrl(" JaVaScript:alert(1)")).toBe("#");
    expect(safeUrl("data:text/html,<b>x</b>")).toBe("#");
    expect(safeUrl("//evil.example")).toBe("#");
    expect(safeUrl("")).toBe("#");
    expect(safeUrl(undefined)).toBe("#");
  });
});

describe("jsonForScript / safeIso", () => {
  it("cannot be closed by content", () => {
    const out = jsonForScript({ a: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(JSON.parse(out).a).toBe("</script><script>alert(1)</script>");
  });
  it("returns undefined for unparseable dates", () => {
    expect(safeIso("not a date")).toBeUndefined();
    expect(safeIso("2026-05-03")).toBe("2026-05-03T00:00:00.000Z");
  });
});
