import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Record as Rec } from "effect";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

/** Plain words for every identifier, so a test names fixed parts in one line. */
function words(...ids: readonly string[]) {
  return Rec.fromEntries(Arr.map(ids, (id) => [id, id] as const));
}

describe("metamorphosis lab", () => {
  const { props } = assessmentVisuals.MetamorphosisLab;
  const lab = {
    ...card,
    insects: ["grasshopper"],
    labels: {
      insect: "Insect",
      insects: { grasshopper: "Grasshopper" },
      instar: [text("Instar")],
      length: [text("Length")],
      mass: [text("Mass")],
      moults: [text("Moults")],
      parts: words(
        "exoskeleton",
        "exuvia",
        "wingBud",
        "wing",
        "headCapsule",
        "leaf"
      ),
      stage: [text("Stage")],
      stages: words("egg", "nymph", "larva", "pupa", "adult"),
      time: "Time",
      view: "An insect on its food plant",
    },
  };

  it("checks a lab whose insects are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses no insect, an unknown one, or an unnamed one", () => {
    expect(failsStrict(props, { ...lab, insects: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, insects: ["beetle"] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, insects: ["grasshopper", "butterfly"] })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("MetamorphosisLab", lab)).toEqual([]);
  });
});
