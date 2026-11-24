import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("bone health lab", () => {
  const { props } = assessmentVisuals.BoneHealthLab;
  const lab = {
    ...card,
    labels: {
      change: [text("What changes")],
      condition: "Condition",
      conditions: {
        osteoporosis: {
          change: [text("Bones get porous")],
          name: "Osteoporosis",
          who: [text("Older women")],
        },
        rickets: {
          change: [text("Bones turn soft")],
          name: "Rickets",
          who: [text("Children short of vitamin D")],
        },
      },
      parts: {
        cartilage: "Joint cartilage",
        growth: "Growth plate",
        membrane: "Synovial membrane",
        mineral: "Bone mineral",
        spine: "Spine",
        spongy: "Spongy bone",
      },
      state: "Show",
      states: { affected: "Affected", healthy: "Healthy" },
      view: "A human skeleton with a lens",
      who: [text("Most at risk")],
    },
    conditions: ["osteoporosis", "rickets"],
  };

  it("checks a lab whose picked conditions are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses none, an unknown one, or one picked twice", () => {
    expect(failsStrict(props, { ...lab, conditions: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, conditions: ["fracture"] })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        conditions: [...lab.conditions, lab.conditions[0]],
      })
    ).toBe(true);
  });

  it("refuses words missing for a picked one, or words for one not shown", () => {
    expect(
      failsStrict(props, { ...lab, conditions: Arr.take(lab.conditions, 1) })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          conditions: {
            ...lab.labels.conditions,
            gout: {
              change: [text("Crystals")],
              name: "Gout",
              who: [text("Adults")],
            },
          },
        },
      })
    ).toBe(true);
  });

  it("refuses a missing fixed word", () => {
    const { states: _missing, ...rest } = lab.labels;
    expect(failsStrict(props, { ...lab, labels: rest })).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("BoneHealthLab", lab)).toEqual([]);
  });
});
