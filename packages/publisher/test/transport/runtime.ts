import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import {
  SignedTryoutRuntimeBundleSchema,
  TRYOUT_RUNTIME_BUNDLE_FORMAT,
} from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Effect, Schema } from "effect";

/** Builds the signed-bundle-shaped fixture shared by publisher transport tests. */
export const makeTransportRuntimeBundle = Effect.fn(
  "PublisherTest.transportRuntimeBundle"
)(function* (input: {
  readonly artifactHash: string;
  readonly release: SignedContentRelease;
  readonly rendererManifest: RendererManifestEnvelope;
}) {
  const snapshot = yield* makeTryoutSnapshot({
    activeAppLocales: input.release.manifest.activeAppLocales,
    catalogDigest: Sha256HashSchema.make(input.artifactHash),
    counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
    placementCount: 1,
    placementDigest: Sha256HashSchema.make(input.artifactHash),
    routeCount: 5,
  });
  return yield* Schema.decodeEffect(SignedTryoutRuntimeBundleSchema)({
    bundleHash: `sha256:${"4".repeat(64)}`,
    keyId: input.release.keyId,
    payload: {
      format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
      rendererManifestHash: input.rendererManifest.hash,
      snapshot,
      sourceGitSha: "a".repeat(40),
      sourceManifestHash: input.release.manifestHash,
      sourceReleaseId: input.release.manifest.releaseId,
    },
    signature: input.release.signature,
  });
});
