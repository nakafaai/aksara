import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ContentReleaseManifestSchema,
  type PublicationReceipt,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import type { ContentReleaseStatus } from "@nakafa/aksara-contracts/release/lifecycle";
import { Effect, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import { completePublicationLifecycle } from "#publisher/publication/lifecycle";
import { PublicationTarget } from "#publisher/publication/spec";
import {
  PublicationStaleBaseError,
  PublicationTargetConflictError,
} from "#publisher/target-errors";

const manifest = Schema.decodeUnknownSync(ContentReleaseManifestSchema)({
  baseReleaseId: null,
  itemCount: 1,
  itemsDigest: `sha256:${"b".repeat(64)}`,
  origin: { kind: "git", sha: "a".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"c".repeat(64)}`,
  releaseId: "test-lifecycle",
  rendererContractVersion: "2.0.0",
  rendererManifestHash: `sha256:${"d".repeat(64)}`,
});
const release = Schema.decodeUnknownSync(SignedContentReleaseSchema)({
  keyId: "test-key",
  manifest,
  manifestHash: `sha256:${"e".repeat(64)}`,
  signature: `${"A".repeat(85)}A`,
});
const summary = { deleteCount: 0, upsertCount: 1 };
const projectionSummary = { count: 1 };
const receipt: PublicationReceipt = {
  activatedHeads: 1,
  deletedHeads: 0,
  projectionDigest: manifest.projectionDigest,
  releaseId: manifest.releaseId,
  stagedArtifacts: 1,
  stagedItems: 1,
  stagedProjections: 1,
};
const evidence = {
  baseReleaseId: manifest.baseReleaseId,
  deleteHeads: 0,
  itemCount: 1,
  itemsDigest: manifest.itemsDigest,
  projectionCount: 1,
  projectionDigest: manifest.projectionDigest,
  releaseId: manifest.releaseId,
  rendererContractVersion: manifest.rendererContractVersion,
  rendererManifestHash: manifest.rendererManifestHash,
  stagedArtifacts: 1,
  upsertHeads: 1,
};

/** Creates one exact durable status for the requested lifecycle phase. */
function statusFor(phase: ContentReleaseStatus["phase"]): ContentReleaseStatus {
  const identity = {
    manifestHash: release.manifestHash,
    releaseId: release.manifest.releaseId,
  };
  if (phase === "completed") {
    return { ...identity, phase, receipt };
  }
  return { ...identity, phase };
}

/** Builds an observable target for one persisted lifecycle phase. */
function makeTarget(
  phase: ContentReleaseStatus["phase"],
  overrides: {
    readonly activate?: typeof PublicationTarget.Service.activate;
    readonly stageRelease?: typeof PublicationTarget.Service.stageRelease;
    readonly status?: typeof PublicationTarget.Service.status;
  } = {}
) {
  const stageRelease = vi.fn(overrides.stageRelease ?? (() => Effect.void));
  const status = vi.fn(
    overrides.status ?? (() => Effect.succeed(statusFor(phase)))
  );
  const verify = vi.fn(() => Effect.succeed(evidence));
  const activate = vi.fn(overrides.activate ?? (() => Effect.succeed(receipt)));
  const finalize = vi.fn(() => Effect.succeed(receipt));
  const target = PublicationTarget.of({
    activate,
    cleanup: () => Effect.die("Cleanup is outside lifecycle tests."),
    finalize,
    rollbackPage: () => Effect.die("Rollback is outside lifecycle tests."),
    stageArtifactBatch: () => Effect.void,
    stageItemBatch: () => Effect.void,
    stageProjectionBatch: () => Effect.void,
    stageRelease,
    status,
    verify,
  });
  return { activate, finalize, stageRelease, status, target, verify };
}

/** Runs the lifecycle with a separately observable staging Effect. */
function runLifecycle(
  target: typeof PublicationTarget.Service,
  stage = Effect.void
) {
  return completePublicationLifecycle({
    projectionSummary,
    release,
    stage,
    summary,
    target,
  });
}

describe("completePublicationLifecycle", () => {
  it.each([
    ["missing", 1, 1, 1, 1],
    ["staging", 1, 1, 1, 1],
    ["verifying", 0, 1, 1, 1],
    ["verified", 0, 0, 1, 1],
    ["active", 0, 0, 0, 1],
    ["finalizing", 0, 0, 0, 1],
    ["completed", 0, 0, 0, 0],
  ] as const)(
    "resumes %s only after staging its exact signed envelope",
    async (phase, stageCalls, verifyCalls, activateCalls, finalizeCalls) => {
      const state = makeTarget(phase);
      const stage = vi.fn();
      await Effect.runPromise(runLifecycle(state.target, Effect.sync(stage)));
      expect(state.stageRelease).toHaveBeenCalledOnce();
      expect(state.status).toHaveBeenCalledWith({
        manifestHash: release.manifestHash,
        releaseId: release.manifest.releaseId,
      });
      expect(state.stageRelease.mock.invocationCallOrder[0]).toBeLessThan(
        state.status.mock.invocationCallOrder[0] ?? 0
      );
      expect(stage).toHaveBeenCalledTimes(stageCalls);
      expect(state.verify).toHaveBeenCalledTimes(verifyCalls);
      expect(state.activate).toHaveBeenCalledTimes(activateCalls);
      expect(state.finalize).toHaveBeenCalledTimes(finalizeCalls);
    }
  );

  it("fails an immutable aborted release before staging its rows", async () => {
    const state = makeTarget("aborted");
    const stage = vi.fn();
    const error = await Effect.runPromise(
      runLifecycle(state.target, Effect.sync(stage)).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationReleaseAbortedError",
      manifestHash: release.manifestHash,
      releaseId: release.manifest.releaseId,
    });
    expect(stage).not.toHaveBeenCalled();
  });

  it.each([
    {
      manifestHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      releaseId: release.manifest.releaseId,
    },
    {
      manifestHash: release.manifestHash,
      releaseId: ReleaseIdSchema.make("another-release"),
    },
  ])("rejects status for another exact manifest", async (identity) => {
    const state = makeTarget("staging", {
      status: () => Effect.succeed({ ...identity, phase: "staging" }),
    });
    const error = await Effect.runPromise(
      runLifecycle(state.target).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ _tag: "PublicationStatusMismatchError" });
    expect(state.verify).not.toHaveBeenCalled();
  });

  it.each(["verified", "completed"] as const)(
    "does not resume a %s release when exact manifest staging conflicts",
    async (phase) => {
      const state = makeTarget(phase, {
        stageRelease: () =>
          Effect.fail(
            new PublicationTargetConflictError({
              message: "The manifest bytes changed.",
              stage: "release",
            })
          ),
      });
      const error = await Effect.runPromise(
        runLifecycle(state.target).pipe(Effect.flip)
      );
      expect(error).toMatchObject({ _tag: "PublicationTargetConflictError" });
      expect(state.status).not.toHaveBeenCalled();
      expect(state.activate).not.toHaveBeenCalled();
    }
  );

  it("surfaces a stale base before finalization", async () => {
    const state = makeTarget("verified", {
      activate: () =>
        Effect.fail(
          new PublicationStaleBaseError({
            activeReleaseId: ReleaseIdSchema.make("another-release"),
            expectedBaseReleaseId: null,
            releaseId: release.manifest.releaseId,
          })
        ),
    });
    const error = await Effect.runPromise(
      runLifecycle(state.target).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ _tag: "PublicationStaleBaseError" });
    expect(state.finalize).not.toHaveBeenCalled();
  });
});
