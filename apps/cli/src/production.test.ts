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
  recoveryBundle,
  releaseId,
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
describe("production command", () => {
  it("resumes an active release with its exact retained inverse", async () => {
    const active = gitBundle("release-active");
    calls.current = currentState({
      active: completedBundle(active),
      candidate: null,
      recovery: recoveryBundle("recovery-active", active),
    });
    await expect(
      runProduction({
        command: "release",
        recoveryId: releaseId("recovery-active"),
        releaseId: releaseId("release-active"),
      })
    ).resolves.toMatchObject({ releaseId: "release-active" });
    expect(calls).toMatchObject({
      cleanReads: 0,
      materialCalls: 0,
      publishCalls: 0,
      rendererCalls: 0,
      resumeBundle: active,
      resumeCalls: 1,
      rootReads: 0,
      sourceLayers: 0,
      targetServiceReads: 1,
    });
  });

  it("resumes a completed release after a lost response", async () => {
    const completed = gitBundle("release-completed");
    calls.current = currentState({
      active: completedBundle(completed),
      candidate: null,
      recovery: null,
    });
    await expect(
      runProduction({
        command: "release",
        recoveryId: releaseId("recovery-completed"),
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
        recoveryId: releaseId("recovery-rejected"),
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

  it("rejects a conflicting candidate release before any content read", async () => {
    const candidate = gitBundle("release-candidate");
    calls.current = currentState({
      active: null,
      candidate: { ...candidate, phase: "staging" },
      recovery: null,
    });
    await expect(
      rejectProduction({
        command: "release",
        recoveryId: releaseId("recovery-other"),
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
