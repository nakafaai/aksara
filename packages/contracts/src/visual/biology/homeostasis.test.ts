import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Inspect homeostatic feedback.")],
  title: [text("Homeostasis lab")],
};

describe("thermoregulation skin lab", () => {
  const { props } = assessmentVisuals.ThermoregulationSkinLab;
  const lab = {
    ...card,
    ambient: { max: 42, min: 5, value: 25 },
    conditions: ["cold", "normal", "hot"],
    labels: {
      ambient: "Ambient temperature",
      bloodFlow: [text("Dermal blood flow")],
      condition: "Environment",
      conditions: { cold: "Cold", hot: "Hot", normal: "Normal" },
      heatLoss: [text("Heat loss rate")],
      parts: {
        arteriole: "Arteriole",
        capillary: "Capillary loop",
        epidermis: "Epidermis",
        erectorMuscle: "Erector muscle",
        fatLayer: "Subcutaneous fat",
        hairShaft: "Hair shaft",
        sweatGland: "Sweat gland",
      },
      response: [text("Skin response")],
      responses: {
        cold: [text("Vasoconstriction conserves heat")],
        hot: [text("Vasodilation and sweating cool skin")],
        normal: [text("Steady core balance")],
      },
      view: "Mammalian skin cross-section",
    },
  };
  const { bloodFlow: _flow, heatLoss: _loss, ...quiz } = lab.labels;

  it("decodes thermoregulation skin lab and marks bloodFlow and heatLoss as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("ThermoregulationSkinLab", lab)).toEqual([
      "labels.bloodFlow",
      "labels.heatLoss",
    ]);
    expect(
      answerState("ThermoregulationSkinLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid ambient ranges or mismatched condition labels", () => {
    expect(
      failsStrict(props, { ...lab, ambient: { max: 20, min: 20, value: 20 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, ambient: { max: 40, min: 5, value: 50 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, conditions: ["cold", "hot"] })).toBe(
      true
    );
  });
});

describe("blood glucose feedback lab", () => {
  const { props } = assessmentVisuals.BloodGlucoseFeedbackLab;
  const lab = {
    ...card,
    glucose: { max: 14, min: 2, value: 5.5 },
    labels: {
      actions: {
        afterMeal: [text("Liver stores glucose as glycogen")],
        diabetes: [text("Glucose stays high in blood")],
        fasting: [text("Liver breaks down glycogen")],
        normal: [text("Glucose stays near setpoint")],
      },
      glucose: "Blood glucose (mmol/L)",
      hormone: [text("Active hormone")],
      hormones: {
        balanced: "Balanced",
        deficient: "Insulin deficient",
        glucagon: "Glucagon",
        insulin: "Insulin",
      },
      liverAction: [text("Liver response")],
      parts: {
        alphaCell: "Alpha cell",
        betaCell: "Beta cell",
        bloodVessel: "Blood vessel",
        glycogen: "Glycogen store",
        liver: "Liver",
        pancreas: "Pancreas",
      },
      state: "Body state",
      states: {
        afterMeal: "After meal",
        diabetes: "Diabetes",
        fasting: "Fasting",
        normal: "Normal",
      },
      view: "Pancreas and liver feedback loop",
    },
    states: ["afterMeal", "normal", "fasting", "diabetes"],
  };
  const { hormone: _hormone, liverAction: _action, ...quiz } = lab.labels;

  it("decodes blood glucose lab and marks hormone and liverAction as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("BloodGlucoseFeedbackLab", lab)).toEqual([
      "labels.hormone",
      "labels.liverAction",
    ]);
    expect(
      answerState("BloodGlucoseFeedbackLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid glucose sliders or mismatched glucose states", () => {
    expect(
      failsStrict(props, { ...lab, glucose: { max: 5, min: 8, value: 6 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, states: ["normal", "fasting"] })).toBe(
      true
    );
  });
});
