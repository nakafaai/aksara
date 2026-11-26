import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore periodic group and period trends.")],
  title: [text("Periodic trends lab")],
};

describe("halogen displacement lab", () => {
  const { props } = assessmentVisuals.HalogenDisplacementLab;
  const lab = {
    ...card,
    labels: {
      observation: [text("Layer colour")],
      pair: "Reaction pair",
      pairs: {
        cl2WithKbr: {
          name: "Cl2 + KBr",
          observation: [text("Organic layer turns orange-brown.")],
          redoxOutcome: [text("Chlorine displaces bromide ions.")],
        },
        i2WithKcl: {
          name: "I2 + KCl",
          observation: [text("No displacement occurs.")],
          redoxOutcome: [text("Iodine is weaker than chlorine.")],
        },
      },
      parts: {
        aqueousLayer: "Aqueous layer",
        halideIon: "Halide ion",
        halogenDrop: "Halogen water",
        organicLayer: "Organic layer",
        testTube: "Test tube",
      },
      redoxOutcome: [text("Redox outcome")],
      view: "3D halogen displacement test tube",
    },
    pairs: ["cl2WithKbr", "i2WithKcl"],
  };
  const { observation: _o, redoxOutcome: _r, ...quiz } = lab.labels;

  it("decodes halogen displacement lab and tracks observation and redoxOutcome as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("HalogenDisplacementLab", lab)).toEqual([
      "labels.observation",
      "labels.redoxOutcome",
    ]);
    expect(
      answerState("HalogenDisplacementLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched halogen pairs", () => {
    expect(failsStrict(props, { ...lab, pairs: ["cl2WithKbr"] })).toBe(true);
  });
});

describe("period three oxide lab", () => {
  const { props } = assessmentVisuals.PeriodThreeOxideLab;
  const lab = {
    ...card,
    labels: {
      acidBaseNature: [text("Acid-base nature")],
      bonding: [text("Bonding type")],
      oxide: "Period 3 oxide",
      oxides: {
        al2o3: {
          acidBaseNature: [text("Amphoteric")],
          bonding: [text("Ionic with covalent character")],
          name: "Al2O3",
        },
        na2o: {
          acidBaseNature: [text("Strongly basic")],
          bonding: [text("Giant ionic lattice")],
          name: "Na2O",
        },
        so2: {
          acidBaseNature: [text("Acidic")],
          bonding: [text("Simple covalent molecule")],
          name: "SO2",
        },
      },
      parts: {
        latticeModel: "Structure lattice",
        oxideSample: "Oxide sample",
        phMeter: "pH probe",
        waterBeaker: "Water beaker",
      },
      view: "3D Period 3 oxide test bench",
    },
    oxides: ["na2o", "al2o3", "so2"],
  };
  const { acidBaseNature: _a, bonding: _b, ...quiz } = lab.labels;

  it("decodes period three oxide lab and tracks acidBaseNature and bonding as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("PeriodThreeOxideLab", lab)).toEqual([
      "labels.acidBaseNature",
      "labels.bonding",
    ]);
    expect(
      answerState("PeriodThreeOxideLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched oxides", () => {
    expect(failsStrict(props, { ...lab, oxides: ["na2o"] })).toBe(true);
  });
});
