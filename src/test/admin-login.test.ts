import { expect, it } from "vitest";
import { experienceYears } from "@/portfolio/data/homePresentation";

it("uses the requested three years of experience", () => {
  expect(experienceYears).toBe(3);
});
