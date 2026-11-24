import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("joint movement lab", () => {
  const { props } = assessmentVisuals.JointMovementLab;
  const lab = {
    ...card,
    labels: {
      example: [text("Example")],
      joint: "Joint",
      joints: {
        ballSocket: {
          example: [text("Shoulder")],
          movement: [text("Every direction")],
          name: "Ball-and-socket joint",
        },
        hinge: {
          example: [text("Elbow")],
          movement: [text("One plane")],
          name: "Hinge joint",
        },
      },
      move: "Move the bone",
      movement: [text("How it moves")],
      parts: {
        bone: "Bone",
        cartilage: "Cartilage",
        fluid: "Synovial fluid",
        ligament: "Ligament",
        membrane: "Synovial membrane",
        muscle: "Muscle",
        tendon: "Tendon",
      },
      view: "A joint",
    },
    joints: ["hinge", "ballSocket"],
  };

  it("checks a lab whose picked joints are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses none, an unknown one, or one picked twice", () => {
    expect(failsStrict(props, { ...lab, joints: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, joints: ["knee"] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, joints: [...lab.joints, lab.joints[0]] })
    ).toBe(true);
  });

  it("refuses words missing for a picked one, or words for one not shown", () => {
    expect(
      failsStrict(props, { ...lab, joints: Arr.take(lab.joints, 1) })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          joints: {
            ...lab.labels.joints,
            suture: {
              example: [text("Skull")],
              movement: [text("None")],
              name: "Suture",
            },
          },
        },
      })
    ).toBe(true);
  });

  it("refuses a missing fixed word", () => {
    const { parts: _missing, ...rest } = lab.labels;
    expect(failsStrict(props, { ...lab, labels: rest })).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("JointMovementLab", lab)).toEqual([]);
  });
});
