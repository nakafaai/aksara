import { describe, expect, it } from "@effect/vitest";
import { TextSchema } from "#contracts/visual/card";
import { answerAt, figure, markup, noAnswer } from "#contracts/visual/entry";

describe("answer state", () => {
  const read = answerAt(["trigValues"], ["labels", "samples", "*", "note"]);

  it("lists each present prop at a path, through records and lists", () => {
    expect(
      read({
        labels: {
          samples: { argon: { tab: "Ar" }, neon: { note: "2, 8", tab: "Ne" } },
        },
        trigValues: { sin: "5/13" },
      })
    ).toEqual(["trigValues", "labels.samples.neon.note"]);
    expect(
      answerAt(["items", "*", "takeaway"])({
        items: [{ tab: "A" }, { tab: "B", takeaway: "It divides." }],
      })
    ).toEqual(["items.1.takeaway"]);
  });

  it("reads nothing where the props hold no answer state", () => {
    expect(read({ labels: { samples: { neon: { tab: "Ne" } } } })).toEqual([]);
    expect(read({ labels: "plain" })).toEqual([]);
    expect(read(undefined)).toEqual([]);
    expect(noAnswer({ trigValues: {} })).toEqual([]);
  });

  it("treats a flag that is off as showing nothing", () => {
    const flags = answerAt(["calculateRegressionLine"], ["showResiduals"]);

    expect(
      flags({ calculateRegressionLine: false, showResiduals: true })
    ).toEqual(["showResiduals"]);
  });
});

describe("entries", () => {
  it("marks a figure with its answer reader and markup with none", () => {
    expect(figure(TextSchema).kind).toBe("figure");
    expect(figure(TextSchema).answer).toBe(noAnswer);
    expect(markup(TextSchema)).toEqual({
      answer: noAnswer,
      kind: "markup",
      props: TextSchema,
    });
  });
});

describe("answer paths through lists", () => {
  it("names a list item only through a wildcard", () => {
    expect(answerAt(["items", "first"])({ items: [{ first: 1 }] })).toEqual([]);
  });
});
