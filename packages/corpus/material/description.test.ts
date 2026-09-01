import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";

import {
  MATERIAL_CARD_DESCRIPTION_MAX_LENGTH,
  MaterialCardDescriptionSchema,
} from "#corpus/material/description";

describe("material card description", () => {
  it("trims non-empty authored card copy", () => {
    expect(
      Schema.decodeSync(MaterialCardDescriptionSchema)("  Read this.  ")
    ).toBe("Read this.");
  });

  it("rejects empty and overlong card copy", () => {
    const empty = Schema.decodeExit(MaterialCardDescriptionSchema)("   ");
    const overlong = Schema.decodeExit(MaterialCardDescriptionSchema)(
      "a".repeat(MATERIAL_CARD_DESCRIPTION_MAX_LENGTH + 1)
    );

    expect(Exit.isFailure(empty)).toBe(true);
    expect(Exit.isFailure(overlong)).toBe(true);
  });
});
