import { Effect, Schema } from "effect";
import { hashCompiledContentPayload } from "#contracts/artifact/integrity";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { hashText } from "#contracts/hash/text";
import { Sha256HashSchema, SigningKeyIdSchema } from "#contracts/ids";
import {
  generateEd25519KeyPem,
  signEd25519Message,
} from "#contracts/signature/key";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";

/** Key identity of the signed artifact fixture below. */
export const integrityKeyId = SigningKeyIdSchema.make("artifact-integrity-key");
const signingKeys = await Effect.runPromise(generateEd25519KeyPem());
/** SPKI public key that verifies the signed artifact fixture below. */
export const integrityPublicKeyPem = signingKeys.publicKeyPem;
const rawMdx = "## Integrity";
/** Payload of the signed artifact fixture below. */
export const integrityPayload = Schema.decodeSync(CompiledContentPayloadSchema)(
  {
    artifactLocale: "en",
    compilerConfigHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
    compilerVersion: "0.2.0",
    contentKey: "test:integrity",
    contentTree: {
      $node: "element",
      children: [],
      name: "fragment",
      props: {},
    },
    format: "content-tree",
    mdxCompilerVersion: "3.1.1",
    plainText: "Integrity",
    rawMdx,
    rendererDomain: "mathematics",
    requiredComponents: ["FutureRendererOnly"],
    sourceHash: await Effect.runPromise(hashText(rawMdx)),
  }
);
const artifactHash = await Effect.runPromise(
  hashCompiledContentPayload(integrityPayload)
);

/** One signed artifact whose signature verifies under {@link integrityPublicKeyPem}. */
export const integrityArtifact = SignedContentArtifactSchema.make({
  artifactHash,
  keyId: integrityKeyId,
  payload: integrityPayload,
  signature: await Effect.runPromise(
    signEd25519Message(
      signingKeys.privateKeyPem,
      canonicalizeContentArtifactSigningInput(artifactHash, integrityPayload)
    )
  ),
});

/** Signs one payload with the fixture key, so a test can author an artifact the verifier must judge. */
export function signIntegrityPayload(payload: CompiledContentPayload) {
  return Effect.gen(function* () {
    const hash = yield* hashCompiledContentPayload(payload);
    return SignedContentArtifactSchema.make({
      artifactHash: hash,
      keyId: integrityKeyId,
      payload,
      signature: yield* signEd25519Message(
        signingKeys.privateKeyPem,
        canonicalizeContentArtifactSigningInput(hash, payload)
      ),
    });
  });
}

/** Resolves only the signing key trusted by the integrity fixture. */
export const integrityResolver = ContentVerificationKeyResolver.of({
  resolve: (requestedKeyId) =>
    requestedKeyId === integrityKeyId
      ? Effect.succeed(integrityPublicKeyPem)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});
