import { Buffer } from "node:buffer";
import {
  canonicalizeSignedContentArtifact,
  type SignedContentArtifact,
} from "@nakafaai/aksara-contracts/content";
import type { ReleaseId } from "@nakafaai/aksara-contracts/ids";
import {
  type ContentReleaseItem,
  canonicalizeContentReleaseItem,
} from "@nakafaai/aksara-contracts/release";
import { Effect, Schema } from "effect";

/** Maximum ordered release items sent to a publication target per call. */
export const MAX_RELEASE_ITEMS_PER_BATCH = 500;

/** Maximum canonical item bytes sent to a publication target per call. */
export const MAX_RELEASE_ITEM_BATCH_BYTES = 512 * 1024;

/** Maximum signed artifacts sent to a publication target per call. */
export const MAX_ARTIFACTS_PER_BATCH = 100;

/** Maximum canonical artifact bytes sent to a publication target per call. */
export const MAX_ARTIFACT_BATCH_BYTES = 8 * 1024 * 1024;

/** One value cannot fit inside its mandatory publication batch ceiling. */
export class PublicationBatchLimitError extends Schema.TaggedError<PublicationBatchLimitError>()(
  "PublicationBatchLimitError",
  {
    actualBytes: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    actualCount: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    itemOffset: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
    kind: Schema.Literal("artifact", "release-item"),
    maxBytes: Schema.Number.pipe(Schema.int(), Schema.positive()),
    maxCount: Schema.Number.pipe(Schema.int(), Schema.positive()),
  }
) {}

/** Ordered item batch accepted by the publication infrastructure seam. */
export interface ReleaseItemBatch {
  readonly batchIndex: number;
  readonly items: readonly ContentReleaseItem[];
  readonly releaseId: ReleaseId;
}

/** Content-addressed artifact batch accepted by the infrastructure seam. */
export interface ArtifactBatch {
  readonly artifacts: readonly SignedContentArtifact[];
  readonly batchIndex: number;
  readonly releaseId: ReleaseId;
}

function utf8Bytes(value: string) {
  return Buffer.byteLength(value, "utf8");
}

function encodedArrayBytes<T>(
  values: readonly T[],
  serialize: (value: T) => string
) {
  return (
    2 +
    values.reduce(
      (total, value, index) =>
        total + (index === 0 ? 0 : 1) + utf8Bytes(serialize(value)),
      0
    )
  );
}

function validateBatch<T>(input: {
  readonly kind: "artifact" | "release-item";
  readonly maxBytes: number;
  readonly maxCount: number;
  readonly serialize: (value: T) => string;
  readonly values: readonly T[];
}) {
  const actualBytes = encodedArrayBytes(input.values, input.serialize);
  if (
    input.values.length > 0 &&
    input.values.length <= input.maxCount &&
    actualBytes <= input.maxBytes
  ) {
    return Effect.void;
  }
  return Effect.fail(
    new PublicationBatchLimitError({
      actualBytes,
      actualCount: input.values.length,
      itemOffset: 0,
      kind: input.kind,
      maxBytes: input.maxBytes,
      maxCount: input.maxCount,
    })
  );
}

function partitionBounded<T>(input: {
  readonly kind: "artifact" | "release-item";
  readonly maxBytes: number;
  readonly maxCount: number;
  readonly serialize: (value: T) => string;
  readonly values: readonly T[];
}) {
  const batches: T[][] = [];
  let batch: T[] = [];
  let batchBytes = 2;

  for (const [itemOffset, value] of input.values.entries()) {
    const valueBytes = utf8Bytes(input.serialize(value));
    const standaloneBytes = valueBytes + 2;
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

    const separatorBytes = batch.length === 0 ? 0 : 1;
    const nextBytes = batchBytes + separatorBytes + valueBytes;
    if (batch.length === input.maxCount || nextBytes > input.maxBytes) {
      batches.push(batch);
      batch = [];
      batchBytes = 2;
    }

    batch.push(value);
    batchBytes += (batch.length === 1 ? 0 : 1) + valueBytes;
  }

  if (batch.length > 0) {
    batches.push(batch);
  }
  return Effect.succeed(batches);
}

/** Partitions canonical release items below both count and byte ceilings. */
export function partitionReleaseItemBatches(
  items: readonly ContentReleaseItem[]
) {
  return partitionBounded({
    kind: "release-item",
    maxBytes: MAX_RELEASE_ITEM_BATCH_BYTES,
    maxCount: MAX_RELEASE_ITEMS_PER_BATCH,
    serialize: canonicalizeContentReleaseItem,
    values: items,
  });
}

/** Partitions signed artifacts below both count and byte ceilings. */
export function partitionArtifactBatches(
  artifacts: readonly SignedContentArtifact[]
) {
  return partitionBounded({
    kind: "artifact",
    maxBytes: MAX_ARTIFACT_BATCH_BYTES,
    maxCount: MAX_ARTIFACTS_PER_BATCH,
    serialize: canonicalizeSignedContentArtifact,
    values: artifacts,
  });
}

/** Constructs one non-empty item batch after enforcing both hard ceilings. */
export const makeReleaseItemBatch = Effect.fn(
  "AksaraPublisher.makeReleaseItemBatch"
)(function* (input: ReleaseItemBatch) {
  yield* validateBatch({
    kind: "release-item",
    maxBytes: MAX_RELEASE_ITEM_BATCH_BYTES,
    maxCount: MAX_RELEASE_ITEMS_PER_BATCH,
    serialize: canonicalizeContentReleaseItem,
    values: input.items,
  });
  return input;
});

/** Constructs one non-empty artifact batch after enforcing both hard ceilings. */
export const makeArtifactBatch = Effect.fn("AksaraPublisher.makeArtifactBatch")(
  function* (input: ArtifactBatch) {
    yield* validateBatch({
      kind: "artifact",
      maxBytes: MAX_ARTIFACT_BATCH_BYTES,
      maxCount: MAX_ARTIFACTS_PER_BATCH,
      serialize: canonicalizeSignedContentArtifact,
      values: input.artifacts,
    });
    return input;
  }
);
