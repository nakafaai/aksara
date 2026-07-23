import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { digestProjections } from "@nakafa/aksara-contracts/projection/digest";
import { Cause, Effect, Exit, Stream } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  makePreparedGitRelease,
  makePreparedRollbackRelease,
} from "#publisher/preparation/spec";
import {
  PublicationActivation,
  PublicationActivationError,
} from "#publisher/publication/spec";
import { PublicationTargetTransportError } from "#publisher/target/errors";
import { makeTarget } from "#test/lifecycle";
import { publishMaterialRelease } from "#test/material-run";
import {
  makeRelease,
  makeRollbackRelease,
  projection,
  publish,
  publishPrepared,
  publishRollbackPrepared,
  record,
  rendererManifest,
} from "#test/publication";
import { publicationRequirements } from "#test/requirements";

const compilerState = vi.hoisted(() => ({ calls: 0 }));

vi.mock("@nakafa/aksara-compiler/compile", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("@nakafa/aksara-compiler/compile")>();
  return {
    ...original,
    compileContent: (input: unknown) => {
      compilerState.calls += 1;
      return original.compileContent(input);
    },
  };
});

beforeEach(() => {
  compilerState.calls = 0;
});

describe("content publication", () => {
  it("stages once, activates once, and returns a completed retry", async () => {
    const release = await makeRelease("test-release-idempotent");
    const state = makeTarget(release);
    const first = await Effect.runPromise(publish(release, state.target));
    const second = await Effect.runPromise(publish(release, state.target));
    expect(second).toEqual(first);
    expect(state.stageItemBatch).toHaveBeenCalledTimes(2);
    expect(state.stageRelease).toHaveBeenCalledTimes(2);
    expect(state.stageRecovery).toHaveBeenCalledOnce();
    expect(state.activationTransitions).toBe(1);
  });

  it("rejects a recovery identity that aliases the candidate", async () => {
    const release = await makeRelease("test-release-alias-candidate");
    const state = makeTarget(release);
    const error = await Effect.runPromise(
      publish(release, state.target, release.manifest.releaseId).pipe(
        Effect.flip
      )
    );
    expect(error).toMatchObject({
      _tag: "PublicationRecoveryIdentityError",
      conflictingReleaseId: release.manifest.releaseId,
    });
    expect(state.stageRelease).not.toHaveBeenCalled();
  });

  it("rejects a recovery identity that aliases the active base", async () => {
    const rollback = await makeRollbackRelease("test-release-alias-base");
    const state = makeTarget(rollback);
    const { baseReleaseId } = rollback.manifest;
    if (baseReleaseId === null) {
      return await Effect.runPromise(Effect.die("Expected a rollback base."));
    }
    const error = await Effect.runPromise(
      publishRollbackPrepared(
        rollback.prepared,
        state.target,
        baseReleaseId
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationRecoveryIdentityError",
      conflictingReleaseId: baseReleaseId,
    });
  });

  it("aborts the retained inverse before its failed candidate", async () => {
    const release = await makeRelease("test-release-cleanup-order");
    const state = makeTarget(release);
    const failure = new PublicationActivationError({
      releaseId: release.manifest.releaseId,
    });
    await expect(
      Effect.runPromise(
        publish(
          release,
          state.target,
          ReleaseIdSchema.make("test-release-cleanup-order-recovery"),
          PublicationActivation.of({ verify: () => Effect.fail(failure) })
        ).pipe(Effect.flip)
      )
    ).resolves.toEqual(failure);
    expect(state.abortOrder).toEqual([
      "test-release-cleanup-order-recovery",
      release.manifest.releaseId,
    ]);
  });

  it("preserves publication and conflicting cleanup causes", async () => {
    const release = await makeRelease("test-release-cleanup-conflict");
    const state = makeTarget(release);
    const foreignRelease = await makeRollbackRelease("test-foreign-recovery");
    const foreign = {
      release: foreignRelease.release,
      rendererManifest,
    };
    const failure = new PublicationActivationError({
      releaseId: release.manifest.releaseId,
    });
    state.current.mockImplementation(() =>
      Effect.succeed({
        ...state.snapshot(),
        recovery: { ...foreign, phase: "verified" as const },
      })
    );
    const exit = await Effect.runPromiseExit(
      publish(
        release,
        state.target,
        ReleaseIdSchema.make("test-release-cleanup-conflict-recovery"),
        PublicationActivation.of({ verify: () => Effect.fail(failure) })
      )
    );
    expect(Exit.isFailure(exit)).toBe(true);
    if (Exit.isFailure(exit)) {
      expect(
        Array.from(Cause.failures(exit.cause)).map(({ _tag }) => _tag)
      ).toEqual([
        "PublicationActivationError",
        "PublicationRecoveryIdentityError",
      ]);
    }
  });

  it("preserves the failure when no staged slot remains to discard", async () => {
    const release = await makeRelease("test-release-discard-empty");
    const state = makeTarget(release);
    const failure = new PublicationTargetTransportError({
      detail: { reason: "network" },
      stage: "verify",
    });
    state.verify.mockImplementationOnce(() => Effect.fail(failure));
    state.current.mockImplementation(() =>
      Effect.succeed({ ...state.snapshot(), candidate: null, recovery: null })
    );
    await expect(
      Effect.runPromise(publish(release, state.target).pipe(Effect.flip))
    ).resolves.toEqual(failure);
    expect(state.abortOrder).toEqual([]);
  });

  it("blocks activation when a staged replay changes after preparation", async () => {
    let replayCount = 0;
    const changedProjection = {
      ...projection,
      metadata: { ...projection.metadata, title: "Changed test protocol" },
    };
    const release = await makeRelease("test-release-replay", () => {
      replayCount += 1;
      return Stream.make(
        replayCount < 7
          ? record
          : {
              ...record,
              record: { ...record.record, projection: changedProjection },
            }
      );
    });
    const changedSummary = await Effect.runPromise(
      digestProjections(
        release.manifest.releaseId,
        Stream.make(changedProjection)
      )
    );
    const state = makeTarget(release);
    state.verify.mockImplementationOnce((signed) =>
      Effect.succeed({
        ...state.evidence(signed.manifestHash),
        projectionDigest: changedSummary.digest,
      })
    );
    const error = await Effect.runPromise(
      publish(release, state.target).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ _tag: "ReleaseVerificationMismatchError" });
    expect(replayCount).toBeGreaterThanOrEqual(7);
    expect(state.stageProjectionBatch).toHaveBeenCalledOnce();
    expect(state.activate).not.toHaveBeenCalled();
  });

  it("proves exact Git sources before any target write", async () => {
    const release = await makeRelease("test-release-source-preflight");
    const state = makeTarget(release);
    const error = await Effect.runPromise(
      publishPrepared(
        release.prepared,
        state.target,
        'export const metadata = {}\n\n<BlockMath math="y" />'
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ _tag: "ReleaseArtifactMismatchError" });
    expect(state.stageRelease).not.toHaveBeenCalled();
    expect(state.stageItemBatch).not.toHaveBeenCalled();
    expect(state.stageProjectionBatch).not.toHaveBeenCalled();
    expect(state.stageArtifactBatch).not.toHaveBeenCalled();
  });

  it("compiles each source once per required reproducibility boundary", async () => {
    const result = await publishMaterialRelease();

    expect(compilerState.calls).toBe(8);
    expect(result.receipt).toMatchObject({
      activatedHeads: 4,
      stagedArtifacts: 4,
      stagedItems: 4,
      stagedProjections: 4,
    });
    expect(result.stageArtifacts).toHaveBeenCalledTimes(1);
  });

  it("stages rollback artifacts and rejects a mismatched prepared mode", async () => {
    const release = await makeRollbackRelease("test-release-rollback");
    const state = makeTarget(release);
    let artifactReplays = 0;
    const prepared = makePreparedRollbackRelease({
      artifacts: () => {
        artifactReplays += 1;
        return release.prepared.artifacts();
      },
      items: release.prepared.items,
      manifest: release.prepared.manifest,
      projections: release.prepared.projections,
      rendererManifest: release.prepared.rendererManifest,
      routes: release.prepared.routes,
    });
    await Effect.runPromise(publishRollbackPrepared(prepared, state.target));
    expect(state.stageArtifactBatch).toHaveBeenCalledOnce();
    expect(artifactReplays).toBe(1);
    const mismatch = makePreparedGitRelease({
      items: release.prepared.items,
      manifest: release.manifest,
      projections: release.prepared.projections,
      rendererManifest,
      routes: release.prepared.routes,
    });
    const error = await Effect.runPromise(
      publishPrepared(mismatch, state.target).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ _tag: "PublicationModeMismatchError" });

    const gitRelease = await makeRelease("test-release-git-mode");
    const gitState = makeTarget(gitRelease);
    const rollbackMismatch = makePreparedRollbackRelease({
      artifacts: release.prepared.artifacts,
      items: gitRelease.prepared.items,
      manifest: gitRelease.manifest,
      projections: gitRelease.prepared.projections,
      rendererManifest,
      routes: gitRelease.prepared.routes,
    });
    const rollbackError = await Effect.runPromise(
      publishRollbackPrepared(rollbackMismatch, gitState.target).pipe(
        Effect.flip
      )
    );
    expect(rollbackError).toMatchObject({
      _tag: "PublicationModeMismatchError",
    });
  });

  it("requires exact Git source context only for Git publication", async () => {
    const requirements = await publicationRequirements();
    expect(requirements).toEqual({ git: true, rollback: false });
  });
});
