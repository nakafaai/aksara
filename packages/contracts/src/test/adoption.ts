import { createHash, generateKeyPairSync, sign } from "node:crypto";
import {
  canonicalizeCompiledContentPayload as canonicalizeRetainedCompiledContentPayload,
  canonicalizeContentArtifactSigningInput as canonicalizeRetainedContentArtifactSigningInput,
  CompiledContentPayloadSchema as RetainedCompiledContentPayloadSchema,
  SignedContentArtifactSchema as RetainedSignedContentArtifactSchema,
} from "@nakafa/aksara-retained/content";
import {
  ContentReleaseManifestSchema as RetainedContentReleaseManifestSchema,
  SignedContentReleaseSchema as RetainedSignedContentReleaseSchema,
} from "@nakafa/aksara-retained/release";
import { hashContentReleaseManifest as retainedReleaseHash } from "@nakafa/aksara-retained/release/hash";
import { canonicalizeContentReleaseSigningInput as retainedSigningInput } from "@nakafa/aksara-retained/release/signing";
import { createRendererManifest as createRetainedRenderer } from "@nakafa/aksara-retained/renderer/manifest";
import { Effect, Schema } from "effect";
import { hashCompiledContentPayload } from "#contracts/artifact/integrity";
import {
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  ContentKeySchema,
  Ed25519SignatureSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { canonicalizeContentReleaseSigningInput } from "#contracts/release/signing";
import { SignedContentReleaseSchema } from "#contracts/release/spec";
import { RENDERER_DOMAINS } from "#contracts/renderer/domain";
import { createRendererManifest } from "#contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import {
  artifact as unsignedArtifact,
  release as unsignedRelease,
} from "#contracts/test/request";

const keys = generateKeyPairSync("ed25519");
export const keyId = SigningKeyIdSchema.make("adoption-key");
export const trust = Effect.provideService(ContentVerificationKeyResolver, {
  resolve: () =>
    Effect.succeed(
      keys.publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});
/** Signs fixture bytes through the actual Ed25519 boundary. */
export function signature(value: string) {
  return Ed25519SignatureSchema.make(
    sign(null, new TextEncoder().encode(value), keys.privateKey).toString(
      "base64url"
    )
  );
}
/** Builds an authentic retained artifact, including its original version field. */
export function retainedArtifact(
  version = 1,
  contentKey = ContentKeySchema.make("test:adoption")
) {
  const payload = RetainedCompiledContentPayloadSchema.make({
    ...unsignedArtifact.payload,
    contentKey,
    requiredComponents: [{ name: "BlockMath", version }],
    sourceHash: hashCompiledContentPayload(unsignedArtifact.payload),
  });
  const corrected = RetainedCompiledContentPayloadSchema.make({
    ...payload,
    sourceHash: Schema.decodeSync(
      RetainedCompiledContentPayloadSchema.fields.sourceHash
    )(`sha256:${createHash("sha256").update(payload.rawMdx).digest("hex")}`),
  });
  const artifactHash = Schema.decodeSync(
    RetainedSignedContentArtifactSchema.fields.artifactHash
  )(
    `sha256:${createHash("sha256").update(canonicalizeRetainedCompiledContentPayload(corrected)).digest("hex")}`
  );
  return RetainedSignedContentArtifactSchema.make({
    artifactHash,
    keyId,
    payload: corrected,
    signature: signature(
      canonicalizeRetainedContentArtifactSigningInput(artifactHash, corrected)
    ),
  });
}
export const oldArtifact = retainedArtifact();
const payload = { ...oldArtifact.payload, requiredComponents: ["BlockMath"] };
const artifactHash = hashCompiledContentPayload(payload);
export const artifact = SignedContentArtifactSchema.make({
  artifactHash,
  keyId,
  payload,
  signature: signature(
    canonicalizeContentArtifactSigningInput(artifactHash, payload)
  ),
});
export const live = await Effect.runPromise(
  createRendererManifest({
    base: ["BlockMath"],
    domains: RENDERER_DOMAINS.map((name) => ({ components: [], name })),
    publishedDomains: ["mathematics"],
  })
);
export const oldRenderer = await Effect.runPromise(
  createRetainedRenderer({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: RENDERER_DOMAINS.map((name) => ({
      authoringComponents: [],
      name,
      supportedComponents: [],
    })),
    publishedDomains: ["mathematics"],
  })
);
const oldManifest = RetainedContentReleaseManifestSchema.make({
  ...unsignedRelease.manifest,
  rendererContractVersion: "1.0.0",
  rendererManifestHash: oldRenderer.hash,
});
const oldManifestHash = await Effect.runPromise(
  retainedReleaseHash(oldManifest)
);
export const oldRelease = RetainedSignedContentReleaseSchema.make({
  keyId,
  manifest: oldManifest,
  manifestHash: oldManifestHash,
  signature: signature(retainedSigningInput(oldManifestHash, oldManifest)),
});
export const newManifest = {
  ...unsignedRelease.manifest,
  baseActiveAppLocales: oldManifest.activeAppLocales,
  baseManifestHash: oldManifestHash,
  baseReleaseId: oldManifest.releaseId,
  baseResultCount: oldManifest.resultCount,
  baseResultDigest: oldManifest.resultDigest,
  releaseId: Schema.decodeSync(
    SignedContentReleaseSchema.fields.manifest.fields.releaseId
  )("adoption-current"),
  rendererManifestHash: live.hash,
};
export const newHash = await Effect.runPromise(
  hashContentReleaseManifest(newManifest)
);
export const newRelease = SignedContentReleaseSchema.make({
  keyId,
  manifest: newManifest,
  manifestHash: newHash,
  signature: signature(
    canonicalizeContentReleaseSigningInput(newHash, newManifest)
  ),
});
