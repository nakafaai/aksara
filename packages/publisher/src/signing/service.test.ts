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
import { canonicalizeTryoutRuntimeBundleSigningInput } from "@nakafa/aksara-contracts/tryout/runtime/canonical";
import { Effect } from "effect";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import { encodeJsonText } from "#publisher/text/json";
import {
  changeOneByte,
  generateRsaPrivateKeyPem,
  signingManifest as manifest,
  signingPayload as payload,
  signingRuntimeBundle,
  TEST_ARTIFACT_SIGNATURE,
  TEST_RELEASE_SIGNATURE,
  TEST_RUNTIME_BUNDLE_SIGNATURE,
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
        expect(manifest.origin.kind).toBe("git");
        if (manifest.origin.kind !== "git") {
          return;
        }
        const runtimeBundle = yield* signer.signTryoutRuntimeBundle(
          yield* signingRuntimeBundle(release, manifest.origin.sha)
        );

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
        expect(runtimeBundle.keyId).toBe(release.keyId);
        expect(
          yield* verifyWithPublicKeyPem(
            publicKeyPem,
            canonicalizeTryoutRuntimeBundleSigningInput(
              runtimeBundle.bundleHash,
              runtimeBundle.payload
            ),
            runtimeBundle.signature
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
        new Error("Test-controlled signing failure.")
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
      const compiledCode = "x".repeat(MAX_SIGNED_ARTIFACT_BYTES);
      const oversizedPayload = CompiledContentPayloadSchema.make({
        ...payload,
        byteLength: new TextEncoder().encode(compiledCode).byteLength,
        compiledCode,
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
      expect(manifest.origin.kind).toBe("git");
      if (manifest.origin.kind !== "git") {
        return;
      }
      const runtimeBundle = yield* signer.signTryoutRuntimeBundle(
        yield* signingRuntimeBundle(release, manifest.origin.sha)
      );
      expect([
        artifact.artifactHash,
        release.manifestHash,
        runtimeBundle.bundleHash,
      ]).toEqual([
        "sha256:a988ede8eb7f5ec4efe3249d10ae5feb8cd6b6691e5c8bf21c461fda0c297f32",
        "sha256:2920f6035d15b14d7f75537d9da7dc127c8f21a4a52f2339006e9869b03e4293",
        "sha256:003052adf84cda81dfffda8dfaa15cb7e6e7223630f01bfb835c88c6ca7b8f72",
      ]);
      const artifactInput = canonicalizeContentArtifactSigningInput(
        artifact.artifactHash,
        artifact.payload
      );
      const releaseInput = canonicalizeContentReleaseSigningInput(
        release.manifestHash,
        release.manifest
      );
      const runtimeBundleInput = canonicalizeTryoutRuntimeBundleSigningInput(
        runtimeBundle.bundleHash,
        runtimeBundle.payload
      );
      expect([
        yield* verifyRecorded(artifactInput, TEST_ARTIFACT_SIGNATURE),
        yield* verifyRecorded(releaseInput, TEST_RELEASE_SIGNATURE),
        yield* verifyRecorded(
          runtimeBundleInput,
          TEST_RUNTIME_BUNDLE_SIGNATURE
        ),
      ]).toEqual([true, true, true]);
      expect([
        yield* verifyRecorded(
          changeOneByte(artifactInput),
          TEST_ARTIFACT_SIGNATURE
        ),
        yield* verifyRecorded(
          changeOneByte(releaseInput),
          TEST_RELEASE_SIGNATURE
        ),
        yield* verifyRecorded(
          changeOneByte(runtimeBundleInput),
          TEST_RUNTIME_BUNDLE_SIGNATURE
        ),
      ]).toEqual([false, false, false]);
    })
  );
});
