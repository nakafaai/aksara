import { createHash } from "node:crypto";
import { Effect, Schema } from "effect";
import type { ReleaseId, Sha256Hash } from "#contracts/ids";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import { verifyEd25519Signature } from "#contracts/signature/verify";

/** Unknown release input did not exactly satisfy its signed wire contract. */
export class ReleaseVerificationDecodeError extends Schema.TaggedError<ReleaseVerificationDecodeError>()(
  "ReleaseVerificationDecodeError",
  {
    message: Schema.Literal(
      "Release verification input does not satisfy its exact wire contract."
    ),
  }
) {}

/** SHA-256 computation failed before release authenticity was established. */
export class ReleaseHashComputationError extends Schema.TaggedError<ReleaseHashComputationError>()(
  "ReleaseHashComputationError",
  { releaseId: ReleaseIdSchema }
) {}

/** The envelope hash does not identify its complete canonical manifest. */
export class ReleaseManifestHashMismatchError extends Schema.TaggedError<ReleaseManifestHashMismatchError>()(
  "ReleaseManifestHashMismatchError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Computes a release manifest hash while preserving typed failures. */
function hashManifest(
  manifest: SignedContentRelease["manifest"]
): Effect.Effect<Sha256Hash, ReleaseHashComputationError> {
  return Effect.try({
    catch: () =>
      new ReleaseHashComputationError({ releaseId: manifest.releaseId }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(canonicalizeContentReleaseManifest(manifest))
          .digest("hex")}`
      ),
  });
}

/** Confirms that a release envelope identifies its canonical manifest. */
function validateManifestHash(
  releaseId: ReleaseId,
  expectedHash: Sha256Hash,
  actualHash: Sha256Hash
) {
  if (expectedHash === actualHash) {
    return Effect.void;
  }
  return Effect.fail(
    new ReleaseManifestHashMismatchError({
      actualHash,
      expectedHash,
      releaseId,
    })
  );
}

/** Strictly decodes and authenticates one complete release envelope. */
export const verifySignedContentRelease = Effect.fn(
  "AksaraContracts.verifySignedContentRelease"
)((input: unknown) =>
  Schema.decodeUnknown(SignedContentReleaseSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      () =>
        new ReleaseVerificationDecodeError({
          message:
            "Release verification input does not satisfy its exact wire contract.",
        })
    ),
    Effect.flatMap((release) =>
      Effect.gen(function* () {
        const actualHash = yield* hashManifest(release.manifest);
        yield* validateManifestHash(
          release.manifest.releaseId,
          release.manifestHash,
          actualHash
        );
        yield* verifyEd25519Signature({
          keyId: release.keyId,
          message: canonicalizeContentReleaseSigningInput(
            release.manifestHash,
            release.manifest
          ),
          signature: release.signature,
          subject: "release",
        });
        return release;
      })
    )
  )
);
