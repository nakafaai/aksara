import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Exit, HashSet, Schema } from "effect";
import {
  ExcludedPartSchema,
  hasWholeWeights,
  isCited,
  ReadinessSectionSchema,
  readinessExpectations,
} from "#corpus/tryout/readiness/section";

const decodeSection = Schema.decodeUnknownSync(ReadinessSectionSchema);
const decodeExcluded = Schema.decodeUnknownSync(ExcludedPartSchema);

/** Binds one fixture value to the official FSP evidence. */
const official = <Value>(value: Value) => ({
  provenance: { evidenceKey: "fsp-rules", kind: "official" },
  value,
});

/** The written mathematics exam of an FSP: three Aufgaben, a calculator, and a weight. */
const mathematics = {
  aids: official(["calculator-scientific", "formula-sheet"]),
  key: "mathematics",
  order: 1,
  questionCount: official(3),
  questionPoints: official([20, 20, 20]),
  timeLimitSeconds: official(10_800),
  totalPoints: official(60),
  weight: official(1),
};
const german = {
  key: "german",
  order: 2,
  questionCount: official(1),
  timeLimitSeconds: official(5400),
  weight: official(1),
};
const oral = decodeExcluded({ key: "oral-exam", weight: official(1) });

describe("readiness section", () => {
  it("records the aids, the points of each Aufgabe, and the weight of a section", () => {
    expect(decodeSection(mathematics)).toEqual(mathematics);
    const { totalPoints: _total, ...perQuestion } = mathematics;
    const { questionPoints: _points, ...summed } = mathematics;

    expect(decodeSection(perQuestion)).toEqual(perQuestion);
    expect(decodeSection(summed)).toEqual(summed);
  });

  it("refuses points that miss a question or the total, and the review mark as an aid", () => {
    for (const section of [
      { ...mathematics, questionPoints: official([30, 30]) },
      { ...mathematics, totalPoints: official(50) },
      { ...mathematics, aids: official(["mark-for-review"]) },
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(ReadinessSectionSchema)(section)
        )
      ).toBe(true);
    }
  });

  it("lists every expectation, the weights of the parts left out included", () => {
    const sections = [decodeSection(mathematics), decodeSection(german)];

    expect(readinessExpectations(sections, undefined)).toHaveLength(9);
    expect(readinessExpectations(sections, [oral])).toHaveLength(10);
    expect(
      Arr.map(readinessExpectations(sections, [oral]), (expectation) =>
        isCited(HashSet.make("fsp-rules"), expectation)
      )
    ).not.toContain(false);
    expect(
      isCited(HashSet.empty<string>(), {
        provenance: { kind: "editorial" },
        value: 1,
      })
    ).toBe(true);
    expect(isCited(HashSet.empty<string>(), oral.weight)).toBe(false);
  });

  it("weighs every section once one is weighed or a part is left out", () => {
    const sections = [decodeSection(mathematics), decodeSection(german)];
    const { weight: _german, ...unweighed } = german;
    const { weight: _mathematics, ...bareMathematics } = mathematics;
    const partly = [decodeSection(mathematics), decodeSection(unweighed)];
    const bare = [decodeSection(bareMathematics), decodeSection(unweighed)];

    expect(hasWholeWeights(sections, [oral])).toBe(true);
    expect(hasWholeWeights(sections, undefined)).toBe(true);
    expect(hasWholeWeights(bare, undefined)).toBe(true);
    expect(hasWholeWeights(partly, undefined)).toBe(false);
    expect(hasWholeWeights(bare, [oral])).toBe(false);
    expect(hasWholeWeights(sections, [oral, oral])).toBe(false);
    expect(
      hasWholeWeights(sections, [decodeExcluded({ ...oral, key: "german" })])
    ).toBe(false);
  });
});
