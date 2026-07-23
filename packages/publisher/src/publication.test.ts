import { resolve } from "node:path";
import { Path } from "@effect/platform";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { digestProjections } from "@nakafa/aksara-contracts/projection/digest";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { Effect, Stream } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { prepareMaterialPublication } from "#publisher/material/publication";
import { prepareContentRelease } from "#publisher/preparation";
import {
  makePreparedGitRelease,
  makePreparedRollbackRelease,
} from "#publisher/preparation/spec";
import {
  publishGitRelease,
  publishRollbackRelease,
} from "#publisher/publication";
import { PublicationSource } from "#publisher/publication/spec";
import { testFileLayer } from "#test/files";
import { makeTarget } from "#test/lifecycle";
import {
  checkoutRoot,
  rendererManifest as materialRendererManifest,
  sourceByPath,
} from "#test/material";
import {
  makeRelease,
  makeRollbackRelease,
  projection,
  publish,
  publishFromSource,
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
    const result = await Effect.runPromise(
      Effect.scoped(
        Effect.gen(function* () {
          const material = yield* prepareMaterialPublication({
            baseCatalog: null,
            checkoutRoot,
            published: Stream.empty,
            rendererManifest: materialRendererManifest,
          });
          const prepared = yield* prepareContentRelease({
            aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
            baseManifestHash: null,
            baseReleaseId: null,
            baseResultCount: 0,
            baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
            records: material.records,
            releaseId: ReleaseIdSchema.make("test-material-replay"),
            rendererManifest: materialRendererManifest,
            result: material.result,
          });
          const state = makeTarget(prepared);
          const source = PublicationSource.of({
            loadExactRevision: ({ items }) =>
              items.pipe(
                Stream.mapEffect((item) => {
                  if (item.change.operation === "delete") {
                    return Effect.dieMessage(
                      "Exact-Git source requested for a test tombstone."
                    );
                  }
                  const rawMdx = sourceByPath.get(
                    resolve(checkoutRoot, item.change.sourcePath)
                  );
                  if (rawMdx === undefined) {
                    return Effect.dieMessage(
                      `Missing exact test source ${item.change.sourcePath}.`
                    );
                  }
                  return Effect.succeed(
                    CompileDocumentSourceSchema.make({
                      contentKey: item.change.contentKey,
                      locale: item.change.locale,
                      rawMdx,
                      rendererDomain: item.change.rendererDomain,
                      sourcePath: item.change.sourcePath,
                    })
                  );
                })
              ),
          });
          const receipt = yield* publishFromSource(
            prepared,
            state.target,
            source
          );
          return { receipt, stageArtifacts: state.stageArtifactBatch };
        })
      ).pipe(
        Effect.provide(testFileLayer(sourceByPath)),
        Effect.provide(Path.layer)
      )
    );

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
    });
    await Effect.runPromise(publishRollbackPrepared(prepared, state.target));
    expect(state.stageArtifactBatch).toHaveBeenCalledOnce();
    expect(artifactReplays).toBe(1);
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
      publishRollbackPrepared(rollbackMismatch, gitState.target).pipe(
        Effect.flip
      )
    );
    expect(rollbackError).toMatchObject({
      _tag: "PublicationModeMismatchError",
    });
  });

  it("requires exact Git source context only for Git publication", async () => {
    const git = await makeRelease("test-release-git-requirements");
    const rollback = await makeRollbackRelease(
      "test-release-rollback-requirements"
    );
    const gitEffect = publishGitRelease(git.prepared);
    const rollbackEffect = publishRollbackRelease(rollback.prepared);
    type GitRequirements = Effect.Effect.Context<typeof gitEffect>;
    type RollbackRequirements = Effect.Effect.Context<typeof rollbackEffect>;
    const requirements: {
      readonly git: PublicationSource extends GitRequirements ? true : false;
      readonly rollback: PublicationSource extends RollbackRequirements
        ? true
        : false;
    } = { git: true, rollback: false };

    expect(requirements).toEqual({ git: true, rollback: false });
  });
});
