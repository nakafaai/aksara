import { describe, expect, it } from "@effect/vitest";
import {
  decodeStrict,
  failsStrict,
  text,
} from "#contracts/test/assessment/document";
import { answerState, assessmentVisuals } from "#contracts/visual/catalog";

const card = { description: [text("Pick one.")], title: [text("Lab")] };

describe("taxon rank lab", () => {
  const { props } = assessmentVisuals.TaxonRankLab;
  const lab = {
    ...card,
    labels: {
      count: [text("Ranks shared")],
      first: "First organism",
      none: [text("None")],
      organisms: {
        sunBear: "Sun bear",
        tapir: "Malayan tapir",
        tiger: "Tiger",
      },
      ranks: {
        class: "Class",
        family: "Family",
        genus: "Genus",
        kingdom: "Kingdom",
        order: "Order",
        phylum: "Phylum",
        species: "Species",
      },
      second: "Second organism",
      shared: [text("Lowest shared rank")],
      view: "Nested trays",
    },
    organisms: ["tiger", "sunBear", "tapir"],
    pair: ["tiger", "sunBear"],
  };

  it("checks a lab with a starting pair from its organisms", () => {
    expect(decodeStrict(props, lab)).toEqual(lab);
  });

  it("refuses a pair of one organism twice, or with one not shown", () => {
    expect(failsStrict(props, { ...lab, pair: ["tiger", "tiger"] })).toBe(true);
    expect(failsStrict(props, { ...lab, pair: ["tiger", "padi"] })).toBe(true);
  });

  it("refuses an unnamed organism or a missing rank", () => {
    expect(
      failsStrict(props, {
        ...lab,
        organisms: ["tiger", "sunBear", "tapir", "padi"],
      })
    ).toBe(true);
    const { genus: _genus, ...ranks } = lab.labels.ranks;
    expect(
      failsStrict(props, { ...lab, labels: { ...lab.labels, ranks } })
    ).toBe(true);
  });

  it("holds no answer state", () => {
    expect(answerState("TaxonRankLab", lab)).toEqual([]);
  });
});
