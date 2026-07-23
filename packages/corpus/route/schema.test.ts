import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  PublicRouteSegmentSchema,
  PublicRouteSlugMapSchema,
} from "#corpus/route/schema";

describe("public route schema", () => {
  it("decodes complete locale-owned slug maps", () => {
    expect(
      Schema.decodeUnknownSync(PublicRouteSlugMapSchema)({
        en: "function-concept",
        id: "konsep-fungsi",
      })
    ).toEqual({ en: "function-concept", id: "konsep-fungsi" });
  });

  it("rejects invalid segments and missing supported locales", () => {
    const invalidSegment = Schema.decodeUnknownEither(PublicRouteSegmentSchema)(
      "Invalid Segment"
    );
    const incomplete = Schema.decodeUnknownEither(PublicRouteSlugMapSchema)({
      en: "function-concept",
    });

    expect(Either.isLeft(invalidSegment)).toBe(true);
    expect(Either.isLeft(incomplete)).toBe(true);
    if (Either.isLeft(invalidSegment)) {
      expect(String(invalidSegment.left)).toContain(
        "Invalid public route segment."
      );
    }
  });
});
