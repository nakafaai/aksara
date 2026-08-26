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
import { Effect } from "effect";
import { vi } from "vitest";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import {
  signingManifest as manifest,
  signingPayload as payload,
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
  it.effect("signs artifacts and releases with one domain-separated key", () =>
    Effect.gen(function* () {
      const { publicKey, signer } = yield* makeSigner();
      const artifact = yield* signer.signArtifact(payload);
      const release = yield* signer.signRelease(manifest);

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
