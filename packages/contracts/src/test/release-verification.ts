import { Buffer } from "node:buffer";
import { generateKeyPairSync, sign as signBytes } from "node:crypto";

import { Effect, Schema } from "effect";

import {
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { canonicalizeContentReleaseSigningInput } from "#contracts/release/signing";
import { inheritContentSnapshots } from "#contracts/release/snapshot/spec";
import {
  CONTENT_RELEASE_FORMAT,
  type ContentReleaseManifest,
  ContentReleaseManifestSchema,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import { createRendererManifest } from "#contracts/renderer/manifest";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { testRendererDomains } from "#contracts/test/renderer";
import { release as transportRelease } from "#contracts/test/request";

const keys = generateKeyPairSync("ed25519");
const keyId = SigningKeyIdSchema.make("test-signing-key");

/** Parent release identity used by forward and rollback verification fixtures. */
export const verificationBaseReleaseId = ReleaseIdSchema.make(
  "test-release-parent"
);

const publicKeyPem = keys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();

/** Renderer manifest cryptographically bound to verification fixtures. */
export const verificationRendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
  })
);

/** Complete current release manifest used by authenticity tests. */
export const verificationManifest = Schema.decodeSync(
  ContentReleaseManifestSchema
)({
  activeAppLocales: ["en", "id"],
  baseActiveAppLocales: ["en", "id"],
  baseManifestHash: `sha256:${"d".repeat(64)}`,
  baseReleaseId: verificationBaseReleaseId,
  baseResultCount: 1,
  baseResultDigest: `sha256:${"e".repeat(64)}`,
  deleteCount: 1,
  format: CONTENT_RELEASE_FORMAT,
  itemCount: 2,
  itemsDigest: `sha256:${"b".repeat(64)}`,
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"c".repeat(64)}`,
  releaseId: "test-release",
  rendererContractVersion: "1.0.0",
  rendererManifestHash: verificationRendererManifest.hash,
  resultCount: 1,
  resultDigest: `sha256:${"f".repeat(64)}`,
  rollbackCount: 2,
  rollbackDigest: `sha256:${"1".repeat(64)}`,
  routeCount: 0,
  routeDigest: `sha256:${"1".repeat(64)}`,
  scope: transportRelease.manifest.scope,
  snapshots: inheritContentSnapshots(null),
  upsertCount: 1,
});

/** Produces a valid current signed release for verification scenarios. */
export function signVerificationRelease(
  value: ContentReleaseManifest = verificationManifest
): SignedContentRelease {
  const manifestHash = Effect.runSync(hashContentReleaseManifest(value));
  return SignedContentReleaseSchema.make({
    keyId,
    manifest: value,
    manifestHash,
    signature: Ed25519SignatureSchema.make(
      signBytes(
        null,
        Buffer.from(
          canonicalizeContentReleaseSigningInput(manifestHash, value),
          "utf8"
        ),
        keys.privateKey
      ).toString("base64url")
    ),
  });
}

/** Trusted resolver used by signed release verification tests. */
export const verificationKeyResolver = ContentVerificationKeyResolver.of({
  /** Resolves the one trusted fixture key through the production Interface. */
  resolve: (requestedKeyId) => {
    if (requestedKeyId === keyId) {
      return Effect.succeed(publicKeyPem);
    }
    return Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId }));
  },
});
