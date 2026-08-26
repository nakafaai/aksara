import { Schema } from "effect";

import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { TryoutSnapshotSchema } from "#contracts/tryout/snapshot/spec";

/** Stable wire format for a permanent signed try-out runtime bundle. */
export const TRYOUT_RUNTIME_BUNDLE_FORMAT = "signed-tryout-runtime-bundle";

/** Source and runtime facts authenticated independently from a global release. */
export const TryoutRuntimeBundlePayloadSchema = Schema.Struct({
  format: Schema.Literal(TRYOUT_RUNTIME_BUNDLE_FORMAT),
  rendererManifestHash: Sha256HashSchema,
  snapshot: TryoutSnapshotSchema,
  sourceGitSha: GitCommitShaSchema,
  sourceManifestHash: Sha256HashSchema,
  sourceReleaseId: ReleaseIdSchema,
});
export type TryoutRuntimeBundlePayload =
  typeof TryoutRuntimeBundlePayloadSchema.Type;

/** Immutable bundle identity plus its Ed25519 authenticity proof. */
export const SignedTryoutRuntimeBundleSchema = Schema.Struct({
  bundleHash: Sha256HashSchema,
  keyId: SigningKeyIdSchema,
  payload: TryoutRuntimeBundlePayloadSchema,
  signature: Ed25519SignatureSchema,
});
export type SignedTryoutRuntimeBundle =
  typeof SignedTryoutRuntimeBundleSchema.Type;
