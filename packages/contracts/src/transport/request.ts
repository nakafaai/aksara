import { Effect, Schema } from "effect";
import { decodeContract } from "#contracts/decode";
import { HeadPageRequestSchema } from "#contracts/release/head";
import {
  ContentReleaseBundleSchema,
  ContentReleaseStatusRequestSchema,
  ReleaseAbortRequestSchema,
  ReleaseAcceptRequestSchema,
  ReleaseCleanupRequestSchema,
  type RollbackContentReleaseBundle,
} from "#contracts/release/lifecycle";
import { RollbackPageRequestSchema } from "#contracts/release/rollback/spec";
import { RoutePageRequestSchema } from "#contracts/release/route/page";
import {
  RollbackSignedContentReleaseSchema,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import {
  StageArtifactBatchRequestSchema,
  StageItemBatchRequestSchema,
  StageProjectionBatchRequestSchema,
  StageRouteBatchRequestSchema,
} from "#contracts/transport/batch";
import { StageGroupRequestSchema } from "#contracts/transport/group";
import {
  StageSnapshotBatchRequestSchema,
  StageSnapshotRequestSchema,
} from "#contracts/transport/snapshot";

/** Complete stable operation vocabulary shared by requests and diagnostics. */
export const PublicationOperationSchema = Schema.Literals([
  "abort",
  "accept",
  "activate",
  "activateRecovery",
  "cleanup",
  "current",
  "headPage",
  "recovery",
  "rollbackPage",
  "routePage",
  "stageArtifactBatch",
  "stageGroup",
  "stageItemBatch",
  "stageProjectionBatch",
  "stageRecovery",
  "stageRelease",
  "stageRouteBatch",
  "stageSnapshot",
  "stageSnapshotBatch",
  "status",
  "verify",
]);
export type PublicationOperation = typeof PublicationOperationSchema.Type;

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
export const PublicationAcceptRequestSchema =
  ReleaseAcceptRequestSchema.mapFields(
    (fields) => ({ ...fields, operation: Schema.Literal("accept") }),
    { unsafePreserveChecks: true }
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
export const PublicationRecoveryLookupRequestSchema =
  ReleaseAcceptRequestSchema.mapFields(
    (fields) => ({ ...fields, operation: Schema.Literal("recovery") }),
    { unsafePreserveChecks: true }
  );
export type PublicationRecoveryLookupRequest =
  typeof PublicationRecoveryLookupRequestSchema.Type;

/** Starts or idempotently resumes one exact signed release. */
export const StageReleaseRequestSchema = ContentReleaseBundleSchema.mapFields(
  (fields) => ({ ...fields, operation: Schema.Literal("stageRelease") }),
  { unsafePreserveChecks: true }
);
export type StageReleaseRequest = typeof StageReleaseRequestSchema.Type;

/** Starts or idempotently resumes one exact pre-staged inverse release. */
const StageRecoveryRequestBaseSchema = ContentReleaseBundleSchema.mapFields(
  (fields) => ({ ...fields, operation: Schema.Literal("stageRecovery") }),
  { unsafePreserveChecks: true }
);
type StageRecoveryRequestValue = typeof StageRecoveryRequestBaseSchema.Type &
  RollbackContentReleaseBundle;

export const StageRecoveryRequestSchema = StageRecoveryRequestBaseSchema.pipe(
  Schema.refine(
    (request): request is StageRecoveryRequestValue =>
      request.release.manifest.origin.kind === "rollback",
    { message: "Expected a rollback release for recovery staging." }
  )
);
export type StageRecoveryRequest = typeof StageRecoveryRequestSchema.Type;

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

/** Complete request vocabulary accepted by publication ingress. */
export const PublicationRequestSchema = Schema.Union([
  PublicationAcceptRequestSchema,
  PublicationAbortRequestSchema,
  PublicationCurrentRequestSchema,
  PublicationHeadPageRequestSchema,
  PublicationRecoveryLookupRequestSchema,
  StageReleaseRequestSchema,
  StageRecoveryRequestSchema,
  StageSnapshotRequestSchema,
  StageSnapshotBatchRequestSchema,
  StageGroupRequestSchema,
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
  PublicationCleanupRequestSchema,
]);
export type PublicationRequest = typeof PublicationRequestSchema.Type;

/** Strictly decodes one unknown publication request without throwing. */
export const decodePublicationRequest = Effect.fn(
  "AksaraContracts.decodePublicationRequest"
)((input: unknown) =>
  decodeContract(PublicationRequestSchema, "PublicationRequest", input)
);
