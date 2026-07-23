import { Effect, Schema } from "effect";
import { decodeContract } from "#contracts/decode";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  ContentReleaseCurrentSchema,
  RecoveryLookupSchema,
} from "#contracts/release/current";
import { HeadPageSchema } from "#contracts/release/head";
import {
  ContentReleaseStatusSchema,
  ReleaseAbortReceiptSchema,
  ReleaseCleanupReceiptSchema,
} from "#contracts/release/lifecycle";
import { RollbackPageSchema } from "#contracts/release/rollback";
import { RoutePageSchema } from "#contracts/release/route-page";
import {
  PublicationReceiptSchema,
  ReleaseVerificationEvidenceSchema,
} from "#contracts/release/spec";
import { PublicationFailureSchema } from "#contracts/transport/failure";

const CountSchema = Schema.Number.pipe(Schema.int(), Schema.nonNegative());

/** Returns authoritative active, candidate, and recovery identities. */
export const PublicationCurrentSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("current"),
  value: ContentReleaseCurrentSchema,
});

/** Returns durable cumulative progress from one release abort page. */
export const PublicationAbortSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("abort"),
  value: ReleaseAbortReceiptSchema,
});

/** Returns terminal discard evidence for one exact retained inverse. */
export const PublicationAcceptSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("accept"),
  value: ReleaseAbortReceiptSchema,
});

/** Returns one bounded authoritative material-head page. */
export const PublicationHeadPageSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("headPage"),
  value: HeadPageSchema,
});

/** Returns exact historical recovery completion or explicit absence. */
export const PublicationRecoverySuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("recovery"),
  value: RecoveryLookupSchema,
});

/** Idempotent row counts returned by one bounded staging request. */
export const StageBatchReceiptSchema = Schema.Struct({
  batchIndex: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
  created: CountSchema,
  releaseId: ReleaseIdSchema,
  unchanged: CountSchema,
});
export type StageBatchReceipt = typeof StageBatchReceiptSchema.Type;

/** Durable release status that proves stageRelease found or created a row. */
export const StagedReleaseStatusSchema = ContentReleaseStatusSchema.pipe(
  Schema.filter((status) => status.phase !== "missing", {
    message: () => "Expected stageRelease to return a stored release status.",
  })
);
export type StagedReleaseStatus = typeof StagedReleaseStatusSchema.Type;

/** Confirms the exact durable status created or resumed by staging. */
export const StageReleaseSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("stageRelease"),
  value: StagedReleaseStatusSchema,
});

/** Confirms the exact durable inverse status created or resumed by staging. */
export const StageRecoverySuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("stageRecovery"),
  value: StagedReleaseStatusSchema,
});

/** Confirms the idempotent outcome of one ordered item batch. */
export const StageItemBatchSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("stageItemBatch"),
  value: StageBatchReceiptSchema,
});

/** Confirms the idempotent outcome of one ordered route batch. */
export const StageRouteBatchSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("stageRouteBatch"),
  value: StageBatchReceiptSchema,
});

/** Confirms the idempotent outcome of one projection batch. */
export const StageProjectionBatchSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("stageProjectionBatch"),
  value: StageBatchReceiptSchema,
});

/** Confirms the idempotent outcome of one immutable artifact batch. */
export const StageArtifactBatchSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("stageArtifactBatch"),
  value: StageBatchReceiptSchema,
});

/** Returns the durable phase for the requested exact manifest identity. */
export const PublicationStatusSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("status"),
  value: ContentReleaseStatusSchema,
});

/** Returns recomputed evidence for every staged release projection. */
export const VerifyReleaseSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("verify"),
  value: ReleaseVerificationEvidenceSchema,
});

/** Returns the atomic activation receipt for one verified release. */
export const ActivateReleaseSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("activate"),
  value: PublicationReceiptSchema,
});

/** Returns the atomic activation receipt for one retained inverse release. */
export const ActivateRecoverySuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("activateRecovery"),
  value: PublicationReceiptSchema,
});

/** Returns one exact bounded page used to build a forward rollback. */
export const PublicationRollbackSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("rollbackPage"),
  value: RollbackPageSchema,
});

/** Returns one bounded prior-owner page used to reverse signed routes. */
export const PublicationRoutePageSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("routePage"),
  value: RoutePageSchema,
});

/** Returns durable cumulative evidence from server-owned cleanup progress. */
export const PublicationCleanupSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("cleanup"),
  value: ReleaseCleanupReceiptSchema,
});

/** Complete success vocabulary returned by publication ingress v1. */
export const PublicationSuccessSchema = Schema.Union(
  PublicationAcceptSuccessSchema,
  PublicationAbortSuccessSchema,
  PublicationCurrentSuccessSchema,
  PublicationHeadPageSuccessSchema,
  PublicationRecoverySuccessSchema,
  StageReleaseSuccessSchema,
  StageRecoverySuccessSchema,
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
  PublicationCleanupSuccessSchema
);
export type PublicationSuccess = typeof PublicationSuccessSchema.Type;

/** Wraps one stable typed failure without exposing implementation messages. */
export const PublicationFailureResponseSchema = Schema.Struct({
  failure: PublicationFailureSchema,
  ok: Schema.Literal(false),
});
export type PublicationFailureResponse =
  typeof PublicationFailureResponseSchema.Type;

/** Complete framework-neutral response vocabulary for publication ingress. */
export const PublicationResponseSchema = Schema.Union(
  PublicationSuccessSchema,
  PublicationFailureResponseSchema
);
export type PublicationResponse = typeof PublicationResponseSchema.Type;

/** Strictly decodes one unknown publication response without throwing. */
export const decodePublicationResponse = Effect.fn(
  "AksaraContracts.decodePublicationResponse"
)((input: unknown) =>
  decodeContract(PublicationResponseSchema, "PublicationResponse", input)
);
