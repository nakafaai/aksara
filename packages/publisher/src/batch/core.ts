import { Buffer } from "node:buffer";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { Effect, Array as EffectArray, Schema, Stream } from "effect";
import type { NonEmptyReadonlyArray } from "effect/Array";

type PublicationBatchKind = "artifact" | "material-projection" | "release-item";

/** One value cannot fit inside its mandatory publication batch ceiling. */
export class PublicationBatchLimitError extends Schema.TaggedError<PublicationBatchLimitError>()(
  "PublicationBatchLimitError",
  {
    actualBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    actualCount: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    expectedCount: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    itemOffset: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    kind: Schema.Literal("artifact", "material-projection", "release-item"),
    maxBytes: Schema.Number.pipe(Schema.int(), Schema.positive()),
    maxCount: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}

/** Measures one canonical string using its transmitted UTF-8 representation. */
function utf8Bytes(value: string) {
  return Buffer.byteLength(value, "utf8");
}

/** Verifies one formed batch against complete envelope count and bytes. */
function validateBatch<T>(input: {
  readonly batch: T;
  /** Reads the number of values actually retained by the built envelope. */
  readonly count: (batch: T) => number;
  readonly expectedCount: number;
  readonly kind: PublicationBatchKind;
  readonly maxBytes: number;
  readonly maxCount: number;
  /** Serializes the exact complete envelope sent to the target. */
  readonly serialize: (batch: T) => string;
}) {
  const actualBytes = utf8Bytes(input.serialize(input.batch));
  const actualCount = input.count(input.batch);
  if (
    actualCount === input.expectedCount &&
    actualCount > 0 &&
    actualCount <= input.maxCount &&
    actualBytes <= input.maxBytes
  ) {
    return Effect.void;
  }
  return Effect.fail(
    new PublicationBatchLimitError({
      actualBytes,
      actualCount,
      expectedCount: input.expectedCount,
      itemOffset: 0,
      kind: input.kind,
      maxBytes: input.maxBytes,
      maxCount: input.maxCount,
    })
  );
}

/** Splits one bounded group using conservative complete envelope bytes. */
function partitionBatch<T>(input: {
  readonly kind: PublicationBatchKind;
  readonly maxBytes: number;
  readonly maxCount: number;
  readonly releaseId: ReleaseId;
  /** Serializes candidate values inside a conservative full envelope. */
  readonly serializeBatch: (
    values: NonEmptyReadonlyArray<T>,
    batchIndex: number,
    releaseId: ReleaseId
  ) => string;
  readonly values: readonly T[];
}) {
  const batches: NonEmptyReadonlyArray<T>[] = [];
  let batch: T[] = [];
  for (const [itemOffset, value] of input.values.entries()) {
    const isLast = itemOffset === input.values.length - 1;
    const candidate = EffectArray.append(batch, value);
    const candidateBytes = utf8Bytes(
      input.serializeBatch(candidate, Number.MAX_SAFE_INTEGER, input.releaseId)
    );
    if (
      candidate.length <= input.maxCount &&
      candidateBytes <= input.maxBytes
    ) {
      batch = candidate;
      if (isLast) {
        batches.push(candidate);
      }
      continue;
    }
    if (EffectArray.isNonEmptyReadonlyArray(batch)) {
      batches.push(batch);
    }
    const standalone = EffectArray.of(value);
    batch = standalone;
    const standaloneBytes = utf8Bytes(
      input.serializeBatch(standalone, Number.MAX_SAFE_INTEGER, input.releaseId)
    );
    if (standaloneBytes > input.maxBytes) {
      return Effect.fail(
        new PublicationBatchLimitError({
          actualBytes: standaloneBytes,
          actualCount: 1,
          expectedCount: 1,
          itemOffset,
          kind: input.kind,
          maxBytes: input.maxBytes,
          maxCount: input.maxCount,
        })
      );
    }
    if (isLast) {
      batches.push(standalone);
    }
  }
  return Effect.succeed(batches);
}

/**
 * Streams validated publication envelopes with contiguous batch identities.
 * Domain callers retain ownership of their exact canonical wire envelope.
 */
export function streamBatches<T, B, E, R>(input: {
  /** Constructs the domain envelope for one ordered partition. */
  readonly build: (
    values: NonEmptyReadonlyArray<T>,
    batchIndex: number,
    releaseId: ReleaseId
  ) => B;
  /** Reads the exact number of values retained by a built envelope. */
  readonly count: (batch: B) => number;
  readonly kind: PublicationBatchKind;
  readonly maxBytes: number;
  readonly maxCount: number;
  readonly releaseId: ReleaseId;
  /** Serializes the exact complete envelope sent to the target. */
  readonly serialize: (batch: B) => string;
  readonly values: Stream.Stream<T, E, R>;
}) {
  /** Serializes a conservative candidate with the largest index width. */
  const buildCandidate = (
    values: NonEmptyReadonlyArray<T>,
    batchIndex: number,
    releaseId: ReleaseId
  ) => input.serialize(input.build(values, batchIndex, releaseId));

  return input.values.pipe(
    Stream.grouped(input.maxCount),
    Stream.mapEffect((chunk) =>
      partitionBatch({
        kind: input.kind,
        maxBytes: input.maxBytes,
        maxCount: input.maxCount,
        releaseId: input.releaseId,
        serializeBatch: buildCandidate,
        values: [...chunk],
      })
    ),
    Stream.flatMap(Stream.fromIterable),
    Stream.zipWithIndex,
    Stream.mapEffect(([values, batchIndex]) => {
      const batch = input.build(values, batchIndex, input.releaseId);
      return validateBatch({
        batch,
        count: input.count,
        expectedCount: values.length,
        kind: input.kind,
        maxBytes: input.maxBytes,
        maxCount: input.maxCount,
        serialize: input.serialize,
      }).pipe(Effect.as(batch));
    })
  );
}
