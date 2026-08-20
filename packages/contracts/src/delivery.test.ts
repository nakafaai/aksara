import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { ContentDeliveryClassSchema } from "#contracts/delivery";

describe("content delivery", () => {
  it("accepts only the three explicit artifact access boundaries", () => {
    for (const delivery of ["public", "authenticated", "entitled"]) {
      expect(
        Exit.isSuccess(
          Schema.decodeUnknownExit(ContentDeliveryClassSchema)(delivery)
        )
      ).toBe(true);
    }
    expect(
      Exit.isFailure(
        Schema.decodeUnknownExit(ContentDeliveryClassSchema)("private")
      )
    ).toBe(true);
  });
});
