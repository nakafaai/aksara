import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type {
  ContentReleaseBundle,
  ContentReleaseStatus,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import {
  activateCandidateRelease,
  stageCandidateRelease,
  stageRecoveryRelease,
  verifyCandidateActivation,
} from "#publisher/publication/lifecycle";
import type { PublicationPlan } from "#publisher/publication/plan";
import { PublicationActivation } from "#publisher/publication/spec";
import {
  PublicationStaleBaseError,
  PublicationTargetConflictError,
} from "#publisher/target/errors";
import { releaseEvidence, releaseReceipt } from "#test/lifecycle-state";
import {
  makeRollbackRelease,
  makeSignedBundle,
  rendererManifest,
  testVerificationResolver,
} from "#test/publication";
import { makePublicationTarget } from "#test/target";

const bundle = await makeSignedBundle("test-lifecycle");
const { release } = bundle;
const { manifest } = release;
const rollback = await makeRollbackRelease("test-lifecycle-recovery");
const rollbackBundle = { release: rollback.release, rendererManifest };
const receipt = releaseReceipt(release);

/** Creates one exact durable status for the requested lifecycle phase. */
function statusFor(
  phase: ContentReleaseStatus["phase"],
  selected: ContentReleaseBundle["release"]
): ContentReleaseStatus {
  const identity = {
    manifestHash: selected.manifestHash,
    releaseId: selected.manifest.releaseId,
  };
  return phase === "completed"
    ? { ...identity, phase, receipt: releaseReceipt(selected) }
    : { ...identity, phase };
}

/** Builds a replayable lifecycle plan around focused target capabilities. */
function makePlan(
  phase: ContentReleaseStatus["phase"],
  overrides: Partial<
    typeof import("#publisher/publication/spec").PublicationTarget.Service
  > = {},
  selectedBundle: ContentReleaseBundle = bundle
) {
  const selected = selectedBundle.release;
  const selectedManifest = selected.manifest;
  const stage = vi.fn();
  const stageRelease = vi.fn(() => Effect.void);
  const stageRecovery = vi.fn(() => Effect.void);
  const status = vi.fn(() => Effect.succeed(statusFor(phase, selected)));
  const verify = vi.fn(() => Effect.succeed(releaseEvidence(selected)));
  const activate = vi.fn(() => Effect.succeed(releaseReceipt(selected)));
  const target = makePublicationTarget({
    activate,
    stageRecovery,
    stageRelease,
    status,
    verify,
    ...overrides,
  });
  const plan: PublicationPlan<never, never> = {
    bundle: selectedBundle,
    projectionSummary: { count: selectedManifest.projectionCount },
    routeSummary: { count: selectedManifest.routeCount },
    stage: Effect.sync(stage),
    summary: {
      deleteCount: selectedManifest.deleteCount,
      upsertCount: selectedManifest.upsertCount,
    },
    target,
  };
  return { activate, plan, stage, stageRecovery, stageRelease, status, verify };
}

/** Runs one lifecycle program with the release fixture's verification key. */
function runLifecycle<A, E>(
  program: Effect.Effect<A, E, ContentVerificationKeyResolver>
) {
  return Effect.runPromise(
    program.pipe(
      Effect.provideService(
        ContentVerificationKeyResolver,
        testVerificationResolver
      )
    )
  );
}

describe("publication lifecycle", () => {
  it.each([
    ["missing", 1, 1],
    ["staging", 1, 1],
    ["verifying", 0, 1],
    ["verified", 0, 0],
  ] as const)(
    "resumes candidate phase %s",
    async (phase, stageCalls, verifyCalls) => {
      const state = makePlan(phase);
      await expect(
        runLifecycle(stageCandidateRelease(state.plan))
      ).resolves.toEqual({
        kind: "verified",
      });
      expect(state.stageRelease).toHaveBeenCalledWith(bundle);
      expect(state.stage).toHaveBeenCalledTimes(stageCalls);
      expect(state.verify).toHaveBeenCalledTimes(verifyCalls);
    }
  );

  it("returns an authenticated completed candidate receipt", async () => {
    const state = makePlan("completed");
    await expect(
      runLifecycle(stageCandidateRelease(state.plan))
    ).resolves.toEqual({
      kind: "completed",
      receipt,
    });
    expect(state.stage).not.toHaveBeenCalled();
    expect(state.verify).not.toHaveBeenCalled();
  });

  it.each(["aborting", "aborted"] as const)(
    "rejects terminal phase %s",
    async (phase) => {
      const state = makePlan(phase);
      const error = await runLifecycle(
        stageCandidateRelease(state.plan).pipe(Effect.flip)
      );
      expect(error._tag).toBe(
        phase === "aborted"
          ? "PublicationReleaseAbortedError"
          : "PublicationResumePhaseError"
      );
      expect(state.stage).not.toHaveBeenCalled();
    }
  );

  it.each([
    {
      manifestHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      releaseId: manifest.releaseId,
    },
    {
      manifestHash: release.manifestHash,
      releaseId: ReleaseIdSchema.make("another-release"),
    },
  ])("rejects status for another exact manifest", async (identity) => {
    const state = makePlan("staging", {
      status: () => Effect.succeed({ ...identity, phase: "staging" }),
    });
    const error = await runLifecycle(
      stageCandidateRelease(state.plan).pipe(Effect.flip)
    );
    expect(error._tag).toBe("PublicationStatusMismatchError");
  });

  it("does not resume after immutable envelope staging conflicts", async () => {
    const conflict = new PublicationTargetConflictError({
      conflict: {
        code: "CONTENT_RELEASE_CONFLICT",
        kind: "conflict",
        operation: "stageRelease",
        releaseId: manifest.releaseId,
      },
    });
    const state = makePlan("verified", {
      stageRelease: () => Effect.fail(conflict),
    });
    await expect(
      runLifecycle(stageCandidateRelease(state.plan).pipe(Effect.flip))
    ).resolves.toEqual(conflict);
    expect(state.status).not.toHaveBeenCalled();
  });

  it("stages and verifies the signed recovery envelope", async () => {
    const state = makePlan("missing", {}, rollbackBundle);
    await expect(
      runLifecycle(stageRecoveryRelease(state.plan))
    ).resolves.toBeUndefined();
    expect(state.stageRecovery).toHaveBeenCalledWith(rollbackBundle);
  });

  it("rejects a recovery identity that is already completed", async () => {
    const state = makePlan("completed", {}, rollbackBundle);
    const error = await runLifecycle(
      stageRecoveryRelease(state.plan).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationResumePhaseError",
      phase: "completed",
    });
  });

  it("rejects a Git-owned bundle at the recovery-only target boundary", async () => {
    const state = makePlan("verified");
    const error = await runLifecycle(
      stageRecoveryRelease(state.plan).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationModeMismatchError",
      manifestMode: "git",
      preparedMode: "rollback",
    });
    expect(state.stageRecovery).not.toHaveBeenCalled();
  });

  it("revalidates the live renderer immediately before activation", async () => {
    const verify = vi.fn(() => Effect.void);
    const state = makePlan("verified");
    await runLifecycle(
      verifyCandidateActivation(state.plan).pipe(
        Effect.provideService(
          PublicationActivation,
          PublicationActivation.of({ verify })
        )
      )
    );
    expect(verify).toHaveBeenCalledWith(release);
  });

  it("validates the atomic activation receipt", async () => {
    const state = makePlan("verified");
    await expect(
      runLifecycle(activateCandidateRelease(state.plan))
    ).resolves.toEqual(receipt);
    expect(state.activate).toHaveBeenCalledWith(release);
  });

  it("surfaces a stale base from atomic activation", async () => {
    const failure = new PublicationStaleBaseError({
      failure: {
        activeReleaseId: ReleaseIdSchema.make("another-release"),
        code: "CONTENT_RELEASE_STALE_BASE",
        expectedBaseReleaseId: null,
        kind: "stale-base",
        operation: "activate",
        releaseId: manifest.releaseId,
      },
    });
    const state = makePlan("verified", {
      activate: () => Effect.fail(failure),
    });
    await expect(
      runLifecycle(activateCandidateRelease(state.plan).pipe(Effect.flip))
    ).resolves.toEqual(failure);
  });
});
