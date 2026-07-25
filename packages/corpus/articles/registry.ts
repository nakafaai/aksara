import {
  ContentLocaleSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ArticleCategorySchema,
  ArticleCategoryTitleSchema,
  ArticleReferenceSchema,
  ArticleRouteSchema,
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
    category: ArticleCategorySchema,
    expected: ArticleCategoryTitleSchema,
    locale: ContentLocaleSchema,
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
  return yield* Effect.forEach(ContentLocaleSchema.literals, (locale) =>
    Effect.gen(function* () {
      const category = source.category.key;
      const contentKey = `articles/${category}/${source.slug}`;
      const graph = yield* makeLearningGraphIdentity({
        concept: ["article", category],
        learningObject: ["article", category, source.slug],
        lens: ["article", category],
        locale,
      });
      return {
        categoryTitle: source.category.titles[locale],
        delivery: "public",
        references: source.references,
        rendererDomain: source.category.rendererDomain,
        route: {
          articleSlug: source.slug,
          category,
          contentKey,
          graph,
          locale,
          publicPath: contentKey,
        },
        sourcePath: `packages/corpus/${source.sourceRoot}/${locale}.mdx`,
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
        readonly titles: ArticleSource["category"]["titles"];
      }
    >();
    const slugs = new Set<string>();

    for (const source of sources) {
      const { category: sourceCategory, slug: sourceSlug } = source;
      const { key, rendererDomain, titles } = sourceCategory;
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
        for (const locale of ContentLocaleSchema.literals) {
          if (category.titles[locale] !== titles[locale]) {
            return yield* new ArticleTitleError({
              actual: titles[locale],
              category: key,
              expected: category.titles[locale],
              locale,
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
  return [...entries].sort((left, right) =>
    compareContentHeads(left.route, right.route)
  );
});
