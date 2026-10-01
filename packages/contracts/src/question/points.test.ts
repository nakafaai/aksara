import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import {
  AuthoredQuestionPointsSchema,
  QuestionPointsSchema,
  questionPoints,
} from "#contracts/question/points";
import { rubric } from "#contracts/test/rubric";

const response = {
  answer: { acceptsFractions: false, kind: "number", value: "12" },
  kind: "short-answer",
} as const;

describe("question points", () => {
  it("reads a rubric total, authored points, or the default single point", () => {
    expect(questionPoints({ response })).toBe(1);
    expect(questionPoints({ points: 3, response })).toBe(3);
    expect(questionPoints({ response: rubric })).toBe(3);
  });

  it("accepts positive whole points and authored points above the default", () => {
    expect(Schema.decodeSync(QuestionPointsSchema)(1)).toBe(1);
    expect(Schema.decodeSync(AuthoredQuestionPointsSchema)(2)).toBe(2);
  });

  it("rejects fractional, empty, and redundant default points", () => {
    for (const points of [0, -1, 1.5]) {
      expect(
        Exit.isFailure(Schema.decodeExit(QuestionPointsSchema)(points))
      ).toBe(true);
    }
    const redundant = Schema.decodeExit(AuthoredQuestionPointsSchema)(1);
    expect(Exit.isFailure(redundant) ? String(redundant.cause) : "").toContain(
      "Omit points to use the default of one point."
    );
  });
});
