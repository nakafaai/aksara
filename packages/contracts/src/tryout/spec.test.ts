import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { TryoutKeySchema } from "#contracts/tryout/key";
import {
  TryoutChoiceListSchema,
  TryoutContentHashSchema,
  TryoutScoringSchema,
  TryoutSourceRevisionSchema,
  TryoutVisibilitySchema,
} from "#contracts/tryout/spec";

describe("try-out shared contracts", () => {
  it("accepts the implemented scoring and visibility vocabulary", () => {
    expect(TryoutScoringSchema.literals).toEqual(["irt", "raw"]);
    expect(TryoutVisibilitySchema.literals).toEqual([
      "internal-entry",
      "visible",
    ]);
  });

  it("requires one correct choice and contiguous option identity", () => {
    const valid = [
      { isCorrect: true, label: "A", optionKey: "option-1", order: 1 },
      { isCorrect: false, label: "B", optionKey: "option-2", order: 2 },
    ];
    expect(Schema.decodeUnknownSync(TryoutChoiceListSchema)(valid)).toEqual(
      valid
    );

    for (const candidate of [
      valid.map((choice) => ({ ...choice, isCorrect: false })),
      [valid[1], valid[0]],
      [{ ...valid[0], optionKey: "option-2" }],
    ]) {
      expect(
        Exit.isFailure(
          Schema.decodeUnknownExit(TryoutChoiceListSchema)(candidate)
        )
      ).toBe(true);
    }
    expect(
      String(
        Schema.decodeUnknownExit(TryoutChoiceListSchema)([
          { ...valid[0], isCorrect: false },
        ])
      )
    ).toContain(
      "Choices require contiguous option identities and one correct answer."
    );
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
});
