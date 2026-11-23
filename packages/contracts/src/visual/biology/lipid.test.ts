import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("lipid lab", () => {
  const { props } = assessmentVisuals.LipidLab;
  const lab = {
    ...card,
    chains: ["saturated", "unsaturated"],
    labels: {
      bilayer: [text("Bilayer")],
      chain: "Fatty acid",
      chains: { saturated: "Saturated", unsaturated: "Unsaturated" },
      droplet: [text("Droplet")],
      form: [text("Forms in water")],
      liquid: [text("Liquid")],
      molecule: "Molecule",
      molecules: { phospholipid: "Phospholipid", triglyceride: "Triglyceride" },
      parts: {
        ester: "Ester bond",
        fatty: "Fatty acid",
        glycerol: "Glycerol",
        head: "Head",
        kink: "Kink",
        phosphate: "Phosphate",
        tail: "Tail",
      },
      scale: "Scale",
      scales: { molecule: "One molecule", water: "In water" },
      solid: [text("Solid")],
      state: [text("At room temperature")],
      view: "Lipids",
    },
    molecules: ["triglyceride", "phospholipid"],
  };

  it("checks a lab whose molecules and chains are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses no molecule, a chain listed twice, or words for a molecule not shown", () => {
    expect(failsStrict(props, { ...lab, molecules: [] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, chains: ["saturated", "saturated"] })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, molecules: ["triglyceride"] })).toBe(
      true
    );
  });

  it("holds no answer state", () => {
    expect(answerState("LipidLab", lab)).toEqual([]);
  });
});
