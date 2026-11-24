import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Record } from "effect";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

/** Plain words for every identifier, so a test names fixed parts in one line. */
function words(...ids: readonly string[]) {
  return Record.fromEntries(
    Arr.map(ids, (id): readonly [string, string] => [id, id])
  );
}

describe("gametogenesis lab", () => {
  const { props } = assessmentVisuals.GametogenesisLab;
  const lab = {
    ...card,
    chromosomes: 46,
    labels: {
      cell: [text("Cell")],
      cells: words(
        "spermatogonium",
        "primarySpermatocyte",
        "secondarySpermatocyte",
        "spermatid",
        "sperm",
        "oogonium",
        "primaryOocyte",
        "secondaryOocyte",
        "polarBody",
        "ovum"
      ),
      chromosomes: [text("Chromosomes")],
      level: "Level",
      levels: { gamete: "Gamete", meiosis: "Meiosis" },
      made: [text("Gametes made")],
      parts: words(
        "testis",
        "scrotum",
        "epididymis",
        "spermDuct",
        "seminalVesicle",
        "prostate",
        "cowper",
        "urethra",
        "penis",
        "ovary",
        "oviduct",
        "uterus",
        "cervix",
        "vagina",
        "tubule",
        "interstitial",
        "follicle",
        "corpusLuteum",
        "head",
        "acrosome",
        "middle",
        "tail",
        "follicular",
        "antrum"
      ),
      polar: [text("Polar body")],
      sex: "Sex",
      sexes: { female: "Female", male: "Male" },
      view: "Gamete formation",
    },
    levels: ["meiosis", "gamete"],
    sexes: ["male", "female"],
  };
  const { chromosomes: _chromosomes, made: _made, ...quiz } = lab.labels;

  it("checks a lab with its readouts named, and one with them left out", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
    expect(decodeStrict(props, { ...lab, labels: quiz })).toEqual({
      ...lab,
      labels: quiz,
    });
  });

  it("refuses an odd or zero chromosome count", () => {
    expect(failsStrict(props, { ...lab, chromosomes: 47 })).toBe(true);
    expect(failsStrict(props, { ...lab, chromosomes: 0 })).toBe(true);
  });

  it("refuses an unnamed level or a sex named but not shown", () => {
    expect(
      failsStrict(props, { ...lab, levels: ["system", "meiosis", "gamete"] })
    ).toBe(true);
    expect(failsStrict(props, { ...lab, sexes: ["male"] })).toBe(true);
  });

  it("reads the chromosome and gamete counts as answer state", () => {
    expect(answerState("GametogenesisLab", lab)).toEqual([
      "labels.chromosomes",
      "labels.made",
    ]);
    expect(answerState("GametogenesisLab", { ...lab, labels: quiz })).toEqual(
      []
    );
  });
});
