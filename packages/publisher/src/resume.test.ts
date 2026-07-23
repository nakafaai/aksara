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
import { makePublicationTarget } from "#test/target";

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
  routeDigest: manifest.routeDigest,
  stagedArtifacts: manifest.upsertCount,
  stagedItems: manifest.itemCount,
  stagedProjections: manifest.projectionCount,
  stagedRoutes: manifest.routeCount,
};

/** Creates an exact durable status for one recovery test phase. */
function statusFor(
  phase: ContentReleaseStatus["phase"],
  storedReceipt = receipt
): ContentReleaseStatus {
  const identity = {
    manifestHash: bundle.release.manifestHash,
    releaseId: manifest.releaseId,
  };
  return phase === "completed"
    ? { ...identity, phase, receipt: storedReceipt }
    : { ...identity, phase };
}

/** Creates a complete target that exposes only status and activation. */
function makeTarget(
  phase: ContentReleaseStatus["phase"],
  activatedReceipt = receipt
) {
  const activate = vi.fn(() => Effect.succeed(activatedReceipt));
  const target = makePublicationTarget({
    activate,
    status: () => Effect.succeed(statusFor(phase, activatedReceipt)),
  });
  return { activate, target };
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
  it("returns a bound terminal receipt without activating again", async () => {
    const state = makeTarget("completed");
    await expect(Effect.runPromise(runResume(state.target))).resolves.toEqual(
      receipt
    );
    expect(state.activate).not.toHaveBeenCalled();
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
    expect(state.activate).not.toHaveBeenCalled();
  });

  it.each(["missing", "staging", "verifying", "verified", "aborting"] as const)(
    "rejects non-activatable %s state",
    async (phase) => {
      const state = makeTarget(phase);
      await expect(
        Effect.runPromise(runResume(state.target).pipe(Effect.flip))
      ).resolves.toMatchObject({
        _tag: "PublicationResumePhaseError",
        phase,
        releaseId: manifest.releaseId,
      });
      expect(state.activate).not.toHaveBeenCalled();
    }
  );

  it("rejects a final receipt that differs from the signed manifest", async () => {
    const state = makeTarget("completed", {
      ...receipt,
      projectionDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    });
    await expect(
      Effect.runPromise(runResume(state.target).pipe(Effect.flip))
    ).resolves.toMatchObject({ _tag: "PublicationReceiptMismatchError" });
  });
});
