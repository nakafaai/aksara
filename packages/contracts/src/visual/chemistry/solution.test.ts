import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore aqueous solution chemistry.")],
  title: [text("Solution lab")],
};

describe("pH indicator scale lab", () => {
  const { props } = assessmentVisuals.PhIndicatorScaleLab;
  const lab = {
    ...card,
    indicators: ["universal", "litmus", "phenolphthalein"],
    labels: {
      classification: [text("Strong acid")],
      indicator: "Indicator",
      indicators: {
        litmus: "Litmus",
        phenolphthalein: "Phenolphthalein",
        universal: "Universal",
      },
      parts: {
        beaker: "Beaker",
        dropper: "Dropper",
        ionCloud: "H+ / OH- ions",
        phStrip: "pH strip",
        solution: "Solution",
      },
      phValue: [text("pH 1.0")],
      sample: "Sample",
      samples: {
        hydrochloricAcid: { formula: [text("HCl")], name: "Hydrochloric acid" },
        pureWater: { formula: [text("H2O")], name: "Pure water" },
        sodiumHydroxide: { formula: [text("NaOH")], name: "Sodium hydroxide" },
      },
      view: "3D pH indicator bench",
    },
    samples: ["hydrochloricAcid", "pureWater", "sodiumHydroxide"],
  };
  const { classification: _c, phValue: _p, ...quiz } = lab.labels;

  it("decodes pH indicator lab and tracks classification and phValue as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("PhIndicatorScaleLab", lab)).toEqual([
      "labels.classification",
      "labels.phValue",
    ]);
    expect(
      answerState("PhIndicatorScaleLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched samples or indicators", () => {
    expect(failsStrict(props, { ...lab, samples: ["pureWater"] })).toBe(true);
    expect(failsStrict(props, { ...lab, indicators: ["universal"] })).toBe(
      true
    );
  });
});

describe("salt bridge ion flow lab", () => {
  const { props } = assessmentVisuals.SaltBridgeIonFlowLab;
  const lab = {
    ...card,
    cells: ["daniell", "copperSilver"],
    labels: {
      cell: "Galvanic cell",
      cells: {
        copperSilver: {
          emf: [text("+0.46 V")],
          name: "Cu / Ag",
          redoxEquation: [text("Cu + 2Ag+ -> Cu2+ + 2Ag")],
        },
        daniell: {
          emf: [text("+1.10 V")],
          name: "Zn / Cu",
          redoxEquation: [text("Zn + Cu2+ -> Zn2+ + Cu")],
        },
      },
      emf: [text("Cell voltage")],
      parts: {
        anode: "Anode",
        cathode: "Cathode",
        electrolyte: "Electrolyte",
        electronWire: "Electron wire",
        saltBridge: "Salt bridge",
        voltmeter: "Voltmeter",
      },
      redoxEquation: [text("Overall equation")],
      view: "3D galvanic cell with salt bridge",
    },
  };
  const { emf: _e, redoxEquation: _r, ...quiz } = lab.labels;

  it("decodes salt bridge lab and tracks emf and redoxEquation as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("SaltBridgeIonFlowLab", lab)).toEqual([
      "labels.emf",
      "labels.redoxEquation",
    ]);
    expect(
      answerState("SaltBridgeIonFlowLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched cell entries", () => {
    expect(failsStrict(props, { ...lab, cells: ["daniell"] })).toBe(true);
  });
});
