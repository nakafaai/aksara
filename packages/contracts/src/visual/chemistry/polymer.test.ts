import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore addition, condensation, and rubber polymers.")],
  title: [text("Polymer chemistry lab")],
};

describe("addition polymer chain lab", () => {
  const { props } = assessmentVisuals.AdditionPolymerChainLab;
  const lab = {
    ...card,
    chainLength: { max: 8, min: 2, value: 4 },
    labels: {
      chainLength: "Repeat units (n)",
      monomer: "Monomer",
      monomers: {
        chloroethene: {
          name: "Chloroethene",
          polymerName: [text("Poly(chloroethene) / PVC")],
          repeatUnit: [text("-[CH2-CHCl]-")],
        },
        ethene: {
          name: "Ethene",
          polymerName: [text("Polyethene")],
          repeatUnit: [text("-[CH2-CH2]-")],
        },
      },
      parts: {
        doubleBond: "C=C bond",
        monomerUnit: "Monomer unit",
        sideGroup: "Side group",
        singleBackbone: "C-C backbone",
      },
      polymerName: [text("Polymer")],
      repeatUnit: [text("Repeat unit")],
      view: "3D addition polymer chain",
    },
    monomers: ["ethene", "chloroethene"],
  };
  const { polymerName: _p, repeatUnit: _r, ...quiz } = lab.labels;

  it("decodes addition polymer lab and tracks polymerName and repeatUnit as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("AdditionPolymerChainLab", lab)).toEqual([
      "labels.polymerName",
      "labels.repeatUnit",
    ]);
    expect(
      answerState("AdditionPolymerChainLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid chain length or mismatched monomers", () => {
    expect(
      failsStrict(props, {
        ...lab,
        chainLength: { max: 4, min: 4, value: 4 },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, monomers: ["ethene"] })).toBe(true);
  });
});

describe("condensation nylon lab", () => {
  const { props } = assessmentVisuals.CondensationNylonLab;
  const lab = {
    ...card,
    labels: {
      byproduct: [text("Small molecule lost")],
      linkage: [text("Linkage formed")],
      parts: {
        esterOrAmideLink: "Amide / ester link",
        monomerA: "Diamine / diol",
        monomerB: "Dicarboxylic acid",
        polymerChain: "Polymer chain",
        waterByproduct: "H2O eliminated",
      },
      polymer: "Condensation polymer",
      polymers: {
        nylon66: {
          byproduct: [text("H2O")],
          linkage: [text("Amide link (-CONH-)")],
          name: "Nylon-6,6",
        },
        terylene: {
          byproduct: [text("H2O")],
          linkage: [text("Ester link (-COO-)")],
          name: "Terylene",
        },
      },
      view: "3D condensation polymerisation",
    },
    polymers: ["nylon66", "terylene"],
  };
  const { byproduct: _b, linkage: _l, ...quiz } = lab.labels;

  it("decodes condensation nylon lab and tracks byproduct and linkage as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("CondensationNylonLab", lab)).toEqual([
      "labels.byproduct",
      "labels.linkage",
    ]);
    expect(
      answerState("CondensationNylonLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched polymers", () => {
    expect(failsStrict(props, { ...lab, polymers: ["nylon66"] })).toBe(true);
  });
});

describe("rubber vulcanization lab", () => {
  const { props } = assessmentVisuals.RubberVulcanizationLab;
  const lab = {
    ...card,
    labels: {
      elasticityNote: [text("Elastic recovery")],
      heatNote: [text("Thermal stability")],
      parts: {
        doubleBond: "C=C site",
        isopreneChain: "Polyisoprene chain",
        sulfurCrosslink: "Sulfur cross-link (-S-S-)",
        tensionArrow: "Applied stretch",
      },
      state: "Rubber state",
      states: {
        naturalLatex: {
          elasticityNote: [text("Chains slip past each other.")],
          heatNote: [text("Softens and turns sticky when heated.")],
          name: "Natural rubber",
        },
        vulcanisedRubber: {
          elasticityNote: [text("Sulfur bridges pull chains back.")],
          heatNote: [text("Retains strength at high temperature.")],
          name: "Vulcanised rubber",
        },
      },
      stretch: "Applied stretch (%)",
      view: "3D rubber vulcanisation cross-links",
    },
    states: ["naturalLatex", "vulcanisedRubber"],
    stretch: { max: 100, min: 0, value: 50 },
  };
  const { elasticityNote: _e, heatNote: _h, ...quiz } = lab.labels;

  it("decodes rubber vulcanisation lab and tracks elasticityNote and heatNote as answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
    expect(answerState("RubberVulcanizationLab", lab)).toEqual([
      "labels.elasticityNote",
      "labels.heatNote",
    ]);
    expect(
      answerState("RubberVulcanizationLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses invalid stretch slider or mismatched states", () => {
    expect(
      failsStrict(props, { ...lab, stretch: { max: 40, min: 40, value: 40 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, states: ["naturalLatex"] })).toBe(true);
  });
});
