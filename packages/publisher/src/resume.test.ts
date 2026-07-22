import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type {
  ContentReleaseBundle,
  ContentReleaseStatus,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import { PublicationTarget } from "#publisher/publication/spec";
import { resumeContentRelease } from "#publisher/resume";
import { makeSignedBundle, testVerificationResolver } from "#test/publication";

const bundle = await makeSignedBundle("test-resume");
const { manifest } = bundle.release;
const receipt = {
  activatedHeads: manifest.upsertCount,
  deletedHeads: manifest.deleteCount,
  manifestHash: bundle.release.manifestHash,
  projectionDigest: manifest.projectionDigest,
  releaseId: manifest.releaseId,
  resultCount: manifest.resultCount,
  resultDigest: manifest.resultDigest,
  stagedArtifacts: manifest.upsertCount,
  stagedItems: manifest.itemCount,
  stagedProjections: manifest.projectionCount,
};

/** Creates an exact durable status for one recovery test phase. */
function statusFor(phase: ContentReleaseStatus["phase"]): ContentReleaseStatus {
  const identity = {
    manifestHash: bundle.release.manifestHash,
    releaseId: manifest.releaseId,
  };
  return phase === "completed"
    ? { ...identity, phase, receipt }
    : { ...identity, phase };
}

/** Creates a complete target that exposes only status and finalization. */
function makeTarget(
  phase: ContentReleaseStatus["phase"],
  finalizedReceipt = receipt
) {
  const activate = vi.fn(() => Effect.succeed(receipt));
  const finalize = vi.fn(() => Effect.succeed(finalizedReceipt));
  const target = PublicationTarget.of({
    abort: () => Effect.die("Unused abort operation."),
    activate,
    cleanup: () => Effect.die("Unused cleanup operation."),
    current: () => Effect.die("Unused current operation."),
    finalize,
    headPage: () => Effect.die("Unused head operation."),
    rollbackPage: () => Effect.die("Unused rollback operation."),
    stageArtifactBatch: () => Effect.die("Unused artifact operation."),
    stageItemBatch: () => Effect.die("Unused item operation."),
    stageProjectionBatch: () => Effect.die("Unused projection operation."),
    stageRelease: () => Effect.die("Unused release operation."),
    status: () => Effect.succeed(statusFor(phase)),
    verify: () => Effect.die("Unused verification operation."),
  });
  return { activate, finalize, target };
}

/** Runs one stored release through its real signature resolver. */
function runResume(
  target: typeof PublicationTarget.Service,
  input: ContentReleaseBundle = bundle
) {
  return resumeContentRelease(input).pipe(
    Effect.provideService(
      ContentVerificationKeyResolver,
      testVerificationResolver
    ),
    Effect.provideService(PublicationTarget, target)
  );
}

describe("resumeContentRelease", () => {
  it.each(["active", "finalizing"] as const)(
    "finalizes the exact stored %s release without restaging",
    async (phase) => {
      const state = makeTarget(phase);
      await expect(Effect.runPromise(runResume(state.target))).resolves.toEqual(
        receipt
      );
      expect(state.finalize).toHaveBeenCalledOnce();
      expect(state.finalize).toHaveBeenCalledWith(bundle.release);
    }
  );

  it("returns a bound completed receipt without finalizing again", async () => {
    const state = makeTarget("completed");
    await expect(Effect.runPromise(runResume(state.target))).resolves.toEqual(
      receipt
    );
    expect(state.finalize).not.toHaveBeenCalled();
  });

  it("rejects an aborted release with its immutable identity", async () => {
    const state = makeTarget("aborted");
    await expect(
      Effect.runPromise(runResume(state.target).pipe(Effect.flip))
    ).resolves.toMatchObject({
      _tag: "PublicationReleaseAbortedError",
      manifestHash: bundle.release.manifestHash,
      releaseId: manifest.releaseId,
    });
    expect(state.finalize).not.toHaveBeenCalled();
  });

  it("activates and finalizes an exact verified release", async () => {
    const state = makeTarget("verified");
    await expect(Effect.runPromise(runResume(state.target))).resolves.toEqual(
      receipt
    );
    expect(state.activate).toHaveBeenCalledWith(bundle.release);
    expect(state.finalize).toHaveBeenCalledWith(bundle.release);
  });

  it.each(["missing", "staging", "verifying", "aborting"] as const)(
    "rejects non-finalizable %s state",
    async (phase) => {
      const state = makeTarget(phase);
      await expect(
        Effect.runPromise(runResume(state.target).pipe(Effect.flip))
      ).resolves.toMatchObject({
        _tag: "PublicationResumePhaseError",
        phase,
        releaseId: manifest.releaseId,
      });
      expect(state.finalize).not.toHaveBeenCalled();
    }
  );

  it("rejects a final receipt that differs from the signed manifest", async () => {
    const state = makeTarget("active", {
      ...receipt,
      projectionDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    });
    await expect(
      Effect.runPromise(runResume(state.target).pipe(Effect.flip))
    ).resolves.toMatchObject({ _tag: "PublicationReceiptMismatchError" });
  });
});
