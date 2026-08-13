import { Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  ContentRouteChangeSchema,
  ContentRouteItemSchema,
  canonicalizeContentRouteChange,
  canonicalizeContentRouteItem,
} from "#contracts/release/route/spec";

const releaseId = "test-route";

/** Strictly checks one schema without accepting unknown wire fields. */
function accepts(schema: Schema.Schema.AnyNoContext, input: unknown) {
  return Either.isRight(
    Schema.decodeUnknownEither(schema)(input, { onExcessProperty: "error" })
  );
}

describe("content routes", () => {
  it("decodes and canonically serializes bind and delete changes", () => {
    const bind = Schema.decodeUnknownSync(ContentRouteChangeSchema)({
      appLocale: "en",
      contentKey: "test:route",
      operation: "bind",
      publicPath: "subjects/test/route",
    });
    const deletion = Schema.decodeUnknownSync(ContentRouteChangeSchema)({
      appLocale: "id",
      operation: "delete",
      publicPath: "subjects/test/rute",
    });

    expect(JSON.parse(canonicalizeContentRouteChange(bind))).toEqual(bind);
    expect(JSON.parse(canonicalizeContentRouteChange(deletion))).toEqual(
      deletion
    );

    const item = Schema.decodeUnknownSync(ContentRouteItemSchema)({
      change: bind,
      index: 0,
      releaseId,
    });
    expect(JSON.parse(canonicalizeContentRouteItem(item))).toEqual(item);
  });

  it("rejects incomplete and unsupported route changes", () => {
    for (const change of [
      {
        appLocale: "en",
        operation: "bind",
        publicPath: "subjects/test/route",
      },
      {
        appLocale: "en",
        contentKey: "test:route",
        operation: "delete",
        publicPath: "subjects/test/route",
      },
      {
        appLocale: "fr",
        operation: "delete",
        publicPath: "subjects/test/route",
      },
      {
        appLocale: "en",
        operation: "move",
        publicPath: "subjects/test/route",
      },
    ]) {
      expect(accepts(ContentRouteChangeSchema, change)).toBe(false);
    }
  });
});
