import type { ReleaseVerificationEvidence } from "@nakafa/aksara-contracts/release";
import {
  ContentSnapshotKindSchema,
  snapshotRowCount,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import type { PublicationSuccess } from "@nakafa/aksara-contracts/transport/response";

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

/** Checks every fixed structured-family transition field for exact equality. */
function hasBoundSnapshots(
  expected: VerifyRequest["release"]["manifest"]["snapshots"],
  actual: ReleaseVerificationEvidence["snapshots"]
) {
  return ContentSnapshotKindSchema.literals.every((family) => {
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

/** Binds one publication receipt to every signed manifest field it reports. */
export function hasBoundManifestReceipt(
  request: ActivateRequest["release"] | RecoveryRequest["release"],
  receipt: ActivateSuccess["value"] | RecoverySuccess["value"]
) {
  const { manifest } = request;
  return (
    receipt.releaseId === manifest.releaseId &&
    receipt.manifestHash === request.manifestHash &&
    receipt.activeAppLocales.join(",") ===
      manifest.activeAppLocales.join(",") &&
    receipt.activatedHeads === manifest.upsertCount &&
    receipt.deletedHeads === manifest.deleteCount &&
    receipt.editorialReviewDigest === manifest.editorialReviewDigest &&
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

/** Binds durable verification progress to one exact signed manifest. */
export function hasBoundVerification(
  request: VerifyRequest,
  response: VerifySuccess
) {
  const { manifest, manifestHash } = request.release;
  const verification = response.value;
  if (verification.phase === "verifying") {
    return (
      verification.releaseId === manifest.releaseId &&
      verification.manifestHash === manifestHash
    );
  }
  const { evidence } = verification;
  return (
    evidence.releaseId === manifest.releaseId &&
    evidence.manifestHash === manifestHash &&
    evidence.activeAppLocales.join(",") ===
      manifest.activeAppLocales.join(",") &&
    evidence.baseActiveAppLocales?.join(",") ===
      manifest.baseActiveAppLocales?.join(",") &&
    evidence.baseEditorialReviewDigest === manifest.baseEditorialReviewDigest &&
    evidence.baseManifestHash === manifest.baseManifestHash &&
    evidence.baseReleaseId === manifest.baseReleaseId &&
    evidence.baseResultCount === manifest.baseResultCount &&
    evidence.baseResultDigest === manifest.baseResultDigest &&
    evidence.deleteHeads === manifest.deleteCount &&
    evidence.editorialReviewDigest === manifest.editorialReviewDigest &&
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
    evidence.stagedArtifacts === manifest.upsertCount &&
    evidence.stagedSnapshotRows === snapshotRowCount(manifest.snapshots) &&
    evidence.upsertHeads === manifest.upsertCount &&
    hasBoundSnapshots(manifest.snapshots, evidence.snapshots) &&
    evidence.rendererManifestHash === manifest.rendererManifestHash
  );
}
