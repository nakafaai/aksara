import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Compare diode rectifier waveforms.")],
  title: [text("Diode rectifier lab")],
};

describe("rectifier diode lab", () => {
  const { props } = assessmentVisuals.RectifierDiodeLab;
  const lab = {
    ...card,
    frequency: { max: 100, min: 25, value: 50 },
    labels: {
      conduction: [text("Active diode path")],
      frequency: "AC frequency (Hz)",
      inputWave: [text("AC input")],
      mode: "Rectifier mode",
      modes: {
        fullWave: "Full-wave bridge",
        halfWave: "Half-wave",
        smoothed: "Capacitor smoothed",
      },
      outputWave: [text("DC output")],
      parts: {
        acSource: "AC supply",
        capacitor: "Smoothing capacitor",
        diodeBridge: "Diode bridge",
        loadResistor: "Load resistor",
        oscilloscope: "Oscilloscope",
      },
      ripple: [text("Ripple factor")],
      view: "Diode rectifier bench and oscilloscope",
    },
    modes: ["halfWave", "fullWave", "smoothed"],
    peakVoltage: 12,
  };
  const { conduction: _cond, ripple: _rip, ...quiz } = lab.labels;

  it("decodes rectifier diode lab and marks conduction and ripple as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("RectifierDiodeLab", lab)).toEqual([
      "labels.conduction",
      "labels.ripple",
    ]);
    expect(answerState("RectifierDiodeLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses invalid frequency sliders, non-positive voltage, or mismatched modes", () => {
    expect(
      failsStrict(props, {
        ...lab,
        frequency: { max: 50, min: 50, value: 50 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, peakVoltage: 0 })).toBe(true);
    expect(failsStrict(props, { ...lab, modes: ["halfWave"] })).toBe(true);
  });
});
