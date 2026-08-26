import { Schema } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  StageArtifactBatchRequestSchema,
  StageItemBatchRequestSchema,
  StageProjectionBatchRequestSchema,
  StageRouteBatchRequestSchema,
} from "#contracts/transport/batch";
import { MAX_STAGE_GROUP_COUNT } from "#contracts/transport/limits";
import { StageTryoutRuntimeBundleRequestSchema } from "#contracts/transport/runtime";
import {
  StageSnapshotBatchRequestSchema,
  StageSnapshotRequestSchema,
} from "#contracts/transport/snapshot";

/** One existing safe transaction carried inside an authenticated group. */
export const StageOperationSchema = Schema.Union([
  StageArtifactBatchRequestSchema,
  StageItemBatchRequestSchema,
  StageProjectionBatchRequestSchema,
  StageRouteBatchRequestSchema,
  StageSnapshotRequestSchema,
  StageSnapshotBatchRequestSchema,
  StageTryoutRuntimeBundleRequestSchema,
]);
export type StageOperation = typeof StageOperationSchema.Type;

const StageGroupFields = {
  releaseId: ReleaseIdSchema,
  requests: Schema.NonEmptyArray(StageOperationSchema).pipe(
    Schema.check(Schema.isMaxLength(MAX_STAGE_GROUP_COUNT))
  ),
};

/** Requires every grouped transaction to belong to the outer release. */
function hasBoundRequests(input: {
  readonly releaseId: typeof ReleaseIdSchema.Type;
  readonly requests: readonly [StageOperation, ...StageOperation[]];
}) {
  return input.requests.every(
    (request) => request.releaseId === input.releaseId
  );
}

/** Canonical target input for one bounded authenticated request group. */
export const StageGroupInputSchema = Schema.Struct(StageGroupFields).pipe(
  Schema.check(
    Schema.makeFilter(hasBoundRequests, {
      message: "Expected every staged request to share one release identity.",
    })
  )
);
export type StageGroupInput = typeof StageGroupInputSchema.Type;

/** Carries multiple safe staging transactions through one HTTP exchange. */
export const StageGroupRequestSchema = Schema.Struct({
  ...StageGroupFields,
  operation: Schema.Literal("stageGroup"),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasBoundRequests, {
      message: "Expected every staged request to share one release identity.",
    })
  )
);
export type StageGroupRequest = typeof StageGroupRequestSchema.Type;

/** Confirms that every transaction in one grouped request completed. */
export const StageGroupReceiptSchema = Schema.Struct({
  releaseId: ReleaseIdSchema,
  requestCount: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(
      Schema.isBetween({ maximum: MAX_STAGE_GROUP_COUNT, minimum: 1 })
    )
  ),
});
export type StageGroupReceipt = typeof StageGroupReceiptSchema.Type;

/** Returns bounded completion evidence for one authenticated group. */
export const StageGroupSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("stageGroup"),
  value: StageGroupReceiptSchema,
});
export type StageGroupSuccess = typeof StageGroupSuccessSchema.Type;
