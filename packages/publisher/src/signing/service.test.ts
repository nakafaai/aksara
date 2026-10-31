// @vitest-environment node

import { afterEach, describe, expect, it } from "@effect/vitest";
import {
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
} from "@nakafa/aksara-contracts/content";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_SIGNED_ARTIFACT_BYTES } from "@nakafa/aksara-contracts/limits";
import { canonicalizeContentReleaseSigningInput } from "@nakafa/aksara-contracts/release/signing";
import { generateEd25519KeyPem } from "@nakafa/aksara-contracts/signature/key";
import { Effect } from "effect";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import { encodeJsonText } from "@nakafa/aksara-utilities/text/json";
import {
  changeOneByte,
  generateRsaPrivateKeyPem,
  signingManifest as manifest,
  signingPayload as payload,
  TEST_ARTIFACT_SIGNATURE,
  TEST_RELEASE_SIGNATURE,
  verifyRecorded,
  verifyWithPublicKeyPem,
} from "#test/signing";

/** Builds one Ed25519 key pair and its publication signer. */
const makeSigner = Effect.fn("PublicationSigningTest.makeSigner")(function* () {
  const keyPair = yield* generateEd25519KeyPem();
  const signer = yield* makeEd25519PublicationSigner({
    keyId: "test-signing-key",
    privateKeyPem: keyPair.privateKeyPem,
  });
  return { publicKeyPem: keyPair.publicKeyPem, signer };
});

describe("Ed25519 publication signing", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it.effect(
    "signs every publication object with one domain-separated key",
    () =>
      Effect.gen(function* () {
        const { publicKeyPem, signer } = yield* makeSigner();
        const artifact = yield* signer.signArtifact(payload);
        const release = yield* signer.signRelease(manifest);

        expect(artifact.keyId).toBe("test-signing-key");
        expect(
          yield* verifyWithPublicKeyPem(
            publicKeyPem,
            canonicalizeContentArtifactSigningInput(
              artifact.artifactHash,
              artifact.payload
            ),
            artifact.signature
          )
        ).toBe(true);
        expect(release.keyId).toBe(artifact.keyId);
        expect(
          yield* verifyWithPublicKeyPem(
            publicKeyPem,
            canonicalizeContentReleaseSigningInput(
              release.manifestHash,
              release.manifest
            ),
            release.signature
          )
        ).toBe(true);
        expect(
          yield* verifyWithPublicKeyPem(
            publicKeyPem,
            canonicalizeContentReleaseSigningInput(
              release.manifestHash,
              release.manifest
            ),
            artifact.signature
          )
        ).toBe(false);
      })
  );

  it.effect("rejects a non-Ed25519 private key", () =>
    Effect.gen(function* () {
      const privateKeyPem = yield* generateRsaPrivateKeyPem();
      const error = yield* makeEd25519PublicationSigner({
        keyId: "test-signing-key",
        privateKeyPem,
      }).pipe(Effect.flip);

      expect(error._tag).toBe("ContentSigningError");
      expect(encodeJsonText(error)).not.toContain("PRIVATE KEY");
    })
  );

  it.effect("rejects an invalid signing key identifier", () =>
    Effect.gen(function* () {
      const { privateKeyPem } = yield* generateEd25519KeyPem();
      const error = yield* makeEd25519PublicationSigner({
        keyId: "INVALID KEY",
        privateKeyPem,
      }).pipe(Effect.flip);

      expect(error._tag).toBe("ContentSigningError");
      expect(error.stage).toBe("configuration");
    })
  );

  it.effect("rejects private key text that cannot be parsed", () =>
    Effect.gen(function* () {
      const error = yield* makeEd25519PublicationSigner({
        keyId: "test-signing-key",
        privateKeyPem: "not-a-private-key",
      }).pipe(Effect.flip);

      expect(error._tag).toBe("ContentSigningError");
      expect(error.message).toContain("could not be parsed");
    })
  );

  it.effect("maps an Ed25519 signing failure to the typed error channel", () =>
    Effect.gen(function* () {
      const { signer } = yield* makeSigner();
      vi.spyOn(globalThis.crypto.subtle, "sign").mockRejectedValueOnce(
        new DOMException(
          "Test-controlled signing failure.",
          "NotSupportedError"
        )
      );
      const error = yield* signer.signRelease(manifest).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "ContentSigningError",
        stage: "release",
      });
    })
  );

  it.effect("refuses to sign an artifact above the complete wire ceiling", () =>
    Effect.gen(function* () {
      const { signer } = yield* makeSigner();
      const oversizedPayload = CompiledContentPayloadSchema.make({
        ...payload,
        contentTree: {
          $node: "element",
          children: ["x".repeat(MAX_SIGNED_ARTIFACT_BYTES)],
          name: "fragment",
          props: {},
        },
      });
      const error = yield* signer
        .signArtifact(oversizedPayload)
        .pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "ArtifactVerificationByteLimitError",
        maxBytes: MAX_SIGNED_ARTIFACT_BYTES,
      });
    })
  );

  it.effect(
    "refuses to sign a payload whose source hash does not identify raw MDX",
    () =>
      Effect.gen(function* () {
        const { signer } = yield* makeSigner();
        const invalidPayload = {
          ...payload,
          sourceHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
        };
        const error = yield* signer
          .signArtifact(invalidPayload)
          .pipe(Effect.flip);

        expect(error._tag).toBe("ArtifactSourceHashMismatchError");
      })
  );
});

describe("Ed25519 publication signature vectors", () => {
  it.effect("pins every signed publication object", () =>
    Effect.gen(function* () {
      const { signer } = yield* makeSigner();
      const artifact = yield* signer.signArtifact(payload);
      const release = yield* signer.signRelease(manifest);
      expect([artifact.artifactHash, release.manifestHash]).toEqual([
        "sha256:ea361ee31f9369675a115b986903ba6efd3bc5a1b0970cdffcbe10541f70325e",
        "sha256:3496ac28c1a6b0ed3a1badaf1c1c90c0aee85da5d3a412fab2f0e023b9ed18e8",
      ]);
      const artifactInput = canonicalizeContentArtifactSigningInput(
        artifact.artifactHash,
        artifact.payload
      );
      const releaseInput = canonicalizeContentReleaseSigningInput(
        release.manifestHash,
        release.manifest
      );
      expect([
        yield* verifyRecorded(artifactInput, TEST_ARTIFACT_SIGNATURE),
        yield* verifyRecorded(releaseInput, TEST_RELEASE_SIGNATURE),
      ]).toEqual([true, true]);
      expect([
        yield* verifyRecorded(
          changeOneByte(artifactInput),
          TEST_ARTIFACT_SIGNATURE
        ),
        yield* verifyRecorded(
          changeOneByte(releaseInput),
          TEST_RELEASE_SIGNATURE
        ),
      ]).toEqual([false, false]);
    })
  );
});
