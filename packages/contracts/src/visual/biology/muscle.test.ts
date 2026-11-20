import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

describe("working muscle lab", () => {
  it("checks the oxygen debt of a working muscle", () => {
    const { props } = assessmentVisuals.OxygenDebtLab;
    const lab = {
      ...card,
      demand: { max: 2.5, min: 1, value: 2 },
      labels: {
        debt: [text("Debt repaid")],
        demand: "Oxygen demand above rest",
        force: [text("Force")],
        lactic: [text("Lactic acid")],
        need: [text("Oxygen demand")],
        parts: {
          capillary: "Capillary",
          cell: "Red blood cell",
          fibre: "Muscle fibre",
          liver: "To the liver",
        },
        shortfall: [text("Oxygen shortfall")],
        time: "Time",
        uptake: [text("Oxygen uptake")],
        view: "Working muscle fibres and their capillaries",
      },
      rest: 0.3,
    };

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(answerState("OxygenDebtLab", lab)).toEqual([]);

    const { force, need, parts, ...named } = lab.labels;
    const { liver, ...shown } = parts;
    const plain = { ...lab, labels: { ...named, parts: shown } };
    expect(decodeStrict(props, plain)).toEqual(plain);
    expect(
      failsStrict(props, { ...lab, demand: { max: 2.5, min: 1, value: 3 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, demand: { max: 1, min: 1, value: 1 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, rest: 0 })).toBe(true);
    expect(
      failsStrict(props, {
        ...lab,
        labels: { ...lab.labels, parts: { fibre: "Muscle fibre" } },
      })
    ).toBe(true);
  });
});
