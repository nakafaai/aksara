import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import { validateArtifactByteIntegrity } from "@nakafa/aksara-contracts/artifact/limits";
import { verifyCompiledContentSourceHash } from "@nakafa/aksara-contracts/artifact/source";
import type {
  ArtifactPayloadFieldByteLimitError,
  ArtifactSourceHashMismatchError,
  ArtifactVerificationByteLimitError,
} from "@nakafa/aksara-contracts/artifact/spec";
import {
  type CompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "@nakafa/aksara-contracts/content";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ContentReleaseManifest,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { hashContentReleaseManifest } from "@nakafa/aksara-contracts/release/hash";
import { canonicalizeContentReleaseSigningInput } from "@nakafa/aksara-contracts/release/signing";
import { ed25519PublicKeyPem } from "@nakafa/aksara-contracts/signature/key";
import { Effect, Schema } from "effect";
import { signCanonicalInput } from "#publisher/signing/canonical";
import { ContentSigningError } from "#publisher/signing/error";

/** Single-key signer for every authenticated object in one publication run. */
export interface PublicationSigner {
  /** Signs one source-verified compiled artifact. */
  readonly signArtifact: (
    payload: CompiledContentPayload
  ) => Effect.Effect<
    SignedContentArtifact,
    | ArtifactSourceHashMismatchError
    | ArtifactPayloadFieldByteLimitError
    | ArtifactVerificationByteLimitError
    | ContentSigningError
  >;
  /** Signs one canonical release manifest. */
  readonly signRelease: (
    manifest: ContentReleaseManifest
  ) => Effect.Effect<SignedContentRelease, ContentSigningError>;
}

type PublicationSignerFactory = (input: {
  readonly keyId: string;
  readonly privateKeyPem: string;
}) => Effect.Effect<PublicationSigner, ContentSigningError>;

/** Verifies and signs one compiled artifact under the configured key. */
function signArtifact(
  keyId: typeof SigningKeyIdSchema.Type,
  privateKeyPem: string,
  payload: CompiledContentPayload
) {
  return verifyCompiledContentSourceHash(payload).pipe(
    Effect.flatMap(() => hashCompiledContentPayload(payload)),
    Effect.flatMap((artifactHash) =>
      signCanonicalInput(
        privateKeyPem,
        canonicalizeContentArtifactSigningInput(artifactHash, payload),
        "artifact"
      ).pipe(Effect.map((signature) => ({ artifactHash, signature })))
    ),
    Effect.flatMap(({ artifactHash, signature }) => {
      const artifact = SignedContentArtifactSchema.make({
        artifactHash,
        keyId,
        payload,
        signature,
      });
      return validateArtifactByteIntegrity(artifact).pipe(Effect.as(artifact));
    })
  );
}

/** Hashes and signs one complete release manifest. */
function signRelease(
  keyId: typeof SigningKeyIdSchema.Type,
  privateKeyPem: string,
  manifest: ContentReleaseManifest
) {
  return hashContentReleaseManifest(manifest).pipe(
    Effect.flatMap((manifestHash) =>
      signCanonicalInput(
        privateKeyPem,
        canonicalizeContentReleaseSigningInput(manifestHash, manifest),
        "release"
      ).pipe(
        Effect.map((signature) =>
          SignedContentReleaseSchema.make({
            keyId,
            manifest,
            manifestHash,
            signature,
          })
        )
      )
    )
  );
}

/** Builds one Ed25519 signer used for artifacts and their release envelope. */
export const makeEd25519PublicationSigner: PublicationSignerFactory = Effect.fn(
  "AksaraPublisher.makeEd25519PublicationSigner"
)((input: { readonly keyId: string; readonly privateKeyPem: string }) =>
  Effect.gen(function* () {
    const keyId = yield* Schema.decodeEffect(SigningKeyIdSchema)(
      input.keyId
    ).pipe(
      Effect.mapError(
        () =>
          new ContentSigningError({
            message: "The Ed25519 signing key identifier is invalid.",
            stage: "configuration",
          })
      )
    );
    yield* ed25519PublicKeyPem(input.privateKeyPem).pipe(
      Effect.mapError(
        () =>
          new ContentSigningError({
            message: "The Ed25519 private key could not be parsed.",
            stage: "configuration",
          })
      )
    );

    return {
      /** Signs one source-verified artifact with the configured key. */
      signArtifact: Effect.fn("AksaraPublisher.signArtifact")((payload) =>
        signArtifact(keyId, input.privateKeyPem, payload)
      ),
      /** Signs one canonical release manifest with the configured key. */
      signRelease: Effect.fn("AksaraPublisher.signRelease")((manifest) =>
        signRelease(keyId, input.privateKeyPem, manifest)
      ),
    } satisfies PublicationSigner;
  })
);
