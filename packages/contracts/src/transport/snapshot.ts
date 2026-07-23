import { Schema } from "effect";

import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { ContentSnapshotKindSchema } from "#contracts/release/snapshot";
import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
} from "#contracts/release/snapshot-data";
import { MAX_SNAPSHOT_BATCH_COUNT } from "#contracts/transport/limits";

const BatchIndexSchema = Schema.Int.pipe(Schema.nonNegative());
const BatchCountSchema = Schema.Int.pipe(Schema.nonNegative());
const OutcomeCountSchema = Schema.Literal(0, 1);

const StageSnapshotFields = {
  releaseId: ReleaseIdSchema,
  snapshot: ContentSnapshotManifestSchema,
};

/** Canonical input for staging one immutable structured-family manifest. */
export const StageSnapshotInputSchema = Schema.Struct(StageSnapshotFields);
export type StageSnapshotInput = typeof StageSnapshotInputSchema.Type;

/** Stages one immutable structured-family manifest before any of its rows. */
export const StageSnapshotRequestSchema = Schema.Struct({
  ...StageSnapshotFields,
  operation: Schema.Literal("stageSnapshot"),
});
export type StageSnapshotRequest = typeof StageSnapshotRequestSchema.Type;

const SnapshotRowBatchSchema = Schema.NonEmptyArray(
  ContentSnapshotRowSchema
).pipe(Schema.maxItems(MAX_SNAPSHOT_BATCH_COUNT));

const StageSnapshotBatchFields = {
  batchIndex: BatchIndexSchema,
  family: ContentSnapshotKindSchema,
  releaseId: ReleaseIdSchema,
  rows: SnapshotRowBatchSchema,
  snapshotId: Sha256HashSchema,
};

/** Checks that every row belongs to the envelope and Quran snapshot identity. */
function hasBoundSnapshotRows(input: {
  readonly family: typeof ContentSnapshotKindSchema.Type;
  readonly rows: readonly [
    typeof ContentSnapshotRowSchema.Type,
    ...(typeof ContentSnapshotRowSchema.Type)[],
  ];
  readonly snapshotId: typeof Sha256HashSchema.Type;
}) {
  return input.rows.every((row) => {
    if (row.family !== input.family) {
      return false;
    }
    if (row.family !== "quran") {
      return true;
    }
    return row.record.snapshotId === input.snapshotId;
  });
}

const BoundSnapshotBatchSchema = Schema.Struct(StageSnapshotBatchFields).pipe(
  Schema.filter(hasBoundSnapshotRows, {
    message: () =>
      "Expected snapshot rows bound to one family and snapshot identity.",
  })
);

/** Canonical input for one bounded structured-snapshot row batch. */
export const StageSnapshotBatchInputSchema = BoundSnapshotBatchSchema;
export type StageSnapshotBatchInput = typeof StageSnapshotBatchInputSchema.Type;

/** Stages one non-empty bounded structured-snapshot row batch. */
export const StageSnapshotBatchRequestSchema = Schema.Struct({
  ...StageSnapshotBatchFields,
  operation: Schema.Literal("stageSnapshotBatch"),
}).pipe(
  Schema.filter(hasBoundSnapshotRows, {
    message: () =>
      "Expected snapshot rows bound to one family and snapshot identity.",
  })
);
export type StageSnapshotBatchRequest =
  typeof StageSnapshotBatchRequestSchema.Type;

/** Idempotent outcome bound to one exact structured-snapshot row batch. */
export const StageSnapshotBatchReceiptSchema = Schema.Struct({
  batchIndex: BatchIndexSchema,
  created: BatchCountSchema,
  family: ContentSnapshotKindSchema,
  releaseId: ReleaseIdSchema,
  snapshotId: Sha256HashSchema,
  unchanged: BatchCountSchema,
});
export type StageSnapshotBatchReceipt =
  typeof StageSnapshotBatchReceiptSchema.Type;

/** Idempotent outcome for staging exactly one family manifest. */
export const StageSnapshotReceiptSchema = Schema.Struct({
  created: OutcomeCountSchema,
  family: ContentSnapshotKindSchema,
  releaseId: ReleaseIdSchema,
  snapshotId: Sha256HashSchema,
  unchanged: OutcomeCountSchema,
}).pipe(
  Schema.filter(({ created, unchanged }) => created + unchanged === 1, {
    message: () =>
      "Expected exactly one created or unchanged snapshot manifest.",
  })
);
export type StageSnapshotReceipt = typeof StageSnapshotReceiptSchema.Type;
