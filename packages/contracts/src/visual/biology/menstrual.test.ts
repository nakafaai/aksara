import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

/** Plain words for every identifier, so a test names fixed parts in one line. */
function words(...ids: readonly string[]) {
  return Object.fromEntries(ids.map((id) => [id, id]));
}

describe("menstrual cycle lab", () => {
  const { props } = assessmentVisuals.MenstrualCycleLab;
  const lab = {
    ...card,
    labels: {
      day: [text("Day")],
      hormones: words("fsh", "lh", "oestrogen", "progesterone", "hcg"),
      length: "Cycle length",
      outcome: "Outcome",
      outcomes: { cycle: "Next cycle", pregnancy: "Pregnancy" },
      ovulation: [text("Ovulation day")],
      parts: words(
        "ovary",
        "follicle",
        "oocyte",
        "corpusLuteum",
        "endometrium",
        "artery"
      ),
      phase: [text("Phase")],
      phases: words(
        "menstruation",
        "follicle",
        "ovulation",
        "luteal",
        "pregnancy",
        "miscarriage"
      ),
      view: "An ovary and the uterus lining",
    },
    length: { max: 32, min: 21, value: 28 },
    luteal: 14,
    outcomes: ["cycle", "pregnancy"],
  };
  const { ovulation: _ovulation, ...quiz } = lab.labels;

  it("checks a cycle with and without the ovulation readout", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
  });

  it("refuses a luteal phase as long as the shortest cycle, or a length range turned around", () => {
    expect(failsStrict(props, { ...lab, luteal: 21 })).toBe(true);
    expect(
      failsStrict(props, { ...lab, length: { max: 21, min: 32, value: 28 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, length: { max: 32, min: 21, value: 28.5 } })
    ).toBe(true);
  });

  it("refuses an outcome without its name", () => {
    expect(
      failsStrict(props, {
        ...lab,
        outcomes: ["cycle", "pregnancy", "miscarriage"],
      })
    ).toBe(true);
  });

  it("reads the ovulation day as answer state", () => {
    expect(answerState("MenstrualCycleLab", lab)).toEqual(["labels.ovulation"]);
    expect(answerState("MenstrualCycleLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });
});
