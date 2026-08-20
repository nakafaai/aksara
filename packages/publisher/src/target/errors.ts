import {
  PublicationConflictSchema,
  PublicationRejectedSchema,
  PublicationStaleBaseSchema,
} from "@nakafa/aksara-contracts/transport/failure";
import { Schema } from "effect";

/** Publication capability whose infrastructure request did not complete. */
export const PublicationTargetStageSchema = Schema.Literals([
  "accept",
  "abort",
  "current",
  "heads",
  "release",
  "staging",
  "items",
  "routes",
  "projections",
  "snapshots",
  "artifacts",
  "verify",
  "activate",
  "recovery",
  "status",
  "cleanup",
  "rollback",
]);
export type PublicationTargetStage = typeof PublicationTargetStageSchema.Type;

/** Sanitized transport evidence safe to expose at an operator boundary. */
export const PublicationTransportDetailSchema = Schema.Union([
  Schema.Struct({ reason: Schema.Literal("network") }),
  Schema.Struct({ reason: Schema.Literal("timeout") }),
  Schema.Struct({
    reason: Schema.Literal("transient-status"),
    status: Schema.Union([
      Schema.Literals([408, 429]),
      Schema.Finite.pipe(
        Schema.check(Schema.isInt()),
        Schema.check(Schema.isBetween({ maximum: 599, minimum: 500 }))
      ),
    ]),
  }),
]);

/** A target transport failed transiently and may be retried idempotently. */
export class PublicationTargetTransportError extends Schema.TaggedError<PublicationTargetTransportError>()(
  "PublicationTargetTransportError",
  {
    detail: PublicationTransportDetailSchema,
    stage: PublicationTargetStageSchema,
  }
) {}

/** Creates one sanitized retryable network failure for a target capability. */
export function publicationNetworkError(stage: PublicationTargetStage) {
  return new PublicationTargetTransportError({
    detail: { reason: "network" },
    stage,
  });
}

/** A permanent local or remote protocol contradiction must not be retried. */
export class PublicationTargetProtocolError extends Schema.TaggedError<PublicationTargetProtocolError>()(
  "PublicationTargetProtocolError",
  {
    reason: Schema.Literals([
      "request-encoding",
      "response-decoding",
      "response-evidence",
    ]),
    stage: PublicationTargetStageSchema,
  }
) {}

/** Publication transport configuration is unsafe before any request is sent. */
export class PublicationTargetConfigurationError extends Schema.TaggedError<PublicationTargetConfigurationError>()(
  "PublicationTargetConfigurationError",
  { reason: Schema.Literals(["endpoint", "timeout", "token"]) }
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
