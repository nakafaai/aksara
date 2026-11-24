import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore genetic variation and mutations.")],
  title: [text("Variation and mutation lab")],
};

describe("variation distribution lab", () => {
  const { props } = assessmentVisuals.VariationDistributionLab;
  const lab = {
    ...card,
    genePairs: { max: 6, min: 1, value: 3 },
    kinds: ["continuous", "discontinuous"],
    labels: {
      basis: [text("Genetic control")],
      genePairs: "Controlling gene pairs",
      kind: "Variation type",
      kinds: {
        continuous: {
          basis: [text("Many genes plus environment")],
          name: "Continuous",
          shape: [text("Smooth bell-shaped curve")],
        },
        discontinuous: {
          basis: [text("Single gene with clear alleles")],
          name: "Discontinuous",
          shape: [text("Distinct separate bars")],
        },
      },
      parts: {
        bellCurve: "Bell curve",
        discreteBars: "Discrete bars",
        environment: "Environment",
        meanLine: "Population mean",
      },
      shape: [text("Distribution shape")],
      view: "Population histogram contrasting continuous and discontinuous variation",
    },
  };
  const { basis: _b, shape: _s, ...quiz } = lab.labels;

  it("decodes variation distribution lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("VariationDistributionLab", lab)).toEqual([
      "labels.basis",
      "labels.shape",
    ]);
    expect(
      answerState("VariationDistributionLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched variation kinds", () => {
    expect(failsStrict(props, { ...lab, kinds: ["continuous"] })).toBe(true);
  });
});

describe("meiosis shuffling lab", () => {
  const { props } = assessmentVisuals.MeiosisShufflingLab;
  const lab = {
    ...card,
    chromosomePairs: { max: 8, min: 1, value: 3 },
    labels: {
      chromosomePairs: "Homologous pairs (n)",
      combinations: [text("Gamete combinations")],
      mechanism: [text("Source of variation")],
      parts: {
        centromere: "Centromere",
        chiasma: "Chiasma",
        gamete: "Gamete",
        maternalChromatid: "Maternal chromatid",
        paternalChromatid: "Paternal chromatid",
      },
      stage: "Shuffling stage",
      stages: {
        crossingOver: {
          mechanism: [text("Non-sister chromatids exchange DNA segments")],
          name: "Crossing-over",
        },
        independentAssortment: {
          mechanism: [
            text("Homologous pairs align independently at metaphase I"),
          ],
          name: "Independent assortment",
        },
        randomFertilisation: {
          mechanism: [text("Any sperm can fertilise any egg")],
          name: "Random fertilisation",
        },
      },
      view: "Homologous chromosomes shuffling alleles in meiosis",
    },
    stages: ["crossingOver", "independentAssortment", "randomFertilisation"],
  };
  const { combinations: _c, mechanism: _m, ...quiz } = lab.labels;

  it("decodes meiosis shuffling lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("MeiosisShufflingLab", lab)).toEqual([
      "labels.combinations",
      "labels.mechanism",
    ]);
    expect(
      answerState("MeiosisShufflingLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched stages", () => {
    expect(failsStrict(props, { ...lab, stages: ["crossingOver"] })).toBe(true);
  });
});

describe("chromosome mutation lab", () => {
  const { props } = assessmentVisuals.ChromosomeMutationLab;
  const lab = {
    ...card,
    labels: {
      change: [text("Structural change")],
      effect: [text("Genetic consequence")],
      mutation: "Mutation type",
      mutations: {
        deletion: {
          change: [text("Chromosome segment is lost")],
          effect: [text("Genes on lost segment are missing")],
          name: "Deletion",
        },
        duplication: {
          change: [text("Segment is repeated")],
          effect: [text("Extra gene copies appear")],
          name: "Duplication",
        },
        inversion: {
          change: [text("Segment reverses end to end")],
          effect: [text("Gene order flips along the arm")],
          name: "Inversion",
        },
        nondisjunction: {
          change: [text("Homologous pair fails to separate")],
          effect: [text("Gamete gets extra or missing chromosome")],
          name: "Nondisjunction",
        },
        translocation: {
          change: [text("Segment joins a non-homologous chromosome")],
          effect: [text("Genes move to a new chromosome")],
          name: "Translocation",
        },
      },
      parts: {
        brokenSegment: "Broken segment",
        centromere: "Centromere",
        extraCopy: "Extra copy",
        normalArm: "Normal arm",
      },
      view: "Banded chromosome undergoing structural and numerical mutations",
    },
    mutations: [
      "deletion",
      "duplication",
      "inversion",
      "translocation",
      "nondisjunction",
    ],
  };
  const { change: _c, effect: _e, ...quiz } = lab.labels;

  it("decodes chromosome mutation lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("ChromosomeMutationLab", lab)).toEqual([
      "labels.change",
      "labels.effect",
    ]);
    expect(
      answerState("ChromosomeMutationLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched mutations", () => {
    expect(failsStrict(props, { ...lab, mutations: ["deletion"] })).toBe(true);
  });
});
