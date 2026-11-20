import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const lab = {
  description: [text("Set the molecules.")],
  enzymes: { max: 20, min: 1, value: 10 },
  labels: {
    busy: [text("Busy active sites")],
    curve: [text("Rate against substrate concentration")],
    enzymes: "Enzyme molecules",
    limiting: [text("Limiting factor")],
    limits: {
      enzyme: [text("enzyme concentration")],
      substrate: [text("substrate concentration")],
    },
    parts: { enzyme: "Enzyme", product: "Product", substrate: "Substrate" },
    rate: [text("Substrates broken down per second")],
    substrates: "Substrate molecules",
    time: "Time",
    view: "Enzyme and substrate molecules in solution",
  },
  substrates: { max: 200, min: 0, value: 20 },
  title: [text("Lab")],
  turnover: 2,
};

describe("enzyme saturation lab", () => {
  const { props } = assessmentVisuals.EnzymeSaturationLab;

  it("checks whole molecule counts and a positive turnover", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses part of a molecule, too many molecules, or no enzyme at all", () => {
    expect(
      failsStrict(props, { ...lab, enzymes: { max: 20, min: 1, value: 2.5 } })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        substrates: { max: 500, min: 0, value: 20 },
      })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, enzymes: { max: 20, min: 0, value: 10 } })
    ).toBe(true);
  });

  it("refuses a turnover of zero", () => {
    expect(failsStrict(props, { ...lab, turnover: 0 })).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("EnzymeSaturationLab", lab)).toEqual([]);
  });
});
