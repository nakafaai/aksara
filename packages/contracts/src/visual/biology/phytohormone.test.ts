import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = {
  description: [text("Explore plant hormone responses.")],
  title: [text("Phytohormone lab")],
};

describe("auxin agar bend lab", () => {
  const { props } = assessmentVisuals.AuxinAgarBendLab;
  const lab = {
    ...card,
    auxinLevel: { max: 100, min: 0, value: 60 },
    labels: {
      angle: [text("Bending angle")],
      auxinLevel: "Auxin in agar (%)",
      elongation: [text("Cell elongation difference")],
      parts: {
        agarBlock: "Agar block",
        auxinDot: "Auxin",
        coleoptile: "Coleoptile",
        litSide: "Far side",
        shadedSide: "Block side",
      },
      view: "Coleoptile shoot bending under an off-centre auxin agar block",
    },
  };
  const { angle: _a, elongation: _e, ...quiz } = lab.labels;

  it("decodes auxin agar bend lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("AuxinAgarBendLab", lab)).toEqual([
      "labels.angle",
      "labels.elongation",
    ]);
    expect(answerState("AuxinAgarBendLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });

  it("refuses invalid auxinLevel slider", () => {
    expect(
      failsStrict(props, {
        ...lab,
        auxinLevel: { max: 50, min: 50, value: 50 },
      })
    ).toBe(true);
  });
});

describe("phytohormone action lab", () => {
  const { props } = assessmentVisuals.PhytohormoneActionLab;
  const lab = {
    ...card,
    hormones: ["auxin", "gibberellin", "ethylene"],
    labels: {
      effect: [text("Natural effect")],
      farmUse: [text("Farming use")],
      hormone: "Phytohormone",
      hormones: {
        auxin: {
          effect: [text("Cell elongation and apical dominance")],
          farmUse: [text("Rooting powder for stem cuttings")],
          name: "Auxin",
        },
        ethylene: {
          effect: [text("Triggers fruit ripening")],
          farmUse: [text("Ripens stored bananas")],
          name: "Ethylene",
        },
        gibberellin: {
          effect: [text("Stem elongation and seed germination")],
          farmUse: [text("Produces larger seedless grapes")],
          name: "Gibberellin",
        },
      },
      parts: {
        fruit: "Fruit",
        lateralBud: "Lateral bud",
        leaf: "Leaf",
        shootTip: "Shoot tip",
        stemNode: "Stem node",
      },
      view: "Whole plant showing responses to phytohormones",
    },
  };
  const { effect: _e, farmUse: _f, ...quiz } = lab.labels;

  it("decodes phytohormone action lab and marks answer state", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("PhytohormoneActionLab", lab)).toEqual([
      "labels.effect",
      "labels.farmUse",
    ]);
    expect(
      answerState("PhytohormoneActionLab", { ...lab, labels: quiz })
    ).toEqual([]);
  });

  it("refuses mismatched hormones", () => {
    expect(failsStrict(props, { ...lab, hormones: ["auxin"] })).toBe(true);
  });
});
