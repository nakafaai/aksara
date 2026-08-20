import { NodeServices } from "@effect/platform-node";
import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { ContentSnapshotRow } from "@nakafa/aksara-contracts/release/snapshot/data";
import type { TryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/catalog";
import type { TryoutPlacementSource } from "@nakafa/aksara-contracts/tryout/placement";
import type { TryoutCatalogCounts } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import type { QuestionEntry } from "@nakafa/aksara-corpus/question-bank/content";
import type { QuestionSource } from "@nakafa/aksara-corpus/question-bank/source";
import { beforeEach, describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Path, Stream } from "effect";
import { vi } from "vitest";
import { prepareTryoutSnapshot } from "#publisher/tryout/snapshot";
import { testFileLayer } from "#test/files";
import {
  checkoutRoot,
  publishedQuestionHeads,
  questionEntries,
  questionSources,
  rendererManifest,
  sourceByPath,
} from "#test/question/spec";
import { selectTryoutSlice } from "#test/tryout-slice";

interface TestProjection {
  readonly catalog: readonly TryoutCatalogRecord[];
  readonly placements: readonly TryoutPlacementSource[];
  readonly routeCount: number;
}

interface TestContent {
  readonly entries: readonly QuestionEntry[];
  readonly projection: TestProjection;
  readonly sources: readonly QuestionSource[];
}

const contentState = vi.hoisted((): { current: TestContent | undefined } => ({
  current: undefined,
}));

vi.mock("@nakafa/aksara-corpus/tryout/content", async () => {
  const { Effect: RuntimeEffect } = await import("effect");
  return {
    loadTryoutContent: () =>
      contentState.current === undefined
        ? RuntimeEffect.die(new Error("Expected configured test content."))
        : RuntimeEffect.succeed(contentState.current),
  };
});

const tryoutHeads = await publishedQuestionHeads();
const { loadTryoutContent: loadRealTryoutContent } = await vi.importActual<
  typeof import("@nakafa/aksara-corpus/tryout/content")
>("@nakafa/aksara-corpus/tryout/content");
const completeTryoutContent = await Effect.runPromise(
  loadRealTryoutContent(checkoutRoot).pipe(Effect.provide(NodeServices.layer))
);
const { catalog: tryoutCatalog, placements: tryoutPlacements } =
  selectTryoutSlice(
    completeTryoutContent.projection,
    questionEntries.filter(({ bodyKind }) => bodyKind === "question")
  );
/** Counts exact hierarchy kinds from the configured snapshot fixture. */
function countCatalogKinds(records: readonly TryoutCatalogRecord[]) {
  const counts = {
    country: 0,
    exam: 0,
    section: 0,
    set: 0,
    track: 0,
  };
  for (const { row } of records) {
    counts[row.kind] += 1;
  }
  return counts satisfies TryoutCatalogCounts;
}

/** Counts public hierarchy routes represented by the configured fixture. */
function countCatalogRoutes(records: readonly TryoutCatalogRecord[]) {
  return records.filter(
    ({ row }) => "publicPath" in row && row.publicPath !== undefined
  ).length;
}

/** Runs preparation and replays its sealed rows twice inside one scope. */
function prepare(inputHeads: readonly QuestionHead[] = tryoutHeads) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const prepared = yield* prepareTryoutSnapshot({
          checkoutRoot,
          questionHeads: Stream.fromIterable(inputHeads),
          rendererManifest,
        });
        const [first, second] = yield* Effect.all([
          prepared.rows.pipe(Stream.runCollect),
          prepared.rows.pipe(Stream.runCollect),
        ]);
        return {
          first: [...first],
          manifest: prepared.manifest,
          second: [...second],
        };
      })
    ).pipe(Effect.provide([testFileLayer(sourceByPath), Path.layer]))
  );
}

/** Returns one typed preparation failure without a FiberFailure wrapper. */
function reject(input: {
  /** Supplies a replayable desired-head source when testing source failures. */
  readonly questionHeads?: Stream.Stream<QuestionHead, string>;
  readonly renderer?: unknown;
}) {
  return Effect.runPromise(
    Effect.scoped(
      prepareTryoutSnapshot({
        checkoutRoot,
        questionHeads: input.questionHeads ?? Stream.fromIterable(tryoutHeads),
        rendererManifest: input.renderer ?? rendererManifest,
      })
    ).pipe(
      Effect.provide([testFileLayer(sourceByPath), Path.layer]),
      Effect.flip
    )
  );
}

beforeEach(() => {
  const routeCount = countCatalogRoutes(tryoutCatalog);
  contentState.current = {
    entries: questionEntries,
    projection: {
      catalog: tryoutCatalog,
      placements: tryoutPlacements,
      routeCount,
    },
    sources: questionSources,
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
        `${head.contentKey}\0${head.artifactLocale}`,
        head.artifactHash,
      ])
    );

    expect(prepared.second).toEqual(prepared.first);
    expect(prepared.manifest.manifest).toMatchObject({
      counts: countCatalogKinds(tryoutCatalog),
      format: "localized-tryout-snapshot",
      placementCount: tryoutPlacements.length,
      routeCount: countCatalogRoutes(tryoutCatalog),
    });
    expect(
      placements.every(({ record: { row } }) => {
        const question = headByIdentity.get(
          `${row.questionContentKey}\0${row.questionArtifactLocale}`
        );
        const answer = headByIdentity.get(
          `${row.answerContentKey}\0${row.answerArtifactLocale}`
        );
        return (
          row.questionArtifactHash === question &&
          row.answerArtifactHash === answer
        );
      })
    ).toBe(true);
  });

  it("preserves renderer and desired-head source failures", async () => {
    const rendererError = await reject({ renderer: {} });
    const sourceError = await reject({
      questionHeads: Stream.fail("test-head-source"),
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
      questionHeads: Stream.fromIterable(
        [altered, ...rest].sort(compareContentHeads)
      ),
    });

    expect(error).toMatchObject({
      _tag: "TryoutHeadMismatchError",
      field: "sourcePath",
    });
  });
});
