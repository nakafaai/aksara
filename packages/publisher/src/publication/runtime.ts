import type { GitCommitSha } from "@nakafa/aksara-contracts/ids";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { TRYOUT_RUNTIME_BUNDLE_FORMAT } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { verifySignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/verify";
import type { TryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import { Effect } from "effect";

import type { PublicationSigner } from "#publisher/signing/service";

/** Signs and verifies the permanent runtime pair for one replaced snapshot. */
export const preparePublicationRuntime = Effect.fn(
  "AksaraPublisher.preparePublicationRuntime"
)(function* (input: {
  readonly release: SignedContentRelease;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly signer: PublicationSigner;
  readonly snapshot: TryoutSnapshot | null;
  readonly sourceGitSha: GitCommitSha;
}) {
  if (input.snapshot === null) {
    return null;
  }
  const bundle = yield* input.signer.signTryoutRuntimeBundle({
    format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
    rendererManifestHash: input.rendererManifest.hash,
    snapshot: input.snapshot,
    sourceGitSha: input.sourceGitSha,
    sourceManifestHash: input.release.manifestHash,
    sourceReleaseId: input.release.manifest.releaseId,
  });
  return yield* verifySignedTryoutRuntimeBundle({
    bundle,
    rendererManifest: input.rendererManifest,
  });
});
