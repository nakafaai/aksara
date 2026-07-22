import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import { validateArtifactByteIntegrity } from "#contracts/artifact/limits";
import { verifyCompiledContentSourceHash } from "#contracts/artifact/source";
import {
  ArtifactHashComputationError,
  ArtifactHashMismatchError,
  ArtifactVerificationDecodeError,
} from "#contracts/artifact/spec";
import {
  type CompiledContentPayload,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import type { Sha256Hash } from "#contracts/ids";
import { Sha256HashSchema } from "#contracts/ids";
import { verifyEd25519Signature } from "#contracts/signature/verify";

/** Computes the immutable identity of one canonical compiled payload. */
export function hashCompiledContentPayload(payload: CompiledContentPayload) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256")
      .update(canonicalizeCompiledContentPayload(payload))
      .digest("hex")}`
  );
}

/** Computes an artifact hash while preserving typed computation failures. */
function hashPayload(payload: CompiledContentPayload) {
  return Effect.try({
    catch: () =>
      new ArtifactHashComputationError({ contentKey: payload.contentKey }),
    try: () => hashCompiledContentPayload(payload),
  });
}

/** Confirms that an artifact envelope identifies its canonical payload. */
function validateArtifactHash(
  artifact: SignedContentArtifact,
  actualHash: Sha256Hash
) {
  if (artifact.artifactHash === actualHash) {
    return Effect.void;
  }
  return Effect.fail(
    new ArtifactHashMismatchError({
      actualHash,
      contentKey: artifact.payload.contentKey,
      expectedHash: artifact.artifactHash,
    })
  );
}

/** Verifies immutable bytes, hashes, source, and signature without a renderer. */
function authenticateSignedArtifact(artifact: SignedContentArtifact) {
  return Effect.gen(function* () {
    const actualHash = yield* hashPayload(artifact.payload);
    yield* validateArtifactHash(artifact, actualHash);
    yield* verifyEd25519Signature({
      keyId: artifact.keyId,
      message: canonicalizeContentArtifactSigningInput(
        artifact.artifactHash,
        artifact.payload
      ),
      signature: artifact.signature,
      subject: "artifact",
    });
    yield* validateArtifactByteIntegrity(artifact);
    yield* verifyCompiledContentSourceHash(artifact.payload);
    return artifact;
  });
}

/** Strictly authenticates artifact integrity without renderer compatibility. */
export const verifySignedContentArtifactIntegrity = Effect.fn(
  "AksaraContracts.verifySignedContentArtifactIntegrity"
)((input: unknown) =>
  Schema.decodeUnknown(SignedContentArtifactSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      () =>
        new ArtifactVerificationDecodeError({
          message:
            "Artifact verification input does not satisfy its exact wire contract.",
        })
    ),
    Effect.flatMap(authenticateSignedArtifact)
  )
);
