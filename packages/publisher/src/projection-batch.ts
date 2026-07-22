import type { ReleaseId } from "@nakafaai/aksara-contracts/ids";
import {
  canonicalizeMaterialProjection,
  type MaterialLessonProjection,
} from "@nakafaai/aksara-contracts/projection/material";
import type { Stream } from "effect";
import { streamBatches } from "#publisher/batch/core";

/** Maximum material projections held and sent in one target call. */
export const MAX_PROJECTIONS_PER_BATCH = 100;

/** Maximum complete projection envelope bytes sent per target call. */
export const MAX_PROJECTION_BATCH_BYTES = 4 * 1024 * 1024;

/** Ordered material projection batch accepted by publication infrastructure. */
export interface ProjectionBatch {
  readonly batchIndex: number;
  readonly projections: readonly MaterialLessonProjection[];
  readonly releaseId: ReleaseId;
}

/** Serializes one projection batch in deterministic wire field order. */
export function canonicalizeProjectionBatch(batch: ProjectionBatch) {
  return `{"batchIndex":${batch.batchIndex},"projections":[${batch.projections
    .map(canonicalizeMaterialProjection)
    .join(",")}],"releaseId":${JSON.stringify(batch.releaseId)}}`;
}

/** Streams bounded projection envelopes with contiguous batch identities. */
export function makeProjectionBatches<E, R>(
  releaseId: ReleaseId,
  projections: Stream.Stream<MaterialLessonProjection, E, R>
) {
  return streamBatches({
    build: (values, batchIndex, batchReleaseId) => ({
      batchIndex,
      projections: values,
      releaseId: batchReleaseId,
    }),
    count: (batch) => batch.projections.length,
    kind: "material-projection",
    maxBytes: MAX_PROJECTION_BATCH_BYTES,
    maxCount: MAX_PROJECTIONS_PER_BATCH,
    releaseId,
    serialize: canonicalizeProjectionBatch,
    values: projections,
  });
}
