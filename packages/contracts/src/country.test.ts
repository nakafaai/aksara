import { Either, ParseResult, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { CountryCodeSchema } from "#contracts/country";

describe("country code", () => {
  it("accepts ISO alpha-2 codes and rejects other forms", () => {
    expect(Schema.decodeUnknownSync(CountryCodeSchema)("DE")).toBe("DE");
    const invalid = Schema.decodeUnknownEither(CountryCodeSchema)("de");

    expect(Either.isLeft(invalid)).toBe(true);
    if (Either.isLeft(invalid)) {
      expect(ParseResult.TreeFormatter.formatErrorSync(invalid.left)).toContain(
        "Invalid country code."
      );
    }
  });
});
