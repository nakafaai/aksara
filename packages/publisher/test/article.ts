import { NodeServices } from "@effect/platform-node";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type ArticleHead,
  ArticleHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import {
  Array as Arr,
  Context,
  Effect,
  FileSystem,
  HashMap,
  Layer,
  Path,
  Schema,
  Stream,
} from "effect";
import { prepareArticlePublication } from "#publisher/article/publication";
import { testFileLayer } from "#test/files";
import { testRendererDomains } from "#test/renderer";

const ArticlePublicationInputSchema = Schema.Struct({
  heads: Schema.Array(ArticleHeadSchema),
  renderer: Schema.optionalKey(Schema.Unknown),
  sources: Schema.optionalKey(
    Schema.Array(Schema.Tuple([Schema.String, Schema.String]))
  ),
});

type ArticlePublicationInput = typeof ArticlePublicationInputSchema.Type;

const ArticleFixtureSourceSchema = Schema.Struct({
  checkoutRoot: Schema.String,
  rendererManifest: Schema.Unknown,
  sources: Schema.Array(Schema.Tuple([Schema.String, Schema.String])),
});

type ArticleFixtureSource = typeof ArticleFixtureSourceSchema.Type;

const baseComponents = ["ContentGrid", "Highlight", "InlineMath"];
const politicsComponents = [
  "KimPlusElectabilityChart",
  "MerahPutihCabinetChart",
  "MerahPutihCompositionChart",
  "NepotismStage",
  "NepotismStateTable",
  "PorkBarrelBudgetChart",
  "PorkBarrelElectabilityChart",
  "PorkBarrelFundChart",
];

/** Creates the current reviewed politics renderer manifest. */
export const articleManifest = Effect.fn("ArticleTest.articleManifest")(() =>
  createRendererManifest({
    base: baseComponents,
    domains: testRendererDomains({
      politics: politicsComponents,
    }),
    publishedDomains: ["politics"],
  })
);

/** Collects article transitions with one already loaded source fixture. */
const collectArticlePublicationFrom = Effect.fn(
  "ArticleTest.collectPublicationFrom"
)((fixture: ArticleFixtureSource, input: ArticlePublicationInput) =>
  Effect.scoped(
    Effect.gen(function* () {
      const publication = yield* prepareArticlePublication({
        checkoutRoot: fixture.checkoutRoot,
        published: Stream.fromIterable(input.heads),
        rendererManifest: input.renderer ?? fixture.rendererManifest,
      });
      return yield* publication.records.pipe(
        Stream.runCollect,
        Effect.map((records) => [...records])
      );
    })
  ).pipe(
    Effect.provide([
      testFileLayer(input.sources ?? fixture.sources),
      Path.layer,
    ])
  )
);

/** Collects article routes with one already loaded source fixture. */
const collectArticleRoutesFrom = Effect.fn("ArticleTest.collectRoutesFrom")(
  (fixture: ArticleFixtureSource, input: ArticlePublicationInput) =>
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* prepareArticlePublication({
          checkoutRoot: fixture.checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? fixture.rendererManifest,
        });
        return yield* publication.routes.pipe(
          Stream.runCollect,
          Effect.map((routes) => [...routes])
        );
      })
    ).pipe(
      Effect.provide([
        testFileLayer(input.sources ?? fixture.sources),
        Path.layer,
      ])
    )
);

/** Returns one article planning failure without a FiberFailure wrapper. */
const rejectArticlePublicationFrom = Effect.fn(
  "ArticleTest.rejectPublicationFrom"
)((fixture: ArticleFixtureSource, heads: readonly ArticleHead[]) =>
  Effect.scoped(
    prepareArticlePublication({
      checkoutRoot: fixture.checkoutRoot,
      published: Stream.fromIterable(heads),
      rendererManifest: fixture.rendererManifest,
    })
  ).pipe(
    Effect.provide([testFileLayer(fixture.sources), Path.layer]),
    Effect.flip
  )
);

/** Derives compact heads from authoritative article transitions. */
function deriveArticleHeads(
  records: Effect.Success<ReturnType<typeof collectArticlePublicationFrom>>
) {
  return Arr.flatMap(records, (transition) => {
    const { record } = transition;
    if (!("payload" in record)) {
      return [];
    }
    return [
      ArticleHeadSchema.make({
        artifactHash: record.change.artifactHash,
        artifactLocale: record.change.artifactLocale,
        compilerConfigHash: record.payload.compilerConfigHash,
        contentKey: record.change.contentKey,
        delivery: record.change.delivery,
        family: "article",
        projectionHash: hashContentProjection(record.projection),
        publicPath: projectionPublicPath(record.projection),
        rendererDomain: record.change.rendererDomain,
        sourceHash: record.payload.sourceHash,
        sourcePath: record.change.sourcePath,
      }),
    ];
  });
}

/** Loads the real article source fixture and memoizes its first publication. */
const makeArticleTestFixtures = Effect.fn("ArticleTest.makeFixtures")(() =>
  Effect.gen(function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const workingDirectory = yield* Effect.sync(() => process.cwd());
    const checkoutRoot = path.resolve(workingDirectory, "..", "..");
    const entries = yield* decodeArticleRegistry();
    const sourceRows = yield* Effect.forEach(entries, ({ sourcePath }) => {
      const absolutePath = path.resolve(checkoutRoot, sourcePath);
      return fileSystem
        .readFileString(absolutePath)
        .pipe(
          Effect.map((source) => [sourcePath, absolutePath, source] as const)
        );
    });
    const absolutePaths = HashMap.fromIterable(
      Arr.map(sourceRows, ([sourcePath, absolutePath]) => [
        sourcePath,
        absolutePath,
      ])
    );
    const sources = Arr.map(
      sourceRows,
      ([, absolutePath, source]) => [absolutePath, source] as const
    );
    const rendererManifest = yield* articleManifest();
    const fixture = { checkoutRoot, entries, rendererManifest, sources };
    const initialRecords = yield* Effect.cached(
      collectArticlePublicationFrom(fixture, { heads: [] })
    );

    return { ...fixture, absolutePaths, initialRecords };
  })
);

/** Shared scoped article fixture for direct Effect Vitest suites. */
export class ArticleTestFixtures extends Context.Service<
  ArticleTestFixtures,
  Effect.Success<ReturnType<typeof makeArticleTestFixtures>>
>()("AksaraPublisherTestArticleFixtures") {}

export const articleTestLayer: Layer.Layer<ArticleTestFixtures> = Layer.effect(
  ArticleTestFixtures,
  makeArticleTestFixtures()
).pipe(Layer.provide(NodeServices.layer), Layer.orDie);

/** Collects article transitions through exact registry and platform layers. */
export const collectArticlePublication = Effect.fn(
  "ArticleTest.collectPublication"
)((input: ArticlePublicationInput) =>
  Effect.flatMap(ArticleTestFixtures, (fixture) =>
    collectArticlePublicationFrom(fixture, input)
  )
);

/** Collects canonical route transitions from one real article plan. */
export const collectArticleRoutes = Effect.fn("ArticleTest.collectRoutes")(
  (input: ArticlePublicationInput) =>
    Effect.flatMap(ArticleTestFixtures, (fixture) =>
      collectArticleRoutesFrom(fixture, input)
    )
);

/** Returns one authoritative article planning failure. */
export const rejectArticlePublication = Effect.fn(
  "ArticleTest.rejectPublication"
)((heads: readonly ArticleHead[]) =>
  Effect.flatMap(ArticleTestFixtures, (fixture) =>
    rejectArticlePublicationFrom(fixture, heads)
  )
);

/** Derives authoritative compact heads from every registered real article. */
export const publishedArticleHeads = Effect.fn("ArticleTest.publishedHeads")(
  () =>
    Effect.gen(function* () {
      const fixture = yield* ArticleTestFixtures;
      return deriveArticleHeads(yield* fixture.initialRecords);
    })
);
