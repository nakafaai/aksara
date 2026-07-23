import { Path } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { ContentSnapshotRow } from "@nakafa/aksara-contracts/release/snapshot-data";
import type {
  TryoutCatalogRecord,
  TryoutPlacementSource,
} from "@nakafa/aksara-contracts/tryout/spec";
import { Effect, Stream } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { prepareQuestionPublication } from "#publisher/question/publication";
import { prepareTryoutSnapshot } from "#publisher/tryout/snapshot";
import { testFileLayer } from "#test/files";
import { checkoutRoot, rendererManifest, sourceByPath } from "#test/question";
import { questionRendererManifest } from "#test/question-renderer";
import { tryoutCatalog, tryoutHeads, tryoutPlacements } from "#test/tryout";

interface TestProjection {
  readonly catalog: readonly TryoutCatalogRecord[];
  readonly placements: readonly TryoutPlacementSource[];
  readonly routeCount: number;
}

const projectionState = vi.hoisted(
  (): { current: TestProjection | undefined } => ({ current: undefined })
);

vi.mock("@nakafa/aksara-corpus/tryout/projection", async () => {
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    loadTryoutProjection: () =>
      projectionState.current === undefined
        ? RuntimeEffect.dieMessage("Expected a configured test projection.")
        : RuntimeEffect.succeed(projectionState.current),
  };
});

const { loadTryoutProjection: loadRealTryoutProjection } =
  await vi.importActual<
    typeof import("@nakafa/aksara-corpus/tryout/projection")
  >("@nakafa/aksara-corpus/tryout/projection");

/** Runs preparation and replays its sealed rows twice inside one scope. */
function prepare(inputHeads: readonly QuestionHead[] = tryoutHeads) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const prepared = yield* prepareTryoutSnapshot({
          checkoutRoot,
          questionHeads: () => Stream.fromIterable(inputHeads),
          rendererManifest,
        });
        const [first, second] = yield* Effect.all([
          prepared.rows().pipe(Stream.runCollect),
          prepared.rows().pipe(Stream.runCollect),
        ]);
        return {
          first: [...first],
          manifest: prepared.manifest,
          second: [...second],
        };
      })
    ).pipe(
      Effect.provide(testFileLayer(sourceByPath)),
      Effect.provide(Path.layer)
    )
  );
}

/** Prepares the entire real try-out inventory without collecting its rows. */
function prepareFull(inputHeads: readonly QuestionHead[]) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const prepared = yield* prepareTryoutSnapshot({
          checkoutRoot,
          questionHeads: () => Stream.fromIterable(inputHeads),
          rendererManifest: questionRendererManifest,
        });
        const rowCount = yield* prepared
          .rows()
          .pipe(Stream.runFold(0, (count) => count + 1));
        return { manifest: prepared.manifest, rowCount };
      })
    ).pipe(Effect.provide(NodeContext.layer))
  );
}

/** Compiles every real question body into its authoritative desired head. */
function compileFullHeads() {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareQuestionPublication({
          checkoutRoot,
          published: Stream.empty,
          rendererManifest: questionRendererManifest,
        });
        return yield* publication.result().pipe(
          Stream.runCollect,
          Effect.map((heads) => [...heads])
        );
      })
    ).pipe(Effect.provide(NodeContext.layer))
  );
}

/** Returns one typed preparation failure without a FiberFailure wrapper. */
function reject(input: {
  /** Supplies a replayable desired-head source when testing source failures. */
  readonly questionHeads?: () => Stream.Stream<QuestionHead, string>;
  readonly renderer?: unknown;
}) {
  return Effect.runPromise(
    Effect.scoped(
      prepareTryoutSnapshot({
        checkoutRoot,
        questionHeads:
          input.questionHeads ?? (() => Stream.fromIterable(tryoutHeads)),
        rendererManifest: input.renderer ?? rendererManifest,
      })
    ).pipe(
      Effect.provide(testFileLayer(sourceByPath)),
      Effect.provide(Path.layer),
      Effect.flip
    )
  );
}

beforeEach(() => {
  projectionState.current = {
    catalog: tryoutCatalog,
    placements: tryoutPlacements,
    routeCount: 2,
  };
});

describe("try-out snapshot preparation", () => {
  it("binds real prompt titles and exact desired artifact hashes", async () => {
    const prepared = await prepare();
    const placements = prepared.first.filter(
      (
        row
      ): row is Extract<
        ContentSnapshotRow,
        { family: "tryout"; rowKind: "placement" }
      > => row.family === "tryout" && row.rowKind === "placement"
    );
    const headByIdentity = new Map(
      tryoutHeads.map((head) => [
        `${head.contentKey}\0${head.locale}`,
        head.artifactHash,
      ])
    );

    expect(prepared.second).toEqual(prepared.first);
    expect(prepared.manifest.manifest).toMatchObject({
      counts: { country: 2, exam: 0, section: 0, set: 0, track: 0 },
      format: "tryout-v1",
      placementCount: 2,
      routeCount: 2,
    });
    expect(placements.map(({ record }) => record.row.title)).toEqual([
      "Problem 1",
      "Soal 1",
    ]);
    expect(
      placements.every(({ record: { row } }) => {
        const question = headByIdentity.get(
          `${row.questionContentKey}\0${row.locale}`
        );
        const answer = headByIdentity.get(
          `${row.answerContentKey}\0${row.locale}`
        );
        return (
          row.questionArtifactHash === question &&
          row.answerArtifactHash === answer
        );
      })
    ).toBe(true);
  });

  it("binds the complete real try-out inventory", async () => {
    const projection = await Effect.runPromise(
      loadRealTryoutProjection(checkoutRoot).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    projectionState.current = projection;
    const fullHeads = await compileFullHeads();
    const prepared = await prepareFull(fullHeads);

    expect(prepared.manifest.manifest.placementCount).toBe(840);
    expect(prepared.rowCount).toBe(
      projection.catalog.length + projection.placements.length
    );
  }, 120_000);

  it("preserves renderer and desired-head source failures", async () => {
    const rendererError = await reject({ renderer: {} });
    const sourceError = await reject({
      questionHeads: () => Stream.fail("test-head-source"),
    });

    expect(rendererError).toMatchObject({
      _tag: "ContractDecodeError",
      contract: "RendererManifestEnvelope",
    });
    expect(sourceError).toBe("test-head-source");
  });

  it("rejects a desired head that does not own its source path", async () => {
    const [first, ...rest] = tryoutHeads;
    if (first === undefined) {
      throw new Error("Expected the real question head slice.");
    }
    const altered = QuestionHeadSchema.make({
      ...first,
      sourcePath: tryoutHeads[1]?.sourcePath ?? first.sourcePath,
    });
    const error = await reject({
      questionHeads: () =>
        Stream.fromIterable([altered, ...rest].sort(compareContentHeads)),
    });

    expect(error).toMatchObject({
      _tag: "TryoutHeadMismatchError",
      field: "sourcePath",
    });
  });
});
