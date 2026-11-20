import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

describe("yeast fermentation lab", () => {
  const { props } = assessmentVisuals.YeastFermentationLab;
  const lab = {
    ...card,
    glucose: 5,
    labels: {
      clear: [text("clear")],
      collected: [text("Carbon dioxide into the limewater")],
      control: "Control",
      ethanol: [text("Alcohol (ethanol)")],
      limewater: [text("Limewater")],
      milky: [text("milky")],
      none: [text("None")],
      parts: {
        bath: "Water bath",
        limewater: "Limewater",
        paraffin: "Paraffin oil",
        thermometer: "Thermometer",
      },
      rate: [text("Bubbles a minute")],
      smell: [text("Smell of the yeast tube")],
      temperature: "Water bath",
      time: "Time",
      view: "Yeast fermentation and its control",
      warmth: [text("Temperature in the tube")],
      yeast: "Yeast",
    },
    temperature: { max: 60, min: 5, value: 35 },
  };

  it("checks the experiment, its bath, and every word", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("YeastFermentationLab", lab)).toEqual([]);
  });

  it("refuses a glucose solution without glucose", () => {
    expect(failsStrict(props, { ...lab, glucose: 0 })).toBe(true);
  });

  it("refuses a bath that starts outside its range or leaves liquid water", () => {
    expect(
      failsStrict(props, {
        ...lab,
        temperature: { max: 60, min: 5, value: 70 },
      })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        temperature: { max: 110, min: 5, value: 35 },
      })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        temperature: { max: 5, min: 5, value: 5 },
      })
    ).toBe(true);
  });

  it("refuses a missing part name", () => {
    const { thermometer: _thermometer, ...parts } = lab.labels.parts;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, parts } })
    ).toBe(true);
  });
});
