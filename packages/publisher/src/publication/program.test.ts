import { beforeEach, expect, it } from "@effect/vitest";
import { Effect, Stream } from "effect";
import { vi } from "vitest";

import {
  makePreparedGitRelease,
  makePreparedRollbackRelease,
} from "#publisher/preparation/prepared";
import { makeTarget } from "#test/lifecycle/spec";
import { publishMaterialRelease } from "#test/material/run";
import { makeRelease, projection, rendererManifest } from "#test/publication";
import {
  makeRollbackRelease,
  publishPrepared,
  publishRollbackPrepared,
} from "#test/publication/run";
import { publicationRequirements } from "#test/requirements";
import { emptySnapshotSources } from "#test/snapshot";

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

beforeEach(() => {
  compilerState.calls = 0;
});

it.effect("requires exact Git source context only for Git publication", () =>
  Effect.gen(function* () {
    const requirements = yield* Effect.promise(publicationRequirements);
    expect(requirements).toEqual({ git: true, rollback: false });
  })
);

it.effect("compiles each source once per reproducibility boundary", () =>
  Effect.gen(function* () {
    const result = yield* Effect.promise(publishMaterialRelease);
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

it.effect("stages rollback artifacts and rejects mismatched modes", () =>
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
    yield* publishRollbackPrepared(prepared, state.target);
    expect(state.stageArtifactBatch).toHaveBeenCalledOnce();
    expect(artifactReplays).toBe(1);
    const mismatch = makePreparedGitRelease({
      items: release.prepared.items,
      manifest: release.manifest,
      projections: Stream.make(projection),
      rendererManifest,
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
    const rollbackError = yield* publishRollbackPrepared(
      rollbackMismatch,
      gitState.target
    ).pipe(Effect.flip);
    expect(rollbackError).toMatchObject({
      _tag: "PublicationModeMismatchError",
    });
  })
);
