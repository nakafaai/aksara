import {
  artifact,
  items,
  projection,
  releaseId,
  route,
} from "#contracts/test/request";
import {
  MAX_ARTIFACT_BATCH_COUNT,
  MAX_ITEM_BATCH_COUNT,
  MAX_PROJECTION_BATCH_COUNT,
  MAX_ROUTE_BATCH_COUNT,
} from "#contracts/transport/limits";
import {
  StageArtifactBatchRequestSchema,
  StageItemBatchRequestSchema,
  StageProjectionBatchRequestSchema,
  StageRouteBatchRequestSchema,
} from "#contracts/transport/request";

/** Builds empty publication batches that every bounded wire schema must reject. */
export function emptyBatchCases() {
  return [
    {
      input: {
        batchIndex: 0,
        operation: "stageRouteBatch",
        releaseId,
        routes: [],
      },
      schema: StageRouteBatchRequestSchema,
    },
    {
      input: {
        batchIndex: 0,
        items: [],
        operation: "stageItemBatch",
        releaseId,
      },
      schema: StageItemBatchRequestSchema,
    },
    {
      input: {
        batchIndex: 0,
        operation: "stageProjectionBatch",
        projections: [],
        releaseId,
      },
      schema: StageProjectionBatchRequestSchema,
    },
    {
      input: {
        artifacts: [],
        batchIndex: 0,
        operation: "stageArtifactBatch",
        releaseId,
      },
      schema: StageArtifactBatchRequestSchema,
    },
  ] as const;
}

/** Builds exact-ceiling and one-over-ceiling batches for every wire schema. */
export function batchCeilingCases() {
  const artifactBatch = Array.from(
    { length: MAX_ARTIFACT_BATCH_COUNT },
    () => artifact
  );
  const projectionBatch = Array.from(
    { length: MAX_PROJECTION_BATCH_COUNT },
    () => projection
  );
  const itemBatch = Array.from(
    { length: MAX_ITEM_BATCH_COUNT },
    (_, index) => ({ ...items[0], index })
  );
  const routeBatch = Array.from(
    { length: MAX_ROUTE_BATCH_COUNT },
    (_, index) => ({ ...route, index })
  );

  return [
    {
      invalid: {
        artifacts: [...artifactBatch, artifact],
        batchIndex: 0,
        operation: "stageArtifactBatch",
        releaseId,
      },
      schema: StageArtifactBatchRequestSchema,
      valid: {
        artifacts: artifactBatch,
        batchIndex: 0,
        operation: "stageArtifactBatch",
        releaseId,
      },
    },
    {
      invalid: {
        batchIndex: 0,
        operation: "stageProjectionBatch",
        projections: [...projectionBatch, projection],
        releaseId,
      },
      schema: StageProjectionBatchRequestSchema,
      valid: {
        batchIndex: 0,
        operation: "stageProjectionBatch",
        projections: projectionBatch,
        releaseId,
      },
    },
    {
      invalid: {
        batchIndex: 0,
        items: [...itemBatch, { ...items[0], index: MAX_ITEM_BATCH_COUNT }],
        operation: "stageItemBatch",
        releaseId,
      },
      schema: StageItemBatchRequestSchema,
      valid: {
        batchIndex: 0,
        items: itemBatch,
        operation: "stageItemBatch",
        releaseId,
      },
    },
    {
      invalid: {
        batchIndex: 0,
        operation: "stageRouteBatch",
        releaseId,
        routes: [...routeBatch, { ...route, index: MAX_ROUTE_BATCH_COUNT }],
      },
      schema: StageRouteBatchRequestSchema,
      valid: {
        batchIndex: 0,
        operation: "stageRouteBatch",
        releaseId,
        routes: routeBatch,
      },
    },
  ] as const;
}
