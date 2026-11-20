import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, Schema } from "effect";
import {
  exactTextKey,
  PartSourceSchema,
  PartsSourceSchema,
  partInteraction,
  partStructure,
  sumPoints,
} from "#corpus/question-bank/part";

const decodeParts = Schema.decodeUnknownExit(PartsSourceSchema);
const decodePart = Schema.decodeUnknownSync(PartSourceSchema);

const derivative = {
  expression: "3x^2-4x",
  kind: "mathEntry",
  label: "a",
  points: 2,
};
const reason = {
  kind: "extendedText",
  label: "b",
  points: 3,
  rubric: [
    {
      label: "Vorzeichen der Ableitung",
      met: "Zeigt, dass f'(x) < 0 für 0 < x < 4/3 gilt.",
      points: 2,
    },
    {
      label: "Schluss auf die Monotonie",
      met: "Folgert, dass f dort streng monoton fällt.",
      points: 1,
    },
  ],
};
const gap = { accepted: ["lebt"], kind: "textEntry", label: "1", points: 1 };
const root = { kind: "numericEntry", label: "1.1", points: 1, value: "0.5" };

describe("parts source", () => {
  it("accepts an Aufgabe with Teilaufgaben and a C-Test text with its gaps", () => {
    expect(
      Exit.isSuccess(
        decodeParts({ kind: "parts", parts: [derivative, reason, root] })
      )
    ).toBe(true);
    expect(
      Exit.isSuccess(
        decodeParts({
          kind: "parts",
          parts: [
            gap,
            { ...gap, accepted: ["Zeit", "Zeiten"], label: "2" },
            { ...gap, accepted: ["schön"], label: "3" },
          ],
        })
      )
    ).toBe(true);
  });

  it("refuses no parts, a label twice, and a label an exam would not print", () => {
    for (const parts of [
      [],
      [derivative, { ...root, label: "a" }],
      [{ ...derivative, label: "A" }],
      [{ ...derivative, label: "1-1" }],
      [{ ...derivative, label: "1." }],
      [{ ...derivative, label: "abcdefghijklmnopq" }],
    ]) {
      expect(Exit.isFailure(decodeParts({ kind: "parts", parts }))).toBe(true);
    }
  });

  it("refuses points below one, empty or repeated texts, and a rubric that misses the points", () => {
    for (const part of [
      { ...derivative, points: 0 },
      { ...derivative, expression: " " },
      { ...gap, accepted: [] },
      { ...gap, accepted: ["lebt", "lebt"] },
      { ...gap, accepted: ["lebt\nt"] },
      { ...gap, accepted: ["le\u0301bt"] },
      { ...reason, points: 4 },
      { ...reason, rubric: [] },
      { ...root, value: "0.50" },
    ]) {
      expect(
        Exit.isFailure(decodeParts({ kind: "parts", parts: [part] }))
      ).toBe(true);
    }
  });

  it("keeps the case of an accepted text, as a C-Test scores it", () => {
    expect(
      Exit.isSuccess(
        decodeParts({
          kind: "parts",
          parts: [{ ...gap, accepted: ["Zeit", "zeit"] }],
        })
      )
    ).toBe(true);
    expect(exactTextKey(["Zeit"])).toEqual({
      acceptedAnswers: ["Zeit"],
      collapseWhitespace: true,
      ignoreCase: false,
      kind: "text",
    });
  });

  it("drops the words of a part and keeps what every language shares", () => {
    expect(
      Arr.map([derivative, reason, gap, root], (part) =>
        partStructure(decodePart(part))
      )
    ).toEqual([
      { expression: "3x^2-4x", kind: "mathEntry", label: "a", points: 2 },
      { kind: "extendedText", label: "b", points: 3, rubric: [2, 1] },
      { kind: "textEntry", label: "1", points: 1 },
      { kind: "numericEntry", label: "1.1", points: 1, value: "0.5" },
    ]);
  });

  it("names each part's interaction after its label and adds up points", () => {
    expect(Arr.map(["a", "1a", "1.1"], partInteraction)).toEqual([
      "part-a",
      "part-1a",
      "part-1-1",
    ]);
    expect(sumPoints([derivative, reason, root])).toBe(6);
  });
});
