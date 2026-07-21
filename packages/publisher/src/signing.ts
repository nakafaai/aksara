import { Buffer } from "node:buffer";
import {
  createHash,
  createPrivateKey,
  type KeyObject,
  sign as signBytes,
} from "node:crypto";
import {
  hashCompiledContentPayload,
  verifyCompiledContentSourceHash,
} from "@nakafaai/aksara-contracts/artifact-verification-node";
import type {
  ArtifactSourceHashComputationError,
  ArtifactSourceHashMismatchError,
} from "@nakafaai/aksara-contracts/artifact-verification-spec";
import {
  type CompiledContentPayload,
  canonicalizeContentArtifactSigningInput,
  canonicalizeSignedContentArtifact,
  type SignedContentArtifact,
  SignedContentArtifactSchema,
} from "@nakafaai/aksara-contracts/content";
import {
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafaai/aksara-contracts/ids";
import { MAX_SIGNED_ARTIFACT_BYTES } from "@nakafaai/aksara-contracts/limits";
import {
  type ContentReleaseManifest,
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "@nakafaai/aksara-contracts/release";
import { Effect, Schema } from "effect";
import {
  ContentSigningError,
  SignedArtifactByteLimitError,
} from "./signing-errors.js";

/** Single-key signer for every authenticated object in one publication run. */
export interface PublicationSigner {
  readonly signArtifact: (
    payload: CompiledContentPayload
  ) => Effect.Effect<
    SignedContentArtifact,
    | ArtifactSourceHashComputationError
    | ArtifactSourceHashMismatchError
    | ContentSigningError
    | SignedArtifactByteLimitError
  >;
  readonly signRelease: (
    manifest: ContentReleaseManifest
  ) => Effect.Effect<SignedContentRelease, ContentSigningError>;
}

/** Computes the immutable identity of the complete canonical release manifest. */
export function hashContentReleaseManifest(manifest: ContentReleaseManifest) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256")
      .update(canonicalizeContentReleaseManifest(manifest))
      .digest("hex")}`
  );
}

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
      const actualBytes = Buffer.byteLength(
        canonicalizeSignedContentArtifact(artifact),
        "utf8"
      );
      if (actualBytes <= MAX_SIGNED_ARTIFACT_BYTES) {
        return Effect.succeed(artifact);
      }
      return Effect.fail(
        new SignedArtifactByteLimitError({
          actualBytes,
          maxBytes: MAX_SIGNED_ARTIFACT_BYTES,
        })
      );
    })
  );
}

function signRelease(
  keyId: typeof SigningKeyIdSchema.Type,
  privateKey: KeyObject,
  manifest: ContentReleaseManifest
) {
  const manifestHash = hashContentReleaseManifest(manifest);
  return signCanonicalInput(
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
  );
}

/** Builds one Ed25519 signer used for artifacts and their release envelope. */
export const makeEd25519PublicationSigner = Effect.fn(
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
      signArtifact: Effect.fn("AksaraPublisher.signArtifact")((payload) =>
        signArtifact(keyId, privateKey, payload)
      ),
      signRelease: Effect.fn("AksaraPublisher.signRelease")((manifest) =>
        signRelease(keyId, privateKey, manifest)
      ),
    } satisfies PublicationSigner;
  })
);
