import type { ActiveContentRelease } from "#contracts/release/current/evidence";
import type { SignedTryoutRuntimeBundle } from "#contracts/tryout/runtime/spec";

/** Checks exact equivalence between active state and its permanent runtime pair. */
export function hasCurrentTryoutRuntimeBundle(
  active: ActiveContentRelease | null,
  bundle: SignedTryoutRuntimeBundle | null
) {
  if (bundle === null) {
    return true;
  }
  return (
    active !== null &&
    active.release.manifest.snapshots.tryout.resultSnapshotId ===
      bundle.payload.snapshot.snapshotId &&
    active.rendererManifest.hash === bundle.payload.rendererManifestHash
  );
}
