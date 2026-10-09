import { describe, expect, it } from "@effect/vitest";

import { hasCanonicalOrder } from "#contracts/canonical";

const CANONICAL = ["en", "id", "de"];

describe("canonical order", () => {
  it.each([
    { canonical: true, name: "an empty list", values: [] },
    {
      canonical: true,
      name: "every member in order",
      values: ["en", "id", "de"],
    },
    { canonical: true, name: "a subset in order", values: ["en", "de"] },
    { canonical: true, name: "one member", values: ["id"] },
    {
      canonical: false,
      name: "two members out of order",
      values: ["id", "en"],
    },
    { canonical: false, name: "a repeated member", values: ["en", "en"] },
    {
      canonical: false,
      name: "a repeated member after another",
      values: ["en", "id", "en"],
    },
    {
      canonical: false,
      name: "a value outside the list",
      values: ["en", "fr"],
    },
    { canonical: false, name: "only a value outside the list", values: ["fr"] },
  ])("is $canonical for $name", ({ values, canonical }) => {
    expect(hasCanonicalOrder(CANONICAL, values)).toBe(canonical);
  });
});
