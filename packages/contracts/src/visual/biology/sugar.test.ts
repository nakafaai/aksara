import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("glycosidic bond lab", () => {
  const { props } = assessmentVisuals.GlycosidicBondLab;
  const lab = {
    ...card,
    labels: {
      bond: "Glycosidic bond",
      bonds: [text("Bonds")],
      monomers: {
        fructose: "Fructose",
        galactose: "Galactose",
        glucose: "Glucose",
      },
      polysaccharide: "Polysaccharide",
      polysaccharides: { starch: "Starch" },
      reaction: "Reaction",
      reactions: { condensation: "Condensation", hydrolysis: "Hydrolysis" },
      scale: "Scale",
      scales: { chain: "Chain", pair: "Pair" },
      sugar: "Sugar",
      sugars: { maltose: "Maltose", sucrose: "Sucrose" },
      units: "Units",
      view: "Sugars joining",
      water: [text("Water")],
    },
    polysaccharides: ["starch"],
    sugars: ["maltose", "sucrose"],
    units: { max: 12, min: 2, value: 2 },
  };

  it("checks a lab whose sugars and polysaccharides are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses an unnamed sugar, or a polysaccharide named but not shown", () => {
    expect(
      failsStrict(props, { ...lab, sugars: ["maltose", "sucrose", "lactose"] })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, polysaccharides: ["glycogen"] })).toBe(
      true
    );
  });

  it("refuses a chain shorter than two units, too long, or not whole", () => {
    expect(
      failsStrict(props, { ...lab, units: { max: 12, min: 1, value: 2 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, units: { max: 30, min: 2, value: 2 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, units: { max: 12, min: 2, value: 2.5 } })
    ).toBe(true);
  });

  it("reads the bond and water counts as answer state", () => {
    expect(answerState("GlycosidicBondLab", lab)).toEqual([
      "labels.bonds",
      "labels.water",
    ]);
  });
});
