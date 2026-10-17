import { Effect, Schema } from "effect";
import { hashCompiledContentPayload } from "#contracts/artifact/integrity";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
  type SignedContentArtifact,
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

/** Heading of the compiled payload fixture that the verification suites sign. */
export const SIGNED_TEST_HEADING = "Protocol Test Heading";
/** Key identity of every artifact that this fixture signs. */
export const signedKeyId = SigningKeyIdSchema.make("test-signing-key");
const signingKeys = await Effect.runPromise(generateEd25519KeyPem());
/** SPKI public key that verifies every artifact that this fixture signs. */
export const trustedPublicKey = signingKeys.publicKeyPem;

/** The compiled payload that the verification suites sign and then alter. */
export const basePayload = Schema.decodeSync(CompiledContentPayloadSchema)({
  artifactLocale: "en",
  byteLength: 10,
  compiledCode: "return {};",
  compilerConfigHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  compilerVersion: "0.1.0",
  contentKey: "test:content",
  format: "mdx-function-body",
  mdxCompilerVersion: "3.1.1",
  plainText: SIGNED_TEST_HEADING,
  rawMdx: `## ${SIGNED_TEST_HEADING}`,
  rendererDomain: "mathematics",
  requiredComponents: ["BlockMath"],
  sourceHash: await Effect.runPromise(hashText(`## ${SIGNED_TEST_HEADING}`)),
});

/** Applies valid overrides to the shared compiled payload fixture. */
export function makePayload(values: Partial<CompiledContentPayload>) {
  return CompiledContentPayloadSchema.make({ ...basePayload, ...values });
}

/** Produces a valid signed artifact for verification scenarios. */
export const signArtifact = Effect.fn("AksaraContracts.test.signArtifact")(
  function* (payload = basePayload, artifactKeyId = signedKeyId) {
    const artifactHash = yield* hashCompiledContentPayload(payload);
    const signature = yield* signEd25519Message(
      signingKeys.privateKeyPem,
      canonicalizeContentArtifactSigningInput(artifactHash, payload)
    );
    return SignedContentArtifactSchema.make({
      artifactHash,
      keyId: artifactKeyId,
      payload,
      signature,
    });
  }
);

/** Changes one signature character without changing its wire shape. */
export function tamperSignature(artifact: SignedContentArtifact) {
  const replacement = artifact.signature.startsWith("A") ? "B" : "A";
  return `${replacement}${artifact.signature.slice(1)}`;
}

/** Resolves the trusted test key or fails with the production error shape. */
export const trustedResolver = ContentVerificationKeyResolver.of({
  resolve: (requestedKeyId) => {
    if (requestedKeyId === signedKeyId) {
      return Effect.succeed(trustedPublicKey);
    }
    return Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId }));
  },
});

export const missingComponentPayload = makePayload({
  requiredComponents: ["Mermaid"],
});
export const mathematicsPayload = makePayload({
  requiredComponents: ["FunctionMachine"],
});
export const chemistryPayload = makePayload({
  rendererDomain: "chemistry",
  requiredComponents: ["FunctionMachine"],
});

export const validArtifact = await Effect.runPromise(signArtifact());
export const missingComponentArtifact = await Effect.runPromise(
  signArtifact(missingComponentPayload)
);
export const mathematicsArtifact = await Effect.runPromise(
  signArtifact(mathematicsPayload)
);
export const chemistryArtifact = await Effect.runPromise(
  signArtifact(chemistryPayload)
);
export const tamperedArtifact = {
  ...validArtifact,
  signature: tamperSignature(validArtifact),
};
