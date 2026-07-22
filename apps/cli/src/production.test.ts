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
describe("production command", () => {
  it.each(["verified", "active", "finalizing"] as const)(
    "resumes pending %s state without renderer or source reads",
    async (phase) => {
      const pending = gitBundle("release-pending", {
        baseReleaseId: releaseId("release-active"),
      });
      calls.current = currentState({
        activeManifestHash:
          phase === "verified"
            ? pending.release.manifest.baseManifestHash
            : pending.release.manifestHash,
        activeReleaseId:
          phase === "verified" ? "release-active" : "release-pending",
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
      activeManifestHash: completed.release.manifestHash,
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
      activeManifestHash: null,
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
});
