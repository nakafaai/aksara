// @vitest-environment node

import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign,
  verify as verifyBytes,
} from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
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
  return verifySignedContentArtifactIntegrity(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver)
  );
}

/** Returns the typed authentication failure for an invalid fixture. */
function reject(input: unknown) {
  return verifySignedContentArtifactIntegrity(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.flip
  );
}

describe("artifact integrity", () => {
  it.effect("authenticates without applying renderer compatibility", () =>
    Effect.gen(function* () {
      expect(yield* authenticate(artifact)).toEqual(artifact);
    })
  );

  it.effect("rejects excess envelope properties", () =>
    Effect.gen(function* () {
      expect(yield* reject({ ...artifact, unexpected: true })).toMatchObject({
        _tag: "ArtifactVerificationDecodeError",
      });
    })
  );
});

const pinnedKeyId = SigningKeyIdSchema.make("pinned-integrity-key");
const pinnedPublicKey =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAm0AgJ2qQN1UYw3vw5GW7n72eFC8RGdBcTAK02157+QA=\n-----END PUBLIC KEY-----\n";
const pinnedPayload = Schema.decodeSync(CompiledContentPayloadSchema)({
  artifactLocale: "id",
  byteLength: 45,
  compiledCode: 'return {title: "Pecahan Ñandú café 😀"};',
  compilerConfigHash: `sha256:${"d".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "articles/science/cell-biology",
  format: "mdx-function-body",
  mdxCompilerVersion: "3.1.1",
  plainText: "Pecahan Ñandú café 😀",
  rawMdx: "## Pecahan Ñandú café 😀",
  rendererDomain: "mathematics",
  requiredComponents: ["BlockMath", "FunctionMachine", "InlineMath"],
  sourceHash:
    "sha256:2080c334ac43a3b624b19f1674bf757593da7213edb4900b9a689dfcddb8b115",
});
const pinnedArtifact = {
  artifactHash:
    "sha256:ac3bfd493f08cb5042765c2a54192a3a9750badd133e20a8934fa595f9ff88f5",
  keyId: "pinned-integrity-key",
  payload: pinnedPayload,
  // Record again: create a key, sign the same input, and replace the public key and signature literals.
  signature:
    "ENkq-BP_LhKMqkP801vuwF0d4_FKhdygCNr2peQAj6VxOO9oCJjK1J-n1fvPmCmP5zGHtEulw9BoAVb0tga0DA",
};
const pinnedResolver = ContentVerificationKeyResolver.of({
  /** Resolves only the fixed public key that signed the pinned artifact bytes. */
  resolve: (requestedKeyId) =>
    requestedKeyId === pinnedKeyId
      ? Effect.succeed(pinnedPublicKey)
      : Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId })),
});

/** Authenticates pinned artifact bytes with the fixed public key only. */
function authenticatePinned(input: unknown) {
  return verifySignedContentArtifactIntegrity(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, pinnedResolver)
  );
}

describe("pinned artifact integrity", () => {
  it("pins the SHA-256 identity of non-ASCII canonical payload bytes", () => {
    expect(hashCompiledContentPayload(pinnedPayload)).toBe(
      "sha256:ac3bfd493f08cb5042765c2a54192a3a9750badd133e20a8934fa595f9ff88f5"
    );
  });

  it.effect("authenticates pinned bytes under the pinned Ed25519 key", () =>
    Effect.gen(function* () {
      expect(yield* authenticatePinned(pinnedArtifact)).toEqual(pinnedArtifact);
    })
  );

  it.effect("rejects pinned bytes when the signed plain text changes", () =>
    Effect.gen(function* () {
      const error = yield* authenticatePinned({
        ...pinnedArtifact,
        payload: { ...pinnedArtifact.payload, plainText: "Pecahan Ñandú café" },
      }).pipe(Effect.flip);

      expect(error._tag).toBe("ArtifactHashMismatchError");
    })
  );

  it.effect("rejects a pinned artifact whose signature changes", () =>
    Effect.gen(function* () {
      const error = yield* authenticatePinned({
        ...pinnedArtifact,
        signature: `Q${pinnedArtifact.signature.slice(1)}`,
      }).pipe(Effect.flip);

      expect(error._tag).toBe("SignatureInvalidError");
    })
  );

  it("verifies the pinned signature over the exact canonical bytes", () => {
    const input = canonicalizeContentArtifactSigningInput(
      hashCompiledContentPayload(pinnedPayload),
      pinnedPayload
    );
    expect(
      verifyBytes(
        null,
        Buffer.from(input, "utf8"),
        pinnedPublicKey,
        Buffer.from(pinnedArtifact.signature, "base64url")
      )
    ).toBe(true);
    expect(
      verifyBytes(
        null,
        Buffer.from(input.replace("aksara", "aksarb"), "utf8"),
        pinnedPublicKey,
        Buffer.from(pinnedArtifact.signature, "base64url")
      )
    ).toBe(false);
  });
});
