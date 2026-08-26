import type { Sha256Hash } from "#contracts/ids";
import type { TryoutRuntimeBundlePayload } from "#contracts/tryout/runtime-bundle/spec";
import { TRYOUT_RUNTIME_BUNDLE_FORMAT } from "#contracts/tryout/runtime-bundle/spec";

/** Ed25519 domain separating runtime bundles from every other signed object. */
export const TRYOUT_RUNTIME_BUNDLE_SIGNATURE_DOMAIN =
  "nakafa.aksara.tryout-runtime-bundle";

/** Serializes one complete runtime payload with stable signed field order. */
export function canonicalizeTryoutRuntimeBundlePayload(
  payload: TryoutRuntimeBundlePayload
) {
  return JSON.stringify({
    format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
    rendererManifestHash: payload.rendererManifestHash,
    snapshot: {
      activeAppLocales: payload.snapshot.activeAppLocales,
      catalogDigest: payload.snapshot.catalogDigest,
      counts: {
        country: payload.snapshot.counts.country,
        exam: payload.snapshot.counts.exam,
        section: payload.snapshot.counts.section,
        set: payload.snapshot.counts.set,
        track: payload.snapshot.counts.track,
      },
      format: payload.snapshot.format,
      placementCount: payload.snapshot.placementCount,
      placementDigest: payload.snapshot.placementDigest,
      routeCount: payload.snapshot.routeCount,
      snapshotId: payload.snapshot.snapshotId,
    },
    sourceGitSha: payload.sourceGitSha,
    sourceManifestHash: payload.sourceManifestHash,
    sourceReleaseId: payload.sourceReleaseId,
  });
}

/** Returns domain-separated canonical bytes covered by bundle Ed25519. */
export function canonicalizeTryoutRuntimeBundleSigningInput(
  bundleHash: Sha256Hash,
  payload: TryoutRuntimeBundlePayload
) {
  return `${TRYOUT_RUNTIME_BUNDLE_SIGNATURE_DOMAIN}\n${bundleHash}\n${canonicalizeTryoutRuntimeBundlePayload(payload)}`;
}
