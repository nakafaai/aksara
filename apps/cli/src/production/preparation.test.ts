import { beforeEach, describe, expect, it } from "@effect/vitest";
import {
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
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
const tryoutScope = PublicationScopeSchema.make({
  families: [],
  snapshots: ["tryout"],
});
const rendererScope = PublicationScopeSchema.make({
  families: ["article", "material", "page", "question"],
  snapshots: ["tryout"],
});
const inheritedTryoutSnapshot = Sha256HashSchema.make(
  `sha256:${"c".repeat(64)}`
);
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

beforeEach(() => {
  calls.reset();
  const active = gitBundle("release-active");
  calls.current = currentState({
    active: completedBundle(active),
    candidate: null,
    recovery: null,
    tryoutRuntimeBundle: null,
  });
});

describe("production preparation", () => {
  it.effect("binds a Git delta to exact authoritative catalog evidence", () =>
    Effect.gen(function* () {
      const active = gitBundle("release-active");
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-next"),
        releaseId: releaseId("release-next"),
        scope: FUNCTION_SCOPE,
      });
      expect(receipt).toMatchObject({ releaseId: "release-next" });
      expect(calls).toMatchObject({
        baseManifestHash: active.release.manifestHash,
        baseReleaseId: "release-active",
        baseResultCount: active.release.manifest.resultCount,
        baseResultDigest: active.release.manifest.resultDigest,
        catalogCalls: 1,
        checkoutRoot: "/code/aksara",
        cleanReads: 2,
        headManifestHash: active.release.manifestHash,
        headReleaseId: "release-active",
        keyId: "content-2026-07-23",
        privateKeyMatches: true,
        publishCalls: 1,
        publishKind: "git",
        rendererCalls: 1,
        rootReads: 1,
        signingSecretReads: 1,
        snapshotCalls: 0,
        sourceLayers: 1,
        targetCalls: 1,
        targetServiceReads: 1,
      });
      expect(calls.publicationConfig).toEqual({
        allowInsecureLoopback: false,
        endpoint: "https://content.example.test/publish",
        timeout: "2 minutes",
      });
    })
  );

  it.effect(
    "passes an explicit full-family rebuild into catalog planning",
    () =>
      Effect.gen(function* () {
        const receipt = yield* productionProgram({
          command: "release",
          rebuild: true,
          recoveryId: releaseId("recovery-rebuild"),
          releaseId: releaseId("release-rebuild"),
          scope: FUNCTION_SCOPE,
        });
        expect(receipt.releaseId).toBe("release-rebuild");
        expect(calls.catalogRebuild).toBe(true);
      })
  );

  it.effect("prepares genesis without requesting nonexistent heads", () =>
    Effect.gen(function* () {
      calls.current = currentState({
        active: null,
        candidate: null,
        recovery: null,
        tryoutRuntimeBundle: null,
      });
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-first"),
        releaseId: releaseId("release-first"),
        scope: FUNCTION_SCOPE,
      });
      expect(receipt).toMatchObject({ releaseId: "release-first" });
      expect(calls.baseReleaseId).toBeNull();
      expect(calls.baseManifestHash).toBeNull();
      expect(calls.baseResultCount).toBe(0);
      expect(calls.baseResultDigest).toBe(EMPTY_RESULT_CATALOG_DIGEST);
      expect(calls.headReleaseId).toBeUndefined();
      expect(calls.snapshotCalls).toBe(0);
    })
  );

  it.effect("prepares selected snapshots from question heads only", () =>
    Effect.gen(function* () {
      calls.current = currentState({
        active: null,
        candidate: null,
        recovery: null,
        tryoutRuntimeBundle: null,
      });
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-snapshot"),
        releaseId: releaseId("release-snapshot"),
        scope: tryoutScope,
      });
      expect(receipt).toMatchObject({ releaseId: "release-snapshot" });
      expect(calls).toMatchObject({
        catalogCalls: 1,
        snapshotCalls: 1,
      });
    })
  );

  it.effect("reuses a producer pair through two Git successors", () =>
    Effect.gen(function* () {
      const producer = gitBundle("release-runtime-producer", {
        baseReleaseId: releaseId("release-runtime-parent"),
        tryoutSnapshotId: inheritedTryoutSnapshot,
      });
      const active = gitBundle("release-runtime-active", {
        baseManifestHash: producer.release.manifestHash,
        baseReleaseId: producer.release.manifest.releaseId,
        tryoutSnapshotId: inheritedTryoutSnapshot,
      });
      calls.current = currentState({
        active: completedBundle(active),
        candidate: null,
        recovery: null,
        tryoutRuntimeBundle: runtimeBundleFor(
          producer,
          inheritedTryoutSnapshot
        ),
      });

      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-runtime-next"),
        releaseId: releaseId("release-runtime-next"),
        scope: FUNCTION_SCOPE,
      });

      expect(receipt).toMatchObject({ releaseId: "release-runtime-next" });
      expect(calls).toMatchObject({
        baseReleaseId: "release-runtime-active",
        publishCalls: 1,
        runtimeBundleRefreshes: 0,
        snapshotCalls: 0,
      });
    })
  );

  it.effect(
    "requires complete retained-artifact proof for a new renderer",
    () =>
      Effect.gen(function* () {
        const active = gitBundle("release-renderer-base", {
          baseReleaseId: releaseId("release-renderer-parent"),
          tryoutSnapshotId: inheritedTryoutSnapshot,
        });
        /** Restores the exact active runtime before each assertion path. */
        const activate = () => {
          calls.current = currentState({
            active: completedBundle(active),
            candidate: null,
            recovery: null,
            tryoutRuntimeBundle: runtimeBundleFor(
              active,
              inheritedTryoutSnapshot
            ),
          });
        };
        activate();
        calls.rendererManifestOverride = yield* refreshedRendererManifest;

        const failure = yield* productionProgram({
          command: "release",
          recoveryId: releaseId("recovery-renderer-partial"),
          releaseId: releaseId("release-renderer-partial"),
          scope: FUNCTION_SCOPE,
        }).pipe(Effect.flip);
        expect(failure.failure).toBe("ReleasePolicyClosureError");
        expect(calls.catalogCalls).toBe(0);

        calls.reset();
        activate();
        calls.rendererManifestOverride = yield* refreshedRendererManifest;
        const receipt = yield* productionProgram({
          command: "release",
          recoveryId: releaseId("recovery-renderer"),
          releaseId: releaseId("release-renderer"),
          scope: rendererScope,
        });
        expect(receipt.releaseId).toBe("release-renderer");
        expect(calls.runtimeBundleRefreshes).toBe(1);
        expect(calls.snapshotCalls).toBe(1);
      })
  );

  it.effect("reuses the exact candidate Git envelope after key rotation", () =>
    Effect.gen(function* () {
      const active = gitBundle("release-active");
      const candidate = gitBundle("release-candidate", {
        baseManifestHash: active.release.manifestHash,
        baseReleaseId: releaseId("release-active"),
        keyId: SigningKeyIdSchema.make("content-2026-01"),
      });
      calls.current = currentState({
        active: completedBundle(active),
        candidate: { ...candidate, phase: "staging" },
        recovery: null,
        tryoutRuntimeBundle: null,
      });
      const receipt = yield* productionProgram({
        command: "release",
        recoveryId: releaseId("recovery-candidate"),
        releaseId: releaseId("release-candidate"),
        scope: FUNCTION_SCOPE,
      });
      expect(receipt).toMatchObject({ releaseId: "release-candidate" });
      expect(calls).toMatchObject({
        baseReleaseId: "release-active",
        bundleVerifyCalls: 2,
        catalogCalls: 1,
        cleanReads: 2,
        keyId: "content-2026-07-23",
        rendererCalls: 0,
        snapshotCalls: 0,
        sourceLayers: 1,
        verifiedBundle: candidate,
      });
      expect(calls.storedRelease).toEqual(candidate.release);
      expect(calls.storedRelease?.keyId).toBe("content-2026-01");
    })
  );
});
