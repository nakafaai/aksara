import { describe, expect, it } from "@effect/vitest";
import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";
import { Exit, Schema } from "effect";

import { LEARNING_PROGRAM_KEYS } from "#corpus/program/keys";

describe("learning program keys", () => {
  it("contains exactly the real curriculum and assessment programs", () => {
    expect(LEARNING_PROGRAM_KEYS).toEqual({
      cambridgeInternational: "cambridge-international",
      merdeka: "merdeka",
      singaporeMoe: "singapore-moe",
      snbt: "snbt",
      tka: "tka",
      unitedStates: "united-states",
    });
  });

  it("rejects route-shaped or locale-specific program identities", () => {
    const result = Schema.decodeExit(LearningProgramKeySchema)(
      "id/kurikulum-merdeka"
    );

    expect(Exit.isFailure(result)).toBe(true);
    if (Exit.isFailure(result)) {
      expect(String(result.cause)).toContain("Invalid learning program key.");
    }
  });
});
