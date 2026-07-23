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
    active: completedBundle(active),
    candidate: null,
    recovery: null,
  });
});

describe("production preparation", () => {
  it("binds a Git delta to exact authoritative catalog evidence", async () => {
    const active = gitBundle("release-active");
    await expect(
      runProduction({
        command: "release",
        recoveryId: releaseId("recovery-next"),
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
      keyId: "content-2026-07-23",
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
      active: null,
      candidate: null,
      recovery: null,
    });
    await expect(
      runProduction({
        command: "release",
        recoveryId: releaseId("recovery-first"),
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
        recoveryId: releaseId("recovery-rollback"),
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

  it("reuses the exact candidate Git envelope after key rotation", async () => {
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
    await expect(
      runProduction({
        command: "release",
        recoveryId: releaseId("recovery-candidate"),
        releaseId: releaseId("release-candidate"),
      })
    ).resolves.toMatchObject({ releaseId: "release-candidate" });
    expect(calls).toMatchObject({
      baseReleaseId: "release-active",
      bundleVerifyCalls: 1,
      cleanReads: 1,
      keyId: "content-2026-07-23",
      materialCalls: 1,
      rendererCalls: 0,
      sourceLayers: 1,
      verifiedBundle: candidate,
    });
    expect(calls.storedRelease).toEqual(candidate.release);
    expect(calls.storedRelease?.keyId).toBe("content-2026-01");
  });

  it("rebuilds candidate rollback without acquiring Git source", async () => {
    const active = gitBundle("release-active");
    const candidate = rollbackBundle(
      "rollback-candidate",
      releaseId("release-active"),
      active.release.manifestHash
    );
    calls.current = currentState({
      active: completedBundle(active),
      candidate: { ...candidate, phase: "staging" },
      recovery: null,
    });
    await expect(
      runProduction({
        command: "rollback",
        recoveryId: releaseId("recovery-candidate"),
        releaseId: releaseId("rollback-candidate"),
        rollbackOf: releaseId("release-active"),
      })
    ).resolves.toMatchObject({ releaseId: "rollback-candidate" });
    expect(calls).toMatchObject({
      bundleVerifyCalls: 1,
      cleanReads: 0,
      materialCalls: 0,
      publishKind: "rollback",
      rendererCalls: 0,
      rootReads: 0,
      sourceLayers: 0,
      verifiedBundle: candidate,
    });
    expect(calls.storedRelease).toEqual(candidate.release);
  });

  it("rejects recovery from a different checkout revision", async () => {
    const candidate = gitBundle("release-candidate", {
      sha: GitCommitShaSchema.make("b".repeat(40)),
    });
    calls.current = currentState({
      active: null,
      candidate: { ...candidate, phase: "staging" },
      recovery: null,
    });
    await expect(
      rejectProduction({
        command: "release",
        recoveryId: releaseId("recovery-candidate"),
        releaseId: releaseId("release-candidate"),
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

  it("rejects a rebuild that differs from signed candidate state", async () => {
    const candidate = gitBundle("release-candidate");
    calls.current = currentState({
      active: null,
      candidate: { ...candidate, phase: "verifying" },
      recovery: null,
    });
    calls.manifestMismatch = true;
    await expect(
      rejectProduction({
        command: "release",
        recoveryId: releaseId("recovery-candidate"),
        releaseId: releaseId("release-candidate"),
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
