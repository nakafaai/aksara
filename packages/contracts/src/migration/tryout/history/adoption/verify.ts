import { Effect } from "effect";
import { decodeStoredRelease } from "#contracts/history/read";
import { validateHistoricalRendererManifestHash } from "#contracts/history/renderer";
import {
  type TryoutRuntimeAdoptionSource,
  TryoutRuntimeAdoptionSourceError,
} from "#contracts/migration/tryout/history/adoption/spec";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";

/** Authenticates one retained release, renderer, and current snapshot pair. */
export const verifyTryoutRuntimeAdoptionSource = Effect.fn(
  "AksaraContracts.verifyTryoutRuntimeAdoptionSource"
)(function* (source: TryoutRuntimeAdoptionSource) {
  const release = yield* decodeStoredRelease(source.release);
  const rendererManifest = yield* validateHistoricalRendererManifestHash(
    source.rendererManifest
  );
  const { manifest } = release;
  const transition = manifest.snapshots.tryout;
  const isResult = transition.resultSnapshotId === source.snapshot.snapshotId;
  const isRetainedBase =
    manifest.origin.kind === "git" &&
    transition.mode === "replace" &&
    transition.baseSnapshotId !== null &&
    transition.baseSnapshotId === source.snapshot.snapshotId;
  if (manifest.origin.kind !== "git" || !(isResult || isRetainedBase)) {
    return yield* new TryoutRuntimeAdoptionSourceError({
      reason: "release",
    });
  }
  if (manifest.rendererManifestHash !== rendererManifest.hash) {
    return yield* new TryoutRuntimeAdoptionSourceError({
      reason: "renderer",
    });
  }
  const actual = makeTryoutSnapshot(source.snapshot);
  if (actual.snapshotId !== source.snapshot.snapshotId) {
    return yield* new TryoutRuntimeAdoptionSourceError({
      reason: "snapshot",
    });
  }
  return source;
});
