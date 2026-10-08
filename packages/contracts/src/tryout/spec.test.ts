import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { encodeJsonText } from "#contracts/text/json";
import { TryoutKeySchema } from "#contracts/tryout/key";
import {
  canonicalTryoutMarks,
  TryoutContentHashSchema,
  type TryoutMarks,
  TryoutMarksSchema,
  TryoutScoringSchema,
  TryoutSourceRevisionSchema,
  TryoutTrackKindSchema,
  TryoutVisibilitySchema,
} from "#contracts/tryout/spec";

describe("try-out shared contracts", () => {
  it("accepts the implemented scoring, track, and visibility vocabulary", () => {
    expect(TryoutScoringSchema.literals).toEqual(["irt", "penalized", "raw"]);
    expect(TryoutTrackKindSchema.literals).toEqual([
      "institution",
      "subject",
      "year",
    ]);
    expect(TryoutVisibilitySchema.literals).toEqual([
      "internal-entry",
      "visible",
    ]);
  });

  it("keeps revision and durable content hashes bounded", () => {
    expect(Schema.decodeSync(TryoutSourceRevisionSchema)("2026-08-12")).toBe(
      "2026-08-12"
    );
    expect(Schema.decodeSync(TryoutContentHashSchema)("a".repeat(64))).toBe(
      "a".repeat(64)
    );
    expect(
      Exit.isFailure(Schema.decodeExit(TryoutContentHashSchema)("a".repeat(63)))
    ).toBe(true);
    const invalidKey = Schema.decodeExit(TryoutKeySchema)("Not_Key");
    expect(
      Exit.isFailure(invalidKey) ? String(invalidKey.cause) : ""
    ).toContain("Invalid try-out key.");
  });

  it("accepts penalized marks and canonicalizes them in stable order", () => {
    const cases: readonly (readonly [TryoutMarks, string])[] = [
      [
        { blank: 0, correct: 4, wrong: -1 },
        '{"blank":0,"correct":4,"wrong":-1}',
      ],
      [
        { blank: -1, correct: 1, wrong: -1 },
        '{"blank":-1,"correct":1,"wrong":-1}',
      ],
      [
        { blank: 1, correct: 6, wrong: -2 },
        '{"blank":1,"correct":6,"wrong":-2}',
      ],
    ];
    for (const [marks, canonical] of cases) {
      const decoded = Schema.decodeSync(TryoutMarksSchema)(marks);
      expect(encodeJsonText(canonicalTryoutMarks(decoded))).toBe(canonical);
    }
  });

  it("rejects marks that reward mistakes or blanks over correct answers", () => {
    for (const marks of [
      { blank: 0, correct: 4, wrong: 0 },
      { blank: 0, correct: 0, wrong: -1 },
      { blank: -2, correct: 4, wrong: -1 },
      { blank: 4, correct: 4, wrong: -1 },
      { blank: 0, correct: 4, wrong: -0.5 },
    ]) {
      const result = Schema.decodeExit(TryoutMarksSchema)(marks);
      expect(Exit.isFailure(result)).toBe(true);
    }
  });
});
