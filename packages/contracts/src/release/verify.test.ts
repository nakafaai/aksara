// @vitest-environment node
import { Buffer } from "node:buffer";
import {
  type BinaryLike,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "#contracts/ids";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { canonicalizeContentReleaseSigningInput } from "#contracts/release/signing";
import {
  emptyContentSnapshots,
  invertContentSnapshots,
} from "#contracts/release/snapshot";
import {
  ContentReleaseManifestSchema,
  type SignedContentRelease,
  SignedContentReleaseSchema,
} from "#contracts/release/spec";
import {
  verifyContentReleaseBundle,
  verifyRollbackContentReleaseBundle,
  verifySignedContentRelease,
} from "#contracts/release/verify";
import { rendererDomains } from "#contracts/renderer/contract";
import { createRendererManifest } from "#contracts/renderer/manifest";
import {
  ContentVerificationKeyResolver,
  SigningKeyNotFoundError,
} from "#contracts/signature/spec";
import { replacementSnapshots } from "#contracts/test/request";

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
const baseReleaseId = ReleaseIdSchema.make("test-release-parent");
const publicKeyPem = keys.publicKey
  .export({ format: "pem", type: "spki" })
  .toString();
const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: rendererDomains({}),
  })
);
const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseManifestHash: `sha256:${"d".repeat(64)}`,
  baseReleaseId,
  baseResultCount: 1,
  baseResultDigest: `sha256:${"e".repeat(64)}`,
  deleteCount: 1,
  itemCount: 2,
  itemsDigest: `sha256:${"b".repeat(64)}`,
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"c".repeat(64)}`,
  releaseId: "test-release",
  rendererContractVersion: "1.0.0",
  rendererManifestHash: rendererManifest.hash,
  resultCount: 1,
  resultDigest: `sha256:${"f".repeat(64)}`,
  rollbackCount: 2,
  rollbackDigest: `sha256:${"1".repeat(64)}`,
  routeCount: 0,
  routeDigest: `sha256:${"1".repeat(64)}`,
  snapshots: emptyContentSnapshots(),
  upsertCount: 1,
});
/** Produces a valid signed release for verification scenarios. */
function signRelease(value = manifest): SignedContentRelease {
  const manifestHash = Effect.runSync(hashContentReleaseManifest(value));
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
/** Runs bundle verification with the trusted test resolver. */
function verifyBundle(input: unknown) {
  return Effect.runPromise(
    verifyContentReleaseBundle(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
    )
  );
}
/** Runs rollback-only bundle verification with the trusted test resolver. */
function verifyRollbackBundle(input: unknown) {
  return Effect.runPromise(
    verifyRollbackContentReleaseBundle(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
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
  it("authenticates the signed release and frozen renderer as one bundle", async () => {
    const release = signRelease();
    await expect(verifyBundle({ release, rendererManifest })).resolves.toEqual({
      release,
      rendererManifest,
    });
  });
  it("accepts only rollback-owned bundles at recovery boundaries", async () => {
    const rollbackManifest = ContentReleaseManifestSchema.make({
      ...manifest,
      origin: { kind: "rollback", releaseId: baseReleaseId },
      snapshots: invertContentSnapshots(manifest.snapshots),
    });
    const rollback = signRelease(rollbackManifest);
    await expect(
      verifyRollbackBundle({ release: rollback, rendererManifest })
    ).resolves.toEqual({ release: rollback, rendererManifest });
    const error = await Effect.runPromise(
      verifyRollbackContentReleaseBundle({
        release: signRelease(),
        rendererManifest,
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, trustedResolver),
        Effect.flip
      )
    );
    expect(error._tag).toBe("ReleaseBundleVerificationDecodeError");
  });
  it("rejects mismatched or corrupted frozen renderer evidence", async () => {
    const release = signRelease();
    const mismatched = await Effect.runPromise(
      verifyContentReleaseBundle({
        release,
        rendererManifest: {
          ...rendererManifest,
          hash: `sha256:${"e".repeat(64)}`,
        },
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, trustedResolver),
        Effect.flip
      )
    );
    expect(mismatched).toMatchObject({
      _tag: "ReleaseBundleVerificationDecodeError",
    });
    const corruptHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
    const corruptManifest = ContentReleaseManifestSchema.make({
      ...manifest,
      rendererManifestHash: corruptHash,
    });
    const corrupted = await Effect.runPromise(
      verifyContentReleaseBundle({
        release: signRelease(corruptManifest),
        rendererManifest: { ...rendererManifest, hash: corruptHash },
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, trustedResolver),
        Effect.flip
      )
    );
    expect(corrupted).toMatchObject({
      _tag: "RendererManifestHashMismatchError",
    });
  });
  it.each([
    ["base manifest", { baseManifestHash: `sha256:${"2".repeat(64)}` }],
    ["base release", { baseReleaseId: "test-release-other" }],
    ["base result count", { baseResultCount: 2 }],
    ["base result digest", { baseResultDigest: `sha256:${"2".repeat(64)}` }],
    ["origin", { origin: { kind: "git", sha: "e".repeat(40) } }],
    ["item count", { itemCount: 3, rollbackCount: 3, upsertCount: 2 }],
    ["item digest", { itemsDigest: `sha256:${"f".repeat(64)}` }],
    ["projection count", { projectionCount: 2 }],
    ["projection digest", { projectionDigest: `sha256:${"e".repeat(64)}` }],
    ["result count", { resultCount: 2 }],
    ["result digest", { resultDigest: `sha256:${"2".repeat(64)}` }],
    ["rollback digest", { rollbackDigest: `sha256:${"2".repeat(64)}` }],
    ["renderer manifest", { rendererManifestHash: `sha256:${"f".repeat(64)}` }],
    ["structured snapshots", { snapshots: replacementSnapshots }],
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
      rollbackCount: 3,
      upsertCount: 2,
    });
    const error = await reject({
      ...release,
      manifest: changedManifest,
      manifestHash: Effect.runSync(hashContentReleaseManifest(changedManifest)),
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
