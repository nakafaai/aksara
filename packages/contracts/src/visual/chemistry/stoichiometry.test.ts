import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore calorimetry and molar gas volume.")],
  title: [text("Stoichiometry lab")],
};

describe("calorimeter enthalpy lab", () => {
  const { props } = assessmentVisuals.CalorimeterEnthalpyLab;
  const lab = {
    ...card,
    labels: {
      deltaH: [text("Molar enthalpy change")],
      moles: "Moles reacted (mol)",
      parts: {
        cup: "Polystyrene cup",
        heatArrow: "Heat flow",
        solution: "Reaction mixture",
        stirrer: "Stirrer",
        thermometer: "Thermometer",
      },
      reaction: "Reaction",
      reactions: {
        dissolution: {
          enthalpySign: [text("Endothermic (+)")],
          name: "NH4NO3 dissolution",
          thermalNote: [text("Absorbs heat from water.")],
        },
        neutralisation: {
          enthalpySign: [text("Exothermic (-)")],
          name: "HCl + NaOH",
          thermalNote: [text("Releases heat into water.")],
        },
      },
      tempChange: [text("Temperature change")],
      view: "3D polystyrene calorimeter",
    },
    moles: { max: 0.2, min: 0.02, value: 0.05 },
    reactions: ["neutralisation", "dissolution"],
  };
  const { deltaH: _dh, tempChange: _dt, ...quiz } = lab.labels;

  it("decodes calorimeter lab and tracks deltaH and tempChange as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("CalorimeterEnthalpyLab", lab)).toEqual([
      "labels.deltaH",
      "labels.tempChange",
    ]);
    expect(
      answerState("CalorimeterEnthalpyLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid mole slider or mismatched reactions", () => {
    expect(
      failsStrict(props, { ...lab, moles: { max: 0.2, min: 0.2, value: 0.2 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, reactions: ["neutralisation"] })).toBe(
      true
    );
  });
});

describe("avogadro gas volume lab", () => {
  const { props } = assessmentVisuals.AvogadroGasVolumeLab;
  const lab = {
    ...card,
    conditions: ["stp", "rtp"],
    labels: {
      condition: "Condition",
      conditions: {
        rtp: { molarVolume: [text("24.0 dm3/mol")], name: "RTP (25 C)" },
        stp: { molarVolume: [text("22.4 dm3/mol")], name: "STP (0 C)" },
      },
      gasVolume: [text("Gas volume")],
      moles: "Gas amount (mol)",
      particleCount: [text("Number of molecules")],
      parts: {
        cylinder: "Graduated cylinder",
        gasParticles: "Gas molecules",
        piston: "Movable piston",
        thermometer: "Thermometer",
        volumeScale: "Volume scale",
      },
      view: "3D Avogadro molar gas cylinder",
    },
    moles: { max: 3, min: 0.25, value: 1 },
  };
  const { gasVolume: _v, particleCount: _p, ...quiz } = lab.labels;

  it("decodes avogadro lab and tracks gasVolume and particleCount as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("AvogadroGasVolumeLab", lab)).toEqual([
      "labels.gasVolume",
      "labels.particleCount",
    ]);
    expect(
      answerState("AvogadroGasVolumeLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched conditions", () => {
    expect(failsStrict(props, { ...lab, conditions: ["stp"] })).toBe(true);
  });
});
