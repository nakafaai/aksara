import { Buffer } from "node:buffer";
import {
  createPrivateKey,
  type KeyObject,
  sign as signBytes,
} from "node:crypto";
import { validateArtifactByteIntegrity } from "@nakafa/aksara-contracts/artifact/limits";
import { verifyCompiledContentSourceHash } from "@nakafa/aksara-contracts/artifact/source";
import type {
  ArtifactCompiledByteLengthMismatchError,
  ArtifactPayloadFieldByteLimitError,
  ArtifactSourceHashComputationError,
  ArtifactSourceHashMismatchError,
  ArtifactVerificationByteLimitError,
} from "@nakafa/aksara-contracts/artifact/spec";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/verify";
import {
  type CompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "@nakafa/aksara-contracts/content";
import {
  Ed25519SignatureSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type ContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import {
  hashContentReleaseManifest,
  type ReleaseHashComputationError,
} from "@nakafa/aksara-contracts/release/hash";
import { Effect, Schema } from "effect";
import { ContentSigningError } from "#publisher/signing-errors";

/** Single-key signer for every authenticated object in one publication run. */
export interface PublicationSigner {
  /** Signs one source-verified compiled artifact. */
  readonly signArtifact: (
    payload: CompiledContentPayload
  ) => Effect.Effect<
    SignedContentArtifact,
    | ArtifactSourceHashComputationError
    | ArtifactSourceHashMismatchError
    | ArtifactCompiledByteLengthMismatchError
    | ArtifactPayloadFieldByteLimitError
    | ArtifactVerificationByteLimitError
    | ContentSigningError
  >;
  /** Signs one canonical release manifest. */
  readonly signRelease: (
    manifest: ContentReleaseManifest
  ) => Effect.Effect<
    SignedContentRelease,
    ContentSigningError | ReleaseHashComputationError
  >;
}

type PublicationSignerFactory = (input: {
  readonly keyId: string;
  readonly privateKeyPem: string;
}) => Effect.Effect<PublicationSigner, ContentSigningError>;

/** Signs one domain-separated canonical message with an Ed25519 key. */
function signCanonicalInput(
  privateKey: KeyObject,
  message: string,
  stage: "artifact" | "release"
) {
  return Effect.try({
    catch: () =>
      new ContentSigningError({
        message: `Ed25519 ${stage} signing failed.`,
        stage,
      }),
    try: () =>
      Ed25519SignatureSchema.make(
        signBytes(null, Buffer.from(message, "utf8"), privateKey).toString(
          "base64url"
        )
      ),
  });
}

/** Verifies and signs one compiled artifact under the configured key. */
function signArtifact(
  keyId: typeof SigningKeyIdSchema.Type,
  privateKey: KeyObject,
  payload: CompiledContentPayload
) {
  return verifyCompiledContentSourceHash(payload).pipe(
    Effect.flatMap(() => {
      const artifactHash = hashCompiledContentPayload(payload);
      return signCanonicalInput(
        privateKey,
        canonicalizeContentArtifactSigningInput(artifactHash, payload),
        "artifact"
      ).pipe(Effect.map((signature) => ({ artifactHash, signature })));
    }),
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
  privateKey: KeyObject,
  manifest: ContentReleaseManifest
) {
  return hashContentReleaseManifest(manifest).pipe(
    Effect.flatMap((manifestHash) =>
      signCanonicalInput(
        privateKey,
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
    const keyId = yield* Schema.decodeUnknown(SigningKeyIdSchema)(
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
    const privateKey = yield* Effect.try({
      catch: () =>
        new ContentSigningError({
          message: "The Ed25519 private key could not be parsed.",
          stage: "configuration",
        }),
      try: () => createPrivateKey(input.privateKeyPem),
    });
    if (privateKey.asymmetricKeyType !== "ed25519") {
      return yield* new ContentSigningError({
        message: "The configured private key is not Ed25519.",
        stage: "configuration",
      });
    }

    return {
      /** Signs one source-verified artifact with the configured key. */
      signArtifact: Effect.fn("AksaraPublisher.signArtifact")((payload) =>
        signArtifact(keyId, privateKey, payload)
      ),
      /** Signs one canonical release manifest with the configured key. */
      signRelease: Effect.fn("AksaraPublisher.signRelease")((manifest) =>
        signRelease(keyId, privateKey, manifest)
      ),
    } satisfies PublicationSigner;
  })
);
