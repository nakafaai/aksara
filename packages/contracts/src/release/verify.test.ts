// @vitest-environment node
import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import { hashContentReleaseManifest } from "#contracts/release/hash";
import { invertContentSnapshots } from "#contracts/release/snapshot/spec";
import { ContentReleaseManifestSchema } from "#contracts/release/spec";
import {
  ReleaseVerificationDecodeError,
  verifyContentReleaseBundle,
  verifyRollbackContentReleaseBundle,
  verifySignedContentRelease,
} from "#contracts/release/verify";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import {
  verificationBaseReleaseId as baseReleaseId,
  verificationManifest as manifest,
  verificationRendererManifest as rendererManifest,
  signVerificationRelease as signRelease,
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
/** Returns the expected typed release verification failure. */
function reject(input: unknown, resolver = trustedResolver) {
  return verifySignedContentRelease(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver),
    Effect.flip
  );
}
/** Verifies one bundle with the trusted test resolver. */
function verifyBundle(input: unknown) {
  return verifyContentReleaseBundle(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
  );
}
/** Verifies one rollback-only bundle with the trusted test resolver. */
function verifyRollbackBundle(input: unknown) {
  return verifyRollbackContentReleaseBundle(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
  );
}
describe("server-only release verification", () => {
  it.effect("authenticates the complete constant-size manifest", () =>
    Effect.gen(function* () {
      const release = signRelease();
      expect(
        yield* verifySignedContentRelease(release).pipe(
          Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
        )
      ).toEqual(release);
    })
  );
  it.effect(
    "authenticates predecessor releases without weakening new scope bytes",
    () =>
      Effect.gen(function* () {
        const legacyManifest = ContentReleaseManifestSchema.make({
          ...manifest,
          scope: {
            content: [],
            families: manifest.scope.families,
            snapshots: manifest.scope.snapshots,
          },
        });
        const release = signRelease(legacyManifest);

        expect(
          yield* verifySignedContentRelease(release).pipe(
            Effect.provideService(
              ContentVerificationKeyResolver,
              trustedResolver
            )
          )
        ).toEqual(release);
      })
  );
  it.effect("maps current decoding and hashing failures", () =>
    Effect.gen(function* () {
      const release = signRelease();
      const [decodeError, hashError] = yield* Effect.all([
        reject({ unexpected: true }),
        reject({
          ...release,
          manifest: { ...release.manifest, releaseId: "hash-failure" },
        }),
      ]);

      expect(decodeError).toBeInstanceOf(ReleaseVerificationDecodeError);
      expect(hashError).toMatchObject({
        _tag: "ReleaseHashComputationError",
        releaseId: "hash-failure",
      });
    })
  );
  it.effect(
    "authenticates the signed release and frozen renderer as one bundle",
    () =>
      Effect.gen(function* () {
        const release = signRelease();
        expect(yield* verifyBundle({ release, rendererManifest })).toEqual({
          release,
          rendererManifest,
        });
      })
  );
  it.effect("accepts only rollback-owned bundles at recovery boundaries", () =>
    Effect.gen(function* () {
      const rollbackManifest = ContentReleaseManifestSchema.make({
        ...manifest,
        origin: { kind: "rollback", releaseId: baseReleaseId },
        snapshots: invertContentSnapshots(manifest.snapshots),
      });
      const rollback = signRelease(rollbackManifest);
      expect(
        yield* verifyRollbackBundle({ release: rollback, rendererManifest })
      ).toEqual({ release: rollback, rendererManifest });
      const error = yield* verifyRollbackContentReleaseBundle({
        release: signRelease(),
        rendererManifest,
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, trustedResolver),
        Effect.flip
      );
      expect(error._tag).toBe("ReleaseBundleVerificationDecodeError");
    })
  );
  it.effect("rejects mismatched or corrupted frozen renderer evidence", () =>
    Effect.gen(function* () {
      const release = signRelease();
      const mismatched = yield* verifyContentReleaseBundle({
        release,
        rendererManifest: {
          ...rendererManifest,
          hash: `sha256:${"e".repeat(64)}`,
        },
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, trustedResolver),
        Effect.flip
      );
      expect(mismatched).toMatchObject({
        _tag: "ReleaseBundleVerificationDecodeError",
      });
      const corruptHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);
      const corruptManifest = ContentReleaseManifestSchema.make({
        ...manifest,
        rendererManifestHash: corruptHash,
      });
      const corrupted = yield* verifyContentReleaseBundle({
        release: signRelease(corruptManifest),
        rendererManifest: { ...rendererManifest, hash: corruptHash },
      }).pipe(
        Effect.provideService(ContentVerificationKeyResolver, trustedResolver),
        Effect.flip
      );
      expect(corrupted).toMatchObject({
        _tag: "RendererManifestHashMismatchError",
      });
    })
  );
  it.effect.each([
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
  ] as const)("rejects a mutated %s", ([_label, values]) =>
    Effect.gen(function* () {
      const release = signRelease();
      const error = yield* reject({
        ...release,
        manifest: { ...release.manifest, ...values },
      });
      expect(error._tag).toBe("ReleaseManifestHashMismatchError");
    })
  );
  it.effect("rejects a recomputed hash without a new release signature", () =>
    Effect.gen(function* () {
      const release = signRelease();
      const changedManifest = ContentReleaseManifestSchema.make({
        ...release.manifest,
        itemCount: 3,
        rollbackCount: 3,
        upsertCount: 2,
      });
      const error = yield* reject({
        ...release,
        manifest: changedManifest,
        manifestHash: yield* hashContentReleaseManifest(changedManifest),
      });
      expect(error._tag).toBe("SignatureInvalidError");
    })
  );
  it.effect("does not expose resolved key contents in failures", () =>
    Effect.gen(function* () {
      const sensitiveKey = "must-not-appear-in-verification-errors";
      const resolver = ContentVerificationKeyResolver.of({
        resolve: () => Effect.succeed(sensitiveKey),
      });
      const error = yield* reject(signRelease(), resolver);
      expect(error._tag).toBe("PublicKeyParseError");
      expect(JSON.stringify(error)).not.toContain(sensitiveKey);
    })
  );
  it.effect("rejects excess fields without exposing source values", () =>
    Effect.gen(function* () {
      const sensitiveSource = "must-not-appear-in-decode-errors";
      const release = signRelease();
      const error = yield* reject({
        ...release,
        manifest: { ...release.manifest, sensitiveSource },
      });
      expect(error._tag).toBe("ReleaseVerificationDecodeError");
      expect(JSON.stringify(error)).not.toContain(sensitiveSource);
    })
  );
  it.effect("maps manifest hashing failures to the release identity", () =>
    Effect.gen(function* () {
      const release = signRelease();
      const error = yield* reject({
        ...release,
        manifest: { ...release.manifest, releaseId: "hash-failure" },
      });
      expect(error).toMatchObject({
        _tag: "ReleaseHashComputationError",
        releaseId: "hash-failure",
      });
    })
  );
});
