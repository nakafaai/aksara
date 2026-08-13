import { Either, Schema } from "effect";
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
        Either.isLeft(
          Schema.decodeUnknownEither(TryoutChoiceListSchema)(candidate)
        )
      ).toBe(true);
    }
    expect(
      String(
        Schema.decodeUnknownEither(TryoutChoiceListSchema)([
          { ...valid[0], isCorrect: false },
        ])
      )
    ).toContain(
      "Choices require contiguous option identities and one correct answer."
    );
  });

  it("keeps revision and durable content hashes bounded", () => {
    expect(
      Schema.decodeUnknownSync(TryoutSourceRevisionSchema)("2026-08-12")
    ).toBe("2026-08-12");
    expect(
      Schema.decodeUnknownSync(TryoutContentHashSchema)("a".repeat(64))
    ).toBe("a".repeat(64));
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(TryoutContentHashSchema)("a".repeat(63))
      )
    ).toBe(true);
    const invalidKey = Schema.decodeUnknownEither(TryoutKeySchema)("Not_Key");
    expect(Either.isLeft(invalidKey) ? String(invalidKey.left) : "").toContain(
      "Invalid try-out key."
    );
  });
});
