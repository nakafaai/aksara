// @vitest-environment node

import { Buffer } from "node:buffer";
import { generateKeyPairSync, verify } from "node:crypto";
import {
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
} from "@nakafa/aksara-contracts/content";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { MAX_SIGNED_ARTIFACT_BYTES } from "@nakafa/aksara-contracts/limits";
import { canonicalizeContentReleaseSigningInput } from "@nakafa/aksara-contracts/release/signing";
import { canonicalizeTryoutRuntimeBundleSigningInput } from "@nakafa/aksara-contracts/tryout/runtime-bundle/canonical";
import { TRYOUT_RUNTIME_BUNDLE_FORMAT } from "@nakafa/aksara-contracts/tryout/runtime-bundle/spec";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { describe, expect, it } from "@nakafa/testing/effect";
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

describe("Ed25519 publication signing", () => {
  it("signs every publication object with one domain-separated key", async () => {
    const { privateKey, publicKey } = generateKeyPairSync("ed25519");
    const signer = await Effect.runPromise(
      makeEd25519PublicationSigner({
        keyId: "test-signing-key",
        privateKeyPem: privateKey
          .export({ format: "pem", type: "pkcs8" })
          .toString(),
      })
    );
    const artifact = await Effect.runPromise(signer.signArtifact(payload));
    const release = await Effect.runPromise(signer.signRelease(manifest));
    if (manifest.origin.kind !== "git") {
      throw new TypeError(
        "Expected the signing fixture to use Git provenance."
      );
    }
    const runtimeBundle = await Effect.runPromise(
      signer.signTryoutRuntimeBundle({
        format: TRYOUT_RUNTIME_BUNDLE_FORMAT,
        rendererManifestHash: manifest.rendererManifestHash,
        snapshot: makeTryoutSnapshot({
          activeAppLocales: manifest.activeAppLocales,
          catalogDigest: manifest.itemsDigest,
          counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
          placementCount: 1,
          placementDigest: manifest.resultDigest,
          routeCount: 1,
        }),
        sourceGitSha: manifest.origin.sha,
        sourceManifestHash: release.manifestHash,
        sourceReleaseId: manifest.releaseId,
      })
    );

    expect(artifact.keyId).toBe("test-signing-key");
    expect(
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
    ).toBe(true);
    expect(release.keyId).toBe(artifact.keyId);
    expect(
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
    ).toBe(true);
    expect(runtimeBundle.keyId).toBe(release.keyId);
    expect(
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
    ).toBe(true);
    expect(
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
    ).toBe(false);
  });

  it("rejects a non-Ed25519 private key", async () => {
    const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
    const error = await Effect.runPromise(
      makeEd25519PublicationSigner({
        keyId: "test-signing-key",
        privateKeyPem: privateKey
          .export({ format: "pem", type: "pkcs8" })
          .toString(),
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ContentSigningError");
    expect(JSON.stringify(error)).not.toContain("PRIVATE KEY");
  });

  it("rejects an invalid signing key identifier", async () => {
    const { privateKey } = generateKeyPairSync("ed25519");
    const error = await Effect.runPromise(
      makeEd25519PublicationSigner({
        keyId: "INVALID KEY",
        privateKeyPem: privateKey
          .export({ format: "pem", type: "pkcs8" })
          .toString(),
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ContentSigningError");
    expect(error.stage).toBe("configuration");
  });

  it("rejects private key text that cannot be parsed", async () => {
    const error = await Effect.runPromise(
      makeEd25519PublicationSigner({
        keyId: "test-signing-key",
        privateKeyPem: "not-a-private-key",
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ContentSigningError");
    expect(error.message).toContain("could not be parsed");
  });

  it("maps an Ed25519 signing failure to the typed error channel", async () => {
    const { privateKey } = generateKeyPairSync("ed25519");
    const signer = await Effect.runPromise(
      makeEd25519PublicationSigner({
        keyId: "test-signing-key",
        privateKeyPem: privateKey
          .export({ format: "pem", type: "pkcs8" })
          .toString(),
      })
    );
    cryptoFailure.failNextSign = true;
    const error = await Effect.runPromise(
      signer.signRelease(manifest).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "ContentSigningError",
      stage: "release",
    });
  });

  it("refuses to sign an artifact above the complete wire ceiling", async () => {
    const { privateKey } = generateKeyPairSync("ed25519");
    const signer = await Effect.runPromise(
      makeEd25519PublicationSigner({
        keyId: "test-signing-key",
        privateKeyPem: privateKey
          .export({ format: "pem", type: "pkcs8" })
          .toString(),
      })
    );
    const compiledCode = "x".repeat(MAX_SIGNED_ARTIFACT_BYTES);
    const oversizedPayload = CompiledContentPayloadSchema.make({
      ...payload,
      byteLength: Buffer.byteLength(compiledCode, "utf8"),
      compiledCode,
    });
    const error = await Effect.runPromise(
      signer.signArtifact(oversizedPayload).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "ArtifactVerificationByteLimitError",
      maxBytes: MAX_SIGNED_ARTIFACT_BYTES,
    });
  });

  it("refuses to sign a payload whose source hash does not identify raw MDX", async () => {
    const { privateKey } = generateKeyPairSync("ed25519");
    const signer = await Effect.runPromise(
      makeEd25519PublicationSigner({
        keyId: "test-signing-key",
        privateKeyPem: privateKey
          .export({ format: "pem", type: "pkcs8" })
          .toString(),
      })
    );
    const invalidPayload = {
      ...payload,
      sourceHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    };
    const error = await Effect.runPromise(
      signer.signArtifact(invalidPayload).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ArtifactSourceHashMismatchError");
  });
});
