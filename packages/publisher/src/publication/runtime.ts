import type { GitCommitSha } from "@nakafa/aksara-contracts/ids";
import type { SignedContentRelease } from "@nakafa/aksara-contracts/release";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { verifyTryoutRuntimeBundleSource } from "@nakafa/aksara-contracts/tryout/runtime/source";
import { TRYOUT_RUNTIME_BUNDLE_FORMAT } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { verifySignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/verify";
import { Effect } from "effect";

import type { PreparedTryoutRuntimeTransition } from "#publisher/preparation/prepared";
import type { PublicationSigner } from "#publisher/signing/service";

/** Signs and verifies every runtime pair authenticated by one Git release. */
export const preparePublicationRuntimes = Effect.fn(
  "AksaraPublisher.preparePublicationRuntimes"
)(function* (input: {
  readonly release: SignedContentRelease;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly runtime: PreparedTryoutRuntimeTransition | null;
  readonly signer: PublicationSigner;
  readonly sourceGitSha: GitCommitSha;
}) {
  if (input.runtime === null) {
    return [];
  }
  const snapshots = [
    input.runtime.result,
    ...(input.runtime.recovery === null ? [] : [input.runtime.recovery]),
  ];
  return yield* Effect.forEach(snapshots, (snapshot) =>
    input.signer
      .signTryoutRuntimeBundle({
        format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
        rendererManifestHash: input.rendererManifest.hash,
        snapshot,
        sourceGitSha: input.sourceGitSha,
        sourceManifestHash: input.release.manifestHash,
        sourceReleaseId: input.release.manifest.releaseId,
      })
      .pipe(
        Effect.flatMap((bundle) =>
          verifySignedTryoutRuntimeBundle({
            bundle,
            rendererManifest: input.rendererManifest,
          })
        ),
        Effect.flatMap((bundle) =>
          verifyTryoutRuntimeBundleSource({ bundle, release: input.release })
        )
      )
  );
});
