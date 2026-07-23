import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  LEARNING_PROGRAM_KEYS,
  LearningProgramKeySchema,
} from "#corpus/program/keys";

describe("learning program keys", () => {
  it("contains exactly the programs referenced by imported curricula", () => {
    expect(LEARNING_PROGRAM_KEYS).toEqual({
      cambridgeInternational: "cambridge-international",
      merdeka: "merdeka",
      singaporeMoe: "singapore-moe",
      unitedStates: "united-states",
    });
  });

  it("rejects route-shaped or locale-specific program identities", () => {
    const result = Schema.decodeUnknownEither(LearningProgramKeySchema)(
      "id/kurikulum-merdeka"
    );

    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(String(result.left)).toContain("Invalid learning program key.");
    }
  });
});
