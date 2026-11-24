import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore plant nutrition.")],
  title: [text("Plant nutrition lab")],
};

describe("mineral deficiency lab", () => {
  const { props } = assessmentVisuals.MineralDeficiencyLab;
  const lab = {
    ...card,
    labels: {
      parts: {
        airTube: "Air tube",
        leaf: "Leaf",
        root: "Root",
        solution: "Culture solution",
        stem: "Stem",
      },
      role: [text("Main function")],
      solution: "Culture solution",
      solutions: {
        complete: {
          name: "Complete Knop",
          role: [text("All nutrients supplied")],
          symptom: [text("Healthy green growth")],
        },
        noNitrogen: {
          name: "No nitrogen",
          role: [text("Builds proteins and chlorophyll")],
          symptom: [text("Older leaves turn yellow")],
        },
      },
      symptom: [text("Deficiency sign")],
      view: "Seedling in Knop culture solution",
    },
    solutions: ["complete", "noNitrogen"],
  };
  const { role: _role, symptom: _symptom, ...quiz } = lab.labels;

  it("decodes mineral deficiency lab and marks role and symptom as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("MineralDeficiencyLab", lab)).toEqual([
      "labels.role",
      "labels.symptom",
    ]);
    expect(
      answerState("MineralDeficiencyLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched solutions", () => {
    expect(failsStrict(props, { ...lab, solutions: ["complete"] })).toBe(true);
  });
});

describe("root hair uptake lab", () => {
  const { props } = assessmentVisuals.RootHairUptakeLab;
  const lab = {
    ...card,
    labels: {
      directions: {
        balanced: "No net flow",
        intoRoot: "Into root",
        outOfRoot: "Out of root",
      },
      ionUptake: [text("Active transport with ATP")],
      parts: {
        cortex: "Cortex",
        endodermis: "Endodermis",
        epidermis: "Epidermis",
        rootHair: "Root hair",
        soilWater: "Soil water",
        xylem: "Xylem",
      },
      soilConcentration: "Soil concentration",
      view: "Root cross-section with root hairs",
      waterDirection: [text("Osmosis direction")],
    },
    soilConcentration: { max: 0.6, min: 0, value: 0.02 },
  };
  const { ionUptake: _ion, waterDirection: _dir, ...quiz } = lab.labels;

  it("decodes root hair uptake lab and marks ionUptake and waterDirection as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("RootHairUptakeLab", lab)).toEqual([
      "labels.ionUptake",
      "labels.waterDirection",
    ]);
    expect(answerState("RootHairUptakeLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses out-of-range soilConcentration slider", () => {
    expect(
      failsStrict(props, {
        ...lab,
        soilConcentration: { max: 0.5, min: 0, value: 0.9 },
      })
    ).toBe(true);
  });
});

describe("carnivorous plant lab", () => {
  const { props } = assessmentVisuals.CarnivorousPlantLab;
  const lab = {
    ...card,
    labels: {
      adaptation: [text("Key adaptation")],
      mode: "Nutrition mode",
      modes: {
        carnivorous: {
          adaptation: [text("Pitcher traps insects")],
          name: "Carnivorous",
          source: [text("Nitrogen from digested insects")],
        },
        epiphytic: {
          adaptation: [text("Aerial roots absorb rain")],
          name: "Epiphytic",
          source: [text("Photosynthesis on host branch")],
        },
        parasitic: {
          adaptation: [text("Haustoria tap host vascular tissue")],
          name: "Parasitic",
          source: [text("Water and food from host")],
        },
      },
      parts: {
        aerialRoot: "Aerial root",
        haustorium: "Haustorium",
        hostStem: "Host stem",
        insect: "Insect",
        trapLeaf: "Trap leaf",
      },
      source: [text("Nutrient source")],
      view: "Three special plant nutrition modes",
    },
    modes: ["carnivorous", "parasitic", "epiphytic"],
  };
  const { adaptation: _a, source: _s, ...quiz } = lab.labels;

  it("decodes carnivorous plant lab and marks adaptation and source as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("CarnivorousPlantLab", lab)).toEqual([
      "labels.adaptation",
      "labels.source",
    ]);
    expect(
      answerState("CarnivorousPlantLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched special modes", () => {
    expect(failsStrict(props, { ...lab, modes: ["carnivorous"] })).toBe(true);
  });
});
