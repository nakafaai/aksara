import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  compareHistoricalCodeUnits,
  HistoricalPrimitive,
  HistoricalSha256HashSchema,
  historicalQuestionKeyParts,
} from "#contracts/history/primitives";

describe("historical primitives", () => {
  it("orders retained strings by exact code units", () => {
    expect(compareHistoricalCodeUnits("a", "b")).toBe(-1);
    expect(compareHistoricalCodeUnits("b", "a")).toBe(1);
    expect(compareHistoricalCodeUnits("a", "a")).toBe(0);
  });

  it("parses only exact retained question roots", () => {
    expect(
      historicalQuestionKeyParts(
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-7"
      )
    ).toEqual({
      countryKey: "indonesia",
      examKey: "snbt",
      questionNumber: 7,
      sectionKey: "general-reasoning",
      setKey: "set-1",
    });
    expect(
      historicalQuestionKeyParts("material/indonesia/snbt")
    ).toBeUndefined();
    expect(
      historicalQuestionKeyParts("question-bank/tryout/a/b/c/question-1")
    ).toBeUndefined();
    expect(
      historicalQuestionKeyParts(
        "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-999999999999999999999999"
      )
    ).toBeUndefined();
  });

  it("rejects graph identities with displaced historical prefixes", () => {
    const result = Schema.decodeExit(
      HistoricalPrimitive.LearningGraphIdentitySchema
    )({
      alignmentId: "asset:tryout-indonesia",
      assetId: "alignment:tryout-indonesia",
      conceptId: "concept:tryout-indonesia",
      learningObjectId: "lo:tryout-indonesia",
      lensId: "lens:tryout-indonesia",
    });

    expect(Exit.isFailure(result)).toBe(true);
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "historical prefixes"
    );
  });

  it("rejects a retained hash outside its exact old wire", () => {
    const result = Schema.decodeExit(HistoricalSha256HashSchema)(
      `sha256:${"g".repeat(64)}`
    );

    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "exact SHA-256 wire format"
    );
  });
});
