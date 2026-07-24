import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import { MaterialDomainSchema } from "#contracts/material/domain";

describe("material domain contract", () => {
  it("keeps the exact authored material-domain vocabulary", () => {
    expect(MaterialDomainSchema.literals).toEqual([
      "ai-ds",
      "biology",
      "chemistry",
      "mathematics",
      "physics",
    ]);
    expect(Schema.is(MaterialDomainSchema)("mathematics")).toBe(true);
    expect(Schema.is(MaterialDomainSchema)("invented-domain")).toBe(false);
  });
});
