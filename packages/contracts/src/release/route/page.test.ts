import { describe, expect, it } from "@effect/vitest";
import { Exit, Schema } from "effect";
import {
  MAX_ROUTE_PAGE_RECORDS,
  RoutePageRequestSchema,
  RoutePageSchema,
  RouteRollbackRecordSchema,
} from "#contracts/release/route/page";

const hash = `sha256:${"a".repeat(64)}`;
const releaseId = "test-route-page";

/** Builds one valid route rollback record for a deterministic index. */
function record(index: number) {
  return Schema.decodeSync(RouteRollbackRecordSchema)({
    current: {
      change: {
        appLocale: "en",
        contentKey: `test:route-${index}`,
        operation: "bind",
        publicPath: `subjects/test/${index}`,
      },
      index,
      releaseId,
    },
    priorContentKey: null,
  });
}

/** Strictly checks one route page schema without excess properties. */
function accepts(schema: Schema.ConstraintDecoder<unknown>, input: unknown) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}

describe("route rollback pages", () => {
  it("accepts bounded requests and coherent pages", () => {
    const request = {
      afterIndex: -1,
      limit: MAX_ROUTE_PAGE_RECORDS,
      rollbackOf: releaseId,
      rollbackOfManifestHash: hash,
    };
    expect(accepts(RoutePageRequestSchema, request)).toBe(true);

    expect(
      accepts(RoutePageSchema, {
        done: true,
        nextIndex: 1,
        records: [record(0), record(1)],
        rollbackOf: releaseId,
        rollbackOfManifestHash: hash,
        total: 2,
      })
    ).toBe(true);
  });

  it("accepts only coherent empty and non-terminal pages", () => {
    expect(
      accepts(RoutePageSchema, {
        done: true,
        nextIndex: -1,
        records: [],
        rollbackOf: releaseId,
        rollbackOfManifestHash: hash,
        total: 0,
      })
    ).toBe(true);
    expect(
      accepts(RoutePageSchema, {
        done: false,
        nextIndex: 0,
        records: [record(0)],
        rollbackOf: releaseId,
        rollbackOfManifestHash: hash,
        total: 2,
      })
    ).toBe(true);

    const invalidPages = [
      { done: false, nextIndex: -1, records: [], total: 1 },
      { done: true, nextIndex: -1, records: [], total: 1 },
      { done: true, nextIndex: 0, records: [record(0)], total: 2 },
      { done: false, nextIndex: 1, records: [record(0)], total: 2 },
      {
        done: true,
        nextIndex: 2,
        records: [record(0), record(2)],
        total: 3,
      },
    ];
    for (const invalid of invalidPages) {
      expect(
        accepts(RoutePageSchema, {
          ...invalid,
          rollbackOf: releaseId,
          rollbackOfManifestHash: hash,
        })
      ).toBe(false);
    }
    const result = Schema.decodeUnknownExit(RoutePageSchema)({
      ...invalidPages[0],
      rollbackOf: releaseId,
      rollbackOfManifestHash: hash,
    });
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "Expected one contiguous route page with coherent progress evidence."
    );
  });

  it("requires route changes to alter the prior owner", () => {
    const { current } = record(0);
    const unchanged = {
      current,
      priorContentKey:
        current.change.operation === "bind" ? current.change.contentKey : null,
    };
    expect(accepts(RouteRollbackRecordSchema, unchanged)).toBe(false);
    const result = Schema.decodeExit(RouteRollbackRecordSchema)(unchanged);
    expect(Exit.isFailure(result) ? String(result.cause) : "").toContain(
      "Expected a route change to alter the prior binding owner."
    );
    expect(
      accepts(RouteRollbackRecordSchema, {
        current: {
          change: {
            appLocale: "en",
            operation: "delete",
            publicPath: "subjects/test/deleted",
          },
          index: 1,
          releaseId,
        },
        priorContentKey: null,
      })
    ).toBe(false);
  });
});
