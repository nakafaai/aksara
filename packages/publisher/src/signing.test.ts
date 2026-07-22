// @vitest-environment node

import { Buffer } from "node:buffer";
import { generateKeyPairSync, verify } from "node:crypto";
import { compileContent } from "@nakafaai/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact/verify";
import {
  CompileDocumentSourceSchema,
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
} from "@nakafaai/aksara-contracts/content";
import {
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafaai/aksara-contracts/ids";
import { MAX_SIGNED_ARTIFACT_BYTES } from "@nakafaai/aksara-contracts/limits";
import {
  type ContentChange,
  ContentChangeSchema,
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
  canonicalizeContentReleaseSigningInput,
  compareContentChanges,
} from "@nakafaai/aksara-contracts/release";
import { hashContentReleaseItems } from "@nakafaai/aksara-contracts/release/digest";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import { makeEd25519PublicationSigner } from "#publisher/signing";

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

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: [
      {
        authoringComponents: [{ name: "AtomShellLab", version: 1 }],
        name: "material-chemistry",
        supportedComponents: [{ name: "AtomShellLab", version: 1 }],
      },
      {
        authoringComponents: [{ name: "FunctionMachine", version: 1 }],
        name: "material-mathematics",
        supportedComponents: [{ name: "FunctionMachine", version: 1 }],
      },
    ],
  })
);
const source = Schema.decodeUnknownSync(CompileDocumentSourceSchema)({
  contentKey: "test:signing",
  locale: "en",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "material-mathematics",
  sourcePath: "packages/corpus/test/signing/en.mdx",
});
const { payload } = await Effect.runPromise(
  compileContent({ ...source, rendererManifest })
);

const releaseId = Schema.decodeUnknownSync(ReleaseIdSchema)("test-release");
/** Builds canonically ordered release items for signing tests. */
function makeItems(release: ReleaseId, changes: readonly ContentChange[]) {
  return [...changes]
    .sort(compareContentChanges)
    .map((change, index) =>
      ContentReleaseItemSchema.make({ change, index, releaseId: release })
    );
}

const items = makeItems(
  releaseId,
  Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))([
    {
      artifactHash: hashCompiledContentPayload(payload),
      contentKey: payload.contentKey,
      delivery: "public",
      locale: payload.locale,
      operation: "upsert",
      publicPath: "subjects/test",
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    },
  ])
);
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseReleaseId: null,
  itemCount: items.length,
  itemsDigest: hashContentReleaseItems(items),
  origin: { kind: "git", sha: "d".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"c".repeat(64)}`,
  releaseId,
  rendererContractVersion: "2.0.0",
  rendererManifestHash: rendererManifest.hash,
});

describe("Ed25519 publication signing", () => {
  it("signs artifacts and releases with one domain-separated key", async () => {
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

    expect(error._tag).toBe("ContentSigningError");
    expect(error.stage).toBe("release");
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
      _tag: "SignedArtifactByteLimitError",
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
