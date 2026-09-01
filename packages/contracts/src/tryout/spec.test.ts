import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import { TryoutKeySchema } from "#contracts/tryout/key";
import {
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
