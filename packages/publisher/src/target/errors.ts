import {
  PublicationConflictSchema,
  PublicationRejectedSchema,
  PublicationStaleBaseSchema,
} from "@nakafa/aksara-contracts/transport/failure";
import { Schema } from "effect";

/** Publication capability whose infrastructure request did not complete. */
export const PublicationTargetStageSchema = Schema.Literal(
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
export type PublicationTargetStage = typeof PublicationTargetStageSchema.Type;

const PublicationTransportDetailSchema = Schema.Union(
  Schema.Struct({ reason: Schema.Literal("network") }),
  Schema.Struct({ reason: Schema.Literal("timeout") }),
  Schema.Struct({
    reason: Schema.Literal("transient-status"),
    status: Schema.Union(
      Schema.Literal(408, 429),
      Schema.Number.pipe(Schema.int(), Schema.between(500, 599))
    ),
  })
);

/** A target transport failed transiently and may be retried idempotently. */
export class PublicationTargetTransportError extends Schema.TaggedError<PublicationTargetTransportError>()(
  "PublicationTargetTransportError",
  {
    detail: PublicationTransportDetailSchema,
    stage: PublicationTargetStageSchema,
  }
) {}

/** A permanent local or remote protocol contradiction must not be retried. */
export class PublicationTargetProtocolError extends Schema.TaggedError<PublicationTargetProtocolError>()(
  "PublicationTargetProtocolError",
  {
    reason: Schema.Literal(
      "request-encoding",
      "response-decoding",
      "response-evidence"
    ),
    stage: PublicationTargetStageSchema,
  }
) {}

/** Publication transport configuration is unsafe before any request is sent. */
export class PublicationTargetConfigurationError extends Schema.TaggedError<PublicationTargetConfigurationError>()(
  "PublicationTargetConfigurationError",
  { reason: Schema.Literal("endpoint", "timeout", "token") }
) {}

/** Publication ingress rejected credentials before invoking a capability. */
export class PublicationTargetUnauthorizedError extends Schema.TaggedError<PublicationTargetUnauthorizedError>()(
  "PublicationTargetUnauthorizedError",
  {}
) {}

/** A stable target rule rejected an otherwise authenticated request. */
export class PublicationTargetRejectedError extends Schema.TaggedError<PublicationTargetRejectedError>()(
  "PublicationTargetRejectedError",
  { rejection: PublicationRejectedSchema }
) {}

/** A release or batch identity was reused with different immutable content. */
export class PublicationTargetConflictError extends Schema.TaggedError<PublicationTargetConflictError>()(
  "PublicationTargetConflictError",
  { conflict: PublicationConflictSchema }
) {}

/** Release staging or activation found a different active signed base. */
export class PublicationStaleBaseError extends Schema.TaggedError<PublicationStaleBaseError>()(
  "PublicationStaleBaseError",
  { failure: PublicationStaleBaseSchema }
) {}

/** Complete target failure channel with explicit retry semantics by tag. */
export type PublicationTargetFailure =
  | PublicationTargetProtocolError
  | PublicationTargetTransportError
  | PublicationTargetUnauthorizedError
  | PublicationTargetRejectedError
  | PublicationTargetConflictError
  | PublicationStaleBaseError;
