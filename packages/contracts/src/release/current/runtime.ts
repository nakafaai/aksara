import type { ActiveContentRelease } from "#contracts/release/current/evidence";
import type { SignedTryoutRuntimeBundle } from "#contracts/tryout/runtime/spec";

/** Checks exact equivalence between active state and its permanent runtime pair. */
export function hasCurrentTryoutRuntimeBundle(
  active: ActiveContentRelease | null,
  bundle: SignedTryoutRuntimeBundle | null
) {
  if (active === null) {
    return bundle === null;
  }
  const snapshotId = active.release.manifest.snapshots.tryout.resultSnapshotId;
  if (snapshotId === null || snapshotId === undefined) {
    return bundle === null;
  }
  return (
    bundle !== null &&
    snapshotId === bundle.payload.snapshot.snapshotId &&
    active.rendererManifest.hash === bundle.payload.rendererManifestHash
  );
}
