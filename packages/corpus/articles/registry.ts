import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleSchema,
  AppLocaleSchema,
  activeAppLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import {
  ArticleCategorySchema,
  ArticleCategoryTitleSchema,
  ArticleReferenceSchema,
  ArticleRouteSchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";
import {
  type RendererDomain,
  RendererDomainSchema,
} from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

import { ArticleRootSchema, type ArticleSource } from "#corpus/articles/schema";
import { decodeArticleSources } from "#corpus/articles/source";

const ArticleEntrySchema = Schema.Struct({
  categoryTitle: ArticleCategoryTitleSchema,
  delivery: Schema.Literal("public"),
  references: Schema.Array(ArticleReferenceSchema),
  rendererDomain: RendererDomainSchema,
  route: ArticleRouteSchema,
  sourcePath: CorpusSourcePathSchema,
  sourceRoot: ArticleRootSchema,
});
export type ArticleEntry = typeof ArticleEntrySchema.Type;

/** A decoded article catalog repeats one category-local article slug. */
export class ArticleSlugError extends Schema.TaggedError<ArticleSlugError>()(
  "ArticleSlugError",
  { slug: ArticleSlugSchema }
) {}

/** One article category maps to conflicting deployed renderer domains. */
export class ArticleRendererError extends Schema.TaggedError<ArticleRendererError>()(
  "ArticleRendererError",
  {
    actual: RendererDomainSchema,
    category: ArticleCategorySchema,
    expected: RendererDomainSchema,
  }
) {}

/** One category maps to conflicting localized display titles. */
export class ArticleTitleError extends Schema.TaggedError<ArticleTitleError>()(
  "ArticleTitleError",
  {
    actual: ArticleCategoryTitleSchema,
    appLocale: ActiveAppLocaleSchema,
    category: ArticleCategorySchema,
    expected: ArticleCategoryTitleSchema,
  }
) {}

/** One stable category maps to conflicting locale-owned route segments. */
export class ArticleCategoryRouteError extends Schema.TaggedError<ArticleCategoryRouteError>()(
  "ArticleCategoryRouteError",
  {
    actual: ArticleRouteSlugSchema,
    appLocale: ActiveAppLocaleSchema,
    category: ArticleCategorySchema,
    expected: ArticleRouteSlugSchema,
  }
) {}

/** Two stable article identities project to the same locale-owned public path. */
export class ArticleRouteCollisionError extends Schema.TaggedError<ArticleRouteCollisionError>()(
  "ArticleRouteCollisionError",
  {
    appLocale: AppLocaleSchema,
    conflictingContentKey: ContentKeySchema,
    contentKey: ContentKeySchema,
    publicPath: PublicPathSchema,
  }
) {}

/** A projected article registry failed strict entry decoding. */
export class ArticleRegistryError extends Schema.TaggedError<ArticleRegistryError>()(
  "ArticleRegistryError",
  { cause: Schema.Unknown }
) {}

/** Expands one reviewed source into its two locale-specific article bodies. */
const expandArticle = Effect.fn("AksaraCorpus.expandArticle")(function* (
  source: ArticleSource
) {
  return yield* Effect.forEach(ACTIVE_APP_LOCALES, (appLocale) =>
    Effect.gen(function* () {
      const appLocaleCode = activeAppLocaleCode(appLocale);
      const category = source.category.key;
      const contentKey = `articles/${category}/${source.slug}`;
      const graph = yield* makeLearningGraphIdentity({
        appLocale,
        concept: ["article", category],
        learningObject: ["article", category, source.slug],
        lens: ["article", category],
      });
      return {
        categoryTitle: source.category.titles[appLocaleCode],
        delivery: "public",
        references: source.references,
        rendererDomain: source.category.rendererDomain,
        route: {
          appLocale,
          articleRouteSlug: source.routeSlugs[appLocaleCode],
          articleSlug: source.slug,
          artifactLocale: appLocale,
          category,
          categoryRouteSlug: source.category.routeSlugs[appLocaleCode],
          contentKey,
          graph,
          publicPath: `articles/${source.category.routeSlugs[appLocaleCode]}/${source.routeSlugs[appLocaleCode]}`,
        },
        sourcePath: `packages/corpus/${source.sourceRoot}/${appLocaleCode}.mdx`,
        sourceRoot: source.sourceRoot,
      };
    })
  );
});

/** Rejects category-local slug duplicates and renderer contradictions. */
const validateSources = Effect.fn("AksaraCorpus.validateArticleSources")(
  function* (sources: readonly ArticleSource[]) {
    const categoryByKey = new Map<
      string,
      {
        readonly rendererDomain: RendererDomain;
        readonly routeSlugs: ArticleSource["category"]["routeSlugs"];
        readonly titles: ArticleSource["category"]["titles"];
      }
    >();
    const slugs = new Set<string>();

    for (const source of sources) {
      const { category: sourceCategory, slug: sourceSlug } = source;
      const { key, rendererDomain, routeSlugs, titles } = sourceCategory;
      const category = categoryByKey.get(key);
      if (
        category !== undefined &&
        category.rendererDomain !== rendererDomain
      ) {
        return yield* new ArticleRendererError({
          actual: rendererDomain,
          category: key,
          expected: category.rendererDomain,
        });
      }
      if (category !== undefined) {
        for (const appLocale of ACTIVE_APP_LOCALES) {
          const appLocaleCode = activeAppLocaleCode(appLocale);
          if (
            category.routeSlugs[appLocaleCode] !== routeSlugs[appLocaleCode]
          ) {
            return yield* new ArticleCategoryRouteError({
              actual: routeSlugs[appLocaleCode],
              appLocale,
              category: key,
              expected: category.routeSlugs[appLocaleCode],
            });
          }
          if (category.titles[appLocaleCode] !== titles[appLocaleCode]) {
            return yield* new ArticleTitleError({
              actual: titles[appLocaleCode],
              appLocale,
              category: key,
              expected: category.titles[appLocaleCode],
            });
          }
        }
      }
      categoryByKey.set(key, sourceCategory);

      const slug = `${key}\0${sourceSlug}`;
      if (slugs.has(slug)) {
        return yield* new ArticleSlugError({ slug: sourceSlug });
      }
      slugs.add(slug);
    }

    return sources;
  }
);

/** Rejects locale route collisions across distinct stable article identities. */
const validateRoutes = Effect.fn("AksaraCorpus.validateArticleRoutes")(
  function* (entries: readonly ArticleEntry[]) {
    const contentKeyByRoute = new Map<
      string,
      ArticleEntry["route"]["contentKey"]
    >();
    for (const { route } of entries) {
      const identity = `${route.appLocale}\0${route.publicPath}`;
      const existing = contentKeyByRoute.get(identity);
      if (existing !== undefined && existing !== route.contentKey) {
        return yield* new ArticleRouteCollisionError({
          appLocale: route.appLocale,
          conflictingContentKey: existing,
          contentKey: route.contentKey,
          publicPath: route.publicPath,
        });
      }
      contentKeyByRoute.set(identity, route.contentKey);
    }
    return entries;
  }
);

/** Returns every canonical locale body from the reviewed article catalog. */
export const decodeArticleRegistry = Effect.fn(
  "AksaraCorpus.decodeArticleRegistry"
)(function* (input?: unknown) {
  const sources = yield* decodeArticleSources(input);
  yield* validateSources(sources);
  const expanded = yield* Effect.forEach(sources, expandArticle);
  const entries = yield* Schema.decodeUnknown(Schema.Array(ArticleEntrySchema))(
    expanded.flat(),
    { onExcessProperty: "error" }
  ).pipe(
    Effect.mapError(
      (cause) =>
        new ArticleRegistryError({
          cause,
        })
    )
  );
  yield* validateRoutes(entries);
  return [...entries].sort((left, right) =>
    compareContentHeads(left.route, right.route)
  );
});
