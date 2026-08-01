import { Schema } from "effect";
import { SignedContentArtifactSchema } from "#contracts/content";
import { ReleaseIdSchema } from "#contracts/ids";
import { ContentProjectionSchema } from "#contracts/projection/spec";
import { ContentRouteItemSchema } from "#contracts/release/route";
import { ContentReleaseItemSchema } from "#contracts/release/spec";
import {
  MAX_ARTIFACT_BATCH_COUNT,
  MAX_ITEM_BATCH_COUNT,
  MAX_PROJECTION_BATCH_COUNT,
  MAX_ROUTE_BATCH_COUNT,
} from "#contracts/transport/limits";

const BatchIndexSchema = Schema.Number.pipe(Schema.int(), Schema.nonNegative());

const ReleaseItemBatchSchema = Schema.NonEmptyArray(
  ContentReleaseItemSchema
).pipe(Schema.maxItems(MAX_ITEM_BATCH_COUNT));

const StageItemBatchFields = {
  batchIndex: BatchIndexSchema,
  items: ReleaseItemBatchSchema,
  releaseId: ReleaseIdSchema,
};

/** Checks batch ownership and contiguous signed item indexes. */
function hasBoundReleaseItems(input: {
  readonly items: readonly [
    typeof ContentReleaseItemSchema.Type,
    ...(typeof ContentReleaseItemSchema.Type)[],
  ];
  readonly releaseId: typeof ReleaseIdSchema.Type;
}) {
  const [first] = input.items;
  return input.items.every(
    (item, offset) =>
      item.releaseId === input.releaseId && item.index === first.index + offset
  );
}

/** Canonical input for one bounded ordered-item staging operation. */
export const StageItemBatchInputSchema = Schema.Struct(
  StageItemBatchFields
).pipe(
  Schema.filter(hasBoundReleaseItems, {
    message: () =>
      "Expected contiguous release items bound to the batch release identity.",
  })
);
export type StageItemBatchInput = typeof StageItemBatchInputSchema.Type;

/** Stages one non-empty bounded batch of ordered signed release items. */
export const StageItemBatchRequestSchema = Schema.Struct({
  ...StageItemBatchFields,
  operation: Schema.Literal("stageItemBatch"),
}).pipe(
  Schema.filter(hasBoundReleaseItems, {
    message: () =>
      "Expected contiguous release items bound to the batch release identity.",
  })
);
export type StageItemBatchRequest = typeof StageItemBatchRequestSchema.Type;

const RouteItemBatchSchema = Schema.NonEmptyArray(ContentRouteItemSchema).pipe(
  Schema.maxItems(MAX_ROUTE_BATCH_COUNT)
);

const StageRouteBatchFields = {
  batchIndex: BatchIndexSchema,
  releaseId: ReleaseIdSchema,
  routes: RouteItemBatchSchema,
};

/** Checks batch ownership and contiguous signed route indexes. */
function hasBoundRouteItems(input: {
  readonly releaseId: typeof ReleaseIdSchema.Type;
  readonly routes: readonly [
    typeof ContentRouteItemSchema.Type,
    ...(typeof ContentRouteItemSchema.Type)[],
  ];
}) {
  const [first] = input.routes;
  return input.routes.every(
    (route, offset) =>
      route.releaseId === input.releaseId &&
      route.index === first.index + offset
  );
}

/** Canonical input for one bounded ordered-route staging operation. */
export const StageRouteBatchInputSchema = Schema.Struct(
  StageRouteBatchFields
).pipe(
  Schema.filter(hasBoundRouteItems, {
    message: () =>
      "Expected contiguous route items bound to the batch release identity.",
  })
);
export type StageRouteBatchInput = typeof StageRouteBatchInputSchema.Type;

/** Stages one non-empty bounded batch of ordered signed route items. */
export const StageRouteBatchRequestSchema = Schema.Struct({
  ...StageRouteBatchFields,
  operation: Schema.Literal("stageRouteBatch"),
}).pipe(
  Schema.filter(hasBoundRouteItems, {
    message: () =>
      "Expected contiguous route items bound to the batch release identity.",
  })
);
export type StageRouteBatchRequest = typeof StageRouteBatchRequestSchema.Type;

const StageProjectionBatchFields = {
  batchIndex: BatchIndexSchema,
  projections: Schema.NonEmptyArray(ContentProjectionSchema).pipe(
    Schema.maxItems(MAX_PROJECTION_BATCH_COUNT)
  ),
  releaseId: ReleaseIdSchema,
};

/** Canonical input for one bounded projection staging operation. */
export const StageProjectionBatchInputSchema = Schema.Struct(
  StageProjectionBatchFields
);
export type StageProjectionBatchInput =
  typeof StageProjectionBatchInputSchema.Type;

/** Stages one non-empty bounded batch of canonical content projections. */
export const StageProjectionBatchRequestSchema = Schema.Struct({
  ...StageProjectionBatchFields,
  operation: Schema.Literal("stageProjectionBatch"),
});
export type StageProjectionBatchRequest =
  typeof StageProjectionBatchRequestSchema.Type;

const StageArtifactBatchFields = {
  artifacts: Schema.NonEmptyArray(SignedContentArtifactSchema).pipe(
    Schema.maxItems(MAX_ARTIFACT_BATCH_COUNT)
  ),
  batchIndex: BatchIndexSchema,
  releaseId: ReleaseIdSchema,
};

/** Canonical input for one bounded immutable-artifact staging operation. */
export const StageArtifactBatchInputSchema = Schema.Struct(
  StageArtifactBatchFields
);
export type StageArtifactBatchInput = typeof StageArtifactBatchInputSchema.Type;

/** Stages one non-empty bounded batch of immutable signed artifacts. */
export const StageArtifactBatchRequestSchema = Schema.Struct({
  ...StageArtifactBatchFields,
  operation: Schema.Literal("stageArtifactBatch"),
});
export type StageArtifactBatchRequest =
  typeof StageArtifactBatchRequestSchema.Type;

/** Idempotent row counts returned by one bounded staging transaction. */
export const StageBatchReceiptSchema = Schema.Struct({
  batchIndex: BatchIndexSchema,
  created: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
  releaseId: ReleaseIdSchema,
  unchanged: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
});
export type StageBatchReceipt = typeof StageBatchReceiptSchema.Type;
