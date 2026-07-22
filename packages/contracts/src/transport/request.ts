import { Effect, Schema } from "effect";
import { SignedContentArtifactSchema } from "#contracts/content";
import { decodeContract } from "#contracts/decode";
import { ReleaseIdSchema } from "#contracts/ids";
import { MaterialLessonProjectionSchema } from "#contracts/projection/material";
import {
  ContentReleaseStatusRequestSchema,
  ReleaseCleanupRequestSchema,
} from "#contracts/release/lifecycle";
import { RollbackPageRequestSchema } from "#contracts/release/rollback";
import {
  ContentReleaseItemSchema,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import {
  MAX_ARTIFACT_BATCH_COUNT,
  MAX_ITEM_BATCH_COUNT,
  MAX_PROJECTION_BATCH_COUNT,
} from "#contracts/transport/limits";

/** Stable operation names accepted by the single publication ingress. */
export const PublicationOperationSchema = Schema.Literal(
  "stageRelease",
  "stageItemBatch",
  "stageProjectionBatch",
  "stageArtifactBatch",
  "status",
  "verify",
  "activate",
  "finalize",
  "rollbackPage",
  "cleanup"
);
export type PublicationOperation = typeof PublicationOperationSchema.Type;

const BatchIndexSchema = Schema.Number.pipe(Schema.int(), Schema.nonNegative());

const PageIndexSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.greaterThanOrEqualTo(-1)
);

/** Starts or idempotently resumes one exact signed release. */
export const StageReleaseRequestSchema = Schema.Struct({
  operation: Schema.Literal("stageRelease"),
  release: SignedContentReleaseSchema,
});
export type StageReleaseRequest = typeof StageReleaseRequestSchema.Type;

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

const StageProjectionBatchFields = {
  batchIndex: BatchIndexSchema,
  projections: Schema.NonEmptyArray(MaterialLessonProjectionSchema).pipe(
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

/** Stages one non-empty bounded batch of canonical material projections. */
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

/** Reads the durable phase for one exact manifest identity. */
export const PublicationStatusRequestSchema = Schema.Struct({
  ...ContentReleaseStatusRequestSchema.fields,
  operation: Schema.Literal("status"),
});
export type PublicationStatusRequest =
  typeof PublicationStatusRequestSchema.Type;

/** Recomputes all staged evidence for one signed release. */
export const VerifyReleaseRequestSchema = Schema.Struct({
  operation: Schema.Literal("verify"),
  release: SignedContentReleaseSchema,
});
export type VerifyReleaseRequest = typeof VerifyReleaseRequestSchema.Type;

/** Atomically activates one fully verified signed release. */
export const ActivateReleaseRequestSchema = Schema.Struct({
  operation: Schema.Literal("activate"),
  release: SignedContentReleaseSchema,
});
export type ActivateReleaseRequest = typeof ActivateReleaseRequestSchema.Type;

/** Finalizes one bounded release page from an exact continuation index. */
export const FinalizeReleaseRequestSchema = Schema.Struct({
  afterIndex: PageIndexSchema,
  operation: Schema.Literal("finalize"),
  release: SignedContentReleaseSchema,
});
export type FinalizeReleaseRequest = typeof FinalizeReleaseRequestSchema.Type;

/** Reads one bounded prior-state page for a forward rollback release. */
export const PublicationRollbackRequestSchema = Schema.Struct({
  ...RollbackPageRequestSchema.fields,
  operation: Schema.Literal("rollbackPage"),
});
export type PublicationRollbackRequest =
  typeof PublicationRollbackRequestSchema.Type;

/** Deletes one bounded page of unreachable release-owned rows. */
export const PublicationCleanupRequestSchema = Schema.Struct({
  ...ReleaseCleanupRequestSchema.fields,
  operation: Schema.Literal("cleanup"),
});
export type PublicationCleanupRequest =
  typeof PublicationCleanupRequestSchema.Type;

/** Complete request vocabulary accepted by publication ingress v1. */
export const PublicationRequestSchema = Schema.Union(
  StageReleaseRequestSchema,
  StageItemBatchRequestSchema,
  StageProjectionBatchRequestSchema,
  StageArtifactBatchRequestSchema,
  PublicationStatusRequestSchema,
  VerifyReleaseRequestSchema,
  ActivateReleaseRequestSchema,
  FinalizeReleaseRequestSchema,
  PublicationRollbackRequestSchema,
  PublicationCleanupRequestSchema
);
export type PublicationRequest = typeof PublicationRequestSchema.Type;

/** Strictly decodes one unknown publication request without throwing. */
export const decodePublicationRequest = Effect.fn(
  "AksaraContracts.decodePublicationRequest"
)((input: unknown) =>
  decodeContract(PublicationRequestSchema, "PublicationRequest", input)
);
