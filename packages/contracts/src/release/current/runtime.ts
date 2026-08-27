import type { ActiveContentRelease } from "#contracts/release/current/evidence";
import type { SignedTryoutRuntimeBundle } from "#contracts/tryout/runtime/spec";

/** Accepts a legacy active runtime or its exact permanent replacement pair. */
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
  if (bundle === null) {
    return true;
  }
  return (
    snapshotId === bundle.payload.snapshot.snapshotId &&
    active.rendererManifest.hash === bundle.payload.rendererManifestHash
  );
}
