import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("garden name lab", () => {
  const { props } = assessmentVisuals.GardenNameLab;
  const lab = {
    ...card,
    labels: {
      epithet: [text("Second word")],
      family: [text("Family")],
      genus: [text("Genus")],
      match: "Match",
      matches: { epithet: "Second word", genus: "First word" },
      plant: "Plant",
      plants: { mango: "Mango", neem: "Neem" },
      style: "Writing style",
      styles: { handwritten: "Handwritten", printed: "Printed" },
      view: "A school garden",
    },
    plants: ["mango", "neem"],
  };

  it("checks a garden whose plants are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses no plant, an unknown plant, or an unnamed one", () => {
    expect(failsStrict(props, { ...lab, plants: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, plants: ["durian"] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, plants: ["mango", "neem", "padi"] })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("GardenNameLab", lab)).toEqual([]);
  });
});
