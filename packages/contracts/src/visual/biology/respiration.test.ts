import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Inspect human gas exchange and ventilation mechanics.")],
  footer: [text("Compare partial pressure gradients and thoracic volume.")],
  title: [text("Respiratory lab")],
};

describe("alveolus gas exchange lab", () => {
  const { props } = assessmentVisuals.AlveolusGasExchangeLab;
  const lab = {
    ...card,
    labels: {
      diffusionRate: [text("High O2 flux")],
      oxygenUptake: [text("250 mL / min")],
      parts: {
        alveolus: "Alveolar sac",
        capillary: "Pulmonary capillary",
        carbonDioxide: "CO2 molecules",
        oxygen: "O2 molecules",
        redBloodCell: "Red blood cell",
        surfactantFilm: "Moist surfactant film",
      },
      state: "Activity state",
      states: {
        exercise: { name: "Exercise", summary: [text("Steeper O2 gradient")] },
        rest: { name: "Rest", summary: [text("Steady baseline diffusion")] },
      },
      ventilation: "Ventilation rate",
      view: "3D alveolus and capillary",
    },
    states: ["rest", "exercise"],
    ventilation: { max: 30, min: 6, value: 12 },
  };
  const { diffusionRate: _d, oxygenUptake: _o, ...quiz } = lab.labels;

  it("decodes alveolus lab and tracks uptake and diffusion rate", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("AlveolusGasExchangeLab", lab)).toEqual([
      "labels.oxygenUptake",
      "labels.diffusionRate",
    ]);
    expect(
      answerState("AlveolusGasExchangeLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid ventilation ranges or mismatched states", () => {
    expect(
      failsStrict(props, {
        ...lab,
        ventilation: { max: 10, min: 20, value: 12 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, states: ["rest"] })).toBe(true);
  });
});

describe("thorax diaphragm lab", () => {
  const { props } = assessmentVisuals.ThoraxDiaphragmLab;
  const lab = {
    ...card,
    depth: { max: 100, min: 20, value: 50 },
    labels: {
      alveolarPressure: [text("-2 mmHg")],
      depth: "Breath depth (%)",
      parts: {
        diaphragm: "Diaphragm",
        intercostal: "Intercostal muscles",
        lungs: "Lungs",
        pleuralCavity: "Pleural cavity",
        ribcage: "Ribcage",
        trachea: "Trachea",
      },
      phase: "Phase",
      phases: {
        exhalation: {
          name: "Exhalation",
          summary: [text("Diaphragm relaxes")],
        },
        inhalation: {
          name: "Inhalation",
          summary: [text("Diaphragm flattens")],
        },
      },
      thoracicVolume: [text("2.9 L")],
      view: "3D thoracic cage and diaphragm",
    },
    phases: ["inhalation", "exhalation"],
  };
  const { alveolarPressure: _a, thoracicVolume: _t, ...quiz } = lab.labels;

  it("decodes thorax lab and tracks volume and alveolar pressure", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("ThoraxDiaphragmLab", lab)).toEqual([
      "labels.thoracicVolume",
      "labels.alveolarPressure",
    ]);
    expect(answerState("ThoraxDiaphragmLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses invalid depth ranges or mismatched phases", () => {
    expect(
      failsStrict(props, { ...lab, depth: { max: 20, min: 50, value: 30 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, phases: ["inhalation"] })).toBe(true);
  });
});
