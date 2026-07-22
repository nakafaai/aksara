import { ReleaseIdSchema } from "@nakafaai/aksara-contracts/ids";
import { Schema } from "effect";

const PublicationTargetStageSchema = Schema.Literal(
  "release",
  "items",
  "projections",
  "artifacts",
  "verify",
  "activate",
  "status",
  "finalize",
  "cleanup",
  "rollback"
);

/** A target transport failed transiently and may be retried idempotently. */
export class PublicationTargetTransportError extends Schema.TaggedError<PublicationTargetTransportError>()(
  "PublicationTargetTransportError",
  {
    cause: Schema.Unknown,
    message: Schema.NonEmptyTrimmedString,
    stage: PublicationTargetStageSchema,
  }
) {}

/** A release or batch identity was reused with different immutable content. */
export class PublicationTargetConflictError extends Schema.TaggedError<PublicationTargetConflictError>()(
  "PublicationTargetConflictError",
  {
    message: Schema.NonEmptyTrimmedString,
    stage: Schema.Literal("release", "items", "projections", "artifacts"),
  }
) {}

/** Atomic activation found a different active release than the signed base. */
export class PublicationStaleBaseError extends Schema.TaggedError<PublicationStaleBaseError>()(
  "PublicationStaleBaseError",
  {
    activeReleaseId: Schema.NullOr(ReleaseIdSchema),
    expectedBaseReleaseId: Schema.NullOr(ReleaseIdSchema),
    releaseId: ReleaseIdSchema,
  }
) {}

/** Complete target failure channel with explicit retry semantics by tag. */
export type PublicationTargetFailure =
  | PublicationTargetTransportError
  | PublicationTargetConflictError
  | PublicationStaleBaseError;
