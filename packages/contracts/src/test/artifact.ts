import { Effect, Schema } from "effect";
import { Base64Url } from "effect/encoding";
import { hashCompiledContentPayload } from "#contracts/artifact/integrity";
import {
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { SigningKeyIdSchema } from "#contracts/ids";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { importEd25519PublicKeyPem } from "#contracts/test/signature";

/** Test-only Ed25519 key identity that signed the pinned artifact below. */
const pinnedKeyId = SigningKeyIdSchema.make("test-signing-key");

/** Public SPKI of the test-only key that signed the pinned artifact below. */
export const pinnedPublicKey =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAH+8DYjgopYDVszJy8jkcSsqHPcK6i4SmzKm00rvINfA=\n-----END PUBLIC KEY-----\n";

/** Decodes the recorded signed artifact through the wire contract it must satisfy. */
const decodePinnedArtifact = Schema.decodeUnknownSync(
  Schema.fromJsonString(SignedContentArtifactSchema)
);

export const pinnedArtifact = decodePinnedArtifact(
  // Record again: create a key, sign the same input, and replace the public key and signature literals.
  '{"artifactHash":"sha256:508ce1909ea0a77762e5505df173961744ab0e75b642a8c0fbc69919f7d29c8a","keyId":"test-signing-key","payload":{"artifactLocale":"id","compilerConfigHash":"sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","compilerVersion":"0.2.0","contentKey":"articles/science/cell-biology","contentTree":{"$node":"element","name":"fragment","props":{},"children":[{"$node":"element","name":"InlineMath","props":{"math":"x","title":"Pecahan Ñandú café 😀"},"children":[]}]},"format":"content-tree","mdxCompilerVersion":"3.1.1","plainText":"Pecahan Ñandú café 😀","rawMdx":"## Pecahan Ñandú café 😀","rendererDomain":"mathematics","requiredComponents":["BlockMath","FunctionMachine","InlineMath"],"sourceHash":"sha256:2080c334ac43a3b624b19f1674bf757593da7213edb4900b9a689dfcddb8b115"},"signature":"sSkHAOPFiJbQUU85GBv2KNBCfG1X3tGY_WUEdEqLHMzN2atoANRMU5ebcCH524y4oTTintdhVP82fxBR1ZkZBg"}'
);

/** Decodes the recorded renderer manifest through its envelope contract. */
const decodePinnedManifest = Schema.decodeUnknownSync(
  Schema.fromJsonString(RendererManifestEnvelopeSchema)
);

export const pinnedManifest = decodePinnedManifest(
  '{"base": ["BlockMath", "InlineMath"], "domains": [{"components": [], "name": "ai-ds"}, {"components": [], "name": "biology"}, {"components": [], "name": "chemistry"}, {"components": ["FunctionMachine"], "name": "mathematics"}, {"components": [], "name": "physics"}, {"components": [], "name": "politics"}, {"components": [], "name": "site"}, {"components": [], "name": "snbt-general"}, {"components": [], "name": "snbt-math"}, {"components": [], "name": "snbt-plain"}, {"components": [], "name": "snbt-quant"}, {"components": [], "name": "tka-math"}], "format": "nakafa-mdx-renderer", "hash": "sha256:7e0a422cba5f309bf9d484b44cc1d4633b1704c9813d66b08ba6c5b0460797a6", "publishedDomains": ["mathematics"]}'
);

export const pinnedResolver = ContentVerificationKeyResolver.of({
  /** Resolves only the recorded public key for the pinned artifact. */
  resolve: (requestedKeyId) =>
    requestedKeyId === pinnedKeyId
      ? Effect.succeed(pinnedPublicKey)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});

/** Verifies the pinned signature over its exact canonical bytes, then over the same bytes with one changed byte. */
export const verifyPinnedSignature = Effect.fn(
  "AksaraContracts.test.verifyPinnedSignature"
)(function* () {
  const payload = yield* Schema.decodeEffect(CompiledContentPayloadSchema)(
    pinnedArtifact.payload
  );
  const input = canonicalizeContentArtifactSigningInput(
    yield* hashCompiledContentPayload(payload),
    payload
  );
  const publicKey = yield* importEd25519PublicKeyPem(pinnedPublicKey);
  const signature = yield* Effect.fromResult(
    Base64Url.decode(pinnedArtifact.signature)
  );
  return yield* Effect.forEach(
    [input, input.replace("aksara", "aksarb")],
    (text) =>
      Effect.promise(() =>
        crypto.subtle.verify(
          "Ed25519",
          publicKey,
          new Uint8Array(signature),
          new TextEncoder().encode(text)
        )
      )
  );
});
