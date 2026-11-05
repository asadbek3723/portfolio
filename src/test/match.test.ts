import { describe, expect, it } from "vitest";
import { filterMatches } from "@/lib/match.server";

describe("AI match results", () => {
  it("drops slugs that are not real services or projects", () => {
    const out = filterMatches([{ slug: "fake", reason: "x" }, { slug: "real", reason: "y" }], new Set(["real"]));
    expect(out.map((o) => o.slug)).toEqual(["real"]);
  });

  it("returns at most 3 suggestions, without duplicates", () => {
    const allowed = new Set(["a", "b", "c", "d"]);
    const items = ["a", "a", "b", "c", "d"].map((slug) => ({ slug, reason: "r" }));
    expect(filterMatches(items, allowed).map((o) => o.slug)).toEqual(["a", "b", "c"]);
  });
});
