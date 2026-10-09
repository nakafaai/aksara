import { Effect, Schema } from "effect";
import { decodeContract } from "#contracts/decode";
import { RecoveryLookupSchema } from "#contracts/release/current/evidence";
import { ContentReleaseCurrentSchema } from "#contracts/release/current/state";
import { HeadPageSchema } from "#contracts/release/head";
import {
  ContentReleaseStatusSchema,
  ReleaseAbortReceiptSchema,
  ReleaseCleanupReceiptSchema,
} from "#contracts/release/lifecycle";
import { RollbackPageSchema } from "#contracts/release/rollback/spec";
import { RoutePageSchema } from "#contracts/release/route/page";
import {
  PublicationReceiptSchema,
  ReleaseVerificationStatusSchema,
} from "#contracts/release/spec";
import { StageBatchReceiptSchema } from "#contracts/transport/batch";
import { PublicationFailureSchema } from "#contracts/transport/failure";
import { StageGroupSuccessSchema } from "#contracts/transport/group";
import { StageTryoutRuntimeBundleReceiptSchema } from "#contracts/transport/runtime";
import {
  StageSnapshotBatchReceiptSchema,
  StageSnapshotReceiptSchema,
} from "#contracts/transport/snapshot";
import { successSchema } from "#contracts/transport/success";

/** Returns authoritative active, candidate, and recovery identities. */
export const PublicationCurrentSuccessSchema = successSchema(
  "current",
  ContentReleaseCurrentSchema
);

/** Returns durable cumulative progress from one release abort page. */
export const PublicationAbortSuccessSchema = successSchema(
  "abort",
  ReleaseAbortReceiptSchema
);

/** Returns terminal discard evidence for one exact retained inverse. */
export const PublicationAcceptSuccessSchema = successSchema(
  "accept",
  ReleaseAbortReceiptSchema
);

/** Returns one bounded authoritative material-head page. */
export const PublicationHeadPageSuccessSchema = successSchema(
  "headPage",
  HeadPageSchema
);

/** Returns exact historical recovery completion or explicit absence. */
export const PublicationRecoverySuccessSchema = successSchema(
  "recovery",
  RecoveryLookupSchema
);

/** Durable release status that proves stageRelease found or created a row. */
export const StagedReleaseStatusSchema = ContentReleaseStatusSchema.pipe(
  Schema.check(
    Schema.makeFilter((status) => status.phase !== "missing", {
      message: "Expected stageRelease to return a stored release status.",
    })
  )
);
export type StagedReleaseStatus = typeof StagedReleaseStatusSchema.Type;

/** Confirms the exact durable status created or resumed by staging. */
export const StageReleaseSuccessSchema = successSchema(
  "stageRelease",
  StagedReleaseStatusSchema
);

/** Confirms the exact durable inverse status created or resumed by staging. */
export const StageRecoverySuccessSchema = successSchema(
  "stageRecovery",
  StagedReleaseStatusSchema
);

/** Confirms the idempotent outcome of one structured-family manifest. */
export const StageSnapshotSuccessSchema = successSchema(
  "stageSnapshot",
  StageSnapshotReceiptSchema
);

/** Confirms the idempotent outcome of one structured-snapshot row batch. */
export const StageSnapshotBatchSuccessSchema = successSchema(
  "stageSnapshotBatch",
  StageSnapshotBatchReceiptSchema
);

/** Confirms the idempotent outcome of one permanent runtime bundle. */
export const StageTryoutRuntimeBundleSuccessSchema = successSchema(
  "stageTryoutRuntimeBundle",
  StageTryoutRuntimeBundleReceiptSchema
);

/** Confirms the idempotent outcome of one ordered item batch. */
export const StageItemBatchSuccessSchema = successSchema(
  "stageItemBatch",
  StageBatchReceiptSchema
);

/** Confirms the idempotent outcome of one ordered route batch. */
export const StageRouteBatchSuccessSchema = successSchema(
  "stageRouteBatch",
  StageBatchReceiptSchema
);

/** Confirms the idempotent outcome of one projection batch. */
export const StageProjectionBatchSuccessSchema = successSchema(
  "stageProjectionBatch",
  StageBatchReceiptSchema
);

/** Confirms the idempotent outcome of one immutable artifact batch. */
export const StageArtifactBatchSuccessSchema = successSchema(
  "stageArtifactBatch",
  StageBatchReceiptSchema
);

/** Returns the durable phase for the requested exact manifest identity. */
export const PublicationStatusSuccessSchema = successSchema(
  "status",
  ContentReleaseStatusSchema
);

/** Returns bounded progress or final evidence for durable verification. */
export const VerifyReleaseSuccessSchema = successSchema(
  "verify",
  ReleaseVerificationStatusSchema
);

/** Returns the atomic activation receipt for one verified release. */
export const ActivateReleaseSuccessSchema = successSchema(
  "activate",
  PublicationReceiptSchema
);

/** Returns the atomic activation receipt for one retained inverse release. */
export const ActivateRecoverySuccessSchema = successSchema(
  "activateRecovery",
  PublicationReceiptSchema
);

/** Returns one exact bounded page used to build a forward rollback. */
export const PublicationRollbackSuccessSchema = successSchema(
  "rollbackPage",
  RollbackPageSchema
);

/** Returns one bounded prior-owner page used to reverse signed routes. */
export const PublicationRoutePageSuccessSchema = successSchema(
  "routePage",
  RoutePageSchema
);

/** Returns durable cumulative evidence from server-owned cleanup progress. */
export const PublicationCleanupSuccessSchema = successSchema(
  "cleanup",
  ReleaseCleanupReceiptSchema
);

/** Complete success vocabulary returned by publication ingress. */
export const PublicationSuccessSchema = Schema.Union([
  PublicationAcceptSuccessSchema,
  PublicationAbortSuccessSchema,
  PublicationCurrentSuccessSchema,
  PublicationHeadPageSuccessSchema,
  PublicationRecoverySuccessSchema,
  StageReleaseSuccessSchema,
  StageRecoverySuccessSchema,
  StageSnapshotSuccessSchema,
  StageSnapshotBatchSuccessSchema,
  StageTryoutRuntimeBundleSuccessSchema,
  StageGroupSuccessSchema,
  StageItemBatchSuccessSchema,
  StageRouteBatchSuccessSchema,
  StageProjectionBatchSuccessSchema,
  StageArtifactBatchSuccessSchema,
  PublicationStatusSuccessSchema,
  VerifyReleaseSuccessSchema,
  ActivateReleaseSuccessSchema,
  ActivateRecoverySuccessSchema,
  PublicationRollbackSuccessSchema,
  PublicationRoutePageSuccessSchema,
  PublicationCleanupSuccessSchema,
]);
export type PublicationSuccess = typeof PublicationSuccessSchema.Type;

/** Wraps one stable typed failure without exposing implementation messages. */
export const PublicationFailureResponseSchema = Schema.Struct({
  failure: PublicationFailureSchema,
  ok: Schema.Literal(false),
});
export type PublicationFailureResponse =
  typeof PublicationFailureResponseSchema.Type;

/** Complete framework-neutral response vocabulary for publication ingress. */
export const PublicationResponseSchema = Schema.Union([
  PublicationSuccessSchema,
  PublicationFailureResponseSchema,
]);
export type PublicationResponse = typeof PublicationResponseSchema.Type;

/** Strictly decodes one unknown publication response without throwing. */
export const decodePublicationResponse = Effect.fn(
  "AksaraContracts.decodePublicationResponse"
)((input: unknown) =>
  decodeContract(PublicationResponseSchema, "PublicationResponse", input)
);
