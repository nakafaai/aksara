import { assert, describe, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import { selectSourceBase } from "#cli/production/base";
import { selectTryoutRuntimeRefresh } from "#cli/production/runtime";
import { FUNCTION_SCOPE, RENDERER_MANIFEST } from "#test/real";
import { gitBundle, releaseId, runtimeBundleFor } from "#test/target";

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
const tryoutScope = PublicationScopeSchema.make({
  families: [],
  snapshots: ["tryout"],
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
      assert.strictEqual(
        missingScope._tag,
        "BaseTryoutRuntimeBundleMismatchError"
      );
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
        }).pipe(
          Effect.flip,
          Effect.map((error) => error._tag)
        ),
        "BaseTryoutRuntimeBundleMismatchError"
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
});
