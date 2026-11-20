import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Look closely.")], title: [text("Lab")] };

describe("vessel labs", () => {
  it("checks a capillary bed whose blood pressure falls from the arterial end", () => {
    const { props } = assessmentVisuals.CapillaryBedLab;
    const lab = {
      ...card,
      labels: {
        arterial: "Blood pressure at the arterial end",
        inward: [text("Net pressure at the venous end")],
        lymph: [text("Fluid left for the lymph")],
        oncotic: "Plasma protein pull",
        outward: [text("Net pressure at the arterial end")],
        parts: {
          arteriole: [text("Arteriole")],
          capillary: [text("Capillary")],
          cell: [text("Tissue cell")],
          lymph: [text("Lymph capillary")],
          venule: [text("Venule")],
        },
        turning: [text("Where fluid starts to return")],
        view: "A capillary bed",
      },
      oncotic: 25,
      pressure: { arterial: 35, venous: 18 },
      tissue: { oncotic: 0, pressure: 0 },
    };
    const subcutaneous = { ...lab, tissue: { oncotic: 8, pressure: -3 } };

    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, subcutaneous)).toEqual(subcutaneous);
    expect(
      failsStrict(props, { ...lab, pressure: { arterial: 18, venous: 18 } })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, oncotic: -1 })).toBe(true);
    expect(answerState("CapillaryBedLab", lab)).toEqual([]);
  });
});
