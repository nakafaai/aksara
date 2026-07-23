import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type {
  ContentReleaseBundle,
  ContentReleaseStatus,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { snapshotRowCount } from "@nakafa/aksara-contracts/release/snapshot";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  PublicationActivation,
  PublicationActivationError,
  PublicationTarget,
} from "#publisher/publication/spec";
import { resumeContentRelease } from "#publisher/resume";
import {
  makeSignedBundle,
  testVerificationResolver,
} from "#test/publication/run";
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
  snapshots: manifest.snapshots,
  stagedArtifacts: manifest.upsertCount,
  stagedItems: manifest.itemCount,
  stagedProjections: manifest.projectionCount,
  stagedRoutes: manifest.routeCount,
  stagedSnapshotRows: snapshotRowCount(manifest.snapshots),
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
  input: ContentReleaseBundle = bundle,
  invalidate: typeof PublicationActivation.Service.invalidate = () =>
    Effect.void
) {
  return resumeContentRelease(input).pipe(
    Effect.provideService(
      ContentVerificationKeyResolver,
      testVerificationResolver
    ),
    Effect.provideService(
      PublicationActivation,
      PublicationActivation.of({ invalidate, verify: () => Effect.void })
    ),
    Effect.provideService(PublicationTarget, target)
  );
}

describe("resumeContentRelease", () => {
  it("returns a bound terminal receipt without activating again", async () => {
    const state = makeTarget("completed");
    const invalidate = vi.fn(() => Effect.void);
    await expect(
      Effect.runPromise(runResume(state.target, bundle, invalidate))
    ).resolves.toEqual(receipt);
    expect(state.activate).not.toHaveBeenCalled();
    expect(invalidate).toHaveBeenCalledWith(
      expect.objectContaining({ release: bundle.release })
    );
  });

  it("repairs a failed terminal cache invalidation on exact retry", async () => {
    const state = makeTarget("completed");
    const failure = new PublicationActivationError({
      phase: "cache",
      releaseId: manifest.releaseId,
    });
    const invalidate = vi
      .fn<() => Effect.Effect<void, PublicationActivationError>>()
      .mockReturnValueOnce(Effect.fail(failure))
      .mockReturnValue(Effect.void);

    await expect(
      Effect.runPromise(
        runResume(state.target, bundle, invalidate).pipe(Effect.flip)
      )
    ).resolves.toEqual(failure);
    await expect(
      Effect.runPromise(runResume(state.target, bundle, invalidate))
    ).resolves.toEqual(receipt);
    expect(state.activate).not.toHaveBeenCalled();
    expect(invalidate).toHaveBeenCalledTimes(2);
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
    const invalidate = vi.fn(() => Effect.void);
    const state = makeTarget("completed", {
      ...receipt,
      projectionDigest: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    });
    await expect(
      Effect.runPromise(
        runResume(state.target, bundle, invalidate).pipe(Effect.flip)
      )
    ).resolves.toMatchObject({ _tag: "PublicationReceiptMismatchError" });
    expect(invalidate).not.toHaveBeenCalled();
  });
});
