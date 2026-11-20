import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("key builder lab", () => {
  const { props } = assessmentVisuals.KeyBuilderLab;
  const lab = {
    ...card,
    animals: ["ant", "snail"],
    couplets: ["legs", "shell"],
    labels: {
      animals: { ant: "Ant", snail: "Snail" },
      couplets: {
        legs: { a: "Has legs", b: "Has no legs" },
        shell: { a: "Has a shell", b: "Has no shell" },
      },
      failed: [text("Step that failed")],
      reached: [text("Animals that reach their name")],
      run: "Run the key",
      sorted: [text("Your key works")],
      step: "Step",
      view: "A tray of animals",
    },
  };

  it("checks a key whose animals and couplets are each named once", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses a couplet without both statements, or one not shown", () => {
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          couplets: { ...lab.labels.couplets, legs: { a: "Has legs" } },
        },
      })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, couplets: ["legs"] })).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("KeyBuilderLab", lab)).toEqual([]);
  });
});
