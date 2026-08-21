import { Exit, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  PublicRouteSegmentSchema,
  PublicRouteSlugMapSchema,
} from "#corpus/route/schema";

describe("public route schema", () => {
  it("decodes complete locale-owned slug maps", () => {
    expect(
      Schema.decodeSync(PublicRouteSlugMapSchema)({
        de: "funktionsbegriff",
        en: "function-concept",
        id: "konsep-fungsi",
      })
    ).toEqual({
      de: "funktionsbegriff",
      en: "function-concept",
      id: "konsep-fungsi",
    });
    expect(
      Schema.decodeSync(PublicRouteSlugMapSchema)({ en: "function-concept" })
    ).toEqual({ en: "function-concept" });
  });

  it("rejects invalid segments and unsupported locale keys", () => {
    const invalidSegment = Schema.decodeExit(PublicRouteSegmentSchema)(
      "Invalid Segment"
    );
    const unsupported = Schema.decodeUnknownExit(PublicRouteSlugMapSchema)(
      { en: "function-concept", fr: "concept-de-fonction" },
      { onExcessProperty: "error" }
    );

    expect(Exit.isFailure(invalidSegment)).toBe(true);
    expect(Exit.isFailure(unsupported)).toBe(true);
    if (Exit.isFailure(invalidSegment)) {
      expect(String(invalidSegment.cause)).toContain(
        "Invalid public route segment."
      );
    }
  });
});
