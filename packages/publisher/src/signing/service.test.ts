// @vitest-environment node

import { Buffer } from "node:buffer";
import { generateKeyPairSync, verify } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import {
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
} from "@nakafa/aksara-contracts/content";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_SIGNED_ARTIFACT_BYTES } from "@nakafa/aksara-contracts/limits";
import { canonicalizeContentReleaseSigningInput } from "@nakafa/aksara-contracts/release/signing";
import { canonicalizeTryoutRuntimeBundleSigningInput } from "@nakafa/aksara-contracts/tryout/runtime/canonical";
import { Effect } from "effect";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import {
  changeOneByte,
  signingManifest as manifest,
  signingPayload as payload,
  signingRuntimeBundle,
  TEST_ARTIFACT_SIGNATURE,
  TEST_RELEASE_SIGNATURE,
  TEST_RUNTIME_BUNDLE_SIGNATURE,
  verifyRecorded,
} from "#test/signing";

const cryptoFailure = vi.hoisted(() => ({ failNextSign: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    sign: (...parameters: Parameters<typeof crypto.sign>) => {
      if (cryptoFailure.failNextSign) {
        cryptoFailure.failNextSign = false;
        throw new Error("Test-controlled signing failure.");
      }
      return crypto.sign(...parameters);
    },
  };
});

/** Builds one Ed25519 key pair and its publication signer. */
const makeSigner = Effect.fn("PublicationSigningTest.makeSigner")(function* () {
  const keyPair = yield* Effect.sync(() => generateKeyPairSync("ed25519"));
  const signer = yield* makeEd25519PublicationSigner({
    keyId: "test-signing-key",
    privateKeyPem: keyPair.privateKey
      .export({ format: "pem", type: "pkcs8" })
      .toString(),
  });
  return { ...keyPair, signer };
});

describe("Ed25519 publication signing", () => {
  it.effect(
    "signs every publication object with one domain-separated key",
    () =>
      Effect.gen(function* () {
        const { publicKey, signer } = yield* makeSigner();
        const artifact = yield* signer.signArtifact(payload);
        const release = yield* signer.signRelease(manifest);
        expect(manifest.origin.kind).toBe("git");
        if (manifest.origin.kind !== "git") {
          return;
        }
        const runtimeBundle = yield* signer.signTryoutRuntimeBundle(
          signingRuntimeBundle(release, manifest.origin.sha)
        );

        expect(artifact.keyId).toBe("test-signing-key");
        expect(
          yield* Effect.sync(() =>
            verify(
              null,
              Buffer.from(
                canonicalizeContentArtifactSigningInput(
                  artifact.artifactHash,
                  artifact.payload
                ),
                "utf8"
              ),
              publicKey,
              Buffer.from(artifact.signature, "base64url")
            )
          )
        ).toBe(true);
        expect(release.keyId).toBe(artifact.keyId);
        expect(
          yield* Effect.sync(() =>
            verify(
              null,
              Buffer.from(
                canonicalizeContentReleaseSigningInput(
                  release.manifestHash,
                  release.manifest
                ),
                "utf8"
              ),
              publicKey,
              Buffer.from(release.signature, "base64url")
            )
          )
        ).toBe(true);
        expect(runtimeBundle.keyId).toBe(release.keyId);
        expect(
          yield* Effect.sync(() =>
            verify(
              null,
              Buffer.from(
                canonicalizeTryoutRuntimeBundleSigningInput(
                  runtimeBundle.bundleHash,
                  runtimeBundle.payload
                ),
                "utf8"
              ),
              publicKey,
              Buffer.from(runtimeBundle.signature, "base64url")
            )
          )
        ).toBe(true);
        expect(
          yield* Effect.sync(() =>
            verify(
              null,
              Buffer.from(
                canonicalizeContentReleaseSigningInput(
                  release.manifestHash,
                  release.manifest
                ),
                "utf8"
              ),
              publicKey,
              Buffer.from(artifact.signature, "base64url")
            )
          )
        ).toBe(false);
      })
  );

  it.effect("rejects a non-Ed25519 private key", () =>
    Effect.gen(function* () {
      const { privateKey } = yield* Effect.sync(() =>
        generateKeyPairSync("rsa", { modulusLength: 2048 })
      );
      const error = yield* makeEd25519PublicationSigner({
        keyId: "test-signing-key",
        privateKeyPem: privateKey
          .export({ format: "pem", type: "pkcs8" })
          .toString(),
      }).pipe(Effect.flip);

      expect(error._tag).toBe("ContentSigningError");
      expect(JSON.stringify(error)).not.toContain("PRIVATE KEY");
    })
  );

  it.effect("rejects an invalid signing key identifier", () =>
    Effect.gen(function* () {
      const { privateKey } = yield* Effect.sync(() =>
        generateKeyPairSync("ed25519")
      );
      const error = yield* makeEd25519PublicationSigner({
        keyId: "INVALID KEY",
        privateKeyPem: privateKey
          .export({ format: "pem", type: "pkcs8" })
          .toString(),
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
      yield* Effect.sync(() => {
        cryptoFailure.failNextSign = true;
      });
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
        byteLength: Buffer.byteLength(compiledCode, "utf8"),
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
        signingRuntimeBundle(release, manifest.origin.sha)
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
        verifyRecorded(artifactInput, TEST_ARTIFACT_SIGNATURE),
        verifyRecorded(releaseInput, TEST_RELEASE_SIGNATURE),
        verifyRecorded(runtimeBundleInput, TEST_RUNTIME_BUNDLE_SIGNATURE),
      ]).toEqual([true, true, true]);
      expect([
        verifyRecorded(changeOneByte(artifactInput), TEST_ARTIFACT_SIGNATURE),
        verifyRecorded(changeOneByte(releaseInput), TEST_RELEASE_SIGNATURE),
        verifyRecorded(
          changeOneByte(runtimeBundleInput),
          TEST_RUNTIME_BUNDLE_SIGNATURE
        ),
      ]).toEqual([false, false, false]);
    })
  );
});
