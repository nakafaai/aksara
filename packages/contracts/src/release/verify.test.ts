// @vitest-environment node

import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids.js";
import {
  type ContentReleaseManifest,
  ContentReleaseManifestSchema,
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "#contracts/release/spec.js";
import { verifySignedContentRelease } from "#contracts/release/verify.js";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec.js";

const keys = generateKeyPairSync("ed25519");
const keyId = SigningKeyIdSchema.make("test-signing-key");
const publicKeyPem = keys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  aksaraSha: "a".repeat(40),
  baseReleaseId: "test-release-parent",
  expectedCounts: {
    artifacts: 1,
    graphRows: 0,
    heads: 1,
    llmsDocuments: 1,
    routes: 1,
    searchRows: 1,
    sitemapEntries: 1,
  },
  expectedDigest: `sha256:${"c".repeat(64)}`,
  itemCount: 2,
  itemsDigest: `sha256:${"b".repeat(64)}`,
  releaseId: "test-release",
  rendererContractVersion: "1.0.0",
  rendererManifestHash: `sha256:${"d".repeat(64)}`,
});

function hashManifest(value: ContentReleaseManifest) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256")
      .update(canonicalizeContentReleaseManifest(value))
      .digest("hex")}`
  );
}

function signRelease(value = manifest): SignedContentRelease {
  const manifestHash = hashManifest(value);
  return SignedContentReleaseSchema.make({
    keyId,
    manifest: value,
    manifestHash,
    signature: Ed25519SignatureSchema.make(
      signBytes(
        null,
        Buffer.from(
          canonicalizeContentReleaseSigningInput(manifestHash, value),
          "utf8"
        ),
        keys.privateKey
      ).toString("base64url")
    ),
  });
}

const trustedResolver = ContentVerificationKeyResolver.of({
  resolve: (requestedKeyId) => {
    if (requestedKeyId === keyId) {
      return Effect.succeed(publicKeyPem);
    }
    return Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId }));
  },
});

function reject(input: unknown, resolver = trustedResolver) {
  return Effect.runPromise(
    verifySignedContentRelease(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, resolver),
      Effect.flip
    )
  );
}

describe("server-only release verification", () => {
  it("authenticates the complete constant-size manifest", async () => {
    const release = signRelease();

    await expect(
      Effect.runPromise(
        verifySignedContentRelease(release).pipe(
          Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
        )
      )
    ).resolves.toEqual(release);
  });

  it.each([
    ["base release", { baseReleaseId: "test-release-other" }],
    ["Aksara SHA", { aksaraSha: "e".repeat(40) }],
    ["item count", { itemCount: 3 }],
    ["item digest", { itemsDigest: `sha256:${"f".repeat(64)}` }],
    ["projection digest", { expectedDigest: `sha256:${"e".repeat(64)}` }],
    ["renderer manifest", { rendererManifestHash: `sha256:${"f".repeat(64)}` }],
  ])("rejects a mutated %s", async (_label, values) => {
    const release = signRelease();
    const error = await reject({
      ...release,
      manifest: { ...release.manifest, ...values },
    });

    expect(error._tag).toBe("ReleaseManifestHashMismatchError");
  });

  it("rejects a recomputed hash without a new release signature", async () => {
    const release = signRelease();
    const changedManifest = ContentReleaseManifestSchema.make({
      ...release.manifest,
      itemCount: 3,
    });
    const error = await reject({
      ...release,
      manifest: changedManifest,
      manifestHash: hashManifest(changedManifest),
    });

    expect(error._tag).toBe("SignatureInvalidError");
  });

  it("does not expose resolved key contents in failures", async () => {
    const sensitiveKey = "must-not-appear-in-verification-errors";
    const resolver = ContentVerificationKeyResolver.of({
      resolve: () => Effect.succeed(sensitiveKey),
    });
    const error = await reject(signRelease(), resolver);

    expect(error._tag).toBe("PublicKeyParseError");
    expect(JSON.stringify(error)).not.toContain(sensitiveKey);
  });

  it("rejects excess fields without exposing source values", async () => {
    const sensitiveSource = "must-not-appear-in-decode-errors";
    const release = signRelease();
    const error = await reject({
      ...release,
      manifest: { ...release.manifest, sensitiveSource },
    });

    expect(error._tag).toBe("ReleaseVerificationDecodeError");
    expect(JSON.stringify(error)).not.toContain(sensitiveSource);
  });
});
