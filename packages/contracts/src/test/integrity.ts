import { Effect, Schema } from "effect";
import { hashCompiledContentPayload } from "#contracts/artifact/integrity";
import {
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
const payload = Schema.decodeSync(CompiledContentPayloadSchema)({
  artifactLocale: "en",
  byteLength: 10,
  compiledCode: "return {};",
  compilerConfigHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  compilerVersion: "0.1.0",
  contentKey: "test:integrity",
  format: "mdx-function-body",
  mdxCompilerVersion: "3.1.1",
  plainText: "Integrity",
  rawMdx,
  rendererDomain: "mathematics",
  requiredComponents: ["FutureRendererOnly"],
  sourceHash: await Effect.runPromise(hashText(rawMdx)),
});
const artifactHash = await Effect.runPromise(
  hashCompiledContentPayload(payload)
);

/** One signed artifact whose signature verifies under {@link integrityPublicKeyPem}. */
export const integrityArtifact = SignedContentArtifactSchema.make({
  artifactHash,
  keyId: integrityKeyId,
  payload,
  signature: await Effect.runPromise(
    signEd25519Message(
      signingKeys.privateKeyPem,
      canonicalizeContentArtifactSigningInput(artifactHash, payload)
    )
  ),
});

/** Resolves only the signing key trusted by the integrity fixture. */
export const integrityResolver = ContentVerificationKeyResolver.of({
  resolve: (requestedKeyId) =>
    requestedKeyId === integrityKeyId
      ? Effect.succeed(integrityPublicKeyPem)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});
