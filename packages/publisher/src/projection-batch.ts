import type { ReleaseId } from "@nakafaai/aksara-contracts/ids";
import {
  canonicalizeMaterialProjection,
  type MaterialLessonProjection,
} from "@nakafaai/aksara-contracts/projection/material";
import { Effect, Stream } from "effect";
import { partitionBatch, validateBatch } from "#publisher/batch/core";

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

/** Constructs one non-empty projection batch under both hard ceilings. */
export const makeProjectionBatch = Effect.fn(
  "AksaraPublisher.makeProjectionBatch"
)(function* (input: ProjectionBatch) {
  yield* validateBatch({
    batch: input,
    count: input.projections.length,
    kind: "material-projection",
    maxBytes: MAX_PROJECTION_BATCH_BYTES,
    maxCount: MAX_PROJECTIONS_PER_BATCH,
    serialize: canonicalizeProjectionBatch,
  });
  return input;
});

/** Streams bounded projection envelopes with contiguous batch identities. */
export function makeProjectionBatches<E, R>(
  releaseId: ReleaseId,
  projections: Stream.Stream<MaterialLessonProjection, E, R>
) {
  return projections.pipe(
    Stream.grouped(MAX_PROJECTIONS_PER_BATCH),
    Stream.mapEffect((chunk) =>
      partitionBatch({
        kind: "material-projection",
        maxBytes: MAX_PROJECTION_BATCH_BYTES,
        maxCount: MAX_PROJECTIONS_PER_BATCH,
        releaseId,
        serializeBatch: (values, batchIndex, batchReleaseId) =>
          canonicalizeProjectionBatch({
            batchIndex,
            projections: values,
            releaseId: batchReleaseId,
          }),
        values: [...chunk],
      })
    ),
    Stream.flatMap(Stream.fromIterable),
    Stream.zipWithIndex,
    Stream.mapEffect(([batchProjections, batchIndex]) =>
      makeProjectionBatch({
        batchIndex,
        projections: batchProjections,
        releaseId,
      })
    )
  );
}
