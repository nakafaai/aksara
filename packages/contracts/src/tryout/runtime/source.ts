import { Effect, Schema } from "effect";
import type { SignedContentRelease } from "#contracts/release/spec";
import type { SignedTryoutRuntimeBundle } from "#contracts/tryout/runtime/spec";

/** A runtime bundle does not describe a pair authenticated by its Git release. */
export class TryoutRuntimeBundleSourceError extends Schema.TaggedError<TryoutRuntimeBundleSourceError>()(
  "TryoutRuntimeBundleSourceError",
  {
    reason: Schema.Literals([
      "release",
      "manifest",
      "revision",
      "renderer",
      "snapshot",
    ]),
  }
) {}

/** Authenticates a runtime pair against its Git source or signed recovery link. */
export const verifyTryoutRuntimeBundleSource = Effect.fn(
  "AksaraContracts.verifyTryoutRuntimeBundleSource"
)(function* (input: {
  readonly bundle: SignedTryoutRuntimeBundle;
  readonly release: SignedContentRelease;
}) {
  const { bundle, release } = input;
  const { manifest } = release;
  const sourceReleaseId =
    manifest.origin.kind === "git"
      ? manifest.releaseId
      : manifest.origin.releaseId;
  if (sourceReleaseId !== bundle.payload.sourceReleaseId) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "release" });
  }
  const sourceManifestHash =
    manifest.origin.kind === "git"
      ? release.manifestHash
      : manifest.baseManifestHash;
  if (sourceManifestHash !== bundle.payload.sourceManifestHash) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "manifest" });
  }
  if (
    manifest.origin.kind === "git" &&
    manifest.origin.sha !== bundle.payload.sourceGitSha
  ) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "revision" });
  }
  if (manifest.rendererManifestHash !== bundle.payload.rendererManifestHash) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "renderer" });
  }
  const { snapshotId } = bundle.payload.snapshot;
  const transition = manifest.snapshots.tryout;
  const isResult = snapshotId === transition.resultSnapshotId;
  const isRetainedBase =
    manifest.origin.kind === "git" &&
    transition.mode === "replace" &&
    transition.baseSnapshotId !== null &&
    snapshotId === transition.baseSnapshotId;
  if (!(isResult || isRetainedBase)) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "snapshot" });
  }
  return bundle;
});
