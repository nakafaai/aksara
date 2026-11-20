import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("protein fold lab", () => {
  const { props } = assessmentVisuals.ProteinFoldLab;
  const lab = {
    ...card,
    conditions: ["normal", "heated"],
    labels: {
      bonds: {
        hydrogen: [text("Hydrogen")],
        hydrophobic: [text("Hydrophobic")],
        ionic: [text("Ionic")],
        peptide: [text("Peptide")],
      },
      condition: "Condition",
      conditions: { heated: "Heated", normal: "Normal" },
      holds: [text("Held by")],
      level: "Level",
      levels: { primary: "Primary", tertiary: "Tertiary" },
      no: [text("no")],
      parts: { chain: "Chain", haem: "Haem", helix: "Helix", sheet: "Sheet" },
      peptide: [text("Peptide bonds stay")],
      view: "A protein folding",
      works: [text("Still works")],
      yes: [text("yes")],
    },
    levels: ["primary", "tertiary"],
  };

  it("checks a lab whose levels and conditions are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses an unnamed level, a condition named but not shown, or a missing bond", () => {
    expect(
      failsStrict(props, {
        ...lab,
        levels: ["primary", "tertiary", "quaternary"],
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, conditions: ["normal"] })).toBe(true);
    const { ionic: _ionic, ...bonds } = lab.labels.bonds;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, bonds } })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("ProteinFoldLab", lab)).toEqual([]);
  });
});
