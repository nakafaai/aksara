import { describe, expect, it } from "@effect/vitest";
import { Record as Rec } from "effect";

import { hasSameStructure, structureOf } from "#contracts/assessment/structure";

describe("structure of an interaction", () => {
  it("drops the labels, the text alternatives, and the units at every depth", () => {
    expect(
      structureOf({
        areas: [
          { id: "area-1", label: "Heart" },
          { id: "area-2", label: "Lung" },
        ],
        id: "organs",
        image: { alt: "A torso", height: 400, width: 300 },
        label: "Select",
        unit: "cm",
      })
    ).toEqual({
      areas: [{ id: "area-1" }, { id: "area-2" }],
      id: "organs",
      image: { height: 400, width: 300 },
    });
  });

  it("keeps identifiers, counts, bounds, flags, and the order of a list", () => {
    const value = {
      items: ["step-2", "step-1"],
      maxChoices: 3,
      minChoices: 0,
      shuffle: true,
      tolerance: null,
    };

    expect(structureOf(value)).toEqual(value);
    expect(structureOf("text")).toBe("text");
    expect(structureOf(7)).toBe(7);
    expect(structureOf(null)).toBeNull();
  });
});

describe("one structure", () => {
  it("accepts values that differ in words only, whatever order the keys were built in", () => {
    const reordered = Rec.fromEntries([
      [
        "options",
        [
          Rec.fromEntries([
            ["label", "Eins"],
            ["id", "x"],
          ]),
        ],
      ],
      ["label", "Eins"],
      ["id", "a"],
    ]);

    expect(Rec.keys(reordered)).toEqual(["options", "label", "id"]);
    expect(
      hasSameStructure([
        { id: "a", label: "One", options: [{ id: "x", label: "X" }] },
        reordered,
      ])
    ).toBe(true);
    expect(hasSameStructure([{ id: "a" }])).toBe(true);
  });

  it("rejects values whose identifiers, counts, flags, or order differ", () => {
    const first = {
      id: "a",
      options: [{ id: "x" }, { id: "y" }],
      shuffle: false,
    };

    for (const other of [
      { ...first, id: "b" },
      { ...first, options: [{ id: "x" }] },
      { ...first, options: [{ id: "y" }, { id: "x" }] },
      { ...first, shuffle: true },
      { ...first, extra: 1 },
    ]) {
      expect(hasSameStructure([first, other])).toBe(false);
    }
    expect(hasSameStructure([first, first, { ...first, shuffle: true }])).toBe(
      false
    );
  });
});
