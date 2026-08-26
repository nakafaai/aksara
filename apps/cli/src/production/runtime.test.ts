import { assert, beforeEach, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { vi } from "vitest";
import { selectSourceBase } from "#cli/production/base";
import { verifyBaseTryoutRuntimeBundle } from "#cli/production/runtime";
import { productionCalls, productionProgram } from "#test/production/harness";
import { FUNCTION_SCOPE, RENDERER_MANIFEST } from "#test/real";
import {
  completedBundle,
  currentState,
  gitBundle,
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
        [
          verifyBase(runtimeBundleFor(active, OTHER_SNAPSHOT_ID), active, base),
          "snapshot",
        ],
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
      assert.strictEqual(calls.snapshotCalls, 0);
    })
  );
});
