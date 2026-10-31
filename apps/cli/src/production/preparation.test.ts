import { beforeEach, describe, expect, it } from "@effect/vitest";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import {
  ACTIVE_PRODUCTION_STATE,
  productionCalls,
  productionProgram,
} from "#test/production/harness";
import { FUNCTION_SCOPE, RENDERER_MANIFEST } from "#test/real";
import {
  completedBundle,
  currentState,
  gitBundle,
  releaseId,
} from "#test/target";

const calls = productionCalls();
const assessmentScope = PublicationScopeSchema.make({
  families: [],
  snapshots: ["assessment"],
});
const rendererScope = PublicationScopeSchema.make({
  families: ["article", "material", "page"],
  snapshots: [],
});
const refreshedRendererManifest = createRendererManifest({
  base: [...RENDERER_MANIFEST.base, "RuntimePairProbe"],
  domains: RENDERER_MANIFEST.domains,
  publishedDomains: RENDERER_MANIFEST.publishedDomains,
});

beforeEach(() => {
  calls.reset();
  calls.current = ACTIVE_PRODUCTION_STATE;
});

describe("production preparation", () => {
  it.effect("binds a Git delta to exact authoritative catalog evidence", () =>
    Effect.gen(function* () {
      const active = yield* gitBundle("release-active");
      const receipt = yield* productionProgram({
        command: "release",
        releaseId: releaseId("release-next"),
        retention: { recoveryId: releaseId("recovery-next") },
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
          releaseId: releaseId("release-rebuild"),
          retention: {
            recoveryId: releaseId("recovery-rebuild"),
          },
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
      });
      const receipt = yield* productionProgram({
        command: "release",
        releaseId: releaseId("release-first"),
        retention: { recoveryId: releaseId("recovery-first") },
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

  it.effect("prepares only the selected structured snapshots", () =>
    Effect.gen(function* () {
      calls.current = currentState({
        active: null,
        candidate: null,
        recovery: null,
      });
      const receipt = yield* productionProgram({
        command: "release",
        releaseId: releaseId("release-snapshot"),
        retention: {
          recoveryId: releaseId("recovery-snapshot"),
        },
        scope: assessmentScope,
      });
      expect(receipt).toMatchObject({ releaseId: "release-snapshot" });
      expect(calls).toMatchObject({
        catalogCalls: 1,
        snapshotCalls: 1,
      });
    })
  );

  it.effect(
    "adopts a new renderer only with complete retained-artifact proof",
    () =>
      Effect.gen(function* () {
        const active = yield* gitBundle("release-renderer-base", {
          baseReleaseId: releaseId("release-renderer-parent"),
        });
        const activeCompleted = yield* completedBundle(active);
        /** Restores the exact active release before each assertion path. */
        const activate = () => {
          calls.current = currentState({
            active: activeCompleted,
            candidate: null,
            recovery: null,
          });
        };
        activate();
        calls.rendererManifestOverride = yield* refreshedRendererManifest;

        const partial = yield* productionProgram({
          command: "release",
          releaseId: releaseId("release-renderer-partial"),
          retention: {
            recoveryId: releaseId("recovery-renderer-partial"),
          },
          scope: FUNCTION_SCOPE,
        });
        expect(partial.releaseId).toBe("release-renderer-partial");
        expect(calls).toMatchObject({ catalogCalls: 1, snapshotCalls: 0 });

        calls.reset();
        activate();
        calls.rendererManifestOverride = yield* refreshedRendererManifest;
        const receipt = yield* productionProgram({
          command: "release",
          releaseId: releaseId("release-renderer"),
          retention: {
            recoveryId: releaseId("recovery-renderer"),
          },
          scope: rendererScope,
        });
        expect(receipt.releaseId).toBe("release-renderer");
        expect(calls).toMatchObject({ catalogCalls: 1, snapshotCalls: 0 });
      })
  );

  it.effect("reuses the exact candidate Git envelope after key rotation", () =>
    Effect.gen(function* () {
      const active = yield* gitBundle("release-active");
      const candidate = yield* gitBundle("release-candidate", {
        baseManifestHash: active.release.manifestHash,
        baseReleaseId: releaseId("release-active"),
        keyId: SigningKeyIdSchema.make("content-2026-01"),
      });
      calls.current = currentState({
        active: yield* completedBundle(active),
        candidate: { ...candidate, phase: "staging" },
        recovery: null,
      });
      const receipt = yield* productionProgram({
        command: "release",
        releaseId: releaseId("release-candidate"),
        retention: {
          recoveryId: releaseId("recovery-candidate"),
        },
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
