import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { ContentDeliveryClassSchema } from "#contracts/delivery";

describe("content delivery", () => {
  it("accepts only the three explicit artifact access boundaries", () => {
    for (const delivery of ["public", "authenticated", "entitled"]) {
      expect(
        Either.isRight(
          Schema.decodeUnknownEither(ContentDeliveryClassSchema)(delivery)
        )
      ).toBe(true);
    }
    expect(
      Either.isLeft(
        Schema.decodeUnknownEither(ContentDeliveryClassSchema)("private")
      )
    ).toBe(true);
  });
});
