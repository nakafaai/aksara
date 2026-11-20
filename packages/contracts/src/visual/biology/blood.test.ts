import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

const lab = {
  ...card,
  labels: {
    clumped: [text("Clumps")],
    group: [text("Blood group")],
    groups: {
      A: [text("A")],
      AB: [text("AB")],
      B: [text("B")],
      O: [text("O")],
    },
    sample: "Sample",
    sera: { a: [text("Anti-A")], b: [text("Anti-B")], d: [text("Anti-D")] },
    smooth: [text("No clumps")],
    time: [text("Time after mixing")],
    view: "A white tile with blood drops and antisera",
  },
  samples: [
    { group: "A", name: "Ali", rhesus: "positive" },
    { group: "O", name: "Mei", rhesus: "negative" },
    { group: "AB", name: "Ravi", rhesus: "positive" },
  ],
};

describe("blood labs", () => {
  it("checks a grouping tile of named samples", () => {
    const { props } = assessmentVisuals.BloodTypingLab;
    const { group: _group, groups: _groups, ...unnamed } = lab.labels;

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: unnamed })).toEqual({
      ...lab,
      labels: unnamed,
    });
    expect(
      failsStrict(props, {
        ...lab,
        samples: [{ group: "C", name: "Ali", rhesus: "positive" }],
      })
    ).toBe(true);
  });

  it("holds one to four samples, each named once", () => {
    const { props } = assessmentVisuals.BloodTypingLab;
    const sample = { group: "B", name: "Siti", rhesus: "negative" };

    expect(failsStrict(props, { ...lab, samples: [] })).toBe(true);
    expect(
      failsStrict(props, { ...lab, samples: [...lab.samples, sample, sample] })
    ).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        samples: [sample, { ...sample, group: "O" }],
      })
    ).toBe(true);
    expect(
      decodeStrict(props, { ...lab, samples: [...lab.samples, sample] })
    ).toEqual({ ...lab, samples: [...lab.samples, sample] });
  });

  it("keeps the named group as answer state", () => {
    expect(answerState("BloodTypingLab", lab)).toEqual([
      "labels.group",
      "labels.groups",
    ]);
    const { group: _group, groups: _groups, ...unnamed } = lab.labels;
    expect(answerState("BloodTypingLab", { ...lab, labels: unnamed })).toEqual(
      []
    );
  });
});
