import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

const lab = {
  ...card,
  labels: {
    aorta: [text("Aortic pressure")],
    output: [text("Cardiac output")],
    phase: [text("Phase")],
    phases: {
      atrial: [text("Atrial systole")],
      diastole: [text("Diastole")],
      ventricular: [text("Ventricular systole")],
    },
    pressure: [text("Left ventricular pressure")],
    rate: "Heart rate",
    stroke: [text("Stroke volume")],
    view: "A human heart cut open from the front",
    volume: [text("Left ventricular volume")],
  },
  rate: 72,
  volumes: { endDiastolic: 120, endSystolic: 50 },
};

describe("heart labs", () => {
  it("checks a beating heart and keeps its stroke volume and output as answers", () => {
    const { props } = assessmentVisuals.HeartCycleLab;
    const { output: _output, stroke: _stroke, ...read } = lab.labels;

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: read })).toEqual({
      ...lab,
      labels: read,
    });
    expect(answerState("HeartCycleLab", lab)).toEqual([
      "labels.stroke",
      "labels.output",
    ]);
    expect(answerState("HeartCycleLab", { ...lab, labels: read })).toEqual([]);
  });

  it("rejects a ventricle that keeps more than it filled with", () => {
    const { props } = assessmentVisuals.HeartCycleLab;

    expect(
      failsStrict(props, {
        ...lab,
        volumes: { endDiastolic: 50, endSystolic: 120 },
      })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        volumes: { endDiastolic: 120, endSystolic: 120 },
      })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        volumes: { endDiastolic: 120, endSystolic: 0 },
      })
    ).toBe(true);
  });

  it("rejects a heart rate the slider cannot reach", () => {
    const { props } = assessmentVisuals.HeartCycleLab;

    expect(decodeStrict(props, { ...lab, rate: 40 })).toEqual({
      ...lab,
      rate: 40,
    });
    expect(decodeStrict(props, { ...lab, rate: 200 })).toEqual({
      ...lab,
      rate: 200,
    });
    expect(failsStrict(props, { ...lab, rate: 30 })).toBe(true);
    expect(failsStrict(props, { ...lab, rate: 220 })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, phases: { atrial: [text("Atrial systole")] } },
      })
    ).toBe(true);
  });
});
