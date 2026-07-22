import { ReleaseIdSchema } from "@nakafaai/aksara-contracts/ids";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { streamBatches } from "#publisher/batch/core";

const releaseId = ReleaseIdSchema.make("test-batch-core");

/** Builds the exact test envelope used to exercise stream partitioning. */
function buildBatch(
  values: readonly string[],
  batchIndex: number,
  batchReleaseId: typeof releaseId
) {
  return { batchIndex, releaseId: batchReleaseId, values };
}

/** Serializes one complete test envelope for byte-accurate partitioning. */
function serializeBatch(batch: ReturnType<typeof buildBatch>) {
  return JSON.stringify(batch);
}

describe("streamBatches", () => {
  it("preserves an empty stream without inventing an envelope", async () => {
    const batches = await Effect.runPromise(
      streamBatches({
        build: buildBatch,
        count: (batch) => batch.values.length,
        kind: "release-item",
        maxBytes: 100,
        maxCount: 2,
        releaseId,
        serialize: serializeBatch,
        values: Stream.empty,
      }).pipe(
        Stream.runCollect,
        Effect.map((chunk) => [...chunk])
      )
    );

    expect(batches).toEqual([]);
  });

  it("keeps global indexes contiguous after byte-based inner splits", async () => {
    const maxBytes = serializeBatch(
      buildBatch(["alpha"], Number.MAX_SAFE_INTEGER, releaseId)
    ).length;
    const batches = await Effect.runPromise(
      streamBatches({
        build: buildBatch,
        count: (batch) => batch.values.length,
        kind: "release-item",
        maxBytes,
        maxCount: 2,
        releaseId,
        serialize: serializeBatch,
        values: Stream.fromIterable(["alpha", "bravo"]),
      }).pipe(
        Stream.runCollect,
        Effect.map((chunk) => [...chunk])
      )
    );

    expect(batches.map(({ batchIndex }) => batchIndex)).toEqual([0, 1]);
    expect(batches.map(({ values }) => values)).toEqual([["alpha"], ["bravo"]]);
  });

  it("rejects a builder that drops a partition value", async () => {
    const error = await Effect.runPromise(
      streamBatches({
        build: (values, batchIndex, batchReleaseId) =>
          buildBatch(values.slice(1), batchIndex, batchReleaseId),
        count: (batch) => batch.values.length,
        kind: "release-item",
        maxBytes: 100,
        maxCount: 2,
        releaseId,
        serialize: serializeBatch,
        values: Stream.make("alpha"),
      }).pipe(Stream.runCollect, Effect.flip)
    );

    expect(error).toMatchObject({ actualCount: 0, expectedCount: 1 });
  });

  it("rejects a builder that duplicates a partition value", async () => {
    const error = await Effect.runPromise(
      streamBatches({
        build: (values, batchIndex, batchReleaseId) =>
          buildBatch([...values, ...values], batchIndex, batchReleaseId),
        count: (batch) => batch.values.length,
        kind: "release-item",
        maxBytes: 100,
        maxCount: 1,
        releaseId,
        serialize: serializeBatch,
        values: Stream.make("alpha"),
      }).pipe(Stream.runCollect, Effect.flip)
    );

    expect(error).toMatchObject({ actualCount: 2, expectedCount: 1 });
  });
});
