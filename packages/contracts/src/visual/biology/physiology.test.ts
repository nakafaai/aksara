import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

describe("physiology labs", () => {
  it("checks a microscope with a measured field or a calibrated graticule", () => {
    const { props } = assessmentVisuals.MicroscopeLab;
    const lab = {
      ...card,
      cell: 50,
      eyepiece: 10,
      field: { diameter: 0.4, magnification: 400 },
      labels: {
        across: [text("Cells across")],
        cell: [text("Cell length")],
        division: [text("One division")],
        field: [text("Field diameter")],
        magnification: [text("Magnification")],
        objective: "Choose an objective",
        span: [text("Cell in divisions")],
        view: "Light microscope",
        views: { eyepiece: "Eyepiece", stand: "Microscope" },
      },
      objectives: [10, 40],
      specimen: "cheek",
    };

    const { field: _field, ...unmeasured } = lab;
    const calibrated = {
      ...unmeasured,
      graticule: { eyepiece: 40, micrometer: 10 },
    };

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, calibrated)).toEqual(calibrated);
    expect(failsStrict(props, { ...lab, specimen: "leaf" })).toBe(true);
    expect(answerState("MicroscopeLab", lab)).toEqual([]);
  });

  it("checks a nephron with glucose, urea, or both", () => {
    const { props } = assessmentVisuals.NephronLab;
    const lab = {
      ...card,
      filtration: 125,
      glucose: { maximum: 375, plasma: 4.2 },
      labels: {
        daily: [text("Urine a day")],
        factor: [text("Concentration")],
        filtrate: [text("Filtrate a day")],
        flow: [text("Urine a minute")],
        load: [text("Glucose filtered")],
        plasma: "Plasma glucose",
        reabsorbed: [text("Glucose reabsorbed")],
        solute: "Choose a solute",
        solutes: { glucose: "Glucose", urea: "Urea" },
        threshold: [text("Renal threshold")],
        urine: [text("Glucose in urine")],
        view: "One nephron",
      },
      urea: { plasma: 0.03, urine: 1.8 },
    };

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(failsStrict(props, { ...lab, filtration: -1 })).toBe(true);
  });

  it("checks two respirometers and names every substrate", () => {
    const { props } = assessmentVisuals.RespirometerLab;
    const lab = {
      ...card,
      carbonDioxide: 21,
      labels: {
        potash: [text("With potassium hydroxide")],
        quotient: [text("Respiratory quotient")],
        substrate: [text("Substrate")],
        substrates: {
          anaerobic: [text("Some anaerobic")],
          carbohydrate: [text("Carbohydrate")],
          fat: [text("Fat")],
          protein: [text("Protein")],
        },
        time: "Time",
        view: "Two respirometers",
        water: [text("With water")],
      },
      minutes: 20,
      oxygen: 30,
    };

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, substrates: { fat: [text("Fat")] } },
      })
    ).toBe(true);
  });
});
