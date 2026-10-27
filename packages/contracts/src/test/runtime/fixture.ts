import { Effect, Exit, Schema } from "effect";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { hashText } from "#contracts/hash/text";
import {
  type ContentKey,
  type Sha256Hash,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { canonicalizeContentReleaseSigningInput } from "#contracts/release/signing";
import { SignedContentReleaseSchema } from "#contracts/release/spec";
import { createRendererManifest } from "#contracts/renderer/manifest";
import {
  generateEd25519KeyPem,
  signEd25519Message,
} from "#contracts/signature/key";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { testRendererDomains } from "#contracts/test/renderer";
import {
  artifact as unsignedArtifact,
  release as unsignedRelease,
} from "#contracts/test/request";

const keyId = SigningKeyIdSchema.make("test-runtime-key");
const signingKeys = await Effect.runPromise(generateEd25519KeyPem());
const { publicKeyPem } = signingKeys;

/** Signs one canonical runtime fixture value with the fixture identity. */
const signRuntimeValue = Effect.fn("AksaraContractsTest.signRuntimeValue")(
  function* (value: string) {
    return yield* signEd25519Message(signingKeys.privateKeyPem, value);
  }
);

/** Produces one canonical, signed runtime artifact for one exact content key. */
export const createSignedArtifact = Effect.fn(
  "AksaraContractsTest.createSignedArtifact"
)(function* (
  contentKey: ContentKey,
  requiredComponents: CompiledContentPayload["requiredComponents"] = [
    "BlockMath",
  ]
) {
  const payload = CompiledContentPayloadSchema.make({
    ...unsignedArtifact.payload,
    contentKey,
    requiredComponents,
    sourceHash: yield* hashText(unsignedArtifact.payload.rawMdx),
  });
  const artifactHash = yield* hashText(
    canonicalizeCompiledContentPayload(payload)
  );
  const signature = yield* signRuntimeValue(
    canonicalizeContentArtifactSigningInput(artifactHash, payload)
  );
  return SignedContentArtifactSchema.make({
    artifactHash,
    keyId,
    payload,
    signature,
  });
});

/** Signs one runtime release against its exact frozen renderer manifest. */
export const createSignedRuntimeRelease = Effect.fn(
  "AksaraContractsTest.createSignedRuntimeRelease"
)(function* (rendererManifestHash: Sha256Hash) {
  const manifest = { ...unsignedRelease.manifest, rendererManifestHash };
  const manifestHash = yield* hashContentReleaseManifest(manifest);
  return SignedContentReleaseSchema.make({
    keyId,
    manifest,
    manifestHash,
    signature: yield* signRuntimeValue(
      canonicalizeContentReleaseSigningInput(manifestHash, manifest)
    ),
  });
});

export const release = await Effect.runPromise(
  createSignedRuntimeRelease(unsignedRelease.manifest.rendererManifestHash)
);

export const trustedResolver = ContentVerificationKeyResolver.of({
  /** Resolves only the runtime fixture's exact signing key. */
  resolve: (requestedKeyId) =>
    requestedKeyId === keyId
      ? Effect.succeed(publicKeyPem)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});

export const incompatibleManifest = await Effect.runPromise(
  createRendererManifest({
    base: ["InlineMath"],
    domains: testRendererDomains({}),
    publishedDomains: ["mathematics"],
  })
);

const compatibleComponents = ["BlockMath", "InlineMath"] as const;
export const compatibleManifest = await Effect.runPromise(
  createRendererManifest({
    base: compatibleComponents,
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
