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
        en: "function-concept",
        id: "konsep-fungsi",
      })
    ).toEqual({ en: "function-concept", id: "konsep-fungsi" });
  });

  it("rejects invalid segments and missing supported locales", () => {
    const invalidSegment = Schema.decodeExit(PublicRouteSegmentSchema)(
      "Invalid Segment"
    );
    const incomplete = Schema.decodeUnknownExit(PublicRouteSlugMapSchema)({
      en: "function-concept",
    });

    expect(Exit.isFailure(invalidSegment)).toBe(true);
    expect(Exit.isFailure(incomplete)).toBe(true);
    if (Exit.isFailure(invalidSegment)) {
      expect(String(invalidSegment.cause)).toContain(
        "Invalid public route segment."
      );
    }
  });
});
