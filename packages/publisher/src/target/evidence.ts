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

/** Binds an activation receipt to every manifest field it reports. */
function hasBoundActivation(
  request: ActivateRequest,
  response: ActivateSuccess
) {
  const { manifest } = request.release;
  const receipt = response.value;
  return (
    receipt.releaseId === manifest.releaseId &&
    receipt.projectionDigest === manifest.projectionDigest &&
    receipt.stagedItems === manifest.itemCount &&
    receipt.stagedProjections === manifest.projectionCount
  );
}

/** Binds recomputed verification evidence to one exact signed manifest. */
function hasBoundVerification(request: VerifyRequest, response: VerifySuccess) {
  const { manifest, manifestHash } = request.release;
  const evidence = response.value;
  return (
    evidence.releaseId === manifest.releaseId &&
    evidence.manifestHash === manifestHash &&
    evidence.baseReleaseId === manifest.baseReleaseId &&
    evidence.itemCount === manifest.itemCount &&
    evidence.itemsDigest === manifest.itemsDigest &&
    evidence.projectionCount === manifest.projectionCount &&
    evidence.projectionDigest === manifest.projectionDigest &&
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
      activate: (value) =>
        response.operation === "activate" &&
        hasBoundActivation(value, response),
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
        hasBoundVerification(value, response),
    })
  );
}
