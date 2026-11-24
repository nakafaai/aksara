import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Record as Rec } from "effect";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

/** Plain words for every identifier, so a test names fixed parts in one line. */
function words(...ids: readonly string[]) {
  return Rec.fromEntries(Arr.map(ids, (id) => [id, id] as const));
}

describe("implantation lab", () => {
  const { props } = assessmentVisuals.ImplantationLab;
  const lab = {
    ...card,
    labels: {
      cells: [text("Cells")],
      day: [text("Day")],
      parts: words(
        "ovary",
        "ampulla",
        "tube",
        "uterus",
        "endometrium",
        "sperm",
        "zona",
        "innerCellMass",
        "trophoblast",
        "cavity",
        "hcg"
      ),
      share: [text("Share of the zygote")],
      stage: [text("Stage")],
      stages: words("zygote", "twoCell", "morula", "blastocyst", "implanting"),
      view: "An oviduct and uterus",
    },
  };
  const { cells: _cells, share: _share, ...quiz } = lab.labels;

  it("checks the lab with and without its counts", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
  });

  it("refuses a missing stage", () => {
    const { morula: _morula, ...stages } = lab.labels.stages;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, stages } })
    ).toBe(true);
  });

  it("reads the counts as answer state", () => {
    expect(answerState("ImplantationLab", lab)).toEqual([
      "labels.cells",
      "labels.share",
    ]);
    expect(answerState("ImplantationLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });
});
