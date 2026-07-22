import {
  GitCommitShaSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { beforeEach, describe, expect, it } from "vitest";
import {
  productionCalls,
  rejectProduction,
  runProduction,
} from "#test/production";
import {
  completedBundle,
  currentState,
  gitBundle,
  releaseId,
  rollbackBundle,
} from "#test/target";

const calls = productionCalls();

beforeEach(() => {
  calls.reset();
  const active = gitBundle("release-active");
  calls.current = currentState({
    activeManifestHash: active.release.manifestHash,
    activeReleaseId: active.release.manifest.releaseId,
    completed: completedBundle(active),
    pending: null,
  });
});

describe("production preparation", () => {
  it("binds a Git delta to exact authoritative catalog evidence", async () => {
    const active = gitBundle("release-active");
    await expect(
      runProduction({
        command: "release",
        releaseId: releaseId("release-next"),
      })
    ).resolves.toMatchObject({ releaseId: "release-next" });
    expect(calls).toMatchObject({
      baseManifestHash: active.release.manifestHash,
      baseReleaseId: "release-active",
      baseResultCount: active.release.manifest.resultCount,
      baseResultDigest: active.release.manifest.resultDigest,
      checkoutRoot: "/code/aksara",
      cleanReads: 1,
      headManifestHash: active.release.manifestHash,
      headReleaseId: "release-active",
      keyId: "content-2026-07",
      materialCalls: 1,
      privateKeyMatches: true,
      publishCalls: 1,
      publishKind: "git",
      rendererCalls: 1,
      rootReads: 1,
      sourceLayers: 1,
      targetCalls: 1,
      targetServiceReads: 1,
    });
    expect(calls.publicationConfig).toEqual({
      allowInsecureLoopback: false,
      endpoint: "https://content.example.test/publish",
      timeout: "30 seconds",
    });
  });

  it("prepares genesis without requesting nonexistent heads", async () => {
    calls.current = currentState({
      activeManifestHash: null,
      activeReleaseId: null,
      completed: null,
      pending: null,
    });
    await expect(
      runProduction({
        command: "release",
        releaseId: releaseId("release-first"),
      })
    ).resolves.toMatchObject({ releaseId: "release-first" });
    expect(calls.baseReleaseId).toBeNull();
    expect(calls.baseManifestHash).toBeNull();
    expect(calls.baseResultCount).toBe(0);
    expect(calls.baseResultDigest).toBe(EMPTY_RESULT_CATALOG_DIGEST);
    expect(calls.headReleaseId).toBeUndefined();
  });

  it("prepares a new rollback from its exact signed source bundle", async () => {
    const active = gitBundle("release-active");
    await expect(
      runProduction({
        command: "rollback",
        releaseId: releaseId("rollback-next"),
        rollbackOf: releaseId("release-active"),
      })
    ).resolves.toMatchObject({ releaseId: "rollback-next" });
    expect(calls.rollbackInput).toMatchObject({
      proofManifestHash: active.release.manifestHash,
      releaseId: "rollback-next",
      rollbackOf: "release-active",
    });
    expect(calls).toMatchObject({
      cleanReads: 0,
      materialCalls: 0,
      privateKeyMatches: true,
      publishKind: "rollback",
      rendererCalls: 1,
      sourceLayers: 0,
      targetServiceReads: 1,
    });
  });

  it("reuses the exact pending Git envelope after key rotation", async () => {
    const pending = gitBundle("release-pending", {
      baseReleaseId: releaseId("release-active"),
      keyId: SigningKeyIdSchema.make("content-2026-01"),
    });
    calls.current = currentState({
      activeManifestHash: pending.release.manifest.baseManifestHash,
      activeReleaseId: "release-active",
      completed: null,
      pending: { ...pending, phase: "staging" },
    });
    await expect(
      runProduction({
        command: "release",
        releaseId: releaseId("release-pending"),
      })
    ).resolves.toMatchObject({ releaseId: "release-pending" });
    expect(calls).toMatchObject({
      baseReleaseId: "release-active",
      bundleVerifyCalls: 1,
      cleanReads: 1,
      keyId: "content-2026-07",
      materialCalls: 1,
      rendererCalls: 0,
      sourceLayers: 1,
      verifiedBundle: pending,
    });
    expect(calls.storedRelease).toEqual(pending.release);
    expect(calls.storedRelease?.keyId).toBe("content-2026-01");
  });

  it("rebuilds pending rollback without acquiring Git source", async () => {
    const pending = rollbackBundle(
      "rollback-pending",
      releaseId("release-active")
    );
    calls.current = currentState({
      activeManifestHash: pending.release.manifest.baseManifestHash,
      activeReleaseId: "release-active",
      completed: null,
      pending: { ...pending, phase: "staging" },
    });
    await expect(
      runProduction({
        command: "rollback",
        releaseId: releaseId("rollback-pending"),
        rollbackOf: releaseId("release-active"),
      })
    ).resolves.toMatchObject({ releaseId: "rollback-pending" });
    expect(calls).toMatchObject({
      bundleVerifyCalls: 1,
      cleanReads: 0,
      materialCalls: 0,
      publishKind: "rollback",
      rendererCalls: 0,
      rootReads: 0,
      sourceLayers: 0,
      verifiedBundle: pending,
    });
    expect(calls.storedRelease).toEqual(pending.release);
  });

  it("rejects recovery from a different checkout revision", async () => {
    const pending = gitBundle("release-pending", {
      sha: GitCommitShaSchema.make("b".repeat(40)),
    });
    calls.current = currentState({
      activeManifestHash: null,
      activeReleaseId: null,
      completed: null,
      pending: { ...pending, phase: "staging" },
    });
    await expect(
      rejectProduction({
        command: "release",
        releaseId: releaseId("release-pending"),
      })
    ).resolves.toMatchObject({
      failure: "RecoveryRevisionMismatchError",
      stage: "prepare",
    });
    expect(calls).toMatchObject({
      cleanReads: 1,
      materialCalls: 0,
      publishCalls: 0,
      rendererCalls: 0,
    });
  });

  it("rejects a rebuild that differs from signed pending state", async () => {
    const pending = gitBundle("release-pending");
    calls.current = currentState({
      activeManifestHash: null,
      activeReleaseId: null,
      completed: null,
      pending: { ...pending, phase: "verifying" },
    });
    calls.manifestMismatch = true;
    await expect(
      rejectProduction({
        command: "release",
        releaseId: releaseId("release-pending"),
      })
    ).resolves.toMatchObject({
      failure: "PreparedStoredReleaseMismatchError",
      stage: "prepare",
    });
    expect(calls).toMatchObject({
      materialCalls: 1,
      publishCalls: 0,
      rendererCalls: 0,
      sourceLayers: 0,
    });
  });
});
