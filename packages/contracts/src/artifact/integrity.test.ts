// @vitest-environment node

import { Buffer } from "node:buffer";
import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  hashCompiledContentPayload,
  verifySignedContentArtifactIntegrity,
} from "#contracts/artifact/integrity";
import {
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "#contracts/content";
import {
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";

const keyId = SigningKeyIdSchema.make("artifact-integrity-key");
const signingKeys = generateKeyPairSync("ed25519");
const publicKey = signingKeys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();
const rawMdx = "## Integrity";
const payload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
  byteLength: 10,
  compiledCode: "return {};",
  compilerConfigHash: Sha256HashSchema.make(`sha256:${"b".repeat(64)}`),
  compilerVersion: "0.1.0",
  contentKey: "test:integrity",
  format: "mdx-function-body-v1",
  locale: "en",
  mdxCompilerVersion: "3.1.1",
  plainText: "Integrity",
  rawMdx,
  rendererDomain: "mathematics",
  requiredComponents: [{ name: "FutureRendererOnly", version: 1 }],
  sourceHash: Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`
  ),
});
const artifactHash = hashCompiledContentPayload(payload);
const artifact = SignedContentArtifactSchema.make({
  artifactHash,
  keyId,
  payload,
  signature: Ed25519SignatureSchema.make(
    sign(
      null,
      Buffer.from(
        canonicalizeContentArtifactSigningInput(artifactHash, payload),
        "utf8"
      ),
      signingKeys.privateKey
    ).toString("base64url")
  ),
});
const resolver = ContentVerificationKeyResolver.of({
  /** Resolves only the signing key trusted by this integrity fixture. */
  resolve: (requestedKeyId) =>
    requestedKeyId === keyId
      ? Effect.succeed(publicKey)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});

/** Runs exact artifact authentication with the trusted fixture resolver. */
function authenticate(input: unknown) {
  return Effect.runPromise(
    verifySignedContentArtifactIntegrity(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, resolver)
    )
  );
}

/** Returns the typed authentication failure for an invalid fixture. */
function reject(input: unknown) {
  return Effect.runPromise(
    verifySignedContentArtifactIntegrity(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, resolver),
      Effect.flip
    )
  );
}

describe("artifact integrity", () => {
  it("authenticates without applying renderer compatibility", async () => {
    await expect(authenticate(artifact)).resolves.toEqual(artifact);
  });

  it("rejects excess envelope properties", async () => {
    await expect(
      reject({ ...artifact, unexpected: true })
    ).resolves.toMatchObject({ _tag: "ArtifactVerificationDecodeError" });
  });
});
