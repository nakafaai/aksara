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
  receiptFor,
  releaseId,
  rollbackBundle,
} from "#test/target";

const calls = productionCalls();
beforeEach(() => {
  calls.reset();
  const active = gitBundle("release-active");
  calls.current = currentState({
    activeReleaseId: active.release.manifest.releaseId,
    completed: completedBundle(active),
    pending: null,
  });
});
describe("production command", () => {
  it("publishes an exact Git delta against authoritative active heads", async () => {
    await expect(
      runProduction({
        command: "release",
        releaseId: releaseId("release-next"),
      })
    ).resolves.toMatchObject({ releaseId: "release-next" });
    expect(calls).toMatchObject({
      baseReleaseId: "release-active",
      checkoutRoot: "/code/aksara",
      cleanReads: 1,
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

  it("publishes the first release without requesting nonexistent heads", async () => {
    calls.current = currentState({
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
    expect(calls.headReleaseId).toBeUndefined();
  });
  it("publishes a new rollback without reading Git source", async () => {
    await expect(
      runProduction({
        command: "rollback",
        releaseId: releaseId("rollback-next"),
        rollbackOf: releaseId("release-active"),
      })
    ).resolves.toMatchObject({ releaseId: "rollback-next" });
    expect(calls.rollbackInput).toMatchObject({
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

  it("rebuilds exact pending Git state with its frozen renderer", async () => {
    const pending = gitBundle("release-pending", {
      baseReleaseId: releaseId("release-active"),
    });
    calls.current = currentState({
      activeReleaseId: "release-active",
      completed: null,
      pending: { ...pending, phase: "verified" },
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
      materialCalls: 1,
      rendererCalls: 0,
      sourceLayers: 1,
      verifiedBundle: pending,
    });
  });

  it("rebuilds exact pending rollback state without Git source", async () => {
    const pending = rollbackBundle(
      "rollback-pending",
      releaseId("release-active")
    );
    calls.current = currentState({
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
  });

  it.each(["active", "finalizing"] as const)(
    "resumes pending %s state without renderer or source reads",
    async (phase) => {
      const pending = gitBundle("release-pending", {
        baseReleaseId: releaseId("release-active"),
      });
      calls.current = currentState({
        activeReleaseId: "release-pending",
        completed: null,
        pending: { ...pending, phase },
      });
      await expect(
        runProduction({
          command: "release",
          releaseId: releaseId("release-pending"),
        })
      ).resolves.toMatchObject({ releaseId: "release-pending" });
      expect(calls).toMatchObject({
        cleanReads: 0,
        materialCalls: 0,
        publishCalls: 0,
        rendererCalls: 0,
        resumeBundle: pending,
        resumeCalls: 1,
        rootReads: 0,
        sourceLayers: 0,
        targetServiceReads: 1,
      });
    }
  );

  it("resumes a completed release after a lost response", async () => {
    const completed = gitBundle("release-completed");
    calls.current = currentState({
      activeReleaseId: "release-completed",
      completed: completedBundle(completed),
      pending: null,
    });
    await expect(
      runProduction({
        command: "release",
        releaseId: releaseId("release-completed"),
      })
    ).resolves.toEqual(receiptFor(completed.release.manifest));
    expect(calls).toMatchObject({
      cleanReads: 0,
      materialCalls: 0,
      publishCalls: 0,
      rendererCalls: 0,
      resumeBundle: completed,
      resumeCalls: 1,
      sourceLayers: 0,
    });
  });

  it("rejects signing-key mismatch before creating a target", async () => {
    calls.derivedPublicKeyPem = "different-derived-public-key";
    await expect(
      rejectProduction({
        command: "release",
        releaseId: releaseId("release-rejected"),
      })
    ).resolves.toMatchObject({
      failure: "SigningKeyMismatchError",
      stage: "keys",
    });
    expect(calls).toMatchObject({
      publishCalls: 0,
      rendererCalls: 0,
      targetCalls: 0,
    });
  });

  it("rejects a conflicting pending release before any content read", async () => {
    const pending = gitBundle("release-pending");
    calls.current = currentState({
      activeReleaseId: null,
      completed: null,
      pending: { ...pending, phase: "staging" },
    });
    await expect(
      rejectProduction({
        command: "release",
        releaseId: releaseId("release-other"),
      })
    ).resolves.toMatchObject({
      failure: "ProductionStateError",
      stage: "state",
    });
    expect(calls).toMatchObject({
      cleanReads: 0,
      materialCalls: 0,
      publishCalls: 0,
      rendererCalls: 0,
      resumeCalls: 0,
    });
  });

  it("rejects pending Git recovery from a different checkout revision", async () => {
    const pending = gitBundle("release-pending", {
      sha: (
        await import("@nakafa/aksara-contracts/ids")
      ).GitCommitShaSchema.make("b".repeat(40)),
    });
    calls.current = currentState({
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

  it("rejects a rebuilt manifest that differs from signed pending state", async () => {
    const pending = gitBundle("release-pending");
    calls.current = currentState({
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
      failure: "RecoveryManifestMismatchError",
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
