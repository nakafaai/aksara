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

describe("twins lab", () => {
  const { props } = assessmentVisuals.TwinsLab;
  const lab = {
    ...card,
    kinds: ["identical", "fraternal"],
    labels: {
      genes: [text("Genes")],
      kind: "Kind",
      kinds: { fraternal: "Fraternal", identical: "Identical" },
      parts: words(
        "ovary",
        "oocyte",
        "sperm",
        "blastocyst",
        "innerCellMass",
        "disc",
        "placenta",
        "amnion",
        "chorion",
        "foetus"
      ),
      placentas: [text("Placentas")],
      results: words("same", "different", "either", "joined"),
      sacs: [text("Sacs")],
      sex: [text("Sex")],
      split: "Day of the split",
      view: "Twins forming",
    },
    split: { max: 15, min: 1, value: 5 },
  };

  it("checks both kinds with a split day", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses a split range turned around, a negative day, or a fraction of a day", () => {
    expect(
      failsStrict(props, { ...lab, split: { max: 1, min: 15, value: 5 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, split: { max: 15, min: -1, value: 5 } })
    ).toBe(true);
    expect(
      failsStrict(props, { ...lab, split: { max: 15, min: 1, value: 4.5 } })
    ).toBe(true);
  });

  it("refuses a kind named but not shown", () => {
    expect(failsStrict(props, { ...lab, kinds: ["identical"] })).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("TwinsLab", lab)).toEqual([]);
  });
});
