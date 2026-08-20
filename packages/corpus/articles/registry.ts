import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  type AppLocale,
  AppLocaleSchema,
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
import {
  type ArticleLocaleCatalog,
  decodeArticleLocaleCatalog,
  type LocalizedArticleProjectionSource,
  requireArticleLocaleSource,
  validateArticleLocaleCatalog,
} from "#corpus/articles/locale";
import { ArticleRootSchema, type ArticleSource } from "#corpus/articles/schema";
import { decodeArticleSources } from "#corpus/articles/source";
import {
  appLocaleCode,
  EMBEDDED_APP_LOCALE_CODES,
  type EmbeddedAppLocaleCode,
  localeOverlayAppLocaleCode,
  requireSourceLocale,
} from "#corpus/locale/source";

export const ArticleEntrySchema = Schema.Struct({
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
    actual: Schema.optional(ArticleCategoryTitleSchema),
    appLocale: AppLocaleSchema,
    category: ArticleCategorySchema,
    expected: Schema.optional(ArticleCategoryTitleSchema),
  }
) {}

/** One stable category maps to conflicting locale-owned route segments. */
export class ArticleCategoryRouteError extends Schema.TaggedError<ArticleCategoryRouteError>()(
  "ArticleCategoryRouteError",
  {
    actual: Schema.optional(ArticleRouteSlugSchema),
    appLocale: AppLocaleSchema,
    category: ArticleCategorySchema,
    expected: Schema.optional(ArticleRouteSlugSchema),
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

interface ArticleCategoryIdentity {
  readonly rendererDomain: RendererDomain;
  readonly routeSlugs: ArticleSource["category"]["routeSlugs"];
  readonly titles: ArticleSource["category"]["titles"];
}

type ArticleProjectionSource = ArticleSource | LocalizedArticleProjectionSource;

/** Projects one reviewed source into one exact locale-specific article body. */
export const projectArticle = Effect.fn("AksaraCorpus.projectArticle")(
  function* (source: ArticleProjectionSource, appLocale: AppLocale) {
    const localeCode = appLocaleCode(appLocale);
    const category = source.category.key;
    const owner = `${source.sourceRoot}:${localeCode}`;
    const [articleRouteSlug, categoryRouteSlug, categoryTitle] =
      yield* Effect.all(
        [
          requireSourceLocale(source.routeSlugs, appLocale, owner),
          requireSourceLocale(source.category.routeSlugs, appLocale, owner),
          requireSourceLocale(source.category.titles, appLocale, owner),
        ],
        { concurrency: 3 }
      );
    const contentKey = `articles/${category}/${source.slug}`;
    const graph = yield* makeLearningGraphIdentity({
      appLocale,
      concept: ["article", category],
      learningObject: ["article", category, source.slug],
      lens: ["article", category],
    });
    return {
      categoryTitle,
      delivery: "public",
      references: source.references,
      rendererDomain: source.category.rendererDomain,
      route: {
        appLocale,
        articleRouteSlug,
        articleSlug: source.slug,
        artifactLocale: appLocale,
        category,
        categoryRouteSlug,
        contentKey,
        graph,
        publicPath: `articles/${categoryRouteSlug}/${articleRouteSlug}`,
      },
      sourcePath: `packages/corpus/${source.sourceRoot}/${localeCode}.mdx`,
      sourceRoot: source.sourceRoot,
    };
  }
);

/** Expands one reviewed source into its active locale-specific article bodies. */
const expandArticle = Effect.fn("AksaraCorpus.expandArticle")(function* (
  source: ArticleSource,
  localeCatalog: ArticleLocaleCatalog,
  appLocales: ActiveAppLocaleList
) {
  return yield* Effect.forEach(appLocales, (appLocale) => {
    const overlayLocale = localeOverlayAppLocaleCode(appLocale);
    if (overlayLocale === undefined) {
      return projectArticle(source, appLocale);
    }
    return requireArticleLocaleSource(
      source,
      localeCatalog,
      overlayLocale
    ).pipe(Effect.flatMap((localized) => projectArticle(localized, appLocale)));
  });
});

/** Checks one locale-specific category identity against its first declaration. */
const validateCategoryLocale = Effect.fn(
  "AksaraCorpus.validateArticleCategoryLocale"
)(function* (
  expected: ArticleCategoryIdentity,
  actual: ArticleSource["category"],
  localeCode: EmbeddedAppLocaleCode
) {
  const appLocale = AppLocaleSchema.make(localeCode);
  const actualRoute = actual.routeSlugs[localeCode];
  const expectedRoute = expected.routeSlugs[localeCode];
  if (actualRoute !== expectedRoute) {
    return yield* new ArticleCategoryRouteError({
      actual: actualRoute,
      appLocale,
      category: actual.key,
      expected: expectedRoute,
    });
  }
  const actualTitle = actual.titles[localeCode];
  const expectedTitle = expected.titles[localeCode];
  if (actualTitle !== expectedTitle) {
    return yield* new ArticleTitleError({
      actual: actualTitle,
      appLocale,
      category: actual.key,
      expected: expectedTitle,
    });
  }
});

/** Checks one repeated category against its first complete declaration. */
const validateCategory = Effect.fn("AksaraCorpus.validateArticleCategory")(
  function* (
    expected: ArticleCategoryIdentity | undefined,
    actual: ArticleSource["category"]
  ) {
    if (expected === undefined) {
      return;
    }
    if (expected.rendererDomain !== actual.rendererDomain) {
      return yield* new ArticleRendererError({
        actual: actual.rendererDomain,
        category: actual.key,
        expected: expected.rendererDomain,
      });
    }
    yield* Effect.forEach(EMBEDDED_APP_LOCALE_CODES, (localeCode) =>
      validateCategoryLocale(expected, actual, localeCode)
    );
  }
);

/** Rejects category-local slug duplicates and renderer contradictions. */
export const validateArticleSources = Effect.fn(
  "AksaraCorpus.validateArticleSources"
)(function* (sources: readonly ArticleSource[]) {
  const categoryByKey = new Map<string, ArticleCategoryIdentity>();
  const slugs = new Set<string>();

  for (const source of sources) {
    const { category: sourceCategory, slug: sourceSlug } = source;
    const { key } = sourceCategory;
    const category = categoryByKey.get(key);
    yield* validateCategory(category, sourceCategory);
    categoryByKey.set(key, sourceCategory);

    const slug = `${key}\0${sourceSlug}`;
    if (slugs.has(slug)) {
      return yield* new ArticleSlugError({ slug: sourceSlug });
    }
    slugs.add(slug);
  }

  return sources;
});

/** Rejects locale route collisions across distinct stable article identities. */
export const validateArticleRoutes = Effect.fn(
  "AksaraCorpus.validateArticleRoutes"
)(function* (entries: readonly ArticleEntry[]) {
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
});

/** Returns every canonical locale body from the reviewed article catalog. */
export const decodeArticleRegistry = Effect.fn(
  "AksaraCorpus.decodeArticleRegistry"
)(function* (
  input?: unknown,
  localeInput?: unknown,
  appLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  const sources = yield* decodeArticleSources(input);
  const localeCatalog =
    localeInput !== undefined ||
    appLocales.some(
      (appLocale) => localeOverlayAppLocaleCode(appLocale) !== undefined
    )
      ? yield* decodeArticleLocaleCatalog(localeInput)
      : { articles: [], categories: [] };
  yield* validateArticleSources(sources);
  yield* validateArticleLocaleCatalog(sources, localeCatalog);
  const expanded = yield* Effect.forEach(sources, (source) =>
    expandArticle(source, localeCatalog, appLocales)
  );
  const entries = yield* Schema.decodeUnknownEffect(
    Schema.Array(ArticleEntrySchema)
  )(expanded.flat(), { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new ArticleRegistryError({ cause }))
  );
  yield* validateArticleRoutes(entries);
  return [...entries].sort((left, right) =>
    compareContentHeads(left.route, right.route)
  );
});
