import { beforeEach, expect, it } from "@effect/vitest";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Path, Stream } from "effect";

import { prepareMaterialPublication } from "#publisher/material/publication";
import { prepareContentRelease } from "#publisher/preparation";
import {
  makePreparedGitRelease,
  makePreparedRollbackRelease,
} from "#publisher/preparation/prepared";
import { PublicationSource } from "#publisher/publication/spec";
import { testFileLayer } from "#test/files";
import { makeTarget } from "#test/lifecycle/spec";
import {
  MaterialTestFixtures,
  materialFamilyScope,
  materialTestLayer,
} from "#test/material/spec";
import { makeRelease, projection, rendererManifest } from "#test/publication";
import {
  makeRollbackRelease,
  prepareRecoveryPlan,
  publishFromSource,
  publishPrepared,
  testVerificationResolver,
} from "#test/publication/run";
import { emptySnapshotSources, snapshotPolicyBase } from "#test/snapshot";

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
  const { materialSlicePaths } = await import("#test/material/slice");
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

/** Publishes the real material fixture through exact Git source resolution. */
const publishMaterialRelease = Effect.fn("MaterialProgramTest.publishRelease")(
  () =>
    Effect.gen(function* () {
      const fixture = yield* MaterialTestFixtures;
      return yield* Effect.scoped(
        Effect.gen(function* () {
          const material = yield* prepareMaterialPublication({
            checkoutRoot: fixture.checkoutRoot,
            published: Stream.empty,
            rendererManifest: fixture.rendererManifest,
            scope: materialFamilyScope,
          });
          const resultHeads = yield* material.result.pipe(Stream.runCollect);
          const prepared = yield* prepareContentRelease({
            aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
            baseResultCount: 0,
            baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
            records: material.records,
            releaseId: ReleaseIdSchema.make("test-material-replay"),
            rendererManifest: fixture.rendererManifest,
            result: Stream.fromIterable(resultHeads),
            routes: material.routes,
            scope: materialFamilyScope,
            tryoutRuntime: null,
            ...snapshotPolicyBase("test-material-base"),
            baseRendererManifestHash: fixture.rendererManifest.hash,
            ...emptySnapshotSources,
          });
          const state = makeTarget(prepared);
          const source = PublicationSource.of({
            loadExactRevision: ({ items }) =>
              items.pipe(
                Stream.mapEffect((item) => {
                  if (item.change.operation === "delete") {
                    return Effect.die(
                      "Exact-Git source requested for a test tombstone."
                    );
                  }
                  const absolutePath = fixture.absolutePaths.get(
                    item.change.sourcePath
                  );
                  const rawMdx =
                    absolutePath === undefined
                      ? undefined
                      : fixture.sources.get(absolutePath);
                  if (rawMdx === undefined) {
                    return Effect.die(
                      `Missing exact test source ${item.change.sourcePath}.`
                    );
                  }
                  return Effect.succeed(
                    CompileDocumentSourceSchema.make({
                      artifactLocale: item.change.artifactLocale,
                      contentKey: item.change.contentKey,
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
      ).pipe(Effect.provide([testFileLayer(fixture.sources), Path.layer]));
    })
);

beforeEach(() => {
  compilerState.calls = 0;
});

it.effect("compiles each source once per reproducibility boundary", () =>
  Effect.gen(function* () {
    const result = yield* publishMaterialRelease().pipe(
      Effect.provide(materialTestLayer)
    );
    expect(compilerState.calls).toBe(8);
    expect(result.receipt).toMatchObject({
      activatedHeads: 4,
      stagedArtifacts: 4,
      stagedItems: 4,
      stagedProjections: 4,
    });
    expect(result.stageArtifacts).toHaveBeenCalledTimes(1);
  })
);

it.effect(
  "stages retained recovery artifacts and rejects mismatched modes",
  () =>
    Effect.gen(function* () {
      const release = yield* Effect.promise(() =>
        makeRollbackRelease("test-release-rollback")
      );
      const state = makeTarget(release);
      let artifactReplays = 0;
      const prepared = makePreparedRollbackRelease({
        artifacts: Stream.suspend(() => {
          artifactReplays += 1;
          return release.prepared.artifacts;
        }),
        items: release.prepared.items,
        manifest: release.prepared.manifest,
        projections: release.prepared.projections,
        rendererManifest: release.prepared.rendererManifest,
        routes: release.prepared.routes,
        ...emptySnapshotSources,
      });
      const plan = yield* prepareRecoveryPlan(prepared, state.target);
      yield* plan.stage.pipe(
        Effect.provideService(
          ContentVerificationKeyResolver,
          testVerificationResolver
        )
      );
      expect(state.stageArtifactBatch).toHaveBeenCalledOnce();
      expect(artifactReplays).toBe(1);
      const mismatch = makePreparedGitRelease({
        items: release.prepared.items,
        manifest: release.manifest,
        projections: Stream.make(projection),
        rendererManifest,
        rendererPreflight: "exact",
        routes: release.prepared.routes,
        tryoutRuntime: null,
        ...emptySnapshotSources,
      });
      const error = yield* publishPrepared(mismatch, state.target).pipe(
        Effect.flip
      );
      expect(error).toMatchObject({ _tag: "PublicationModeMismatchError" });

      const gitRelease = yield* Effect.promise(() =>
        makeRelease("test-release-git-mode")
      );
      const gitState = makeTarget(gitRelease);
      const rollbackMismatch = makePreparedRollbackRelease({
        artifacts: release.prepared.artifacts,
        items: gitRelease.prepared.items,
        manifest: gitRelease.manifest,
        projections: gitRelease.prepared.projections,
        rendererManifest,
        routes: gitRelease.prepared.routes,
        ...emptySnapshotSources,
      });
      const rollbackError = yield* prepareRecoveryPlan(
        rollbackMismatch,
        gitState.target
      ).pipe(Effect.flip);
      expect(rollbackError).toMatchObject({
        _tag: "PublicationModeMismatchError",
      });
    })
);
