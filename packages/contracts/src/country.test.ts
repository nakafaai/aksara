import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { CountryCodeSchema } from "#contracts/country";

describe("country code", () => {
  it("accepts ISO alpha-2 codes and rejects other forms", () => {
    expect(Schema.decodeSync(CountryCodeSchema)("DE")).toBe("DE");
    const invalid = Schema.decodeExit(CountryCodeSchema)("de");

    expect(Exit.isFailure(invalid)).toBe(true);
    if (Exit.isFailure(invalid)) {
      expect(String(invalid.cause)).toContain("Invalid country code.");
    }
  });
});
