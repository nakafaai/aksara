// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import {
  hashCompiledContentPayload,
  verifySignedContentArtifactIntegrity,
} from "#contracts/artifact/integrity";
import {
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
} from "#contracts/content";
import { SigningKeyIdSchema } from "#contracts/ids";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import {
  integrityArtifact,
  integrityResolver,
} from "#contracts/test/integrity";
import { verifyEd25519Pem } from "#contracts/test/signature";

/** Runs exact artifact authentication with the trusted fixture resolver. */
function authenticate(input: unknown) {
  return verifySignedContentArtifactIntegrity(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, integrityResolver)
  );
}

/** Returns the typed authentication failure for an invalid fixture. */
function reject(input: unknown) {
  return verifySignedContentArtifactIntegrity(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, integrityResolver),
    Effect.flip
  );
}

describe("artifact integrity", () => {
  it.effect("authenticates without applying renderer compatibility", () =>
    Effect.gen(function* () {
      expect(yield* authenticate(integrityArtifact)).toEqual(integrityArtifact);
    })
  );

  it.effect("rejects excess envelope properties", () =>
    Effect.gen(function* () {
      expect(
        yield* reject({ ...integrityArtifact, unexpected: true })
      ).toMatchObject({
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
  it.effect(
    "pins the SHA-256 identity of non-ASCII canonical payload bytes",
    () =>
      Effect.gen(function* () {
        expect(yield* hashCompiledContentPayload(pinnedPayload)).toBe(
          "sha256:ac3bfd493f08cb5042765c2a54192a3a9750badd133e20a8934fa595f9ff88f5"
        );
      })
  );

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

  it.effect(
    "verifies the pinned signature over the exact canonical bytes",
    () =>
      Effect.gen(function* () {
        const input = canonicalizeContentArtifactSigningInput(
          yield* hashCompiledContentPayload(pinnedPayload),
          pinnedPayload
        );
        expect(
          yield* verifyEd25519Pem(
            pinnedPublicKey,
            input,
            pinnedArtifact.signature
          )
        ).toBe(true);
        expect(
          yield* verifyEd25519Pem(
            pinnedPublicKey,
            input.replace("aksara", "aksarb"),
            pinnedArtifact.signature
          )
        ).toBe(false);
      })
  );
});
