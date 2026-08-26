import { beforeEach, describe, expect, it } from "@effect/vitest";
import { SigningKeyIdSchema } from "@nakafa/aksara-contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { Effect } from "effect";
import { productionCalls, productionProgram } from "#test/production/harness";
import { FUNCTION_SCOPE } from "#test/real";
import {
  completedBundle,
  currentState,
  gitBundle,
  releaseId,
} from "#test/target";

const calls = productionCalls();
const tryoutScope = PublicationScopeSchema.make({
  families: [],
  snapshots: ["tryout"],
});

beforeEach(() => {
  calls.reset();
  const active = gitBundle("release-active");
  calls.current = currentState({
    active: completedBundle(active),
    candidate: null,
    recovery: null,
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

  it.effect("prepares genesis without requesting nonexistent heads", () =>
    Effect.gen(function* () {
      calls.current = currentState({
        active: null,
        candidate: null,
        recovery: null,
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
