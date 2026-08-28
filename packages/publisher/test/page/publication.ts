import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { projectionPublicPath } from "@nakafa/aksara-contracts/projection/spec";
import {
  type PageHead,
  PageHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { Context, Effect, Layer, Path, Stream } from "effect";
import { preparePagePublication } from "#publisher/page/publication";
import { testFileLayer } from "#test/files";
import { PageTestFixtures, pageTestLayer } from "#test/page/spec";

interface PagePublicationInput {
  readonly heads: readonly PageHead[];
  readonly renderer?: unknown;
  readonly scope?: PublicationScope | undefined;
  readonly sources?: ReadonlyMap<string, string>;
}

type PageFixtureSource = PageTestFixtures["Service"];

/** Collects page transitions with one already loaded source fixture. */
const collectPagePublicationFrom = Effect.fn("PageTest.collectFrom")(
  (fixture: PageFixtureSource, input: PagePublicationInput) =>
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* preparePagePublication({
          checkoutRoot: fixture.checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? fixture.rendererManifest,
          scope: input.scope,
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

/** Collects the complete result catalog with one loaded source fixture. */
const collectPageResultFrom = Effect.fn("PageTest.collectResultFrom")(
  (
    fixture: PageFixtureSource,
    input: {
      readonly heads: readonly PageHead[];
      readonly scope: PublicationScope;
      readonly sources?: ReadonlyMap<string, string>;
    }
  ) =>
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* preparePagePublication({
          checkoutRoot: fixture.checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: fixture.rendererManifest,
          scope: input.scope,
        });
        return yield* publication.result.pipe(
          Stream.runCollect,
          Effect.map((heads) => [...heads])
        );
      })
    ).pipe(
      Effect.provide([
        testFileLayer(input.sources ?? fixture.sources),
        Path.layer,
      ])
    )
);

/** Collects canonical route transitions with one loaded source fixture. */
const collectPageRoutesFrom = Effect.fn("PageTest.collectRoutesFrom")(
  (fixture: PageFixtureSource, input: PagePublicationInput) =>
    Effect.scoped(
      Effect.gen(function* () {
        const publication = yield* preparePagePublication({
          checkoutRoot: fixture.checkoutRoot,
          published: Stream.fromIterable(input.heads),
          rendererManifest: input.renderer ?? fixture.rendererManifest,
          scope: input.scope,
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

/** Returns one page planning failure with one loaded source fixture. */
const rejectPagePublicationFrom = Effect.fn("PageTest.rejectFrom")(
  (
    fixture: PageFixtureSource,
    heads: readonly PageHead[],
    scope?: PublicationScope | undefined
  ) =>
    Effect.scoped(
      preparePagePublication({
        checkoutRoot: fixture.checkoutRoot,
        published: Stream.fromIterable(heads),
        rendererManifest: fixture.rendererManifest,
        scope,
      })
    ).pipe(
      Effect.provide([testFileLayer(fixture.sources), Path.layer]),
      Effect.flip
    )
);

/** Derives authoritative compact heads from page publication records. */
function derivePageHeads(
  records: Effect.Success<ReturnType<typeof collectPagePublicationFrom>>
) {
  return records.flatMap((transition) => {
    const { record } = transition;
    if (!("payload" in record)) {
      return [];
    }
    return [
      PageHeadSchema.make({
        artifactHash: record.change.artifactHash,
        artifactLocale: record.change.artifactLocale,
        compilerConfigHash: record.payload.compilerConfigHash,
        contentKey: record.change.contentKey,
        delivery: record.change.delivery,
        family: "page",
        projectionHash: hashContentProjection(record.projection),
        publicPath: projectionPublicPath(record.projection),
        rendererDomain: record.change.rendererDomain,
        sourceHash: record.payload.sourceHash,
        sourcePath: record.change.sourcePath,
      }),
    ];
  });
}

/** Collects page transitions through the authoritative publication path. */
export const collectPagePublication = Effect.fn("PageTest.collect")(
  (input: PagePublicationInput) =>
    Effect.flatMap(PageTestFixtures, (fixture) =>
      collectPagePublicationFrom(fixture, input)
    )
);

/** Collects the complete result catalog produced by one page scope. */
export const collectPageResult = Effect.fn("PageTest.collectResult")(
  (input: {
    readonly heads: readonly PageHead[];
    readonly scope: PublicationScope;
    readonly sources?: ReadonlyMap<string, string>;
  }) =>
    Effect.flatMap(PageTestFixtures, (fixture) =>
      collectPageResultFrom(fixture, input)
    )
);

/** Collects canonical route transitions from one page publication. */
export const collectPageRoutes = Effect.fn("PageTest.collectRoutes")(
  (input: PagePublicationInput) =>
    Effect.flatMap(PageTestFixtures, (fixture) =>
      collectPageRoutesFrom(fixture, input)
    )
);

/** Returns one authoritative page planning failure. */
export const rejectPagePublication = Effect.fn("PageTest.reject")(
  (heads: readonly PageHead[], scope?: PublicationScope | undefined) =>
    Effect.flatMap(PageTestFixtures, (fixture) =>
      rejectPagePublicationFrom(fixture, heads, scope)
    )
);

/** Derives authoritative compact heads from every registered page. */
export const publishedPageHeads = Effect.fn("PageTest.publishedHeads")(
  function* () {
    return derivePageHeads(yield* collectPagePublication({ heads: [] }));
  }
);

/** Loads canonical heads and both privacy-page locales for shared suites. */
const makePublishedPageTestFixtures = Effect.fn(
  "PageTest.makePublishedFixtures"
)(() =>
  Effect.gen(function* () {
    const publishedHeads = yield* publishedPageHeads();
    const englishHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        ({ contentKey, artifactLocale }) =>
          contentKey === "pages/privacy-policy" && artifactLocale === "en"
      )
    );
    const indonesianHead = yield* Effect.fromNullishOr(
      publishedHeads.find(
        ({ contentKey, artifactLocale }) =>
          contentKey === "pages/privacy-policy" && artifactLocale === "id"
      )
    );
    return { englishHead, indonesianHead, publishedHeads };
  })
);

/** Shared canonical page heads for publication and planning suites. */
export class PublishedPageTestFixtures extends Context.Service<
  PublishedPageTestFixtures,
  Effect.Success<ReturnType<typeof makePublishedPageTestFixtures>>
>()("AksaraPublisherPublishedPageTestFixtures") {}

const publishedFixtureLayer = Layer.effect(
  PublishedPageTestFixtures,
  makePublishedPageTestFixtures()
).pipe(Layer.provide(pageTestLayer));

export const publishedPageTestLayer = Layer.merge(
  pageTestLayer,
  publishedFixtureLayer
);
