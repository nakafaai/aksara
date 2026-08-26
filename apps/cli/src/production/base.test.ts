import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { inheritContentSnapshot } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { vi } from "vitest";
import {
  selectRecoveryBase,
  selectSourceBase,
  validateRecoveryBase,
  verifyBaseTryoutRuntimeBundle,
} from "#cli/production/base";
import { gitBundle, releaseId, runtimeBundleFor } from "#test/target";

vi.mock("@nakafa/aksara-contracts/tryout/runtime-bundle/verify", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    verifySignedTryoutRuntimeBundle: (input: { readonly bundle: unknown }) =>
      TestEffect.succeed(input.bundle),
  };
});

const HASH_B = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const SNAPSHOT_A = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);
const SNAPSHOT_B = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);
const ACTIVE = gitBundle("release-active", {
  baseReleaseId: releaseId("release-parent"),
  tryoutSnapshotId: SNAPSHOT_A,
});
const BASE = selectSourceBase(ACTIVE);
const resolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed("unused-test-public-key"),
});

/** Replaces signed manifest fields only for isolated recovery-identity tests. */
function withManifest(
  bundle: ContentReleaseBundle,
  fields: Partial<ContentReleaseBundle["release"]["manifest"]>
): ContentReleaseBundle {
  return {
    ...bundle,
    release: {
      ...bundle.release,
      manifest: { ...bundle.release.manifest, ...fields },
    },
  };
}

/** Runs base bundle verification with its explicit trust dependency supplied. */
function verifyBase(
  bundle: Parameters<typeof verifyBaseTryoutRuntimeBundle>[0],
  baseBundle: Parameters<typeof verifyBaseTryoutRuntimeBundle>[1],
  base: Parameters<typeof verifyBaseTryoutRuntimeBundle>[2]
) {
  return verifyBaseTryoutRuntimeBundle(bundle, baseBundle, base).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver)
  );
}

describe("production base identity", () => {
  it("selects source and complete recovery identities", () => {
    const candidate = gitBundle("release-candidate", {
      baseManifestHash: ACTIVE.release.manifestHash,
      baseReleaseId: ACTIVE.release.manifest.releaseId,
      tryoutSnapshotId: SNAPSHOT_A,
    });

    expect(selectSourceBase(null)).toBeNull();
    expect(BASE).toEqual({
      activeAppLocales: ACTIVE.release.manifest.activeAppLocales,
      manifestHash: ACTIVE.release.manifestHash,
      releaseId: ACTIVE.release.manifest.releaseId,
      resultCount: ACTIVE.release.manifest.resultCount,
      resultDigest: ACTIVE.release.manifest.resultDigest,
      snapshots: ACTIVE.release.manifest.snapshots,
    });
    expect(selectRecoveryBase(candidate)).toEqual({
      activeAppLocales: candidate.release.manifest.baseActiveAppLocales,
      manifestHash: candidate.release.manifest.baseManifestHash,
      releaseId: candidate.release.manifest.baseReleaseId,
      resultCount: candidate.release.manifest.baseResultCount,
      resultDigest: candidate.release.manifest.baseResultDigest,
      snapshots: candidate.release.manifest.snapshots,
    });
  });

  it("rejects every incomplete recovery identity", () => {
    const candidate = gitBundle("release-candidate", {
      baseManifestHash: ACTIVE.release.manifestHash,
      baseReleaseId: ACTIVE.release.manifest.releaseId,
    });
    expect(
      selectRecoveryBase(
        withManifest(candidate, { baseActiveAppLocales: null })
      )
    ).toBeNull();
    expect(
      selectRecoveryBase(withManifest(candidate, { baseReleaseId: null }))
    ).toBeNull();
    expect(
      selectRecoveryBase(withManifest(candidate, { baseManifestHash: null }))
    ).toBeNull();
  });

  it.effect("accepts only one runtime bundle bound to the active base", () =>
    Effect.gen(function* () {
      const runtimeBundle = runtimeBundleFor(ACTIVE, SNAPSHOT_A);
      expect(yield* verifyBase(null, ACTIVE, BASE)).toBeNull();

      const missingBaseBundle = yield* verifyBase(
        runtimeBundle,
        null,
        BASE
      ).pipe(Effect.flip);
      const missingBaseIdentity = yield* verifyBase(
        runtimeBundle,
        ACTIVE,
        null
      ).pipe(Effect.flip);
      const snapshotMismatch = yield* verifyBase(
        runtimeBundleFor(ACTIVE, SNAPSHOT_B),
        ACTIVE,
        BASE
      ).pipe(Effect.flip);

      expect(missingBaseBundle).toMatchObject({
        _tag: "BaseTryoutRuntimeBundleMismatchError",
        reason: "missing-base",
      });
      expect(missingBaseIdentity).toMatchObject({
        _tag: "BaseTryoutRuntimeBundleMismatchError",
        reason: "missing-base",
      });
      expect(snapshotMismatch).toMatchObject({
        _tag: "BaseTryoutRuntimeBundleMismatchError",
        reason: "snapshot",
      });
      expect(yield* verifyBase(runtimeBundle, ACTIVE, BASE)).toEqual(
        runtimeBundle
      );
    })
  );

  it.effect("names the first immutable recovery mismatch", () =>
    Effect.gen(function* () {
      const oneLocale = ActiveAppLocaleListSchema.make([
        AppLocaleSchema.make("en"),
      ]);
      const resultFailures = yield* Effect.all([
        validateRecoveryBase(null, BASE).pipe(Effect.flip),
        validateRecoveryBase(BASE, null).pipe(Effect.flip),
        validateRecoveryBase(BASE, {
          ...BASE,
          activeAppLocales: oneLocale,
        }).pipe(Effect.flip),
        validateRecoveryBase(BASE, {
          ...BASE,
          manifestHash: HASH_B,
        }).pipe(Effect.flip),
        validateRecoveryBase(BASE, {
          ...BASE,
          releaseId: ReleaseIdSchema.make("release-other"),
        }).pipe(Effect.flip),
        validateRecoveryBase(BASE, {
          ...BASE,
          resultCount: BASE.resultCount + 1,
        }).pipe(Effect.flip),
        validateRecoveryBase(BASE, {
          ...BASE,
          resultDigest: HASH_B,
        }).pipe(Effect.flip),
        validateRecoveryBase(BASE, {
          ...BASE,
          snapshots: {
            ...BASE.snapshots,
            tryout: inheritContentSnapshot(SNAPSHOT_B),
          },
        }).pipe(Effect.flip),
      ]);

      expect(resultFailures.map(({ field }) => field)).toEqual([
        "presence",
        "presence",
        "activeAppLocales",
        "manifestHash",
        "releaseId",
        "result",
        "result",
        "snapshots",
      ]);
      expect(yield* validateRecoveryBase(null, null)).toBeUndefined();
      expect(yield* validateRecoveryBase(BASE, { ...BASE })).toBeUndefined();
    })
  );
});
