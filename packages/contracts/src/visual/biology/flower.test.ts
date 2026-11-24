import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore flower structure and fruit development.")],
  title: [text("Flower and fruit lab")],
};

describe("flower anatomy lab", () => {
  const { props } = assessmentVisuals.FlowerAnatomyLab;
  const lab = {
    ...card,
    labels: {
      adaptation: [text("Key adaptation")],
      mode: "Pollination type",
      modes: {
        insect: {
          adaptation: [text("Bright petals and nectar guides attract insects")],
          name: "Insect-pollinated",
          pollen: [text("Heavy sticky pollen grains")],
        },
        wind: {
          adaptation: [text("Feathery stigma and dangling anthers catch wind")],
          name: "Wind-pollinated",
          pollen: [text("Light smooth pollen in huge numbers")],
        },
      },
      parts: {
        anther: "Anther",
        filament: "Filament",
        ovary: "Ovary",
        ovule: "Ovule",
        petal: "Petal",
        sepal: "Sepal",
        stigma: "Stigma",
        style: "Style",
      },
      pollen: [text("Pollen traits")],
      view: "Cutaway flower comparing insect and wind pollination",
    },
    modes: ["insect", "wind"],
  };
  const { adaptation: _a, pollen: _p, ...quiz } = lab.labels;

  it("decodes flower anatomy lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("FlowerAnatomyLab", lab)).toEqual([
      "labels.adaptation",
      "labels.pollen",
    ]);
    expect(answerState("FlowerAnatomyLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses mismatched pollination modes", () => {
    expect(failsStrict(props, { ...lab, modes: ["insect"] })).toBe(true);
  });
});

describe("fruit seed dispersal lab", () => {
  const { props } = assessmentVisuals.FruitSeedDispersalLab;
  const lab = {
    ...card,
    fruits: ["simple", "aggregate", "multiple"],
    labels: {
      fruit: "Fruit type",
      fruits: {
        aggregate: {
          name: "Aggregate fruit",
          origin: [text("Many separate carpels of one flower")],
          structure: [text("Cluster of small fruitlets")],
        },
        multiple: {
          name: "Multiple fruit",
          origin: [text("Cluster of many flowers fused together")],
          structure: [text("Fused ovaries forming one fruit")],
        },
        simple: {
          name: "Simple fruit",
          origin: [text("Single ovary of one flower")],
          structure: [text("Pericarp around seed coat and embryo")],
        },
      },
      origin: [text("Floral origin")],
      parts: {
        cotyledon: "Cotyledon",
        embryo: "Embryo",
        endosperm: "Endosperm",
        pericarp: "Pericarp",
        testa: "Testa",
      },
      structure: [text("Fruit and seed build")],
      view: "Cutaway seed and fruit types after fertilisation",
    },
  };
  const { origin: _o, structure: _s, ...quiz } = lab.labels;

  it("decodes fruit seed dispersal lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("FruitSeedDispersalLab", lab)).toEqual([
      "labels.origin",
      "labels.structure",
    ]);
    expect(
      answerState("FruitSeedDispersalLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched fruit types", () => {
    expect(failsStrict(props, { ...lab, fruits: ["simple"] })).toBe(true);
  });
});
