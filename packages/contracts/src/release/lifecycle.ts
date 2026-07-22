import { Schema } from "effect";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { PublicationReceiptSchema } from "#contracts/release/spec";

const CleanupCountSchema = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);

/** Exact immutable release identity requested from durable target state. */
export const ContentReleaseStatusRequestSchema = Schema.Struct({
  manifestHash: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
});
export type ContentReleaseStatusRequest =
  typeof ContentReleaseStatusRequestSchema.Type;

const ContentReleaseStatusIdentity = {
  manifestHash: Sha256HashSchema,
  releaseId: ReleaseIdSchema,
};

/** Checks completed evidence against the durable status identity. */
function hasBoundReceipt(status: {
  readonly receipt: typeof PublicationReceiptSchema.Type;
  readonly releaseId: typeof ReleaseIdSchema.Type;
}) {
  return status.receipt.releaseId === status.releaseId;
}

const CompletedReleaseStatusSchema = Schema.Struct({
  phase: Schema.Literal("completed"),
  receipt: PublicationReceiptSchema,
  ...ContentReleaseStatusIdentity,
}).pipe(
  Schema.filter(hasBoundReceipt, {
    message: () =>
      "Expected the completed receipt to match the release status identity.",
  })
);

/** Persisted release phase bound to one exact signed manifest identity. */
export const ContentReleaseStatusSchema = Schema.Union(
  Schema.Struct({
    phase: Schema.Literal("missing"),
    ...ContentReleaseStatusIdentity,
  }),
  Schema.Struct({
    phase: Schema.Literal(
      "staging",
      "verifying",
      "verified",
      "active",
      "finalizing",
      "aborted"
    ),
    ...ContentReleaseStatusIdentity,
  }),
  CompletedReleaseStatusSchema
);
export type ContentReleaseStatus = typeof ContentReleaseStatusSchema.Type;

/** One bounded cleanup page for unreachable rows owned by a release. */
export const ReleaseCleanupRequestSchema = Schema.Struct({
  cursor: Schema.NullOr(Schema.NonEmptyTrimmedString),
  limit: Schema.Number.pipe(Schema.int(), Schema.between(1, 100)),
  releaseId: ReleaseIdSchema,
});
export type ReleaseCleanupRequest = typeof ReleaseCleanupRequestSchema.Type;

/** Resumable evidence returned after one bounded cleanup page. */
export const ReleaseCleanupReceiptSchema = Schema.Struct({
  complete: Schema.Boolean,
  deletedArtifacts: CleanupCountSchema,
  deletedItems: CleanupCountSchema,
  nextCursor: Schema.NullOr(Schema.NonEmptyTrimmedString),
  releaseId: ReleaseIdSchema,
}).pipe(
  Schema.filter(
    (receipt) =>
      receipt.complete
        ? receipt.nextCursor === null
        : receipt.nextCursor !== null,
    {
      message: () =>
        "Expected a cursor only when another cleanup page remains.",
    }
  )
);
export type ReleaseCleanupReceipt = typeof ReleaseCleanupReceiptSchema.Type;
