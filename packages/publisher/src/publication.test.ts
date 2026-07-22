import { digestProjections } from "@nakafa/aksara-contracts/projection/digest";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import {
  makePreparedGitRelease,
  makePreparedRollbackRelease,
} from "#publisher/preparation/spec";
import {
  makeRelease,
  makeRollbackRelease,
  makeTarget,
  projection,
  publish,
  publishPrepared,
  record,
  rendererManifest,
} from "#test/publication";

describe("publishContentRelease", () => {
  it("stages once, activates once, and returns a completed retry", async () => {
    const release = await makeRelease("test-release-idempotent");
    const state = makeTarget(release);
    const first = await Effect.runPromise(publish(release, state.target));
    const second = await Effect.runPromise(publish(release, state.target));
    expect(second).toEqual(first);
    expect(state.stageItemBatch).toHaveBeenCalledTimes(1);
    expect(state.stageRelease).toHaveBeenCalledTimes(2);
    expect(state.activationTransitions).toBe(1);
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
        replayCount < 7 ? record : { ...record, projection: changedProjection }
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

  it("stages rollback artifacts and rejects a mismatched prepared mode", async () => {
    const release = await makeRollbackRelease("test-release-rollback");
    const state = makeTarget(release);
    await Effect.runPromise(publishPrepared(release.prepared, state.target));
    expect(state.stageArtifactBatch).toHaveBeenCalledOnce();
    const mismatch = makePreparedGitRelease({
      items: release.prepared.items,
      manifest: release.manifest,
      projections: release.prepared.projections,
      rendererManifest,
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
    });
    const rollbackError = await Effect.runPromise(
      publishPrepared(rollbackMismatch, gitState.target).pipe(Effect.flip)
    );
    expect(rollbackError).toMatchObject({
      _tag: "PublicationModeMismatchError",
    });
  });
});
