import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick a route.")], title: [text("Lab")] };

const shared = { nucleus: [text("mRNA leaves the nucleus")] };
const inside = {
  cytoplasm: [text("The enzyme works in the cytoplasm")],
  freeRibosome: [text("A free ribosome builds it")],
};
const outside = {
  boundRibosome: [text("A bound ribosome builds it")],
  exocytosis: [text("Exocytosis releases it")],
  golgi: [text("The Golgi apparatus packs it")],
  reticulum: [text("It folds in the reticulum")],
  secretory: [text("A secretory vesicle carries it")],
  transport: [text("A transport vesicle carries it")],
};

const words = {
  example: [text("Example enzyme")],
  parts: {
    duct: "Duct",
    golgi: "Golgi apparatus",
    membrane: "Plasma membrane",
    nucleus: "Nucleus",
    reticulum: "Rough endoplasmic reticulum",
    ribosome: "Ribosome",
    vesicle: "Secretory vesicle",
  },
  place: [text("Where the enzyme works")],
  route: "Kind of enzyme",
  step: [text("Step now")],
  view: "One acinar cell of the pancreas",
};

const lab = {
  ...card,
  labels: {
    ...words,
    examples: {
      extracellular: [text("Pancreatic amylase")],
      intracellular: [text("Glycolysis enzymes")],
    },
    places: {
      extracellular: [text("The small intestine")],
      intracellular: [text("The cytoplasm")],
    },
    routes: {
      extracellular: "Extracellular enzyme",
      intracellular: "Intracellular enzyme",
    },
    steps: { ...shared, ...inside, ...outside },
  },
  routes: ["intracellular", "extracellular"],
};

describe("enzyme secretion lab", () => {
  const { props } = assessmentVisuals.EnzymeSecretionLab;

  it("checks both routes, and one route with only the stages it plays", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    const secreted = {
      ...card,
      labels: {
        ...words,
        examples: { extracellular: [text("Pancreatic amylase")] },
        places: { extracellular: [text("The small intestine")] },
        routes: { extracellular: "Extracellular enzyme" },
        steps: { ...shared, ...outside },
      },
      routes: ["extracellular"],
    };
    expect(decodeStrict(props, secreted)).toEqual(secreted);
  });

  it("refuses a missing stage or a stage no shown route plays", () => {
    const { golgi: _golgi, ...noGolgi } = lab.labels.steps;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, steps: noGolgi } })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          examples: { intracellular: [text("Glycolysis enzymes")] },
          places: { intracellular: [text("The cytoplasm")] },
          routes: { intracellular: "Intracellular enzyme" },
        },
        routes: ["intracellular"],
      })
    ).toBe(true);
  });

  it("refuses a route without its example", () => {
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          examples: { intracellular: [text("Glycolysis enzymes")] },
        },
      })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("EnzymeSecretionLab", lab)).toEqual([]);
  });
});
