import { ContentFamilySchema } from "@nakafa/aksara-contracts/content";
import {
  type ContentKey,
  ContentKeySchema,
  type PublicPath,
} from "@nakafa/aksara-contracts/ids";
import {
  type AppLocale,
  type ArtifactLocale,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { decodePageRegistry } from "@nakafa/aksara-corpus/pages/registry";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import type { FileSystem, Path } from "effect";
import { Array as Arr, Effect, Schema } from "effect";
import { type RouteTransition, RouteTransitionSchema } from "#publisher/routes";

const ExpectedCatalogHeadSchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
  family: ContentFamilySchema,
});

/** Source-owned identity expected to survive complete catalog preparation. */
export type ExpectedCatalogHead = typeof ExpectedCatalogHeadSchema.Type;

const ContentCatalogExpectationSchema = Schema.Struct({
  articleCount: Schema.Finite,
  heads: Schema.Array(ExpectedCatalogHeadSchema),
  materialCount: Schema.Finite,
  pageCount: Schema.Finite,
  questionCount: Schema.Finite,
  routes: Schema.Array(RouteTransitionSchema),
  totalCount: Schema.Finite,
});

/** Source-derived body inventory used to prove compiler and route completeness. */
export type ContentCatalogExpectation =
  typeof ContentCatalogExpectationSchema.Type;

/** An authoritative source registry failed before expectation projection. */
export class ContentCatalogExpectationError extends Schema.TaggedError<ContentCatalogExpectationError>()(
  "ContentCatalogExpectationError",
  { cause: Schema.Unknown }
) {}

/** Projects one public source route into its expected genesis transition. */
function expectedRoute(route: {
  readonly appLocale: AppLocale;
  readonly contentKey: ContentKey;
  readonly artifactLocale: ArtifactLocale;
  readonly publicPath: PublicPath;
}): RouteTransition {
  return {
    current: {
      appLocale: route.appLocale,
      contentKey: route.contentKey,
    },
    next: {
      appLocale: route.appLocale,
      contentKey: route.contentKey,
      publicPath: route.publicPath,
    },
  };
}

/** Reads every authoritative body source into one independent inventory. */
export const readContentCatalogExpectation: (
  checkoutRoot: string
) => Effect.Effect<
  ContentCatalogExpectation,
  ContentCatalogExpectationError,
  FileSystem.FileSystem | Path.Path
> = Effect.fn("AksaraPublisher.readContentCatalogExpectation")(
  function* (checkoutRoot) {
    const [articles, materials, pages, tryout] = yield* Effect.all(
      [
        decodeArticleRegistry(),
        decodeMaterialRegistry(),
        decodePageRegistry(),
        loadTryoutContent(checkoutRoot),
      ],
      { concurrency: 4 }
    ).pipe(
      Effect.mapError((cause) => new ContentCatalogExpectationError({ cause }))
    );
    const heads: ExpectedCatalogHead[] = [
      ...Arr.map(
        articles,
        ({ route }): ExpectedCatalogHead => ({
          artifactLocale: route.artifactLocale,
          contentKey: route.contentKey,
          family: "article",
        })
      ),
      ...Arr.map(
        materials,
        ({ route }): ExpectedCatalogHead => ({
          artifactLocale: route.artifactLocale,
          contentKey: route.contentKey,
          family: "material",
        })
      ),
      ...Arr.map(
        pages,
        ({ route }): ExpectedCatalogHead => ({
          artifactLocale: route.artifactLocale,
          contentKey: route.contentKey,
          family: "page",
        })
      ),
      ...Arr.map(
        tryout.entries,
        ({ contentKey, artifactLocale }): ExpectedCatalogHead => ({
          artifactLocale,
          contentKey,
          family: "question",
        })
      ),
    ];
    const routes = [
      ...Arr.map(articles, ({ route }) => expectedRoute(route)),
      ...Arr.map(materials, ({ route }) => expectedRoute(route)),
      ...Arr.map(pages, ({ route }) => expectedRoute(route)),
    ];

    return {
      articleCount: articles.length,
      heads,
      materialCount: materials.length,
      pageCount: pages.length,
      questionCount: tryout.entries.length,
      routes,
      totalCount: heads.length,
    } satisfies ContentCatalogExpectation;
  }
);
