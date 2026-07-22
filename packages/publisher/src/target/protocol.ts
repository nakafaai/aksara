import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import {
  type PublicationFailure,
  publicationFailureStatus,
} from "@nakafa/aksara-contracts/transport/failure";
import type {
  PublicationRequest,
  StageArtifactBatchRequest,
  StageItemBatchRequest,
  StageProjectionBatchRequest,
} from "@nakafa/aksara-contracts/transport/request";
import type {
  PublicationResponse,
  PublicationSuccess,
  StageBatchReceipt,
} from "@nakafa/aksara-contracts/transport/response";
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
import { hasBoundFinalizeProgress } from "#publisher/target/progress";

/** Parsed HTTP status and body returned by publication ingress. */
export interface PublicationHttpResult {
  readonly body: PublicationResponse;
  readonly status: number;
}

const TARGET_STAGES = {
  activate: "activate",
  cleanup: "cleanup",
  finalize: "finalize",
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

/** Returns the release identity bound to every publication operation. */
export function publicationReleaseId(request: PublicationRequest): ReleaseId {
  if ("release" in request) {
    return request.release.manifest.releaseId;
  }
  if ("rollbackOf" in request) {
    return request.rollbackOf;
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

/** Returns the exact number of rows carried by one staging request. */
function publicationBatchCount(
  request:
    | StageArtifactBatchRequest
    | StageItemBatchRequest
    | StageProjectionBatchRequest
) {
  if ("artifacts" in request) {
    return request.artifacts.length;
  }
  if ("items" in request) {
    return request.items.length;
  }
  return request.projections.length;
}

/** Checks one staging receipt against its exact request identity and count. */
function hasBoundBatchReceipt(
  request:
    | StageArtifactBatchRequest
    | StageItemBatchRequest
    | StageProjectionBatchRequest,
  receipt: StageBatchReceipt
) {
  const count = publicationBatchCount(request);
  return (
    receipt.batchIndex === request.batchIndex &&
    receipt.releaseId === request.releaseId &&
    receipt.created + receipt.unchanged === count
  );
}

/** Verifies that success evidence belongs to the exact initiating request. */
function hasBoundSuccess(
  request: PublicationRequest,
  response: PublicationSuccess
) {
  if (response.operation !== request.operation) {
    return false;
  }
  return Match.value(request).pipe(
    Match.discriminatorsExhaustive("operation")({
      activate: (value) =>
        response.operation === "activate" &&
        response.value.releaseId === value.release.manifest.releaseId,
      cleanup: (value) =>
        response.operation === "cleanup" &&
        response.value.releaseId === value.releaseId,
      finalize: (value) =>
        response.operation === "finalize" &&
        response.releaseId === value.release.manifest.releaseId &&
        hasBoundFinalizeProgress(value, response),
      rollbackPage: (value) =>
        response.operation === "rollbackPage" &&
        response.value.rollbackOf === value.rollbackOf,
      stageArtifactBatch: (value) =>
        response.operation === "stageArtifactBatch" &&
        hasBoundBatchReceipt(value, response.value),
      stageItemBatch: (value) =>
        response.operation === "stageItemBatch" &&
        hasBoundBatchReceipt(value, response.value),
      stageProjectionBatch: (value) =>
        response.operation === "stageProjectionBatch" &&
        hasBoundBatchReceipt(value, response.value),
      stageRelease: (value) =>
        response.operation === "stageRelease" &&
        response.value.releaseId === value.release.manifest.releaseId &&
        response.value.manifestHash === value.release.manifestHash,
      status: (value) =>
        response.operation === "status" &&
        response.value.releaseId === value.releaseId &&
        response.value.manifestHash === value.manifestHash,
      verify: (value) =>
        response.operation === "verify" &&
        response.value.releaseId === value.release.manifest.releaseId,
    })
  );
}

/** Checks structured failure evidence before exposing it to domain callers. */
function hasBoundFailure(
  request: PublicationRequest,
  failure: PublicationFailure
) {
  if (failure.kind === "unauthorized") {
    return true;
  }
  if (failure.operation !== null && failure.operation !== request.operation) {
    return false;
  }
  if (
    "releaseId" in failure &&
    failure.releaseId !== null &&
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
      failure.expectedBaseReleaseId === request.release.manifest.baseReleaseId
    );
  }
  if (failure.operation === "stageRelease") {
    return request.operation === "stageRelease";
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
    if (result.status !== 200 || !hasBoundSuccess(request, result.body)) {
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
