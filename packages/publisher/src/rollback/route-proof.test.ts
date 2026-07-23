import {
  ContentKeySchema,
  PublicPathSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ContentRouteItemSchema } from "@nakafa/aksara-contracts/release/route";
import { RouteRollbackRecordSchema } from "@nakafa/aksara-contracts/release/route-page";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { inverseRouteStream } from "#publisher/rollback/route-proof";

const sourceId = ReleaseIdSchema.make("test-route-proof-source");
const releaseId = ReleaseIdSchema.make("test-route-proof-inverse");

/** Creates one source route with its authenticated prior owner. */
function record(index: number, priorContentKey: string | null) {
  return RouteRollbackRecordSchema.make({
    current: ContentRouteItemSchema.make({
      change: {
        contentKey: ContentKeySchema.make(`test:current-${index}`),
        locale: "en",
        operation: "bind",
        publicPath: PublicPathSchema.make(`subjects/test/proof-${index}`),
      },
      index,
      releaseId: sourceId,
    }),
    priorContentKey:
      priorContentKey === null ? null : ContentKeySchema.make(priorContentKey),
  });
}

describe("inverseRouteStream", () => {
  it("restores a prior owner or deletes a previously unbound path", async () => {
    const routes = await Effect.runPromise(
      inverseRouteStream(
        () => Stream.make(record(0, null), record(1, "test:prior")),
        releaseId
      ).pipe(Stream.runCollect)
    );

    expect([...routes]).toEqual([
      {
        change: {
          locale: "en",
          operation: "delete",
          publicPath: "subjects/test/proof-0",
        },
        index: 0,
        releaseId,
      },
      {
        change: {
          contentKey: "test:prior",
          locale: "en",
          operation: "bind",
          publicPath: "subjects/test/proof-1",
        },
        index: 1,
        releaseId,
      },
    ]);
  });
});
