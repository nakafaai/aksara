// @vitest-environment node

import { ReleaseIdSchema } from "@nakafaai/aksara-contracts/ids";
import {
  ContentChangeSchema,
  indexContentChanges,
} from "@nakafaai/aksara-contracts/release";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  MAX_RELEASE_ITEMS_PER_BATCH,
  makeReleaseItemBatch,
  partitionReleaseItemBatches,
} from "./batching.js";

const releaseId = ReleaseIdSchema.make("release-batching");
const changes = Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))(
  Array.from({ length: MAX_RELEASE_ITEMS_PER_BATCH + 1 }, (_, index) => ({
    contentKey: `article:${index.toString().padStart(4, "0")}`,
    kind: "article",
    locale: "en",
    operation: "delete",
  }))
);
const items = indexContentChanges(releaseId, changes);

describe("publication batching", () => {
  it("partitions ordered release items below the hard count ceiling", async () => {
    const batches = await Effect.runPromise(partitionReleaseItemBatches(items));

    expect(batches).toHaveLength(2);
    expect(batches[0]).toHaveLength(MAX_RELEASE_ITEMS_PER_BATCH);
    expect(batches[1]).toHaveLength(1);
  });

  it("rejects a target batch that violates the hard count ceiling", async () => {
    const error = await Effect.runPromise(
      makeReleaseItemBatch({ batchIndex: 0, items, releaseId }).pipe(
        Effect.flip
      )
    );

    expect(error._tag).toBe("PublicationBatchLimitError");
    expect(error.actualCount).toBe(MAX_RELEASE_ITEMS_PER_BATCH + 1);
    expect(error.maxCount).toBe(MAX_RELEASE_ITEMS_PER_BATCH);
  });
});
