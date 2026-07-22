import { Effect, Schema } from "effect";
import { decodeContract } from "#contracts/decode";
import { ReleaseIdSchema } from "#contracts/ids";
import {
  ContentReleaseStatusSchema,
  ReleaseCleanupReceiptSchema,
} from "#contracts/release/lifecycle";
import { RollbackPageSchema } from "#contracts/release/rollback";
import {
  PublicationReceiptSchema,
  ReleaseVerificationEvidenceSchema,
} from "#contracts/release/spec";
import { PublicationFailureSchema } from "#contracts/transport/failure";

const CountSchema = Schema.Number.pipe(Schema.int(), Schema.nonNegative());

/** Idempotent row counts returned by one bounded staging request. */
export const StageBatchReceiptSchema = Schema.Struct({
  batchIndex: Schema.Number.pipe(Schema.int(), Schema.nonNegative()),
  created: CountSchema,
  releaseId: ReleaseIdSchema,
  unchanged: CountSchema,
});
export type StageBatchReceipt = typeof StageBatchReceiptSchema.Type;

const FinalizeIndexSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.greaterThanOrEqualTo(-1)
);

/** Resumable progress returned before another finalization page is needed. */
export const FinalizePendingSchema = Schema.Struct({
  done: Schema.Literal(false),
  nextIndex: FinalizeIndexSchema,
  processed: CountSchema,
});

/** Final page evidence carrying the exact durable publication receipt. */
export const FinalizeCompleteSchema = Schema.Struct({
  done: Schema.Literal(true),
  nextIndex: FinalizeIndexSchema,
  processed: CountSchema,
  receipt: PublicationReceiptSchema,
});

/** Complete discriminated progress vocabulary for bounded finalization. */
export const FinalizeProgressSchema = Schema.Union(
  FinalizePendingSchema,
  FinalizeCompleteSchema
);
export type FinalizeProgress = typeof FinalizeProgressSchema.Type;

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

/** Confirms the idempotent outcome of one ordered item batch. */
export const StageItemBatchSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("stageItemBatch"),
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

/** Checks completed finalization evidence against its response identity. */
function hasBoundFinalizeReceipt(input: {
  readonly releaseId: typeof ReleaseIdSchema.Type;
  readonly value: FinalizeProgress;
}) {
  if (!input.value.done) {
    return true;
  }
  return input.value.receipt.releaseId === input.releaseId;
}

/** Returns one bounded finalization page and its continuation evidence. */
export const FinalizeReleaseSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("finalize"),
  releaseId: ReleaseIdSchema,
  value: FinalizeProgressSchema,
}).pipe(
  Schema.filter(hasBoundFinalizeReceipt, {
    message: () =>
      "Expected the completed receipt to match the finalized release identity.",
  })
);

/** Returns one exact bounded page used to build a forward rollback. */
export const PublicationRollbackSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("rollbackPage"),
  value: RollbackPageSchema,
});

/** Returns one bounded cleanup page with an explicit resume cursor. */
export const PublicationCleanupSuccessSchema = Schema.Struct({
  ok: Schema.Literal(true),
  operation: Schema.Literal("cleanup"),
  value: ReleaseCleanupReceiptSchema,
});

/** Complete success vocabulary returned by publication ingress v1. */
export const PublicationSuccessSchema = Schema.Union(
  StageReleaseSuccessSchema,
  StageItemBatchSuccessSchema,
  StageProjectionBatchSuccessSchema,
  StageArtifactBatchSuccessSchema,
  PublicationStatusSuccessSchema,
  VerifyReleaseSuccessSchema,
  ActivateReleaseSuccessSchema,
  FinalizeReleaseSuccessSchema,
  PublicationRollbackSuccessSchema,
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
