import { describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { encodeJsonText } from "@nakafa/aksara-utilities/text/json";
import { Array as Arr, Effect, Ref, Stream } from "effect";
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
  return encodeJsonText(batch);
}

/** Measures one body as the target's Node action receives it, as one JSON string argument. */
function transportBytes(text: string) {
  return new TextEncoder().encode(encodeJsonText(text)).byteLength;
}

describe("streamBatches", () => {
  it.effect("preserves an empty stream without inventing an envelope", () =>
    Effect.gen(function* () {
      const batches = yield* streamBatches({
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
      );

      expect(batches).toEqual([]);
    })
  );

  it.effect("keeps global indexes contiguous across byte partitions", () =>
    Effect.gen(function* () {
      const values = Array.from({ length: 10 }, (_, index) =>
        index.toString().padStart(2, "0")
      );
      const maxBytes = transportBytes(
        serializeBatch(
          buildBatch(Arr.take(values, 3), Number.MAX_SAFE_INTEGER, releaseId)
        )
      );
      const batches = yield* streamBatches({
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
      );

      expect(Arr.map(batches, ({ batchIndex }) => batchIndex)).toEqual([
        0, 1, 2, 3,
      ]);
      expect(
        Arr.map(batches, ({ values: batchValues }) => batchValues.length)
      ).toEqual([3, 3, 3, 1]);
      expect(
        Arr.flatMap(batches, ({ values: batchValues }) => batchValues)
      ).toEqual(values);
      expect(
        Arr.every(
          batches,
          (batch) => transportBytes(serializeBatch(batch)) <= maxBytes
        )
      ).toBe(true);
    })
  );

  it.effect(
    "emits a byte-bounded batch without reading the count ceiling",
    () =>
      Effect.gen(function* () {
        const values = Array.from({ length: 64 }, (_, index) =>
          `${index}`.padEnd(32, "x")
        );
        const maxBytes = transportBytes(
          serializeBatch(
            buildBatch(Arr.take(values, 1), Number.MAX_SAFE_INTEGER, releaseId)
          )
        );
        const consumption = yield* Ref.make(0);
        const batches = yield* streamBatches({
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
        const consumedCount = yield* Ref.get(consumption);

        expect(batches).toHaveLength(1);
        expect(batches[0]?.values).toEqual(Arr.take(values, 1));
        expect(consumedCount).toBe(2);
      })
  );

  it.effect(
    "reports the global offset of an oversized value after a valid batch",
    () =>
      Effect.gen(function* () {
        const error = yield* streamBatches({
          build: buildBatch,
          count: (batch) => batch.values.length,
          kind: "release-item",
          maxBytes: 100,
          maxCount: 2,
          releaseId,
          serialize: serializeBatch,
          values: Stream.make("alpha", "x".repeat(101)),
        }).pipe(Stream.runCollect, Effect.flip);

        expect(error).toMatchObject({ actualCount: 1, itemOffset: 1 });
      })
  );

  it.effect("rejects a builder that drops a partition value", () =>
    Effect.gen(function* () {
      const error = yield* streamBatches({
        build: (values, batchIndex, batchReleaseId) =>
          buildBatch(Arr.drop(values, 1), batchIndex, batchReleaseId),
        count: (batch) => batch.values.length,
        kind: "release-item",
        maxBytes: 100,
        maxCount: 2,
        releaseId,
        serialize: serializeBatch,
        values: Stream.make("alpha"),
      }).pipe(Stream.runCollect, Effect.flip);

      expect(error).toMatchObject({ actualCount: 0, expectedCount: 1 });
    })
  );

  it.effect("rejects a builder that duplicates a partition value", () =>
    Effect.gen(function* () {
      const error = yield* streamBatches({
        build: (values, batchIndex, batchReleaseId) =>
          buildBatch([...values, ...values], batchIndex, batchReleaseId),
        count: (batch) => batch.values.length,
        kind: "release-item",
        maxBytes: 200,
        maxCount: 1,
        releaseId,
        serialize: serializeBatch,
        values: Stream.make("alpha"),
      }).pipe(Stream.runCollect, Effect.flip);

      expect(error).toMatchObject({ actualCount: 2, expectedCount: 1 });
    })
  );

  it.effect(
    "measures a body by its escaped size, as the target's Node action receives it",
    () =>
      Effect.gen(function* () {
        const quoted = '"'.repeat(40);
        const escaped = transportBytes(
          serializeBatch(
            buildBatch([quoted], Number.MAX_SAFE_INTEGER, releaseId)
          )
        );
        const error = yield* streamBatches({
          build: buildBatch,
          count: (batch) => batch.values.length,
          kind: "release-item",
          maxBytes: escaped - 1,
          maxCount: 1,
          releaseId,
          serialize: serializeBatch,
          values: Stream.make(quoted),
        }).pipe(Stream.runCollect, Effect.flip);

        expect(error).toMatchObject({ actualBytes: escaped, itemOffset: 0 });
      })
  );
});
