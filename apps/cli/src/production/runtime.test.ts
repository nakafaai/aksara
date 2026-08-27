import { assert, beforeEach, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { LEGACY_TRYOUT_RUNTIME } from "@nakafa/aksara-contracts/release/current/legacy";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import { selectSourceBase } from "#cli/production/base";
import { selectTryoutRuntimeRefresh } from "#cli/production/runtime";
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
const refreshedRendererManifest = createRendererManifest({
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
const rendererScope = PublicationScopeSchema.make({
  families: ["article", "material", "page", "question"],
  snapshots: ["tryout"],
});
const tryoutScope = PublicationScopeSchema.make({
  families: [],
  snapshots: ["tryout"],
});

/** Activates one release whose try-out snapshot can be inherited. */
function activateTryoutBase(includeRuntimeBundle: boolean) {
  const active = gitBundle("release-active", {
    baseReleaseId: releaseId("release-parent"),
    tryoutSnapshotId: TRYOUT_SNAPSHOT_ID,
  });
  const predecessor = {
    ...active,
    release: {
      ...active.release,
      manifest: {
        ...active.release.manifest,
        releaseId: LEGACY_TRYOUT_RUNTIME.releaseId,
        rendererManifestHash: LEGACY_TRYOUT_RUNTIME.rendererManifestHash,
        snapshots: {
          ...active.release.manifest.snapshots,
          tryout: {
            ...active.release.manifest.snapshots.tryout,
            baseSnapshotId: LEGACY_TRYOUT_RUNTIME.snapshotId,
            resultSnapshotId: LEGACY_TRYOUT_RUNTIME.snapshotId,
          },
        },
      },
      manifestHash: LEGACY_TRYOUT_RUNTIME.manifestHash,
    },
    rendererManifest: {
      ...active.rendererManifest,
      hash: LEGACY_TRYOUT_RUNTIME.rendererManifestHash,
    },
  };
  const completed = completedBundle(
    includeRuntimeBundle ? active : predecessor
  );
  calls.current = currentState({
    active: includeRuntimeBundle
      ? completed
      : {
          ...completed,
          receipt: {
            ...completed.receipt,
            manifestHash: LEGACY_TRYOUT_RUNTIME.manifestHash,
          },
        },
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
  it.effect("refreshes runtime bundles only inside explicit tryout scope", () =>
    Effect.gen(function* () {
      const active = gitBundle("release-runtime-selection", {
        baseReleaseId: releaseId("release-runtime-parent"),
        tryoutSnapshotId: TRYOUT_SNAPSHOT_ID,
      });
      const base = selectSourceBase(active);
      const bundle = runtimeBundleFor(active, TRYOUT_SNAPSHOT_ID);
      const refreshedRenderer = yield* refreshedRendererManifest;
      const noTryoutBase = selectSourceBase(
        gitBundle("release-without-tryout", {
          baseReleaseId: releaseId("release-runtime-parent"),
        })
      );

      const missingScope = yield* selectTryoutRuntimeRefresh({
        base,
        bundle: null,
        rendererManifest: RENDERER_MANIFEST,
        scope: FUNCTION_SCOPE,
      }).pipe(Effect.flip);
      assert.strictEqual(missingScope._tag, "ReleasePolicyClosureError");
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeRefresh({
          base: null,
          bundle: null,
          rendererManifest: RENDERER_MANIFEST,
          scope: tryoutScope,
        }),
        { kind: "stable" }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeRefresh({
          base: noTryoutBase,
          bundle: null,
          rendererManifest: RENDERER_MANIFEST,
          scope: tryoutScope,
        }),
        { kind: "stable" }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeRefresh({
          base,
          bundle: null,
          rendererManifest: RENDERER_MANIFEST,
          scope: tryoutScope,
        }),
        { kind: "refresh", snapshot: null }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeRefresh({
          base,
          bundle,
          rendererManifest: RENDERER_MANIFEST,
          scope: tryoutScope,
        }),
        { kind: "stable" }
      );
      assert.deepStrictEqual(
        yield* selectTryoutRuntimeRefresh({
          base,
          bundle,
          rendererManifest: refreshedRenderer,
          scope: tryoutScope,
        }),
        { kind: "refresh", snapshot: bundle.payload.snapshot }
      );
    })
  );

  it.effect(
    "requires complete retained-artifact proof for a new renderer",
    () =>
      Effect.gen(function* () {
        calls.rendererManifestOverride = yield* refreshedRendererManifest;
        const failure = yield* productionProgram({
          command: "release",
          recoveryId: releaseId("recovery-renderer-partial"),
          releaseId: releaseId("release-renderer-partial"),
          scope: FUNCTION_SCOPE,
        }).pipe(Effect.flip);
        assert.strictEqual(failure.failure, "ReleasePolicyClosureError");
        assert.strictEqual(calls.catalogCalls, 0);

        calls.reset();
        activateTryoutBase(false);
        calls.rendererManifestOverride = yield* refreshedRendererManifest;
        const receipt = yield* productionProgram({
          command: "release",
          recoveryId: releaseId("recovery-renderer"),
          releaseId: releaseId("release-renderer"),
          scope: rendererScope,
        });
        assert.strictEqual(receipt.releaseId, "release-renderer");
        assert.strictEqual(calls.runtimeBundleRefreshes, 1);
        assert.strictEqual(calls.snapshotCalls, 1);
      })
  );

  it.effect("rejects successors while the predecessor bundle is missing", () =>
    Effect.gen(function* () {
      const failure = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-independent"),
        releaseId: releaseId("release-independent"),
        scope: FUNCTION_SCOPE,
      }).pipe(Effect.flip);
      assert.strictEqual(failure.failure, "ReleasePolicyClosureError");
      assert.strictEqual(calls.catalogCalls, 0);
      assert.strictEqual(calls.runtimeBundleRefreshes, 0);
      assert.strictEqual(calls.snapshotCalls, 0);
    })
  );

  it.effect("bootstraps a missing bundle only in explicit tryout scope", () =>
    Effect.gen(function* () {
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-bootstrap"),
        releaseId: releaseId("release-bootstrap"),
        scope: rendererScope,
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
