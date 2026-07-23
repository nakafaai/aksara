import { snapshotRowCount } from "@nakafa/aksara-contracts/release/snapshot";
import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import type {
  PublicationSuccess,
  StageBatchReceipt,
} from "@nakafa/aksara-contracts/transport/response";
import type { StageSnapshotBatchReceipt } from "@nakafa/aksara-contracts/transport/snapshot";
import { Match } from "effect";

type StageBatchRequest = Extract<
  PublicationRequest,
  {
    readonly operation:
      | "stageArtifactBatch"
      | "stageItemBatch"
      | "stageProjectionBatch"
      | "stageRouteBatch"
      | "stageSnapshotBatch";
  }
>;

/** Returns the exact number of rows carried by one staging request. */
function publicationBatchCount(request: StageBatchRequest) {
  if ("artifacts" in request) {
    return request.artifacts.length;
  }
  if ("items" in request) {
    return request.items.length;
  }
  if ("routes" in request) {
    return request.routes.length;
  }
  if ("rows" in request) {
    return request.rows.length;
  }
  return request.projections.length;
}

/** Checks one staging receipt against its exact request identity and count. */
function hasBoundBatchReceipt(
  request: StageBatchRequest,
  receipt: StageBatchReceipt
) {
  const count = publicationBatchCount(request);
  return (
    receipt.batchIndex === request.batchIndex &&
    receipt.releaseId === request.releaseId &&
    receipt.created + receipt.unchanged === count
  );
}

/** Checks one snapshot receipt against its family and immutable snapshot. */
function hasBoundSnapshotBatchReceipt(
  request: Extract<StageBatchRequest, { operation: "stageSnapshotBatch" }>,
  receipt: StageSnapshotBatchReceipt
) {
  return (
    hasBoundBatchReceipt(request, receipt) &&
    receipt.family === request.family &&
    receipt.snapshotId === request.snapshotId
  );
}

/** Checks every fixed structured-family transition field for exact equality. */
function hasBoundSnapshots(
  expected: VerifyRequest["release"]["manifest"]["snapshots"],
  actual: VerifySuccess["value"]["snapshots"]
) {
  return (["program", "quran", "tryout"] as const).every((family) => {
    const expectedState = expected[family];
    const actualState = actual[family];
    return (
      actualState.baseSnapshotId === expectedState.baseSnapshotId &&
      actualState.mode === expectedState.mode &&
      actualState.resultSnapshotId === expectedState.resultSnapshotId &&
      actualState.rowCount === expectedState.rowCount &&
      actualState.rowDigest === expectedState.rowDigest
    );
  });
}

type VerifyRequest = Extract<PublicationRequest, { operation: "verify" }>;
type VerifySuccess = Extract<PublicationSuccess, { operation: "verify" }>;
type ActivateRequest = Extract<PublicationRequest, { operation: "activate" }>;
type ActivateSuccess = Extract<PublicationSuccess, { operation: "activate" }>;
type RecoveryRequest = Extract<
  PublicationRequest,
  { operation: "activateRecovery" }
>;
type RecoverySuccess = Extract<
  PublicationSuccess,
  { operation: "activateRecovery" }
>;

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

/** Binds historical recovery evidence to the exact requested release pair. */
function hasBoundRecovery(
  request: Extract<PublicationRequest, { operation: "recovery" }>,
  response: Extract<PublicationSuccess, { operation: "recovery" }>
) {
  if (response.value.kind === "missing") {
    return true;
  }
  const { manifest } = response.value.value.release;
  return (
    manifest.releaseId === request.recoveryId &&
    manifest.origin.kind === "rollback" &&
    manifest.origin.releaseId === request.releaseId
  );
}

/** Binds one publication receipt to every signed manifest field it reports. */
function hasBoundManifestReceipt(
  request: ActivateRequest["release"] | RecoveryRequest["release"],
  receipt: ActivateSuccess["value"] | RecoverySuccess["value"]
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
    receipt.routeDigest === manifest.routeDigest &&
    receipt.stagedArtifacts === manifest.upsertCount &&
    receipt.stagedItems === manifest.itemCount &&
    receipt.stagedProjections === manifest.projectionCount &&
    receipt.stagedRoutes === manifest.routeCount &&
    receipt.stagedSnapshotRows === snapshotRowCount(manifest.snapshots) &&
    hasBoundSnapshots(manifest.snapshots, receipt.snapshots)
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

/** Binds acceptance evidence to the exact retained inverse identity. */
function hasBoundAccept(
  request: Extract<PublicationRequest, { operation: "accept" }>,
  response: Extract<PublicationSuccess, { operation: "accept" }>
) {
  return response.value.releaseId === request.recoveryId;
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

/** Binds one route page to the exact requested cursor and row ceiling. */
function hasBoundRoutePage(
  request: Extract<PublicationRequest, { operation: "routePage" }>,
  response: Extract<PublicationSuccess, { operation: "routePage" }>
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
    evidence.routeCount === manifest.routeCount &&
    evidence.routeDigest === manifest.routeDigest &&
    evidence.stagedRoutes === manifest.routeCount &&
    evidence.stagedSnapshotRows === snapshotRowCount(manifest.snapshots) &&
    hasBoundSnapshots(manifest.snapshots, evidence.snapshots) &&
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
      accept: (value) =>
        response.operation === "accept" && hasBoundAccept(value, response),
      activate: (value) =>
        response.operation === "activate" &&
        hasBoundManifestReceipt(value.release, response.value),
      activateRecovery: (value) =>
        response.operation === "activateRecovery" &&
        hasBoundManifestReceipt(value.release, response.value),
      cleanup: (value) =>
        response.operation === "cleanup" && hasBoundCleanup(value, response),
      current: () => response.operation === "current",
      headPage: (value) =>
        response.operation === "headPage" && hasBoundHeadPage(value, response),
      recovery: (value) =>
        response.operation === "recovery" && hasBoundRecovery(value, response),
      rollbackPage: (value) =>
        response.operation === "rollbackPage" &&
        hasBoundRollbackPage(value, response),
      routePage: (value) =>
        response.operation === "routePage" &&
        hasBoundRoutePage(value, response),
      stageArtifactBatch: (value) =>
        response.operation === "stageArtifactBatch" &&
        hasBoundBatchReceipt(value, response.value),
      stageItemBatch: (value) =>
        response.operation === "stageItemBatch" &&
        hasBoundBatchReceipt(value, response.value),
      stageProjectionBatch: (value) =>
        response.operation === "stageProjectionBatch" &&
        hasBoundBatchReceipt(value, response.value),
      stageRecovery: (value) =>
        response.operation === "stageRecovery" &&
        response.value.releaseId === value.release.manifest.releaseId &&
        response.value.manifestHash === value.release.manifestHash,
      stageRelease: (value) =>
        response.operation === "stageRelease" &&
        response.value.releaseId === value.release.manifest.releaseId &&
        response.value.manifestHash === value.release.manifestHash,
      stageRouteBatch: (value) =>
        response.operation === "stageRouteBatch" &&
        hasBoundBatchReceipt(value, response.value),
      stageSnapshot: (value) =>
        response.operation === "stageSnapshot" &&
        response.value.family === value.snapshot.family &&
        response.value.releaseId === value.releaseId &&
        response.value.snapshotId === value.snapshot.manifest.snapshotId,
      stageSnapshotBatch: (value) =>
        response.operation === "stageSnapshotBatch" &&
        hasBoundSnapshotBatchReceipt(value, response.value),
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
