import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const lab = {
  description: [text("Pick a method.")],
  flow: { max: 10, min: 1, value: 5 },
  labels: {
    batches: [text("Batches of milk treated by the same lactase")],
    enzyme: [text("Lactase in the milk coming out")],
    flow: "Milk flow rate",
    glucose: [text("Glucose test strip")],
    lactose: [text("Lactose left in the milk coming out")],
    method: "Method",
    methods: {
      free: "Lactase stirred into milk",
      immobilised: "Lactase in beads",
    },
    negative: [text("no glucose")],
    none: [text("none")],
    parts: {
      beads: "Alginate beads",
      column: "Column",
      milk: "Milk",
      strip: "Glucose test strip",
    },
    positive: [text("glucose present")],
    present: [text("present")],
    view: "A glass column of alginate beads",
  },
  methods: ["immobilised", "free"],
  title: [text("Lab")],
};

describe("lactase column lab", () => {
  const { props } = assessmentVisuals.LactaseColumnLab;

  it("checks both methods, and one method with its own name", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    const column = {
      ...lab,
      labels: { ...lab.labels, methods: { immobilised: "Lactase in beads" } },
      methods: ["immobilised"],
    };
    expect(decodeStrict(props, column)).toEqual(column);
  });

  it("refuses a method without its name or a name for a method not shown", () => {
    expect(failsStrict(props, { ...lab, methods: ["immobilised"] })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: {
          ...lab.labels,
          methods: { free: "Lactase stirred into milk" },
        },
      })
    ).toBe(true);
  });

  it("refuses a flow faster than a school column runs or stopped", () => {
    expect(
      failsStrict(props, { ...lab, flow: { max: 30, min: 1, value: 5 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, flow: { max: 10, min: 0, value: 5 } })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("LactaseColumnLab", lab)).toEqual([]);
  });
});
