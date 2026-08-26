import { Effect, Schema } from "effect";
import type { SignedContentRelease } from "#contracts/release/spec";
import type { SignedTryoutRuntimeBundle } from "#contracts/tryout/runtime/spec";

/** A runtime bundle does not describe a pair authenticated by its Git release. */
export class TryoutRuntimeBundleSourceError extends Schema.TaggedError<TryoutRuntimeBundleSourceError>()(
  "TryoutRuntimeBundleSourceError",
  {
    reason: Schema.Literals([
      "origin",
      "release",
      "manifest",
      "revision",
      "renderer",
      "snapshot",
    ]),
  }
) {}

/** Authenticates a result or retained-base runtime pair against one Git release. */
export const verifyTryoutRuntimeBundleSource = Effect.fn(
  "AksaraContracts.verifyTryoutRuntimeBundleSource"
)(function* (input: {
  readonly bundle: SignedTryoutRuntimeBundle;
  readonly release: SignedContentRelease;
}) {
  const { bundle, release } = input;
  const { manifest } = release;
  if (manifest.origin.kind !== "git") {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "origin" });
  }
  if (manifest.releaseId !== bundle.payload.sourceReleaseId) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "release" });
  }
  if (release.manifestHash !== bundle.payload.sourceManifestHash) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "manifest" });
  }
  if (manifest.origin.sha !== bundle.payload.sourceGitSha) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "revision" });
  }
  if (manifest.rendererManifestHash !== bundle.payload.rendererManifestHash) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "renderer" });
  }
  const { snapshotId } = bundle.payload.snapshot;
  const transition = manifest.snapshots.tryout;
  const isResult = snapshotId === transition.resultSnapshotId;
  const isRetainedBase =
    transition.mode === "replace" &&
    transition.baseSnapshotId !== null &&
    snapshotId === transition.baseSnapshotId;
  if (!(isResult || isRetainedBase)) {
    return yield* new TryoutRuntimeBundleSourceError({ reason: "snapshot" });
  }
  return bundle;
});
