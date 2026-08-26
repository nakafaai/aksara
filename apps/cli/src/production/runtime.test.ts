import { assert, beforeEach, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  ContentReleaseManifestSchema,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { hashContentReleaseManifest } from "@nakafa/aksara-contracts/release/hash";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { replaceContentSnapshot } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { vi } from "vitest";
import { selectSourceBase } from "#cli/production/base";
import {
  selectTryoutRuntimeTransition,
  verifyBaseTryoutRuntimeBundle,
} from "#cli/production/runtime";
import { productionCalls, productionProgram } from "#test/production/harness";
import { FUNCTION_SCOPE, RENDERER_MANIFEST } from "#test/real";
import {
  completedBundle,
  currentState,
  gitBundle,
  recoveryBundle,
  releaseId,
  runtimeBundleFor,
} from "#test/target";

const calls = productionCalls();
const TRYOUT_SNAPSHOT_ID = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);
const OTHER_SNAPSHOT_ID = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);
const resolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed("unused-test-public-key"),
});

vi.mock("@nakafa/aksara-contracts/tryout/runtime/verify", async () => {
  const { Effect: TestEffect } = await import("effect");
  return {
    verifySignedTryoutRuntimeBundle: (input: { readonly bundle: unknown }) =>
      TestEffect.succeed(input.bundle),
  };
});

/** Runs runtime verification with its explicit trust dependency supplied. */
function verifyBase(
  bundle: Parameters<typeof verifyBaseTryoutRuntimeBundle>[0],
  baseBundle: Parameters<typeof verifyBaseTryoutRuntimeBundle>[1],
  base: Parameters<typeof verifyBaseTryoutRuntimeBundle>[2]
) {
  return verifyBaseTryoutRuntimeBundle(bundle, baseBundle, base).pipe(
    Effect.provideService(ContentVerificationKeyResolver, resolver)
  );
}

/** Activates one release whose try-out snapshot can be inherited. */
function activateTryoutBase(includeRuntimeBundle: boolean) {
  const active = gitBundle("release-active", {
    baseReleaseId: releaseId("release-parent"),
    tryoutSnapshotId: TRYOUT_SNAPSHOT_ID,
  });
  calls.current = currentState({
    active: completedBundle(active),
    candidate: null,
    recovery: null,
    ...(includeRuntimeBundle
      ? { tryoutRuntimeBundle: runtimeBundleFor(active, TRYOUT_SNAPSHOT_ID) }
      : {}),
  });
}

beforeEach(() => {
  calls.reset();
  activateTryoutBase(false);
});

describe("production runtime bundle preparation", () => {
  it.effect("accepts only the bundle bound to the active base", () =>
    Effect.gen(function* () {
      const active = gitBundle("release-runtime-base", {
        baseReleaseId: releaseId("release-runtime-parent"),
        tryoutSnapshotId: TRYOUT_SNAPSHOT_ID,
      });
      const base = selectSourceBase(active);
      const runtimeBundle = runtimeBundleFor(active, TRYOUT_SNAPSHOT_ID);

      assert.isNull(yield* verifyBase(null, active, base));
      for (const [effect, reason] of [
        [verifyBase(runtimeBundle, null, base), "missing-base"],
        [verifyBase(runtimeBundle, active, null), "missing-base"],
      ] as const) {
        const failure = yield* effect.pipe(Effect.flip);
        if (failure._tag !== "BaseTryoutRuntimeBundleMismatchError") {
          return yield* Effect.die(
            `Expected a base runtime mismatch, received ${failure._tag}.`
          );
        }
        assert.strictEqual(failure.reason, reason);
      }
      assert.deepStrictEqual(
        yield* verifyBase(runtimeBundle, active, base),
        runtimeBundle
      );

      const recovered = recoveryBundle("release-runtime-recovered", active);
      assert.deepStrictEqual(
        yield* verifyBase(
          runtimeBundle,
          recovered,
          selectSourceBase(recovered)
        ),
        runtimeBundle
      );

      const replacementManifest = ContentReleaseManifestSchema.make({
        ...active.release.manifest,
        scope: PublicationScopeSchema.make({
          families: active.release.manifest.scope.families,
          snapshots: ["tryout"],
        }),
        snapshots: {
          ...active.release.manifest.snapshots,
          tryout: replaceContentSnapshot({
            baseSnapshotId: OTHER_SNAPSHOT_ID,
            resultSnapshotId: TRYOUT_SNAPSHOT_ID,
            rowCount: 1,
            rowDigest: OTHER_SNAPSHOT_ID,
          }),
        },
      });
      const replacement = {
        ...active,
        release: SignedContentReleaseSchema.make({
          ...active.release,
          manifest: replacementManifest,
          manifestHash: yield* hashContentReleaseManifest(replacementManifest),
        }),
      };
      const retainedFailure = yield* verifyBase(
        runtimeBundleFor(replacement, OTHER_SNAPSHOT_ID),
        replacement,
        selectSourceBase(replacement)
      ).pipe(Effect.flip);
      if (retainedFailure._tag !== "BaseTryoutRuntimeBundleMismatchError") {
        return yield* Effect.die(
          `Expected a base runtime mismatch, received ${retainedFailure._tag}.`
        );
      }
      assert.strictEqual(retainedFailure.reason, "snapshot");

      const foreign = gitBundle("release-runtime-foreign", {
        baseReleaseId: releaseId("release-runtime-parent"),
        tryoutSnapshotId: TRYOUT_SNAPSHOT_ID,
      });
      const sourceFailure = yield* verifyBase(
        runtimeBundleFor(foreign, TRYOUT_SNAPSHOT_ID),
        active,
        base
      ).pipe(Effect.flip);
      if (sourceFailure._tag !== "TryoutRuntimeBundleSourceError") {
        return yield* Effect.die(
          `Expected a runtime source mismatch, received ${sourceFailure._tag}.`
        );
      }
      assert.strictEqual(sourceFailure.reason, "release");
    })
  );

  it.effect("selects every exact candidate and recovery runtime shape", () =>
    Effect.gen(function* () {
      const active = gitBundle("release-runtime-transition", {
        baseReleaseId: releaseId("release-runtime-parent"),
        tryoutSnapshotId: TRYOUT_SNAPSHOT_ID,
      });
      const base = selectSourceBase(active);
      const bundle = runtimeBundleFor(active, TRYOUT_SNAPSHOT_ID);
      const result = {
        ...bundle.payload.snapshot,
        snapshotId: OTHER_SNAPSHOT_ID,
      };
      const refreshedRendererManifest = yield* createRendererManifest({
        base: {
          authoringComponents: [
            ...RENDERER_MANIFEST.base.authoringComponents,
            { name: "RuntimePairProbe", version: 1 },
          ],
          supportedComponents: [
            ...RENDERER_MANIFEST.base.supportedComponents,
            { name: "RuntimePairProbe", version: 1 },
          ],
        },
        domains: RENDERER_MANIFEST.domains,
        publishedDomains: RENDERER_MANIFEST.publishedDomains,
      });

      assert.isNull(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle,
          rendererManifest: RENDERER_MANIFEST,
          snapshot: null,
        })
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base: null,
          bundle: null,
          rendererManifest: RENDERER_MANIFEST,
          snapshot: result,
        }),
        { recovery: null, result }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle,
          rendererManifest: refreshedRendererManifest,
          snapshot: bundle.payload.snapshot,
        }),
        { recovery: null, result: bundle.payload.snapshot }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle,
          rendererManifest: RENDERER_MANIFEST,
          snapshot: result,
        }),
        { recovery: null, result }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeTransition({
          base,
          bundle,
          rendererManifest: refreshedRendererManifest,
          snapshot: result,
        }),
        { recovery: bundle.payload.snapshot, result }
      );
      const missing = yield* selectTryoutRuntimeTransition({
        base,
        bundle: null,
        rendererManifest: refreshedRendererManifest,
        snapshot: result,
      }).pipe(Effect.flip);
      assert.strictEqual(missing._tag, "BaseTryoutRuntimeBundleMismatchError");
      assert.strictEqual(missing.reason, "missing-recovery");
    })
  );

  it.effect("rebuilds an inherited snapshot for a new renderer pair", () =>
    Effect.gen(function* () {
      const refreshedRendererManifest = yield* createRendererManifest({
        base: {
          authoringComponents: [
            ...RENDERER_MANIFEST.base.authoringComponents,
            { name: "RuntimePairProbe", version: 1 },
          ],
          supportedComponents: [
            ...RENDERER_MANIFEST.base.supportedComponents,
            { name: "RuntimePairProbe", version: 1 },
          ],
        },
        domains: RENDERER_MANIFEST.domains,
        publishedDomains: RENDERER_MANIFEST.publishedDomains,
      });
      calls.rendererManifestOverride = refreshedRendererManifest;
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-renderer"),
        releaseId: releaseId("release-renderer"),
        scope: FUNCTION_SCOPE,
      });
      assert.strictEqual(receipt.releaseId, "release-renderer");
      assert.strictEqual(calls.runtimeBundleRefreshes, 1);
      assert.strictEqual(calls.snapshotCalls, 1);
    })
  );

  it.effect("bootstraps a missing permanent bundle", () =>
    Effect.gen(function* () {
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-bootstrap"),
        releaseId: releaseId("release-bootstrap"),
        scope: FUNCTION_SCOPE,
      });
      assert.strictEqual(receipt.releaseId, "release-bootstrap");
      assert.strictEqual(calls.runtimeBundleRefreshes, 1);
      assert.strictEqual(calls.snapshotCalls, 1);
    })
  );

  it.effect("reuses the unchanged runtime pair", () =>
    Effect.gen(function* () {
      activateTryoutBase(true);
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-reuse"),
        releaseId: releaseId("release-reuse"),
        scope: FUNCTION_SCOPE,
      });
      assert.strictEqual(receipt.releaseId, "release-reuse");
      assert.strictEqual(calls.runtimeBundleRefreshes, 0);
      assert.strictEqual(calls.runtimeResultSnapshotId, TRYOUT_SNAPSHOT_ID);
      assert.strictEqual(calls.snapshotCalls, 0);
    })
  );
});
