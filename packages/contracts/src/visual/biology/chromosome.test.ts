import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("chromosome packing lab", () => {
  const { props } = assessmentVisuals.ChromosomePackingLab;
  const lab = {
    ...card,
    basePairs: 248_956_422,
    labels: {
      length: [text("Stretched length")],
      level: "Level",
      levels: {
        chromosome: "Chromosome",
        helix: "Double helix",
        nucleosome: "Nucleosome",
      },
      parts: {
        base: "Base",
        centromere: "Centromere",
        chromatid: "Chromatid",
        histone: "Histone",
        phosphate: "Phosphate",
        sugar: "Sugar",
      },
      view: "DNA packing",
      width: [text("Width")],
    },
    levels: ["helix", "nucleosome", "chromosome"],
  };
  const { length: _length, ...quiz } = lab.labels;

  it("checks a lab with the length named, and one with it left out", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
  });

  it("refuses no base pairs, a fraction of one, or an unnamed level", () => {
    expect(failsStrict(props, { ...lab, basePairs: 0 })).toBe(true);
    expect(failsStrict(props, { ...lab, basePairs: 10.5 })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        levels: ["helix", "nucleosome", "chromosome", "fibre"],
      })
    ).toBe(true);
  });

  it("reads the length as answer state", () => {
    expect(answerState("ChromosomePackingLab", lab)).toEqual(["labels.length"]);
    expect(
      answerState("ChromosomePackingLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });
});
