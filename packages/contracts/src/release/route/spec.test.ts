import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  ContentRouteChangeSchema,
  ContentRouteItemSchema,
  canonicalizeContentRouteChange,
  canonicalizeContentRouteItem,
} from "#contracts/release/route/spec";

const releaseId = "test-route";

/** Strictly checks one schema without accepting unknown wire fields. */
function accepts(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

describe("content routes", () => {
  it("decodes and canonically serializes bind and delete changes", () => {
    const bind = Schema.decodeSync(ContentRouteChangeSchema)({
      appLocale: "en",
      contentKey: "test:route",
      operation: "bind",
      publicPath: "subjects/test/route",
    });
    const deletion = Schema.decodeSync(ContentRouteChangeSchema)({
      appLocale: "id",
      operation: "delete",
      publicPath: "subjects/test/rute",
    });

    expect(JSON.parse(canonicalizeContentRouteChange(bind))).toEqual(bind);
    expect(JSON.parse(canonicalizeContentRouteChange(deletion))).toEqual(
      deletion
    );

    const item = Schema.decodeSync(ContentRouteItemSchema)({
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

  it("pins the canonical bytes of a bind route change", () => {
    const change = Schema.decodeSync(ContentRouteChangeSchema)({
      appLocale: "en",
      contentKey: "test:route",
      operation: "bind",
      publicPath: "subjects/test/route",
    });

    expect(canonicalizeContentRouteChange(change)).toBe(
      '{"appLocale":"en","contentKey":"test:route","operation":"bind","publicPath":"subjects/test/route"}'
    );
  });

  it("pins the canonical bytes of a delete route change", () => {
    const change = Schema.decodeSync(ContentRouteChangeSchema)({
      appLocale: "id",
      operation: "delete",
      publicPath: "subjects/test/rute",
    });

    expect(canonicalizeContentRouteChange(change)).toBe(
      '{"appLocale":"id","operation":"delete","publicPath":"subjects/test/rute"}'
    );
  });

  it("pins the canonical bytes of an indexed route item", () => {
    const item = Schema.decodeSync(ContentRouteItemSchema)({
      change: {
        appLocale: "de",
        contentKey: "test:route",
        operation: "bind",
        publicPath: "subjects/test/route",
      },
      index: 2,
      releaseId: "test-route",
    });

    expect(canonicalizeContentRouteItem(item)).toBe(
      '{"change":{"appLocale":"de","contentKey":"test:route","operation":"bind","publicPath":"subjects/test/route"},"index":2,"releaseId":"test-route"}'
    );
  });
});
