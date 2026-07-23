import type { ReleaseId, Sha256Hash } from "@nakafa/aksara-contracts/ids";
import { ContentSnapshotKindSchema } from "@nakafa/aksara-contracts/release/snapshot";
import {
  type ContentSnapshotRow,
  canonicalizeContentSnapshotRow,
} from "@nakafa/aksara-contracts/release/snapshot-data";
import {
  MAX_SNAPSHOT_BATCH_BYTES,
  MAX_SNAPSHOT_BATCH_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import type { StageSnapshotBatchInput } from "@nakafa/aksara-contracts/transport/snapshot";
import { Effect, Schema, Stream } from "effect";
import { streamBatches } from "#publisher/batch/core";

/** One structured row is not owned by its declared snapshot envelope. */
export class SnapshotBatchBindingError extends Schema.TaggedError<SnapshotBatchBindingError>()(
  "SnapshotBatchBindingError",
  {
    actual: Schema.String,
    expected: Schema.String,
    family: ContentSnapshotKindSchema,
    field: Schema.Literal("family", "snapshotId"),
    itemOffset: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
  }
) {}

/** Serializes one complete snapshot-row request in canonical wire order. */
export function canonicalizeSnapshotBatch(batch: StageSnapshotBatchInput) {
  return `{"batchIndex":${batch.batchIndex},"family":${JSON.stringify(batch.family)},"operation":"stageSnapshotBatch","releaseId":${JSON.stringify(batch.releaseId)},"rows":[${batch.rows.map(canonicalizeContentSnapshotRow).join(",")}],"snapshotId":${JSON.stringify(batch.snapshotId)}}`;
}

/** Verifies one row against the family and snapshot identity of its envelope. */
function bindSnapshotRow(
  family: typeof ContentSnapshotKindSchema.Type,
  snapshotId: Sha256Hash,
  row: ContentSnapshotRow,
  itemOffset: number
) {
  if (row.family !== family) {
    return Effect.fail(
      new SnapshotBatchBindingError({
        actual: row.family,
        expected: family,
        family,
        field: "family",
        itemOffset,
      })
    );
  }
  if (row.family === "quran" && row.record.snapshotId !== snapshotId) {
    return Effect.fail(
      new SnapshotBatchBindingError({
        actual: row.record.snapshotId,
        expected: snapshotId,
        family,
        field: "snapshotId",
        itemOffset,
      })
    );
  }
  return Effect.succeed(row);
}

/**
 * Streams byte-accurate structured-row envelopes owned by one immutable
 * family snapshot.
 */
export function makeSnapshotBatches<T extends ContentSnapshotRow, E, R>(
  releaseId: ReleaseId,
  family: typeof ContentSnapshotKindSchema.Type,
  snapshotId: Sha256Hash,
  rows: Stream.Stream<T, E, R>
) {
  const boundRows = rows.pipe(
    Stream.zipWithIndex,
    Stream.mapEffect(([row, itemOffset]) =>
      bindSnapshotRow(family, snapshotId, row, itemOffset)
    )
  );
  return streamBatches({
    build: (values, batchIndex, batchReleaseId) => ({
      batchIndex,
      family,
      releaseId: batchReleaseId,
      rows: values,
      snapshotId,
    }),
    count: (batch) => batch.rows.length,
    kind: "snapshot",
    maxBytes: MAX_SNAPSHOT_BATCH_BYTES,
    maxCount: MAX_SNAPSHOT_BATCH_COUNT,
    releaseId,
    serialize: canonicalizeSnapshotBatch,
    values: boundRows,
  });
}
