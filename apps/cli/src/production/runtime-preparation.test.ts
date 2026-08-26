import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { beforeEach, describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { productionCalls, runProduction } from "#test/production/harness";
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
const refreshedRendererManifest = await Effect.runPromise(
  createRendererManifest({
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
  })
);

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
  it("rebuilds an inherited snapshot for a new renderer pair", async () => {
    calls.rendererManifestOverride = refreshedRendererManifest;

    await expect(
      runProduction({
        command: "release",
        recoveryId: releaseId("recovery-renderer"),
        releaseId: releaseId("release-renderer"),
        scope: FUNCTION_SCOPE,
      })
    ).resolves.toMatchObject({ releaseId: "release-renderer" });
    expect(calls).toMatchObject({
      runtimeBundleRefreshes: 1,
      snapshotCalls: 1,
    });
  });

  it("bootstraps a missing permanent bundle", async () => {
    await expect(
      runProduction({
        command: "release",
        recoveryId: releaseId("recovery-bootstrap"),
        releaseId: releaseId("release-bootstrap"),
        scope: FUNCTION_SCOPE,
      })
    ).resolves.toMatchObject({ releaseId: "release-bootstrap" });
    expect(calls).toMatchObject({
      runtimeBundleRefreshes: 1,
      snapshotCalls: 1,
    });
  });

  it("reuses the unchanged runtime pair", async () => {
    activateTryoutBase(true);

    await expect(
      runProduction({
        command: "release",
        recoveryId: releaseId("recovery-reuse"),
        releaseId: releaseId("release-reuse"),
        scope: FUNCTION_SCOPE,
      })
    ).resolves.toMatchObject({ releaseId: "release-reuse" });
    expect(calls).toMatchObject({
      runtimeBundleRefreshes: 0,
      snapshotCalls: 0,
    });
  });
});
