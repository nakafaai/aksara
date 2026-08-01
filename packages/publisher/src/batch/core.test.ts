import { Buffer } from "node:buffer";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Ref, Stream } from "effect";
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

  it("keeps global indexes contiguous across byte partitions", async () => {
    const values = Array.from({ length: 10 }, (_, index) =>
      index.toString().padStart(2, "0")
    );
    const maxBytes = Buffer.byteLength(
      serializeBatch(
        buildBatch(values.slice(0, 3), Number.MAX_SAFE_INTEGER, releaseId)
      ),
      "utf8"
    );
    const batches = await Effect.runPromise(
      streamBatches({
        build: buildBatch,
        count: (batch) => batch.values.length,
        kind: "release-item",
        maxBytes,
        maxCount: 16,
        releaseId,
        serialize: serializeBatch,
        values: Stream.fromIterable(values),
      }).pipe(
        Stream.runCollect,
        Effect.map((chunk) => [...chunk])
      )
    );

    expect(batches.map(({ batchIndex }) => batchIndex)).toEqual([0, 1, 2, 3]);
    expect(
      batches.map(({ values: batchValues }) => batchValues.length)
    ).toEqual([3, 3, 3, 1]);
    expect(batches.flatMap(({ values: batchValues }) => batchValues)).toEqual(
      values
    );
    expect(
      batches.every(
        (batch) => Buffer.byteLength(serializeBatch(batch), "utf8") <= maxBytes
      )
    ).toBe(true);
  });

  it("emits a byte-bounded batch without reading the count ceiling", async () => {
    const values = Array.from({ length: 64 }, (_, index) =>
      `${index}`.padEnd(32, "x")
    );
    const maxBytes = Buffer.byteLength(
      serializeBatch(
        buildBatch(values.slice(0, 1), Number.MAX_SAFE_INTEGER, releaseId)
      ),
      "utf8"
    );
    const [batches, consumedCount] = await Effect.runPromise(
      Effect.gen(function* () {
        const consumption = yield* Ref.make(0);
        const output = yield* streamBatches({
          build: buildBatch,
          count: (batch) => batch.values.length,
          kind: "release-item",
          maxBytes,
          maxCount: values.length,
          releaseId,
          serialize: serializeBatch,
          values: Stream.fromIterable(values).pipe(
            Stream.rechunk(1),
            Stream.tap(() => Ref.update(consumption, (count) => count + 1))
          ),
        }).pipe(
          Stream.take(1),
          Stream.runCollect,
          Effect.map((chunk) => [...chunk])
        );
        return [output, yield* Ref.get(consumption)];
      })
    );

    expect(batches).toHaveLength(1);
    expect(batches[0]?.values).toEqual(values.slice(0, 1));
    expect(consumedCount).toBe(2);
  });

  it("reports the global offset of an oversized value after a valid batch", async () => {
    const error = await Effect.runPromise(
      streamBatches({
        build: buildBatch,
        count: (batch) => batch.values.length,
        kind: "release-item",
        maxBytes: 100,
        maxCount: 2,
        releaseId,
        serialize: serializeBatch,
        values: Stream.make("alpha", "x".repeat(101)),
      }).pipe(Stream.runCollect, Effect.flip)
    );

    expect(error).toMatchObject({ actualCount: 1, itemOffset: 1 });
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
