import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  MATERIAL_CARD_DESCRIPTION_MAX_LENGTH,
  MaterialCardDescriptionSchema,
} from "#corpus/material/description";

describe("material card description", () => {
  it("trims non-empty authored card copy", () => {
    expect(
      Schema.decodeUnknownSync(MaterialCardDescriptionSchema)("  Read this.  ")
    ).toBe("Read this.");
  });

  it("rejects empty and overlong card copy", () => {
    const empty = Schema.decodeUnknownEither(MaterialCardDescriptionSchema)(
      "   "
    );
    const overlong = Schema.decodeUnknownEither(MaterialCardDescriptionSchema)(
      "a".repeat(MATERIAL_CARD_DESCRIPTION_MAX_LENGTH + 1)
    );

    expect(Either.isLeft(empty)).toBe(true);
    expect(Either.isLeft(overlong)).toBe(true);
  });
});
