import { Buffer } from "node:buffer";
import type { ReleaseId } from "@nakafaai/aksara-contracts/ids";
import { Effect, Schema } from "effect";

export type PublicationBatchKind =
  | "artifact"
  | "material-projection"
  | "release-item";

/** One value cannot fit inside its mandatory publication batch ceiling. */
export class PublicationBatchLimitError extends Schema.TaggedError<PublicationBatchLimitError>()(
  "PublicationBatchLimitError",
  {
    actualBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    actualCount: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
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
export function validateBatch<T>(input: {
  readonly batch: T;
  readonly count: number;
  readonly kind: PublicationBatchKind;
  readonly maxBytes: number;
  readonly maxCount: number;
  /** Serializes the exact complete envelope sent to the target. */
  readonly serialize: (batch: T) => string;
}) {
  const actualBytes = utf8Bytes(input.serialize(input.batch));
  if (
    input.count > 0 &&
    input.count <= input.maxCount &&
    actualBytes <= input.maxBytes
  ) {
    return Effect.void;
  }
  return Effect.fail(
    new PublicationBatchLimitError({
      actualBytes,
      actualCount: input.count,
      itemOffset: 0,
      kind: input.kind,
      maxBytes: input.maxBytes,
      maxCount: input.maxCount,
    })
  );
}

/** Splits one bounded group using conservative complete envelope bytes. */
export function partitionBatch<T>(input: {
  readonly kind: PublicationBatchKind;
  readonly maxBytes: number;
  readonly maxCount: number;
  readonly releaseId: ReleaseId;
  /** Serializes candidate values inside a conservative full envelope. */
  readonly serializeBatch: (
    values: readonly T[],
    batchIndex: number,
    releaseId: ReleaseId
  ) => string;
  readonly values: readonly T[];
}) {
  const batches: T[][] = [];
  let batch: T[] = [];
  for (const [itemOffset, value] of input.values.entries()) {
    const candidate = [...batch, value];
    const candidateBytes = utf8Bytes(
      input.serializeBatch(candidate, Number.MAX_SAFE_INTEGER, input.releaseId)
    );
    if (
      candidate.length <= input.maxCount &&
      candidateBytes <= input.maxBytes
    ) {
      batch = candidate;
      continue;
    }
    if (batch.length > 0) {
      batches.push(batch);
    }
    batch = [value];
    const standaloneBytes = utf8Bytes(
      input.serializeBatch(batch, Number.MAX_SAFE_INTEGER, input.releaseId)
    );
    if (standaloneBytes > input.maxBytes) {
      return Effect.fail(
        new PublicationBatchLimitError({
          actualBytes: standaloneBytes,
          actualCount: 1,
          itemOffset,
          kind: input.kind,
          maxBytes: input.maxBytes,
          maxCount: input.maxCount,
        })
      );
    }
  }
  if (batch.length > 0) {
    batches.push(batch);
  }
  return Effect.succeed(batches);
}
