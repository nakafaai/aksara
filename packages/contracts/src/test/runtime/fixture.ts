import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { Effect, Exit, Schema } from "effect";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  type ContentKey,
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  type Sha256Hash,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { canonicalizeContentReleaseSigningInput } from "#contracts/release/signing";
import { replaceContentSnapshot } from "#contracts/release/snapshot/spec";
import { SignedContentReleaseSchema } from "#contracts/release/spec";
import { createRendererManifest } from "#contracts/renderer/manifest";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { testRendererDomains } from "#contracts/test/renderer";
import {
  hash,
  artifact as unsignedArtifact,
  release as unsignedRelease,
} from "#contracts/test/request";
import { canonicalizeTryoutRuntimeBundleSigningInput } from "#contracts/tryout/runtime/canonical";
import { hashTryoutRuntimeBundlePayload } from "#contracts/tryout/runtime/hash";
import {
  SignedTryoutRuntimeBundleSchema,
  TRYOUT_RUNTIME_BUNDLE_FORMAT,
} from "#contracts/tryout/runtime/spec";
import { makeTryoutSnapshot } from "#contracts/tryout/snapshot/hash";

const keyId = SigningKeyIdSchema.make("test-runtime-key");
const signingKeys = generateKeyPairSync("ed25519");
const publicKeyPem = signingKeys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();

/** Hashes one canonical runtime fixture value with the production algorithm. */
function hashRuntimeValue(value: string) {
  const digest = createHash("sha256").update(value).digest("hex");
  return Sha256HashSchema.make(`sha256:${digest}`);
}

/** Signs one canonical runtime fixture value with the fixture identity. */
function signRuntimeValue(value: string) {
  const payload = Buffer.from(value, "utf8");
  const signature = signBytes(null, payload, signingKeys.privateKey);
  return Ed25519SignatureSchema.make(signature.toString("base64url"));
}

/** Produces one canonical, signed runtime artifact for one exact content key. */
export function createSignedArtifact(
  contentKey: ContentKey,
  requiredComponents: CompiledContentPayload["requiredComponents"] = [
    { name: "BlockMath", version: 1 },
  ]
) {
  const payload = CompiledContentPayloadSchema.make({
    ...unsignedArtifact.payload,
    contentKey,
    requiredComponents,
    sourceHash: hashRuntimeValue(unsignedArtifact.payload.rawMdx),
  });
  const artifactHash = hashRuntimeValue(
    canonicalizeCompiledContentPayload(payload)
  );
  const signature = signRuntimeValue(
    canonicalizeContentArtifactSigningInput(artifactHash, payload)
  );
  return SignedContentArtifactSchema.make({
    artifactHash,
    keyId,
    payload,
    signature,
  });
}

export const protectedSnapshot = makeTryoutSnapshot({
  activeAppLocales: unsignedRelease.manifest.activeAppLocales,
  catalogDigest: hashRuntimeValue("protected-catalog"),
  counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
  placementCount: 1,
  placementDigest: hashRuntimeValue("protected-placement"),
  routeCount: 5,
});
export const protectedSnapshotId = protectedSnapshot.snapshotId;
/** Signs one runtime release against its exact frozen renderer manifest. */
export async function createSignedRuntimeRelease(
  rendererManifestHash: Sha256Hash
) {
  const manifest = {
    ...unsignedRelease.manifest,
    rendererManifestHash,
    scope: {
      ...unsignedRelease.manifest.scope,
      snapshots: ["program", "tryout"],
    },
    snapshots: {
      ...unsignedRelease.manifest.snapshots,
      tryout: replaceContentSnapshot({
        baseSnapshotId: null,
        resultSnapshotId: protectedSnapshotId,
        rowCount: 1,
        rowDigest: hash,
      }),
    },
  } as const;
  const manifestHash = await Effect.runPromise(
    hashContentReleaseManifest(manifest)
  );
  return SignedContentReleaseSchema.make({
    keyId,
    manifest,
    manifestHash,
    signature: signRuntimeValue(
      canonicalizeContentReleaseSigningInput(manifestHash, manifest)
    ),
  });
}

export const release = await createSignedRuntimeRelease(
  unsignedRelease.manifest.rendererManifestHash
);

const runtimeBundlePayload = {
  format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
  rendererManifestHash: unsignedRelease.manifest.rendererManifestHash,
  snapshot: protectedSnapshot,
  sourceGitSha: GitCommitShaSchema.make("a".repeat(40)),
  sourceManifestHash: release.manifestHash,
  sourceReleaseId: release.manifest.releaseId,
} as const;
const runtimeBundleHash = await Effect.runPromise(
  hashTryoutRuntimeBundlePayload(runtimeBundlePayload)
);
export const runtimeBundle = SignedTryoutRuntimeBundleSchema.make({
  bundleHash: runtimeBundleHash,
  keyId,
  payload: runtimeBundlePayload,
  signature: signRuntimeValue(
    canonicalizeTryoutRuntimeBundleSigningInput(
      runtimeBundleHash,
      runtimeBundlePayload
    )
  ),
});

export const trustedResolver = ContentVerificationKeyResolver.of({
  /** Resolves only the runtime fixture's exact signing key. */
  resolve: (requestedKeyId) =>
    requestedKeyId === keyId
      ? Effect.succeed(publicKeyPem)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});

export const incompatibleManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "InlineMath", version: 1 }],
      supportedComponents: [{ name: "InlineMath", version: 1 }],
    },
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
  })
);

const compatibleComponents = [
  { name: "BlockMath", version: 1 },
  { name: "InlineMath", version: 1 },
] as const;
export const compatibleManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: compatibleComponents,
      supportedComponents: compatibleComponents,
    },
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
  })
);

/** Alters one valid signature while preserving its exact wire shape. */
export function tamperSignature(signature: string) {
  const first = signature.startsWith("A") ? "B" : "A";
  return `${first}${signature.slice(1)}`;
}

/** Strictly tests one runtime contract without allowing extra properties. */
export function accepts(
  schema: Schema.ConstraintDecoder<unknown>,
  input: unknown
) {
  return Exit.isSuccess(
    Schema.decodeUnknownExit(schema)(input, { onExcessProperty: "error" })
  );
}
