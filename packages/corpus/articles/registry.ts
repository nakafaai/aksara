import {
  ContentLocaleSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import { makeLearningGraphIdentity } from "@nakafa/aksara-contracts/graph/identity";
import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ArticleCategorySchema,
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
      const contentKey = `articles/${source.category}/${source.slug}`;
      const graph = yield* makeLearningGraphIdentity({
        concept: ["article", source.category],
        learningObject: ["article", source.category, source.slug],
        lens: ["article", source.category],
        locale,
      });
      return {
        delivery: "public",
        references: source.references,
        rendererDomain: source.rendererDomain,
        route: {
          articleSlug: source.slug,
          category: source.category,
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
    const rendererByCategory = new Map<string, RendererDomain>();
    const slugs = new Set<string>();

    for (const source of sources) {
      const rendererDomain = rendererByCategory.get(source.category);
      if (
        rendererDomain !== undefined &&
        rendererDomain !== source.rendererDomain
      ) {
        return yield* new ArticleRendererError({
          actual: source.rendererDomain,
          category: source.category,
          expected: rendererDomain,
        });
      }
      rendererByCategory.set(source.category, source.rendererDomain);

      const slug = `${source.category}\0${source.slug}`;
      if (slugs.has(slug)) {
        return yield* new ArticleSlugError({ slug: source.slug });
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
