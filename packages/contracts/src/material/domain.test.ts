import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import { MaterialDomainSchema } from "#contracts/material/domain";

describe("material domain contract", () => {
  it("accepts generic lowercase domain identities", () => {
    expect(Schema.is(MaterialDomainSchema)("mathematics")).toBe(true);
    expect(Schema.is(MaterialDomainSchema)("earth-science")).toBe(true);
  });

  it.each(["", "Earth-science", "earth_science", "-earth-science"])(
    "rejects malformed identity %j",
    (value) => {
      expect(Schema.is(MaterialDomainSchema)(value)).toBe(false);
    }
  );

  it("reports the protocol grammar at the strict decoding boundary", () => {
    expect(() =>
      Schema.decodeSync(MaterialDomainSchema)("Earth-science")
    ).toThrow("Invalid material domain. Expected lowercase kebab-case.");
  });

  it("enforces the protocol length boundary independently of inventory", () => {
    expect(Schema.is(MaterialDomainSchema)("a".repeat(128))).toBe(true);
    expect(Schema.is(MaterialDomainSchema)("a".repeat(129))).toBe(false);
  });
});
