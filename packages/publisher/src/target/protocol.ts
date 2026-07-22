import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import {
  type PublicationFailure,
  publicationFailureStatus,
} from "@nakafa/aksara-contracts/transport/failure";
import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import type { PublicationResponse } from "@nakafa/aksara-contracts/transport/response";
import { Effect, Match } from "effect";
import {
  PublicationStaleBaseError,
  PublicationTargetConflictError,
  type PublicationTargetFailure,
  PublicationTargetProtocolError,
  PublicationTargetRejectedError,
  type PublicationTargetStage,
  PublicationTargetTransportError,
  PublicationTargetUnauthorizedError,
} from "#publisher/target/errors";
import { hasBoundPublicationSuccess } from "#publisher/target/evidence";

/** Parsed HTTP status and body returned by publication ingress. */
export interface PublicationHttpResult {
  readonly body: PublicationResponse;
  readonly status: number;
}

const TARGET_STAGES = {
  abort: "abort",
  activate: "activate",
  cleanup: "cleanup",
  current: "current",
  finalize: "finalize",
  headPage: "heads",
  rollbackPage: "rollback",
  stageArtifactBatch: "artifacts",
  stageItemBatch: "items",
  stageProjectionBatch: "projections",
  stageRelease: "release",
  status: "status",
  verify: "verify",
} satisfies Record<PublicationRequest["operation"], PublicationTargetStage>;

/** Maps one exact wire operation to the publisher lifecycle vocabulary. */
export function targetStage(
  operation: PublicationRequest["operation"]
): PublicationTargetStage {
  return TARGET_STAGES[operation];
}

/** Returns the release identity for one release-owned publication operation. */
export function publicationReleaseId(
  request: Exclude<PublicationRequest, { readonly operation: "current" }>
): ReleaseId;
/** Returns null only for the singleton current-state operation. */
export function publicationReleaseId(
  request: PublicationRequest
): ReleaseId | null;
/** Returns the release identity when one publication operation owns one. */
export function publicationReleaseId(request: PublicationRequest) {
  if (request.operation === "current") {
    return null;
  }
  if ("release" in request) {
    return request.release.manifest.releaseId;
  }
  if ("rollbackOf" in request) {
    return request.rollbackOf;
  }
  if ("activeReleaseId" in request) {
    return request.activeReleaseId;
  }
  return request.releaseId;
}

/** Creates a permanent failure for malformed or contradictory HTTP evidence. */
function protocolError(request: PublicationRequest) {
  return new PublicationTargetProtocolError({
    reason: "response-evidence",
    stage: targetStage(request.operation),
  });
}

/** Checks structured failure evidence before exposing it to domain callers. */
function hasBoundFailure(
  request: PublicationRequest,
  failure: PublicationFailure
) {
  if (failure.kind === "unauthorized") {
    return true;
  }
  if (
    failure.kind === "rejected" &&
    failure.operation === null &&
    failure.releaseId === null
  ) {
    return (
      failure.code === "CONTENT_RELEASE_INVALID_REQUEST" ||
      failure.code === "CONTENT_RELEASE_SIZE" ||
      failure.code === "CONTENT_RELEASE_UNSUPPORTED"
    );
  }
  if (failure.operation !== null && failure.operation !== request.operation) {
    return false;
  }
  if (
    "releaseId" in failure &&
    failure.releaseId !== publicationReleaseId(request)
  ) {
    return false;
  }
  if (failure.kind === "rejected") {
    return true;
  }
  if (failure.kind === "stale-base") {
    return (
      (request.operation === "stageRelease" ||
        request.operation === "activate") &&
      failure.expectedBaseReleaseId ===
        request.release.manifest.baseReleaseId &&
      failure.activeReleaseId !== failure.expectedBaseReleaseId &&
      failure.activeReleaseId !== request.release.manifest.releaseId
    );
  }
  if (!("batchIndex" in failure)) {
    return request.operation === failure.operation;
  }
  return (
    (request.operation === "stageItemBatch" ||
      request.operation === "stageProjectionBatch" ||
      request.operation === "stageArtifactBatch") &&
    failure.batchIndex === request.batchIndex
  );
}

/** Converts one authenticated structured rejection into a typed target error. */
function mapFailure(failure: PublicationFailure): PublicationTargetFailure {
  return Match.value(failure).pipe(
    Match.discriminatorsExhaustive("kind")({
      conflict: (value) =>
        new PublicationTargetConflictError({ conflict: value }),
      rejected: (value) =>
        new PublicationTargetRejectedError({ rejection: value }),
      "stale-base": (value) =>
        new PublicationStaleBaseError({ failure: value }),
      unauthorized: () => new PublicationTargetUnauthorizedError(),
    })
  );
}

/** Checks that the HTTP status represents the declared typed failure kind. */
function hasFailureStatus(failure: PublicationFailure, status: number) {
  return status === publicationFailureStatus(failure.code);
}

/** Creates a sanitized retryable failure without retaining HTTP objects. */
export function transientPublicationError(
  request: PublicationRequest,
  status: number
) {
  return new PublicationTargetTransportError({
    detail: { reason: "transient-status", status },
    stage: targetStage(request.operation),
  });
}

/** Identifies statuses safe for bounded idempotent transport retry. */
export function isTransientPublicationStatus(status: number) {
  return status === 408 || status === 429 || (status >= 500 && status <= 599);
}

/** Validates HTTP status, operation, identity, and evidence as one protocol. */
export const interpretPublicationResponse = Effect.fn(
  "AksaraPublisher.interpretPublicationResponse"
)((request: PublicationRequest, result: PublicationHttpResult) => {
  if (isTransientPublicationStatus(result.status)) {
    return Effect.fail(transientPublicationError(request, result.status));
  }
  if (result.body.ok) {
    if (
      result.status !== 200 ||
      !hasBoundPublicationSuccess(request, result.body)
    ) {
      return Effect.fail(protocolError(request));
    }
    return Effect.succeed(result.body);
  }
  const { failure } = result.body;
  if (
    !(
      hasFailureStatus(failure, result.status) &&
      hasBoundFailure(request, failure)
    )
  ) {
    return Effect.fail(protocolError(request));
  }
  return Effect.fail(mapFailure(failure));
});
