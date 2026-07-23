import { Schema } from "effect";
import { describe, expect, it } from "vitest";

import { MaterialDomainSchema } from "#corpus/material/domain";

describe("material domain", () => {
  it("contains exactly the domains present in the imported lesson sources", () => {
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
