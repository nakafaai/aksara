import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick an enzyme.")], title: [text("Lab")] };

const lab = {
  ...card,
  enzymes: ["lactase", "sucrase", "maltase"],
  labels: {
    enzyme: "Enzyme",
    enzymes: { lactase: "Lactase", maltase: "Maltase", sucrase: "Sucrase" },
    fits: [text("Substrate fits the active site")],
    model: "Model",
    models: { inducedFit: "Induced fit", lockKey: "Lock and key" },
    no: [text("no")],
    parts: {
      complex: "Enzyme-substrate complex",
      site: "Active site",
      water: "Water",
    },
    products: [text("Products")],
    reused: [text("Substrates this one enzyme has broken down")],
    substrate: "Substrate",
    substrates: { lactose: "Lactose", maltose: "Maltose", sucrose: "Sucrose" },
    sugars: {
      fructose: "Fructose",
      galactose: "Galactose",
      glucose: "Glucose",
    },
    view: "One enzyme molecule with its active site",
    yes: [text("yes")],
  },
  models: ["lockKey", "inducedFit"],
  substrates: ["lactose", "sucrose", "maltose"],
};

describe("active site lab", () => {
  const { props } = assessmentVisuals.ActiveSiteLab;

  it("checks every enzyme, substrate and model, and a smaller pick with its own names", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    const one = {
      ...lab,
      enzymes: ["lactase"],
      labels: {
        ...lab.labels,
        enzymes: { lactase: "Lactase" },
        models: { lockKey: "Lock and key" },
        substrates: { lactose: "Lactose", sucrose: "Sucrose" },
      },
      models: ["lockKey"],
      substrates: ["lactose", "sucrose"],
    };
    expect(decodeStrict(props, one)).toEqual(one);
  });

  it("refuses a missing name or a name for an option the lab does not show", () => {
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, enzymes: { lactase: "Lactase" } },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, models: ["lockKey"] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, substrates: ["lactose", "lactose"] })
    ).toBe(true);
  });

  it("refuses an enzyme outside the three disaccharidases", () => {
    expect(failsStrict(props, { ...lab, enzymes: ["amylase"] })).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("ActiveSiteLab", lab)).toEqual([]);
  });
});
