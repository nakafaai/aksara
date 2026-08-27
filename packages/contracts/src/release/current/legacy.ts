import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import type { ActiveContentRelease } from "#contracts/release/current/evidence";

/** Exact production runtime admitted only until its permanent refresh activates. */
export const LEGACY_TRYOUT_RUNTIME = {
  manifestHash: Sha256HashSchema.make(
    "sha256:4e5b5407f5fbcf9e0df618659970c710ba75db10a07af048df6e70d8b6b92d2f"
  ),
  releaseId: ReleaseIdSchema.make("quran-sources-345c5fe5"),
  rendererManifestHash: Sha256HashSchema.make(
    "sha256:d2bf505cd5dfa7a6bbaf053049d7347d456b9513bcaa85e1c05b157962633589"
  ),
  snapshotId: Sha256HashSchema.make(
    "sha256:a190bcb61dddbdafaf3c63507726d6822e18f5ac53e17734c03ed835156c6eaa"
  ),
} as const;

/** Matches only the read-only audited predecessor publication identity. */
export function isLegacyTryoutRuntime(active: ActiveContentRelease) {
  const {
    release: {
      manifest: { releaseId, snapshots },
      manifestHash,
    },
    rendererManifest,
  } = active;
  return (
    manifestHash === LEGACY_TRYOUT_RUNTIME.manifestHash &&
    releaseId === LEGACY_TRYOUT_RUNTIME.releaseId &&
    rendererManifest.hash === LEGACY_TRYOUT_RUNTIME.rendererManifestHash &&
    snapshots.tryout.resultSnapshotId === LEGACY_TRYOUT_RUNTIME.snapshotId
  );
}
