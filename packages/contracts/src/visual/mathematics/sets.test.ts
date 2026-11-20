import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";
import { RichTextSchema } from "#contracts/assessment/inline";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState } from "#contracts/visual/catalog";
import { setVisuals } from "#contracts/visual/mathematics/sets";

const sets = setVisuals(RichTextSchema);

describe("VennSortLab", () => {
  const lab = {
    description: [text("Each hoop gathers the objects with one property.")],
    labels: {
      count: [text("Number of objects")],
      members: [text("Objects selected")],
      operation: "Operation",
      viewLabel: "A mat with three hoops and everyday objects",
    },
    objects: [
      { name: "red ball", object: "red-ball" },
      { name: "apple", object: "apple" },
      { name: "steel ball", object: "steel-ball" },
      { name: "blue cup", object: "blue-cup" },
    ],
    operations: ["intersection", "union", "triple-intersection"],
    sets: [
      { attribute: "red", name: "red objects" },
      { attribute: "ball", name: "balls" },
      { attribute: "plastic", name: "plastic objects" },
    ],
    showCount: true,
    title: [text("Sorting objects into sets")],
  };
  /** Whether the lab refuses its props with one change applied. */
  const fails = (change: object) =>
    failsStrict(sets.VennSortLab.props, { ...lab, ...change });

  it("takes the hoops, the objects and the operations to offer", () => {
    expect(decodeStrict(sets.VennSortLab.props, lab)).toEqual(lab);
    const twoHoops = {
      ...lab,
      operations: ["complement", "difference"],
      sets: Arr.take(lab.sets, 2),
    };
    expect(decodeStrict(sets.VennSortLab.props, twoHoops)).toEqual(twoHoops);
  });

  it("refuses one hoop, four hoops, and a repeated object, attribute or operation", () => {
    expect(fails({ sets: Arr.take(lab.sets, 1) })).toBe(true);
    expect(
      fails({ sets: [...lab.sets, { attribute: "wood", name: "wooden" }] })
    ).toBe(true);
    expect(
      fails({ objects: [...lab.objects, { name: "apple", object: "apple" }] })
    ).toBe(true);
    expect(
      fails({ sets: [lab.sets[0], { attribute: "red", name: "again" }] })
    ).toBe(true);
    expect(fails({ operations: ["union", "union"] })).toBe(true);
  });

  it("refuses an operation that names C when only two hoops are laid out", () => {
    expect(
      fails({ operations: ["union-with-pair"], sets: Arr.take(lab.sets, 2) })
    ).toBe(true);
  });

  it("holds the count and the selected objects as answer state", () => {
    expect(answerState("VennSortLab", lab)).toEqual(["showCount"]);
    expect(answerState("VennSortLab", { ...lab, showCount: false })).toEqual(
      []
    );
  });
});
