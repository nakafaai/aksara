import { Array as Arr, Effect, Option, Schema } from "effect";
import { validateArtifactByteIntegrity } from "#contracts/artifact/limits";
import { verifyCompiledContentSourceHash } from "#contracts/artifact/source";
import {
  ArtifactHashComputationError,
  ArtifactHashMismatchError,
  ArtifactTreeComponentUnlistedError,
  ArtifactVerificationDecodeError,
} from "#contracts/artifact/spec";
import {
  type CompiledContentPayload,
  canonicalizeCompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "#contracts/content";
import { hashText } from "#contracts/hash/text";
import type { Sha256Hash } from "#contracts/ids";
import { verifyEd25519Signature } from "#contracts/signature/verify";
import { contentTreeComponentNames } from "#contracts/tree";

/** Computes the immutable identity of one canonical compiled payload. */
export const hashCompiledContentPayload = Effect.fn(
  "AksaraContracts.hashCompiledContentPayload"
)((payload: CompiledContentPayload) =>
  hashText(canonicalizeCompiledContentPayload(payload)).pipe(
    Effect.mapError(
      () => new ArtifactHashComputationError({ contentKey: payload.contentKey })
    )
  )
);

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

/** Confirms that every component the content tree renders is one the artifact requires. */
function validateTreeComponents(payload: CompiledContentPayload) {
  const declared: readonly string[] = payload.requiredComponents;
  const unlisted = Arr.findFirst(
    contentTreeComponentNames(payload.contentTree),
    (componentName) => !Arr.contains(declared, componentName)
  );
  if (Option.isNone(unlisted)) {
    return Effect.void;
  }
  return Effect.fail(
    new ArtifactTreeComponentUnlistedError({
      componentName: unlisted.value,
      contentKey: payload.contentKey,
    })
  );
}

/** Verifies immutable bytes, hashes, source, and signature without a renderer. */
function authenticateSignedArtifact(artifact: SignedContentArtifact) {
  return Effect.gen(function* () {
    const actualHash = yield* hashCompiledContentPayload(artifact.payload);
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
    yield* validateTreeComponents(artifact.payload);
    yield* verifyCompiledContentSourceHash(artifact.payload);
    return artifact;
  });
}

/** Strictly authenticates artifact integrity without renderer compatibility. */
export const verifySignedContentArtifactIntegrity = Effect.fn(
  "AksaraContracts.verifySignedContentArtifactIntegrity"
)((input: unknown) =>
  Schema.decodeUnknownEffect(SignedContentArtifactSchema)(input, {
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
