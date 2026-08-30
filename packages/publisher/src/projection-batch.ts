import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import {
  type ContentProjection,
  type CurrentContentProjection,
  canonicalizeContentProjection,
} from "@nakafa/aksara-contracts/projection/spec";
import type {
  StageProjectionBatchInput,
  StageRollbackProjectionBatchInput,
} from "@nakafa/aksara-contracts/transport/batch";
import {
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PROJECTION_BATCH_COUNT,
} from "@nakafa/aksara-contracts/transport/limits";
import type { Stream } from "effect";
import { streamBatches } from "#publisher/batch/core";

/** Serializes one projection batch in deterministic wire field order. */
export function canonicalizeProjectionBatch(batch: StageProjectionBatchInput) {
  return `{"batchIndex":${batch.batchIndex},"projections":[${batch.projections
    .map(canonicalizeContentProjection)
    .join(
      ","
    )}],"operation":"stageProjectionBatch","releaseId":${JSON.stringify(batch.releaseId)}}`;
}

/** Serializes one rollback projection batch without changing historical bytes. */
export function canonicalizeRollbackProjectionBatch(
  batch: StageRollbackProjectionBatchInput
) {
  return `{"batchIndex":${batch.batchIndex},"projections":[${batch.projections
    .map(canonicalizeContentProjection)
    .join(
      ","
    )}],"operation":"stageRollbackProjectionBatch","releaseId":${JSON.stringify(batch.releaseId)}}`;
}

/** Streams bounded projection envelopes with contiguous batch identities. */
export function makeProjectionBatches<E, R>(
  releaseId: ReleaseId,
  projections: Stream.Stream<CurrentContentProjection, E, R>
) {
  return streamBatches({
    build: (values, batchIndex, batchReleaseId) => ({
      batchIndex,
      projections: values,
      releaseId: batchReleaseId,
    }),
    count: (batch) => batch.projections.length,
    kind: "content-projection",
    maxBytes: MAX_PROJECTION_BATCH_BYTES,
    maxCount: MAX_PROJECTION_BATCH_COUNT,
    releaseId,
    serialize: canonicalizeProjectionBatch,
    values: projections,
  });
}

/** Streams bounded historical projection envelopes for rollback only. */
export function makeRollbackProjectionBatches<E, R>(
  releaseId: ReleaseId,
  projections: Stream.Stream<ContentProjection, E, R>
) {
  return streamBatches({
    build: (values, batchIndex, batchReleaseId) => ({
      batchIndex,
      projections: values,
      releaseId: batchReleaseId,
    }),
    count: (batch) => batch.projections.length,
    kind: "rollback-projection",
    maxBytes: MAX_PROJECTION_BATCH_BYTES,
    maxCount: MAX_PROJECTION_BATCH_COUNT,
    releaseId,
    serialize: canonicalizeRollbackProjectionBatch,
    values: projections,
  });
}
