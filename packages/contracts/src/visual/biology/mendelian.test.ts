import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore Mendelian and human inheritance.")],
  title: [text("Inheritance lab")],
};

describe("monohybrid cross lab", () => {
  const { props } = assessmentVisuals.MonohybridCrossLab;
  const lab = {
    ...card,
    crosses: ["pureF1", "heteroF2", "testCross"],
    labels: {
      cross: "Cross type",
      crosses: {
        heteroF2: {
          genotypeRatio: [text("1 TT : 2 Tt : 1 tt")],
          name: "Tt x Tt",
          phenotypeRatio: [text("3 tall : 1 dwarf")],
        },
        pureF1: {
          genotypeRatio: [text("All Tt")],
          name: "TT x tt",
          phenotypeRatio: [text("All tall")],
        },
        testCross: {
          genotypeRatio: [text("1 Tt : 1 tt")],
          name: "Tt x tt",
          phenotypeRatio: [text("1 tall : 1 dwarf")],
        },
      },
      genotypeRatio: [text("Genotype ratio")],
      parts: {
        dwarfPea: "Dwarf pea",
        gamete: "Gamete",
        parentA: "Parent one",
        parentB: "Parent two",
        tallPea: "Tall pea",
      },
      phenotypeRatio: [text("Phenotype ratio")],
      view: "Monohybrid Punnett grid and pea offspring",
    },
  };
  const { genotypeRatio: _g, phenotypeRatio: _p, ...quiz } = lab.labels;

  it("decodes monohybrid cross lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("MonohybridCrossLab", lab)).toEqual([
      "labels.genotypeRatio",
      "labels.phenotypeRatio",
    ]);
    expect(answerState("MonohybridCrossLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses mismatched crosses", () => {
    expect(failsStrict(props, { ...lab, crosses: ["pureF1"] })).toBe(true);
  });
});

describe("dihybrid cross lab", () => {
  const { props } = assessmentVisuals.DihybridCrossLab;
  const lab = {
    ...card,
    filters: ["all", "dominantBoth", "recombinants", "recessiveBoth"],
    labels: {
      count: [text("Offspring out of sixteen")],
      filter: "Phenotype group",
      filters: {
        all: {
          count: [text("16 of 16")],
          name: "All",
          ratio: [text("9 : 3 : 3 : 1")],
        },
        dominantBoth: {
          count: [text("9 of 16")],
          name: "Round yellow",
          ratio: [text("9/16")],
        },
        recessiveBoth: {
          count: [text("1 of 16")],
          name: "Wrinkled green",
          ratio: [text("1/16")],
        },
        recombinants: {
          count: [text("6 of 16")],
          name: "Recombinants",
          ratio: [text("3 + 3 of 16")],
        },
      },
      parts: {
        roundGreen: "Round green",
        roundYellow: "Round yellow",
        wrinkledGreen: "Wrinkled green",
        wrinkledYellow: "Wrinkled yellow",
      },
      ratio: [text("Phenotype ratio")],
      view: "Four by four dihybrid Punnett grid",
    },
  };
  const { count: _c, ratio: _r, ...quiz } = lab.labels;

  it("decodes dihybrid cross lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("DihybridCrossLab", lab)).toEqual([
      "labels.count",
      "labels.ratio",
    ]);
    expect(answerState("DihybridCrossLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses mismatched filters", () => {
    expect(failsStrict(props, { ...lab, filters: ["all"] })).toBe(true);
  });
});

describe("pedigree sex-linked lab", () => {
  const { props } = assessmentVisuals.PedigreeSexLinkedLab;
  const lab = {
    ...card,
    labels: {
      parts: {
        affected: "Affected",
        carrier: "Carrier female",
        female: "Female",
        male: "Male",
        xChromosome: "X chromosome",
        yChromosome: "Y chromosome",
      },
      pattern: "Inheritance pattern",
      patterns: {
        aboBlood: {
          name: "ABO blood groups",
          risk: [text("Four blood phenotypes")],
          rule: [text("IA and IB are codominant over IO")],
        },
        sexDetermination: {
          name: "Sex chromosomes",
          risk: [text("Equal chance of boy or girl")],
          rule: [text("Father passes X or Y chromosome")],
        },
        xLinked: {
          name: "X-linked recessive",
          risk: [text("Half of sons affected from carrier mother")],
          rule: [text("Carried on the X chromosome")],
        },
      },
      risk: [text("Offspring probability")],
      rule: [text("Genetic rule")],
      view: "Three-generation pedigree and X-Y chromosome model",
    },
    patterns: ["aboBlood", "sexDetermination", "xLinked"],
  };
  const { risk: _r, rule: _u, ...quiz } = lab.labels;

  it("decodes pedigree sex-linked lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("PedigreeSexLinkedLab", lab)).toEqual([
      "labels.risk",
      "labels.rule",
    ]);
    expect(
      answerState("PedigreeSexLinkedLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched patterns", () => {
    expect(failsStrict(props, { ...lab, patterns: ["xLinked"] })).toBe(true);
  });
});
