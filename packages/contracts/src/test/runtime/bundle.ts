import { Schema } from "effect";
import type { SignedContentRelease } from "#contracts/release/spec";
import type { RendererManifestEnvelope } from "#contracts/renderer/contract";
import {
  SignedTryoutRuntimeBundleSchema,
  TRYOUT_RUNTIME_BUNDLE_FORMAT,
} from "#contracts/tryout/runtime/spec";
import { TryoutSnapshotSchema } from "#contracts/tryout/snapshot/spec";

/** Builds one schema-valid runtime bundle for transport-only contract fixtures. */
export function makeTestRuntimeBundle(input: {
  readonly release: SignedContentRelease;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly snapshot: unknown;
  readonly sourceGitSha: string;
}) {
  return Schema.decodeSync(SignedTryoutRuntimeBundleSchema)({
    bundleHash: `sha256:${"d".repeat(64)}`,
    keyId: input.release.keyId,
    payload: {
      format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
      rendererManifestHash: input.rendererManifest.hash,
      snapshot: Schema.decodeUnknownSync(TryoutSnapshotSchema)(input.snapshot),
      sourceGitSha: input.sourceGitSha,
      sourceManifestHash: input.release.manifestHash,
      sourceReleaseId: input.release.manifest.releaseId,
    },
    signature: input.release.signature,
  });
}
