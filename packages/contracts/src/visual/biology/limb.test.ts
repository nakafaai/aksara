import { describe, expect, it } from "@effect/vitest";
import { Array as Arr } from "effect";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("muscle pair lab", () => {
  const { props } = assessmentVisuals.MusclePairLab;
  const lab = {
    ...card,
    labels: {
      angle: "Elbow angle",
      contracting: [text("Contracts")],
      limb: "Limb",
      limbs: { arm: "Arm", leg: "Leg" },
      movement: "Movement",
      movements: {
        bend: "Bend the knee",
        heel: "Lift the heel",
        straighten: "Straighten the knee",
        toes: "Lift the toes",
      },
      muscles: {
        biceps: "Biceps",
        gastrocnemius: "Gastrocnemius",
        hamstrings: "Hamstrings",
        quadriceps: "Quadriceps",
        tibialis: "Tibialis anterior",
        triceps: "Triceps",
      },
      parts: {
        femur: "Femur",
        humerus: "Humerus",
        radius: "Radius",
        tendon: "Tendon",
        tibia: "Tibia",
        ulna: "Ulna",
      },
      relaxing: [text("Relaxes")],
      view: "An arm and a leg",
    },
    limbs: ["arm", "leg"],
  };

  it("checks a lab whose picked limbs are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses none, an unknown one, or one picked twice", () => {
    expect(failsStrict(props, { ...lab, limbs: [] })).toBe(true);
    expect(failsStrict(props, { ...lab, limbs: ["wing"] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, limbs: [...lab.limbs, lab.limbs[0]] })
    ).toBe(true);
  });

  it("refuses words missing for a picked one, or words for one not shown", () => {
    expect(failsStrict(props, { ...lab, limbs: Arr.take(lab.limbs, 1) })).toBe(
      true
    );
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, limbs: { ...lab.labels.limbs, wing: "Wing" } },
      })
    ).toBe(true);
  });

  it("refuses a missing fixed word", () => {
    const { muscles: _missing, ...rest } = lab.labels;
    expect(failsStrict(props, { ...lab, labels: rest })).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("MusclePairLab", lab)).toEqual([]);
  });
});
