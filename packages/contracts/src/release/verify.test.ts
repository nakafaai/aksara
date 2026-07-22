// @vitest-environment node

import { Buffer } from "node:buffer";
import {
  type BinaryLike,
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  Ed25519SignatureSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import {
  type ContentReleaseManifest,
  ContentReleaseManifestSchema,
  canonicalizeContentReleaseManifest,
  canonicalizeContentReleaseSigningInput,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import { verifySignedContentRelease } from "#contracts/release/verify";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic manifest-hashing failure. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves real Hash methods while intercepting the failure marker. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (
                typeof data === "string" &&
                data.includes('"releaseId":"hash-failure"')
              ) {
                throw new TypeError("injected manifest hash failure");
              }
              target.update(data);
              return receiver;
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

const keys = generateKeyPairSync("ed25519");
const keyId = SigningKeyIdSchema.make("test-signing-key");
const publicKeyPem = keys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseReleaseId: "test-release-parent",
  itemCount: 2,
  itemsDigest: `sha256:${"b".repeat(64)}`,
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"c".repeat(64)}`,
  releaseId: "test-release",
  rendererContractVersion: "2.0.0",
  rendererManifestHash: `sha256:${"d".repeat(64)}`,
});

/** Computes the canonical hash used by signed release test fixtures. */
function hashManifest(value: ContentReleaseManifest) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256")
      .update(canonicalizeContentReleaseManifest(value))
      .digest("hex")}`
  );
}

/** Produces a valid signed release for verification scenarios. */
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
  /** Resolves the trusted test key or fails with the production error shape. */
  resolve: (requestedKeyId) => {
    if (requestedKeyId === keyId) {
      return Effect.succeed(publicKeyPem);
    }
    return Effect.fail(new SigningKeyNotFoundError({ keyId: requestedKeyId }));
  },
});

/** Runs release verification and returns its expected typed failure. */
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
    ["origin", { origin: { kind: "git", sha: "e".repeat(40) } }],
    ["item count", { itemCount: 3 }],
    ["item digest", { itemsDigest: `sha256:${"f".repeat(64)}` }],
    ["projection count", { projectionCount: 2 }],
    ["projection digest", { projectionDigest: `sha256:${"e".repeat(64)}` }],
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

  it("maps manifest hashing failures to the release identity", async () => {
    const release = signRelease();
    const error = await reject({
      ...release,
      manifest: { ...release.manifest, releaseId: "hash-failure" },
    });

    expect(error).toMatchObject({
      _tag: "ReleaseHashComputationError",
      releaseId: "hash-failure",
    });
  });
});
