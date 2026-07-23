import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { DateOnlySchema } from "#contracts/date";

describe("date only", () => {
  it("accepts a real leap-day date", () => {
    expect(Schema.decodeUnknownSync(DateOnlySchema)("2024-02-29")).toBe(
      "2024-02-29"
    );
  });

  it.each(["not-a-date", "2026-02-29", "2026-13-01"])(
    "rejects invalid calendar date %s",
    (date) => {
      expect(
        Either.isLeft(Schema.decodeUnknownEither(DateOnlySchema)(date))
      ).toBe(true);
    }
  );
});
