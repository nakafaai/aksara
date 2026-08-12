// @vitest-environment node
import type { BinaryLike } from "node:crypto";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import { Sha256HashSchema } from "#contracts/ids";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { invertContentSnapshots } from "#contracts/release/snapshot/spec";
import { ContentReleaseManifestSchema } from "#contracts/release/spec";
import {
  ReleaseBundleVerificationDecodeError,
  ReleaseVerificationDecodeError,
  verifyContentReleaseBundle,
  verifyRollbackContentReleaseBundle,
  verifySignedContentRelease,
  verifySignedContentReleaseWire,
} from "#contracts/release/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import {
  verificationBaseReleaseId as baseReleaseId,
  verificationManifest as manifest,
  verificationRendererManifest as rendererManifest,
  signVerificationRelease as signRelease,
  signVerificationReleaseV2 as signReleaseV2,
  verificationKeyResolver as trustedResolver,
} from "#contracts/test/release-verification";
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
/** Runs release verification and returns its expected typed failure. */
function reject(input: unknown, resolver = trustedResolver) {
  return Effect.runPromise(
    verifySignedContentRelease(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, resolver),
      Effect.flip
    )
  );
}
/** Runs historical or current wire verification and returns its typed failure. */
function rejectWire(input: unknown) {
  return Effect.runPromise(
    verifySignedContentReleaseWire(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, trustedResolver),
      Effect.flip
    )
  );
}
/** Authenticates one historical or current release with the trusted test key. */
function verifyWire(input: unknown) {
  return Effect.runPromise(
    verifySignedContentReleaseWire(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
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
/** Returns one typed production bundle decoding or verification failure. */
function rejectBundle(input: unknown) {
  return Effect.runPromise(
    verifyContentReleaseBundle(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, trustedResolver),
      Effect.flip
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
  it("authenticates both signed wire generations without widening v1", async () => {
    const historical = signRelease();
    const current = signReleaseV2();

    await expect(verifyWire(historical)).resolves.toEqual(historical);
    await expect(verifyWire(current)).resolves.toEqual(current);
    await expect(
      rejectBundle({ release: current, rendererManifest })
    ).resolves.toBeInstanceOf(ReleaseBundleVerificationDecodeError);
    await expect(
      Effect.runPromise(
        verifySignedContentRelease(current).pipe(
          Effect.provideService(
            ContentVerificationKeyResolver,
            trustedResolver
          ),
          Effect.flip
        )
      )
    ).resolves.toBeInstanceOf(ReleaseVerificationDecodeError);
  });
  it("maps current wire decoding and hashing failures", async () => {
    const current = signReleaseV2();
    const [decodeError, hashError] = await Promise.all([
      rejectWire({ unexpected: true }),
      rejectWire({
        ...current,
        manifest: { ...current.manifest, releaseId: "hash-failure" },
      }),
    ]);

    expect(decodeError).toBeInstanceOf(ReleaseVerificationDecodeError);
    expect(hashError).toMatchObject({
      _tag: "ReleaseHashComputationError",
      releaseId: "hash-failure",
    });
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
