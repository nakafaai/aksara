import {
  ArticleCategorySchema,
  ArticleCategoryTitleSchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";
import { Effect, Schema } from "effect";
import {
  articleLocaleCategories,
  articleLocaleSources,
} from "#corpus/articles/locale-registry";
import type { ArticleSource } from "#corpus/articles/schema";
import {
  LocaleOverlayAppLocaleCodeSchema,
  type LocalizedSourceMap,
} from "#corpus/locale/source";

/** Article source after permanent locale-owned copy is composed. */
export type LocalizedArticleProjectionSource = Omit<
  ArticleSource,
  "category" | "routeSlugs"
> & {
  readonly overlayAppLocale: ArticleLocaleSource["appLocale"];
  readonly category: Omit<
    ArticleSource["category"],
    "routeSlugs" | "titles"
  > & {
    readonly routeSlugs: LocalizedSourceMap<
      ArticleSource["category"]["routeSlugs"]["en"]
    >;
    readonly titles: LocalizedSourceMap<
      ArticleSource["category"]["titles"]["en"]
    >;
  };
  readonly routeSlugs: LocalizedSourceMap<ArticleSource["routeSlugs"]["en"]>;
};

/** Locale-owned category copy reviewed independently from base source maps. */
export const ArticleLocaleCategorySchema = Schema.Struct({
  appLocale: LocaleOverlayAppLocaleCodeSchema,
  category: ArticleCategorySchema,
  routeSlug: ArticleRouteSlugSchema,
  title: ArticleCategoryTitleSchema,
});
export type ArticleLocaleCategory = typeof ArticleLocaleCategorySchema.Type;

/** Locale-owned article route copy reviewed beside its localized MDX body. */
export const ArticleLocaleSourceSchema = Schema.Struct({
  appLocale: LocaleOverlayAppLocaleCodeSchema,
  articleSlug: ArticleSlugSchema,
  category: ArticleCategorySchema,
  routeSlug: ArticleRouteSlugSchema,
});
export type ArticleLocaleSource = typeof ArticleLocaleSourceSchema.Type;

/** Complete locale-owned metadata registry for localized article bodies. */
export const ArticleLocaleCatalogSchema = Schema.Struct({
  articles: Schema.Array(ArticleLocaleSourceSchema),
  categories: Schema.Array(ArticleLocaleCategorySchema),
});
export type ArticleLocaleCatalog = typeof ArticleLocaleCatalogSchema.Type;

/** Locale-owned article metadata failed strict source decoding. */
export class ArticleLocaleCatalogError extends Schema.TaggedError<ArticleLocaleCatalogError>()(
  "ArticleLocaleCatalogError",
  { cause: Schema.Unknown }
) {}

/** Locale-owned article metadata does not match its stable owner. */
export class ArticleLocaleOwnershipError extends Schema.TaggedError<ArticleLocaleOwnershipError>()(
  "ArticleLocaleOwnershipError",
  {
    articleSlug: ArticleSlugSchema,
    category: ArticleCategorySchema,
  }
) {}

/** Locale catalog rows repeat or outlive their stable article owner. */
export class ArticleLocaleCatalogOwnershipError extends Schema.TaggedError<ArticleLocaleCatalogOwnershipError>()(
  "ArticleLocaleCatalogOwnershipError",
  {
    appLocale: LocaleOverlayAppLocaleCodeSchema,
    articleSlug: Schema.optional(ArticleSlugSchema),
    category: ArticleCategorySchema,
    reason: Schema.Literals(["duplicate", "orphan"]),
    scope: Schema.Literals(["article", "category"]),
  }
) {}

/** Resolves one locale-owned article overlay without mutating base source maps. */
export const composeArticleLocaleSource = Effect.fn(
  "AksaraCorpus.composeArticleLocaleSource"
)(function* (
  base: ArticleSource,
  category: ArticleLocaleCategory,
  article: ArticleLocaleSource
) {
  if (
    category.category !== base.category.key ||
    article.category !== base.category.key ||
    article.articleSlug !== base.slug ||
    article.appLocale !== category.appLocale
  ) {
    return yield* new ArticleLocaleOwnershipError({
      articleSlug: article.articleSlug,
      category: article.category,
    });
  }
  return {
    ...base,
    category: {
      ...base.category,
      routeSlugs: {
        ...base.category.routeSlugs,
        [category.appLocale]: category.routeSlug,
      },
      titles: {
        ...base.category.titles,
        [category.appLocale]: category.title,
      },
    },
    overlayAppLocale: article.appLocale,
    routeSlugs: {
      ...base.routeSlugs,
      [article.appLocale]: article.routeSlug,
    },
  } satisfies LocalizedArticleProjectionSource;
});

/** Decodes every locale-owned article metadata source. */
export const decodeArticleLocaleCatalog = Effect.fn(
  "AksaraCorpus.decodeArticleLocaleCatalog"
)(function* (
  input: unknown = {
    articles: articleLocaleSources,
    categories: articleLocaleCategories,
  }
) {
  return yield* Schema.decodeUnknownEffect(ArticleLocaleCatalogSchema)(input, {
    onExcessProperty: "error",
  }).pipe(Effect.mapError((cause) => new ArticleLocaleCatalogError({ cause })));
});

/** Rejects duplicate and orphan locale rows before preview or publication. */
export const validateArticleLocaleCatalog = Effect.fn(
  "AksaraCorpus.validateArticleLocaleCatalog"
)(function* (sources: readonly ArticleSource[], catalog: ArticleLocaleCatalog) {
  const categories = new Set<string>();
  for (const row of catalog.categories) {
    const identity = `${row.appLocale}\0${row.category}`;
    const owned = sources.some(({ category }) => category.key === row.category);
    if (categories.has(identity) || !owned) {
      return yield* new ArticleLocaleCatalogOwnershipError({
        appLocale: row.appLocale,
        category: row.category,
        reason: categories.has(identity) ? "duplicate" : "orphan",
        scope: "category",
      });
    }
    categories.add(identity);
  }
  const articles = new Set<string>();
  for (const row of catalog.articles) {
    const identity = `${row.appLocale}\0${row.category}\0${row.articleSlug}`;
    const owned = sources.some(
      ({ category, slug }) =>
        category.key === row.category && slug === row.articleSlug
    );
    if (articles.has(identity) || !owned) {
      return yield* new ArticleLocaleCatalogOwnershipError({
        appLocale: row.appLocale,
        articleSlug: row.articleSlug,
        category: row.category,
        reason: articles.has(identity) ? "duplicate" : "orphan",
        scope: "article",
      });
    }
    articles.add(identity);
  }
  return catalog;
});

/** Resolves exactly one category and article overlay. */
export const requireArticleLocaleSource = Effect.fn(
  "AksaraCorpus.requireArticleLocaleSource"
)(function* (
  base: ArticleSource,
  catalog: ArticleLocaleCatalog,
  appLocale: ArticleLocaleSource["appLocale"]
) {
  const categories = catalog.categories.filter(
    (row) => row.appLocale === appLocale && row.category === base.category.key
  );
  const articles = catalog.articles.filter(
    (row) =>
      row.appLocale === appLocale &&
      row.category === base.category.key &&
      row.articleSlug === base.slug
  );
  const [category] = categories;
  const [article] = articles;
  if (
    categories.length !== 1 ||
    articles.length !== 1 ||
    category === undefined ||
    article === undefined
  ) {
    return yield* new ArticleLocaleOwnershipError({
      articleSlug: base.slug,
      category: base.category.key,
    });
  }
  return yield* composeArticleLocaleSource(base, category, article);
});
