import { Effect, Schema } from "effect";
import type { ReleaseId, Sha256Hash } from "#contracts/ids";
import { ReleaseIdSchema, Sha256HashSchema } from "#contracts/ids";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import {
  type ContentReleaseBundle,
  ContentReleaseBundleSchema,
} from "#contracts/release/lifecycle";
import {
  canonicalizeContentReleaseSigningInput,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import { validateRendererManifestHash } from "#contracts/renderer/manifest";
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

/** The envelope hash does not identify its complete canonical manifest. */
export class ReleaseManifestHashMismatchError extends Schema.TaggedError<ReleaseManifestHashMismatchError>()(
  "ReleaseManifestHashMismatchError",
  {
    actualHash: Sha256HashSchema,
    expectedHash: Sha256HashSchema,
    releaseId: ReleaseIdSchema,
  }
) {}

/** Stored release recovery input does not satisfy its exact bundle contract. */
export class ReleaseBundleVerificationDecodeError extends Schema.TaggedError<ReleaseBundleVerificationDecodeError>()(
  "ReleaseBundleVerificationDecodeError",
  {
    message: Schema.Literal(
      "Release bundle verification input does not satisfy its exact wire contract."
    ),
  }
) {}

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
        const actualHash = yield* hashContentReleaseManifest(release.manifest);
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

/** Authenticates one signed release and its frozen renderer contract together. */
export const verifyContentReleaseBundle = Effect.fn(
  "AksaraContracts.verifyContentReleaseBundle"
)((input: unknown) =>
  Schema.decodeUnknown(ContentReleaseBundleSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      () =>
        new ReleaseBundleVerificationDecodeError({
          message:
            "Release bundle verification input does not satisfy its exact wire contract.",
        })
    ),
    Effect.flatMap((bundle) =>
      Effect.all({
        release: verifySignedContentRelease(bundle.release),
        rendererManifest: validateRendererManifestHash(bundle.rendererManifest),
      })
    ),
    Effect.map(
      (bundle) =>
        ({
          release: bundle.release,
          rendererManifest: bundle.rendererManifest,
        }) satisfies ContentReleaseBundle
    )
  )
);
