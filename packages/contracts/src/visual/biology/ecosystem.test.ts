import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore ecosystem dynamics in 3D.")],
  footer: [text("Observe how populations shift across trophic tiers.")],
  title: [text("Ecosystem lab")],
};

describe("food web trophic lab", () => {
  const { props } = assessmentVisuals.FoodWebTrophicLab;
  const lab = {
    ...card,
    energyInput: { max: 20_000, min: 1000, value: 10_000 },
    labels: {
      energyCascade: [text("10000 -> 1000 -> 100 -> 10 kJ")],
      energyInput: "Producer energy (kJ)",
      outcome: [text("Balanced pyramid")],
      parts: {
        decomposer: "Decomposers",
        heatLoss: "Respiratory heat loss",
        primaryConsumer: "Primary consumers",
        producer: "Producers",
        secondaryConsumer: "Secondary consumers",
        tertiaryConsumer: "Tertiary consumers",
      },
      scenario: "Scenario",
      scenarios: {
        balanced: { effect: [text("Steady 10% transfer")], name: "Balanced" },
        removePredator: {
          effect: [text("Herbivores surge")],
          name: "Remove top predator",
        },
      },
      view: "3D trophic pyramid",
    },
    scenarios: ["balanced", "removePredator"],
  };
  const { energyCascade: _e, outcome: _o, ...quiz } = lab.labels;

  it("decodes food web lab and tracks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("FoodWebTrophicLab", lab)).toEqual([
      "labels.energyCascade",
      "labels.outcome",
    ]);
    expect(answerState("FoodWebTrophicLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses invalid slider ranges or mismatched scenarios", () => {
    expect(
      failsStrict(props, {
        ...lab,
        energyInput: { max: 1000, min: 1000, value: 1000 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, scenarios: ["balanced"] })).toBe(true);
  });
});

describe("quadrat sampling lab", () => {
  const { props } = assessmentVisuals.QuadratSamplingLab;
  const lab = {
    ...card,
    labels: {
      coverage: [text("42% ground cover")],
      density: [text("8.4 plants / m^2")],
      method: "Method",
      methods: {
        beltTransect: "Belt transect",
        random: "Random throw",
      },
      organism: "Species",
      organisms: {
        clover: { habit: [text("Low creeping mat")], name: "Clover" },
        fern: { habit: [text("Shaded frond clumps")], name: "Fern" },
      },
      parts: {
        canopy: "Canopy shade",
        gridPlot: "Sampling plot",
        markerFlag: "Transect flag",
        quadratFrame: "1 m^2 quadrat frame",
        transectLine: "Transect tape",
      },
      quadrats: "Quadrats thrown",
      view: "3D quadrat field grid",
    },
    methods: ["random", "beltTransect"],
    organisms: ["clover", "fern"],
    quadrats: { max: 20, min: 4, value: 10 },
  };
  const { coverage: _c, density: _d, ...quiz } = lab.labels;

  it("decodes quadrat lab and tracks density and coverage as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("QuadratSamplingLab", lab)).toEqual([
      "labels.density",
      "labels.coverage",
    ]);
    expect(answerState("QuadratSamplingLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses invalid quadrat count or mismatched lists", () => {
    expect(
      failsStrict(props, { ...lab, quadrats: { max: 5, min: 10, value: 6 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, methods: ["random"] })).toBe(true);
    expect(failsStrict(props, { ...lab, organisms: ["clover"] })).toBe(true);
  });
});

describe("ecological succession lab", () => {
  const { props } = assessmentVisuals.EcologicalSuccessionLab;
  const lab = {
    ...card,
    labels: {
      biodiversity: [text("High multi-layer diversity")],
      parts: {
        bedrock: "Bedrock",
        canopyTree: "Canopy trees",
        pioneerPlant: "Pioneer species",
        shrubLayer: "Shrub layer",
        topsoil: "Humus topsoil",
      },
      pathway: "Pathway",
      pathways: {
        primary: "Primary succession",
        secondary: "Secondary succession",
      },
      soilDepth: [text("45 cm humus")],
      stage: "Stage",
      stages: {
        bareRock: {
          name: "Bare rock",
          summary: [text("Exposed mineral rock")],
        },
        climaxForest: {
          name: "Climax forest",
          summary: [text("Stable shaded woodland")],
        },
      },
      view: "3D ecological succession diorama",
    },
    pathways: ["primary", "secondary"],
    stages: ["bareRock", "climaxForest"],
  };
  const { biodiversity: _b, soilDepth: _s, ...quiz } = lab.labels;

  it("decodes succession lab and tracks soilDepth and biodiversity", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("EcologicalSuccessionLab", lab)).toEqual([
      "labels.soilDepth",
      "labels.biodiversity",
    ]);
    expect(
      answerState("EcologicalSuccessionLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched pathways or stages", () => {
    expect(failsStrict(props, { ...lab, pathways: ["primary"] })).toBe(true);
    expect(failsStrict(props, { ...lab, stages: ["bareRock"] })).toBe(true);
  });
});
