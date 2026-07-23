import { Effect, Schema } from "effect";
import { SignedContentArtifactSchema } from "#contracts/content";
import { decodeContract } from "#contracts/decode";
import { ReleaseIdSchema } from "#contracts/ids";
import { ContentProjectionSchema } from "#contracts/projection/spec";
import { HeadPageRequestSchema } from "#contracts/release/head";
import {
  ContentReleaseBundleSchema,
  ContentReleaseStatusRequestSchema,
  ReleaseAbortRequestSchema,
  ReleaseAcceptRequestSchema,
  ReleaseCleanupRequestSchema,
  RollbackContentReleaseBundleSchema,
} from "#contracts/release/lifecycle";
import { RollbackPageRequestSchema } from "#contracts/release/rollback";
import { ContentRouteItemSchema } from "#contracts/release/route";
import { RoutePageRequestSchema } from "#contracts/release/route-page";
import {
  ContentReleaseItemSchema,
  RollbackSignedContentReleaseSchema,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import {
  MAX_ARTIFACT_BATCH_COUNT,
  MAX_ITEM_BATCH_COUNT,
  MAX_PROJECTION_BATCH_COUNT,
  MAX_ROUTE_BATCH_COUNT,
} from "#contracts/transport/limits";
import {
  StageSnapshotBatchRequestSchema,
  StageSnapshotRequestSchema,
} from "#contracts/transport/snapshot";

const BatchIndexSchema = Schema.Number.pipe(Schema.int(), Schema.nonNegative());
/** Reads the authoritative active, candidate, and recovery identities. */
export const PublicationCurrentRequestSchema = Schema.Struct({
  operation: Schema.Literal("current"),
});
export type PublicationCurrentRequest =
  typeof PublicationCurrentRequestSchema.Type;

/** Abandons one invisible staged release through server-owned progress. */
export const PublicationAbortRequestSchema = Schema.Struct({
  ...ReleaseAbortRequestSchema.fields,
  operation: Schema.Literal("abort"),
});
export type PublicationAbortRequest = typeof PublicationAbortRequestSchema.Type;

/** Accepts one healthy release and discards its exact retained inverse. */
export const PublicationAcceptRequestSchema = Schema.extend(
  ReleaseAcceptRequestSchema,
  Schema.Struct({ operation: Schema.Literal("accept") })
);
export type PublicationAcceptRequest =
  typeof PublicationAcceptRequestSchema.Type;

/** Reads one bounded authoritative material-head page for an active release. */
export const PublicationHeadPageRequestSchema = Schema.Struct({
  ...HeadPageRequestSchema.fields,
  operation: Schema.Literal("headPage"),
});
export type PublicationHeadPageRequest =
  typeof PublicationHeadPageRequestSchema.Type;

/** Looks up exact historical completion evidence for one signed recovery. */
export const PublicationRecoveryLookupRequestSchema = Schema.extend(
  ReleaseAcceptRequestSchema,
  Schema.Struct({ operation: Schema.Literal("recovery") })
);
export type PublicationRecoveryLookupRequest =
  typeof PublicationRecoveryLookupRequestSchema.Type;

/** Starts or idempotently resumes one exact signed release. */
export const StageReleaseRequestSchema = Schema.extend(
  ContentReleaseBundleSchema,
  Schema.Struct({ operation: Schema.Literal("stageRelease") })
);
export type StageReleaseRequest = typeof StageReleaseRequestSchema.Type;

/** Starts or idempotently resumes one exact pre-staged inverse release. */
export const StageRecoveryRequestSchema = Schema.extend(
  RollbackContentReleaseBundleSchema,
  Schema.Struct({ operation: Schema.Literal("stageRecovery") })
);
export type StageRecoveryRequest = typeof StageRecoveryRequestSchema.Type;

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

/** Atomically activates the retained inverse for the exact active release. */
export const ActivateRecoveryRequestSchema = Schema.Struct({
  operation: Schema.Literal("activateRecovery"),
  release: RollbackSignedContentReleaseSchema,
});
export type ActivateRecoveryRequest = typeof ActivateRecoveryRequestSchema.Type;

/** Reads one bounded prior-state page for a forward rollback release. */
export const PublicationRollbackRequestSchema = Schema.Struct({
  ...RollbackPageRequestSchema.fields,
  operation: Schema.Literal("rollbackPage"),
});
export type PublicationRollbackRequest =
  typeof PublicationRollbackRequestSchema.Type;

/** Reads one bounded prior-owner page for a forward route rollback. */
export const PublicationRoutePageRequestSchema = Schema.Struct({
  ...RoutePageRequestSchema.fields,
  operation: Schema.Literal("routePage"),
});
export type PublicationRoutePageRequest =
  typeof PublicationRoutePageRequestSchema.Type;

/** Deletes one bounded page of unreachable release-owned rows. */
export const PublicationCleanupRequestSchema = Schema.Struct({
  ...ReleaseCleanupRequestSchema.fields,
  operation: Schema.Literal("cleanup"),
});
export type PublicationCleanupRequest =
  typeof PublicationCleanupRequestSchema.Type;

/** Complete request vocabulary accepted by publication ingress v1. */
export const PublicationRequestSchema = Schema.Union(
  PublicationAcceptRequestSchema,
  PublicationAbortRequestSchema,
  PublicationCurrentRequestSchema,
  PublicationHeadPageRequestSchema,
  PublicationRecoveryLookupRequestSchema,
  StageReleaseRequestSchema,
  StageRecoveryRequestSchema,
  StageSnapshotRequestSchema,
  StageSnapshotBatchRequestSchema,
  StageItemBatchRequestSchema,
  StageRouteBatchRequestSchema,
  StageProjectionBatchRequestSchema,
  StageArtifactBatchRequestSchema,
  PublicationStatusRequestSchema,
  VerifyReleaseRequestSchema,
  ActivateReleaseRequestSchema,
  ActivateRecoveryRequestSchema,
  PublicationRollbackRequestSchema,
  PublicationRoutePageRequestSchema,
  PublicationCleanupRequestSchema
);
export type PublicationRequest = typeof PublicationRequestSchema.Type;

/** Strictly decodes one unknown publication request without throwing. */
export const decodePublicationRequest = Effect.fn(
  "AksaraContracts.decodePublicationRequest"
)((input: unknown) =>
  decodeContract(PublicationRequestSchema, "PublicationRequest", input)
);
