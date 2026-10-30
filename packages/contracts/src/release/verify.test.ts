// @vitest-environment node
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
import { replacementSnapshots } from "#contracts/test/request";
import {
  verificationBaseReleaseId as baseReleaseId,
  verificationManifest as manifest,
  verificationRendererManifest as rendererManifest,
  signVerificationRelease as signRelease,
  verificationKeyResolver as trustedResolver,
} from "#contracts/test/verification";
import { encodeJsonText } from "#contracts/text/json";

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
/** Pinned manifest hash of the fixture that the test-only Ed25519 key signs. */
const pinnedManifestHash = Sha256HashSchema.make(
  "sha256:9ac286f3b056213a8189323e40dc61f4faf9c88fad737fe5bc51914794f5e155"
);

/** Test-only Ed25519 public key. Its private key in signing.test.ts signs the pinned fixture. */
const pinnedPublicKeyPem =
  "-----BEGIN PUBLIC KEY-----\nMCowBQYDK2VwAyEAIy9gDOrxSWb2JvlHFvwW8yMjuqsa17V5qkSAaVjzqlk=\n-----END PUBLIC KEY-----\n";

/** Ed25519 signature of the pinned fixture, made by the test-only private key. */
const pinnedSignature =
  "Dap_k-bU2BnXbB1del6o-MPeGIaljjRDLGTJ37JnleO8B4Ck92S6yF66E14vlFGSbccGlns0PL9ZnD-wEjvxDA";

const pinnedResolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed(pinnedPublicKeyPem),
});

describe("server-only release verification", () => {
  it.effect("authenticates the complete constant-size manifest", () =>
    Effect.gen(function* () {
      const release = yield* signRelease();
      expect(
        yield* verifySignedContentRelease(release).pipe(
          Effect.provideService(ContentVerificationKeyResolver, trustedResolver)
        )
      ).toEqual(release);
    })
  );
  it.effect(
    "rejects retired exact-content scope at the signed release boundary",
    () =>
      Effect.gen(function* () {
        const release = yield* signRelease();
        const error = yield* reject({
          ...release,
          manifest: {
            ...release.manifest,
            scope: { ...release.manifest.scope, content: [] },
          },
        });
        expect(error).toBeInstanceOf(ReleaseVerificationDecodeError);
      })
  );
  it.effect(
    "authenticates the signed release and frozen renderer as one bundle",
    () =>
      Effect.gen(function* () {
        const release = yield* signRelease();
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
      const rollback = yield* signRelease(rollbackManifest);
      expect(
        yield* verifyRollbackBundle({ release: rollback, rendererManifest })
      ).toEqual({ release: rollback, rendererManifest });
      const error = yield* verifyRollbackContentReleaseBundle({
        release: yield* signRelease(),
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
      const release = yield* signRelease();
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
        release: yield* signRelease(corruptManifest),
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
      const release = yield* signRelease();
      const error = yield* reject({
        ...release,
        manifest: { ...release.manifest, ...values },
      });
      expect(error._tag).toBe("ReleaseManifestHashMismatchError");
    })
  );
  it.effect("rejects a recomputed hash without a new release signature", () =>
    Effect.gen(function* () {
      const release = yield* signRelease();
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
      const error = yield* reject(yield* signRelease(), resolver);
      expect(error._tag).toBe("PublicKeyParseError");
      expect(encodeJsonText(error)).not.toContain(sensitiveKey);
    })
  );
  it.effect("rejects excess fields without exposing source values", () =>
    Effect.gen(function* () {
      const sensitiveSource = "must-not-appear-in-decode-errors";
      const release = yield* signRelease();
      const error = yield* reject({
        ...release,
        manifest: { ...release.manifest, sensitiveSource },
      });
      expect(error._tag).toBe("ReleaseVerificationDecodeError");
      expect(encodeJsonText(error)).not.toContain(sensitiveSource);
    })
  );
  it.effect(
    "accepts the pinned Ed25519 signature and rejects a wrong hash",
    () =>
      Effect.gen(function* () {
        const release = yield* verifySignedContentRelease({
          keyId: "test-pinned-key",
          manifest,
          manifestHash: pinnedManifestHash,
          signature: pinnedSignature,
        }).pipe(
          Effect.provideService(ContentVerificationKeyResolver, pinnedResolver)
        );
        const error = yield* verifySignedContentRelease({
          keyId: "test-pinned-key",
          manifest,
          manifestHash: `sha256:${"0".repeat(64)}`,
          signature: pinnedSignature,
        }).pipe(
          Effect.provideService(ContentVerificationKeyResolver, pinnedResolver),
          Effect.flip
        );

        expect(release.manifestHash).toBe(pinnedManifestHash);
        expect("actualHash" in error ? error.actualHash : undefined).toBe(
          pinnedManifestHash
        );
      })
  );
});
