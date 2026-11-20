import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

describe("mitochondrion lab", () => {
  const { props } = assessmentVisuals.MitochondrionLab;
  const lab = {
    ...card,
    atp: 36,
    cells: ["muscle", "yeast"],
    labels: {
      atp: [text("ATP per glucose")],
      carbonDioxide: [text("Carbon dioxide per glucose")],
      cell: "Cell without oxygen",
      cells: { muscle: "Muscle cell", yeast: "Yeast cell" },
      oxygen: "Oxygen",
      oxygens: { absent: "Absent", present: "Present" },
      parts: {
        cristae: "Cristae",
        cytoplasm: "Cytoplasm",
        inner: "Inner membrane",
        matrix: "Matrix",
        outer: "Outer membrane",
      },
      product: [text("End products")],
      products: {
        aerobic: [text("Carbon dioxide and water")],
        alcoholic: [text("Ethanol and carbon dioxide")],
        lactic: [text("Lactic acid")],
      },
      view: "A mitochondrion cut lengthwise in the cytoplasm of a cell",
    },
  };

  it("checks a mitochondrion with both cells, and with the energy readout named", () => {
    const named = {
      ...lab,
      labels: { ...lab.labels, energy: [text("Energy released")] },
    };
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, named)).toEqual(named);
    expect(decodeStrict(props, { ...lab, cells: ["yeast"] })).toEqual({
      ...lab,
      cells: ["yeast"],
    });
  });

  it("refuses an ATP total at or below glycolysis, above 38, or not whole", () => {
    expect(failsStrict(props, { ...lab, atp: 2 })).toBe(true);
    expect(failsStrict(props, { ...lab, atp: 40 })).toBe(true);
    expect(failsStrict(props, { ...lab, atp: 31.5 })).toBe(true);
  });

  it("refuses no cell, an unknown cell, a cell named twice, or a missing part", () => {
    expect(failsStrict(props, { ...lab, cells: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, cells: ["plant"] })).toBe(true);
    expect(failsStrict(props, { ...lab, cells: ["muscle", "muscle"] })).toBe(
      true
    );
    const { matrix: _matrix, ...parts } = lab.labels.parts;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, parts } })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("MitochondrionLab", lab)).toEqual([]);
  });
});
