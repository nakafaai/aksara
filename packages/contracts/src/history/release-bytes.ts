import type { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import type { HistoricalContentReleaseManifest } from "#contracts/history/release";

/** Copies one historical scope into its exact signed field order. */
function canonicalizeHistoricalScope(
  scope: HistoricalContentReleaseManifest["scope"]
) {
  return {
    content: scope.content.map(({ contentKey, family, locale }) => ({
      contentKey,
      family,
      locale,
    })),
    families: [...scope.families],
    snapshots: [...scope.snapshots],
  };
}

/** Copies one historical origin into its exact signed field order. */
function canonicalizeHistoricalOrigin(
  origin: HistoricalContentReleaseManifest["origin"]
) {
  if (origin.kind === "git") {
    return { kind: origin.kind, sha: origin.sha };
  }
  return { kind: origin.kind, releaseId: origin.releaseId };
}

/** Copies one immutable old snapshot transition into signed field order. */
function canonicalizeHistoricalSnapshotState(
  state: HistoricalContentReleaseManifest["snapshots"]["program"]
) {
  return {
    baseSnapshotId: state.baseSnapshotId,
    mode: state.mode,
    resultSnapshotId: state.resultSnapshotId,
    rowCount: state.rowCount,
    rowDigest: state.rowDigest,
  };
}

/** Copies all immutable old snapshot transitions into signed field order. */
function canonicalizeHistoricalSnapshotSet(
  snapshots: HistoricalContentReleaseManifest["snapshots"]
) {
  return {
    program: canonicalizeHistoricalSnapshotState(snapshots.program),
    quran: canonicalizeHistoricalSnapshotState(snapshots.quran),
    tryout: canonicalizeHistoricalSnapshotState(snapshots.tryout),
  };
}

/** Reconstructs the exact immutable bytes authenticated by a stored release. */
export function canonicalizeHistoricalContentReleaseManifest(
  manifest: HistoricalContentReleaseManifest
) {
  return JSON.stringify({
    baseManifestHash: manifest.baseManifestHash,
    baseReleaseId: manifest.baseReleaseId,
    baseResultCount: manifest.baseResultCount,
    baseResultDigest: manifest.baseResultDigest,
    deleteCount: manifest.deleteCount,
    itemCount: manifest.itemCount,
    itemsDigest: manifest.itemsDigest,
    origin: canonicalizeHistoricalOrigin(manifest.origin),
    projectionCount: manifest.projectionCount,
    projectionDigest: manifest.projectionDigest,
    releaseId: manifest.releaseId,
    rendererContractVersion: manifest.rendererContractVersion,
    rendererManifestHash: manifest.rendererManifestHash,
    resultCount: manifest.resultCount,
    resultDigest: manifest.resultDigest,
    rollbackCount: manifest.rollbackCount,
    rollbackDigest: manifest.rollbackDigest,
    routeCount: manifest.routeCount,
    routeDigest: manifest.routeDigest,
    scope: canonicalizeHistoricalScope(manifest.scope),
    snapshots: canonicalizeHistoricalSnapshotSet(manifest.snapshots),
    upsertCount: manifest.upsertCount,
  });
}

const HISTORICAL_RELEASE_SIGNATURE_DOMAIN = "nakafa.aksara.content-release.v1";

/** Reconstructs the domain-separated bytes authenticated by Ed25519. */
export function historicalReleaseSigningInput(
  manifestHash: typeof HistoricalSha256HashSchema.Type,
  manifest: HistoricalContentReleaseManifest
) {
  return `${HISTORICAL_RELEASE_SIGNATURE_DOMAIN}\n${manifestHash}\n${canonicalizeHistoricalContentReleaseManifest(manifest)}`;
}
