import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import { ContractDecodeError } from "@nakafa/aksara-contracts/errors";
import {
  type QuestionHead,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { ContentSnapshotRow } from "@nakafa/aksara-contracts/release/snapshot/data";
import type { TryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/catalog";
import type { TryoutCatalogCounts } from "@nakafa/aksara-contracts/tryout/snapshot/spec";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { Context, Effect, Layer, Path, Stream } from "effect";
import { TryoutHeadMismatchError } from "#publisher/tryout/error";
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
import { historicalRendererManifest } from "#test/renderer";
import { selectTryoutSlice } from "#test/tryout-slice";

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

/** Loads real heads and an explicit complete source slice for snapshot binding. */
const makeSnapshotTestFixtures = Effect.fn("TryoutSnapshotTest.makeFixtures")(
  () =>
    Effect.gen(function* () {
      const tryoutHeads = yield* Effect.promise(publishedQuestionHeads);
      const completeTryoutContent = yield* loadTryoutContent(checkoutRoot).pipe(
        Effect.provide(NodeServices.layer)
      );
      const { catalog: tryoutCatalog, placements: tryoutPlacements } =
        selectTryoutSlice(
          completeTryoutContent.projection,
          questionEntries.filter(({ bodyKind }) => bodyKind === "question")
        );
      const routeCount = countCatalogRoutes(tryoutCatalog);
      const content = {
        entries: questionEntries,
        projection: {
          catalog: tryoutCatalog,
          placements: tryoutPlacements,
          routeCount,
        },
        sources: questionSources,
      };
      return { content, tryoutCatalog, tryoutHeads, tryoutPlacements };
    })
);

class TryoutSnapshotTestFixtures extends Context.Service<
  TryoutSnapshotTestFixtures,
  Effect.Success<ReturnType<typeof makeSnapshotTestFixtures>>
>()("AksaraPublisherTryoutSnapshotTestFixtures") {}

const snapshotTestLayer = Layer.effect(
  TryoutSnapshotTestFixtures,
  makeSnapshotTestFixtures()
);

/** Runs preparation and replays its sealed rows twice inside one scope. */
const prepare = Effect.fn("TryoutSnapshotTest.prepare")(
  (
    fixture: Effect.Success<ReturnType<typeof makeSnapshotTestFixtures>>,
    inputHeads: readonly QuestionHead[] = fixture.tryoutHeads,
    renderer = rendererManifest
  ) =>
    Effect.scoped(
      Effect.gen(function* () {
        const prepared = yield* prepareTryoutSnapshot({
          checkoutRoot,
          content: fixture.content,
          questionHeads: Stream.fromIterable(inputHeads),
          rendererManifest: renderer,
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

/** Returns one typed preparation failure without a FiberFailure wrapper. */
const reject = Effect.fn("TryoutSnapshotTest.reject")(
  (
    fixture: Effect.Success<ReturnType<typeof makeSnapshotTestFixtures>>,
    input: {
      /** Supplies a replayable desired-head source when testing source failures. */
      readonly questionHeads?: Stream.Stream<QuestionHead, string>;
      readonly renderer?: unknown;
    }
  ) =>
    Effect.scoped(
      prepareTryoutSnapshot({
        checkoutRoot,
        content: fixture.content,
        questionHeads:
          input.questionHeads ?? Stream.fromIterable(fixture.tryoutHeads),
        rendererManifest: input.renderer ?? rendererManifest,
      })
    ).pipe(
      Effect.provide([testFileLayer(sourceByPath), Path.layer]),
      Effect.flip
    )
);

layer(snapshotTestLayer, { timeout: "30 seconds" })(
  "try-out snapshot preparation",
  (it) => {
    it.effect(
      "binds real prompt titles and exact desired artifact hashes",
      () =>
        Effect.gen(function* () {
          const fixture = yield* TryoutSnapshotTestFixtures;
          const prepared = yield* prepare(fixture);
          const placements = prepared.first.filter(
            (
              row
            ): row is Extract<
              ContentSnapshotRow,
              { family: "tryout"; rowKind: "placement" }
            > => row.family === "tryout" && row.rowKind === "placement"
          );
          const headByIdentity = new Map(
            fixture.tryoutHeads.map((head) => [
              `${head.contentKey}\0${head.artifactLocale}`,
              head.artifactHash,
            ])
          );

          expect(prepared.second).toEqual(prepared.first);
          expect(prepared.manifest.manifest).toMatchObject({
            counts: countCatalogKinds(fixture.tryoutCatalog),
            format: "localized-tryout-snapshot",
            placementCount: fixture.tryoutPlacements.length,
            routeCount: countCatalogRoutes(fixture.tryoutCatalog),
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
        })
    );

    it.effect("prepares against an authenticated historical renderer", () =>
      Effect.gen(function* () {
        const fixture = yield* TryoutSnapshotTestFixtures;
        const historical = historicalRendererManifest(rendererManifest);
        const prepared = yield* prepare(
          fixture,
          fixture.tryoutHeads,
          historical
        );

        expect(prepared.first.length).toBeGreaterThan(0);
        expect(prepared.second).toEqual(prepared.first);
      })
    );

    it.effect("preserves renderer and desired-head source failures", () =>
      Effect.gen(function* () {
        const fixture = yield* TryoutSnapshotTestFixtures;
        const rendererError = yield* reject(fixture, { renderer: {} });
        const sourceError = yield* reject(fixture, {
          questionHeads: Stream.fail("test-head-source"),
        });

        expect(rendererError).toBeInstanceOf(ContractDecodeError);
        expect(rendererError).toMatchObject({
          contract: "RendererManifestEnvelope",
        });
        expect(sourceError).toBe("test-head-source");
      })
    );

    it.effect("rejects a desired head that does not own its source path", () =>
      Effect.gen(function* () {
        const fixture = yield* TryoutSnapshotTestFixtures;
        const [first, second, ...rest] = fixture.tryoutHeads;
        const firstHead = yield* Effect.fromNullishOr(first);
        const secondHead = yield* Effect.fromNullishOr(second);
        const altered = QuestionHeadSchema.make({
          ...firstHead,
          sourcePath: secondHead.sourcePath,
        });
        const error = yield* reject(fixture, {
          questionHeads: Stream.fromIterable(
            [altered, secondHead, ...rest].sort(compareContentHeads)
          ),
        });

        expect(error).toBeInstanceOf(TryoutHeadMismatchError);
        expect(error).toMatchObject({ field: "sourcePath" });
      })
    );
  }
);
