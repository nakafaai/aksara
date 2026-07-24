import type { FileSystem, Path } from "@effect/platform";
import type {
  ContentFamily,
  ContentLocale,
} from "@nakafa/aksara-contracts/content";
import type { ContentKey, PublicPath } from "@nakafa/aksara-contracts/ids";
import { decodeArticleRegistry } from "@nakafa/aksara-corpus/articles/registry";
import { decodeMaterialRegistry } from "@nakafa/aksara-corpus/material/registry";
import { loadTryoutContent } from "@nakafa/aksara-corpus/tryout/content";
import { Effect, Schema } from "effect";
import type { RouteTransition } from "#publisher/routes";

/** Source-owned identity expected to survive complete catalog preparation. */
export interface ExpectedCatalogHead {
  readonly contentKey: ContentKey;
  readonly family: ContentFamily;
  readonly locale: ContentLocale;
}

/** Source-derived body inventory used to prove compiler and route completeness. */
export interface ContentCatalogExpectation {
  readonly articleCount: number;
  readonly heads: readonly ExpectedCatalogHead[];
  readonly materialCount: number;
  readonly questionCount: number;
  readonly routes: readonly RouteTransition[];
  readonly totalCount: number;
}

/** An authoritative source registry failed before expectation projection. */
export class ContentCatalogExpectationError extends Schema.TaggedError<ContentCatalogExpectationError>()(
  "ContentCatalogExpectationError",
  { cause: Schema.Unknown }
) {}

/** Projects one public source route into its expected genesis transition. */
function expectedRoute(route: {
  readonly contentKey: ContentKey;
  readonly locale: ContentLocale;
  readonly publicPath: PublicPath;
}): RouteTransition {
  return {
    current: {
      contentKey: route.contentKey,
      locale: route.locale,
    },
    next: {
      contentKey: route.contentKey,
      locale: route.locale,
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
    const [articles, materials, tryout] = yield* Effect.all(
      [
        decodeArticleRegistry(),
        decodeMaterialRegistry(),
        loadTryoutContent(checkoutRoot),
      ],
      { concurrency: 3 }
    ).pipe(
      Effect.mapError((cause) => new ContentCatalogExpectationError({ cause }))
    );
    const heads: ExpectedCatalogHead[] = [
      ...articles.map(
        ({ route }): ExpectedCatalogHead => ({
          contentKey: route.contentKey,
          family: "article",
          locale: route.locale,
        })
      ),
      ...materials.map(
        ({ route }): ExpectedCatalogHead => ({
          contentKey: route.contentKey,
          family: "material",
          locale: route.locale,
        })
      ),
      ...tryout.entries.map(
        ({ contentKey, locale }): ExpectedCatalogHead => ({
          contentKey,
          family: "question",
          locale,
        })
      ),
    ];
    const routes = [
      ...articles.map(({ route }) => expectedRoute(route)),
      ...materials.map(({ route }) => expectedRoute(route)),
    ];

    return {
      articleCount: articles.length,
      heads,
      materialCount: materials.length,
      questionCount: tryout.entries.length,
      routes,
      totalCount: heads.length,
    } satisfies ContentCatalogExpectation;
  }
);
