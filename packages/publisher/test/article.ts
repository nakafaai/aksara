import { NodeServices } from "@effect/platform-node";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type ArticleHead,
  ArticleHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { Context, Effect, FileSystem, Layer, Path, Stream } from "effect";
import { prepareArticlePublication } from "#publisher/article/publication";
import { testFileLayer } from "#test/files";
import { testRendererDomains } from "#test/renderer";

interface ArticlePublicationInput {
  readonly heads: readonly ArticleHead[];
  readonly renderer?: unknown;
  readonly sources?: ReadonlyMap<string, string>;
}

interface ArticleFixtureSource {
  readonly checkoutRoot: string;
  readonly rendererManifest: unknown;
  readonly sources: ReadonlyMap<string, string>;
}

const baseComponents = ["ContentGrid", "InlineMath"].map((name) => ({
  name,
  version: 1,
}));
const politicsComponents = [
  "KimPlusElectabilityChart",
  "MerahPutihCabinetChart",
  "MerahPutihCompositionChart",
  "NepotismStage",
  "NepotismStateTable",
  "PorkBarrelBudgetChart",
  "PorkBarrelElectabilityChart",
  "PorkBarrelFundChart",
].map((name) => ({ name, version: 1 }));

/** Creates a valid manifest while varying the real politics contract version. */
export const articleManifest = Effect.fn("ArticleTest.articleManifest")(
  (politicsVersion = 1) =>
    createRendererManifest({
      base: {
        authoringComponents: baseComponents,
        supportedComponents: baseComponents,
      },
      domains: testRendererDomains({
        politics: politicsComponents.map(({ name }) => ({
          name,
          version: politicsVersion,
        })),
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
  return records.flatMap((transition) => {
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
    const absolutePaths = new Map(
      sourceRows.map(([sourcePath, absolutePath]) => [sourcePath, absolutePath])
    );
    const sources = new Map(
      sourceRows.map(([, absolutePath, source]) => [absolutePath, source])
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
