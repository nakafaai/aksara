import type {
  PublicationRequest,
  StageArtifactBatchRequest,
  StageItemBatchRequest,
  StageProjectionBatchRequest,
} from "@nakafa/aksara-contracts/transport/request";
import type {
  PublicationSuccess,
  StageBatchReceipt,
} from "@nakafa/aksara-contracts/transport/response";
import { Match } from "effect";
import { hasBoundFinalizeProgress } from "#publisher/target/progress";

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

type VerifyRequest = Extract<PublicationRequest, { operation: "verify" }>;
type VerifySuccess = Extract<PublicationSuccess, { operation: "verify" }>;
type ActivateRequest = Extract<PublicationRequest, { operation: "activate" }>;
type ActivateSuccess = Extract<PublicationSuccess, { operation: "activate" }>;

/** Binds one head page to its active release, scope, cursor, and row ceiling. */
function hasBoundHeadPage(
  request: Extract<PublicationRequest, { operation: "headPage" }>,
  response: Extract<PublicationSuccess, { operation: "headPage" }>
) {
  const page = response.value;
  return (
    page.activeManifestHash === request.activeManifestHash &&
    page.activeReleaseId === request.activeReleaseId &&
    page.cursor === request.cursor &&
    page.heads.length <= request.limit
  );
}

/** Binds one publication receipt to every signed manifest field it reports. */
function hasBoundManifestReceipt(
  request: ActivateRequest["release"],
  receipt: ActivateSuccess["value"]
) {
  const { manifest } = request;
  return (
    receipt.releaseId === manifest.releaseId &&
    receipt.manifestHash === request.manifestHash &&
    receipt.activatedHeads === manifest.upsertCount &&
    receipt.deletedHeads === manifest.deleteCount &&
    receipt.projectionDigest === manifest.projectionDigest &&
    receipt.resultCount === manifest.resultCount &&
    receipt.resultDigest === manifest.resultDigest &&
    receipt.stagedArtifacts === manifest.upsertCount &&
    receipt.stagedItems === manifest.itemCount &&
    receipt.stagedProjections === manifest.projectionCount
  );
}

/** Binds cumulative cleanup evidence to its exact release identity. */
function hasBoundCleanup(
  request: Extract<PublicationRequest, { operation: "cleanup" }>,
  response: Extract<PublicationSuccess, { operation: "cleanup" }>
) {
  return response.value.releaseId === request.releaseId;
}

/** Binds cumulative abort evidence to its exact release identity. */
function hasBoundAbort(
  request: Extract<PublicationRequest, { operation: "abort" }>,
  response: Extract<PublicationSuccess, { operation: "abort" }>
) {
  return response.value.releaseId === request.releaseId;
}

/** Binds one rollback page to the exact requested cursor and row ceiling. */
function hasBoundRollbackPage(
  request: Extract<PublicationRequest, { operation: "rollbackPage" }>,
  response: Extract<PublicationSuccess, { operation: "rollbackPage" }>
) {
  const page = response.value;
  return (
    page.rollbackOf === request.rollbackOf &&
    page.rollbackOfManifestHash === request.rollbackOfManifestHash &&
    page.records.length <= request.limit &&
    page.nextIndex === request.afterIndex + page.records.length
  );
}

/** Binds recomputed verification evidence to one exact signed manifest. */
function hasBoundVerification(request: VerifyRequest, response: VerifySuccess) {
  const { manifest, manifestHash } = request.release;
  const evidence = response.value;
  return (
    evidence.releaseId === manifest.releaseId &&
    evidence.manifestHash === manifestHash &&
    evidence.baseManifestHash === manifest.baseManifestHash &&
    evidence.baseReleaseId === manifest.baseReleaseId &&
    evidence.baseResultCount === manifest.baseResultCount &&
    evidence.baseResultDigest === manifest.baseResultDigest &&
    evidence.itemCount === manifest.itemCount &&
    evidence.itemsDigest === manifest.itemsDigest &&
    evidence.projectionCount === manifest.projectionCount &&
    evidence.projectionDigest === manifest.projectionDigest &&
    evidence.resultCount === manifest.resultCount &&
    evidence.resultDigest === manifest.resultDigest &&
    evidence.rollbackCount === manifest.rollbackCount &&
    evidence.rollbackDigest === manifest.rollbackDigest &&
    evidence.rendererManifestHash === manifest.rendererManifestHash
  );
}

/** Verifies that success evidence belongs to the exact initiating request. */
export function hasBoundPublicationSuccess(
  request: PublicationRequest,
  response: PublicationSuccess
) {
  if (response.operation !== request.operation) {
    return false;
  }
  return Match.value(request).pipe(
    Match.discriminatorsExhaustive("operation")({
      abort: (value) =>
        response.operation === "abort" && hasBoundAbort(value, response),
      activate: (value) =>
        response.operation === "activate" &&
        hasBoundManifestReceipt(value.release, response.value),
      cleanup: (value) =>
        response.operation === "cleanup" && hasBoundCleanup(value, response),
      current: () => response.operation === "current",
      finalize: (value) =>
        response.operation === "finalize" &&
        response.releaseId === value.release.manifest.releaseId &&
        hasBoundFinalizeProgress(value, response) &&
        (!response.value.done ||
          hasBoundManifestReceipt(value.release, response.value.receipt)),
      headPage: (value) =>
        response.operation === "headPage" && hasBoundHeadPage(value, response),
      rollbackPage: (value) =>
        response.operation === "rollbackPage" &&
        hasBoundRollbackPage(value, response),
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
        hasBoundVerification(value, response),
    })
  );
}
