import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { digestProjections } from "@nakafa/aksara-contracts/projection/digest";
import { Effect, Stream } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  makePreparedGitRelease,
  makePreparedRollbackRelease,
} from "#publisher/preparation/spec";
import {
  PublicationActivation,
  PublicationActivationError,
} from "#publisher/publication/spec";
import { makeTarget } from "#test/lifecycle";
import { publishMaterialRelease } from "#test/material-run";
import {
  contentRecord,
  makeRelease,
  makeRollbackRelease,
  projection,
  publish,
  publishPrepared,
  publishRollbackPrepared,
  record,
  rendererManifest,
} from "#test/publication";

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

vi.mock("@nakafa/aksara-corpus/material/registry", async (importOriginal) => {
  const original =
    await importOriginal<
      typeof import("@nakafa/aksara-corpus/material/registry")
    >();
  const { materialSlicePaths } = await import("#test/material-slice");
  const sourcePaths = new Set<string>(materialSlicePaths);
  return {
    ...original,
    decodeMaterialRegistry: (input?: unknown) =>
      original
        .decodeMaterialRegistry(input)
        .pipe(
          Effect.map((entries) =>
            entries.filter(({ sourcePath }) => sourcePaths.has(sourcePath))
          )
        ),
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

  it("invalidates only the exact decoded family and artifact after activation", async () => {
    const release = await makeRelease("test-release-cache-artifact");
    const state = makeTarget(release);
    let cacheChanges: readonly unknown[] = [];
    let receivedRelease = "";
    const activation = PublicationActivation.of({
      invalidate: ({ cacheChanges: changes, release: signedRelease }) =>
        Stream.runCollect(changes()).pipe(
          Effect.tap((values) =>
            Effect.sync(() => {
              cacheChanges = [...values];
              receivedRelease = signedRelease.manifest.releaseId;
            })
          ),
          Effect.asVoid
        ),
      verify: () => Effect.void,
    });

    await Effect.runPromise(
      publish(release, state.target, undefined, activation)
    );

    expect(cacheChanges).toEqual([
      {
        artifactHash: contentRecord.change.artifactHash,
        family: "material",
      },
    ]);
    expect(receivedRelease).toBe(release.manifest.releaseId);
  });

  it("repairs a failed post-commit cache invalidation on exact retry", async () => {
    const release = await makeRelease("test-release-cache-retry");
    const state = makeTarget(release);
    const failure = new PublicationActivationError({
      phase: "cache",
      releaseId: release.manifest.releaseId,
    });
    const invalidate = vi
      .fn<() => Effect.Effect<void, PublicationActivationError>>()
      .mockReturnValueOnce(Effect.fail(failure))
      .mockReturnValue(Effect.void);
    const activation = PublicationActivation.of({
      invalidate,
      verify: () => Effect.void,
    });
    const recoveryId = ReleaseIdSchema.make(
      `${release.manifest.releaseId}-recovery`
    );

    await expect(
      Effect.runPromise(
        publish(release, state.target, recoveryId, activation).pipe(Effect.flip)
      )
    ).resolves.toEqual(failure);
    expect(state.snapshot().active?.release.manifest.releaseId).toBe(
      release.manifest.releaseId
    );
    expect(state.abortOrder).toEqual([]);

    await expect(
      Effect.runPromise(publish(release, state.target, recoveryId, activation))
    ).resolves.toMatchObject({ releaseId: release.manifest.releaseId });
    expect(state.activationTransitions).toBe(1);
    expect(invalidate).toHaveBeenCalledTimes(2);
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
});
