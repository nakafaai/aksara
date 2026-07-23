import { Schema } from "effect";
import { ContentAuthorSchema, ContentLocaleSchema } from "#contracts/content";
import { DateOnlySchema } from "#contracts/date";
import {
  canonicalizeLearningGraphIdentity,
  type LearningGraphIdentity,
  LearningGraphIdentitySchema,
} from "#contracts/graph/spec";
import { ContentKeySchema, PublicPathSchema } from "#contracts/ids";

const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

/** Published article categories currently backed by a real Nakafa route. */
export const ArticleCategorySchema = Schema.Literal("politics");
export type ArticleCategory = typeof ArticleCategorySchema.Type;

/** Stable source-owned article segment used below its category route. */
export const ArticleSlugSchema = Schema.String.pipe(
  Schema.pattern(ARTICLE_SLUG_PATTERN),
  Schema.brand("@NakafaAI/AksaraArticleSlug")
);
export type ArticleSlug = typeof ArticleSlugSchema.Type;

/** Exact reviewed citation fields consumed by Nakafa article pages. */
export const ArticleReferenceSchema = Schema.Struct({
  authors: Schema.String,
  citation: Schema.optional(Schema.String),
  details: Schema.optional(Schema.String),
  publication: Schema.optional(Schema.String),
  title: Schema.String,
  url: Schema.optional(Schema.String),
  year: Schema.Number,
});
export type ArticleReference = typeof ArticleReferenceSchema.Type;

/** Exact metadata contract consumed by Nakafa article pages and listings. */
export const ArticleMetadataSchema = Schema.Struct({
  authors: Schema.Array(ContentAuthorSchema),
  date: DateOnlySchema,
  description: Schema.optional(Schema.String),
  title: Schema.String,
});
export type ArticleMetadata = typeof ArticleMetadataSchema.Type;

const ArticleRouteFields = {
  articleSlug: ArticleSlugSchema,
  category: ArticleCategorySchema,
  contentKey: ContentKeySchema,
  graph: LearningGraphIdentitySchema,
  locale: ContentLocaleSchema,
  publicPath: PublicPathSchema,
};

/** Checks graph identities against the source-owned article category and slug. */
function hasCoherentArticleGraph(input: {
  readonly articleSlug: string;
  readonly category: string;
  readonly graph: LearningGraphIdentity;
  readonly locale: typeof ContentLocaleSchema.Type;
}) {
  const lens = `article:${input.category}`;
  const object = `article:${input.category}:${input.articleSlug}`;
  return (
    input.graph.alignmentId === `alignment:${lens}:${object}` &&
    input.graph.assetId === `asset:${input.locale}:${lens}:${object}` &&
    input.graph.conceptId === `concept:${lens}` &&
    input.graph.learningObjectId === `lo:${object}` &&
    input.graph.lensId === `lens:${lens}`
  );
}

/** Source-owned identity and public route for one localized article body. */
export const ArticleRouteSchema = Schema.Struct(ArticleRouteFields).pipe(
  Schema.filter(
    (route) => {
      const expected = `articles/${route.category}/${route.articleSlug}`;
      return route.contentKey === expected && route.publicPath === expected;
    },
    {
      message: () =>
        "Expected article identity and public path to match its category and slug.",
    }
  ),
  Schema.filter(hasCoherentArticleGraph, {
    message: () =>
      "Expected article graph identities to match its stable source keys.",
  })
);
export type ArticleRoute = typeof ArticleRouteSchema.Type;

/** Canonical published read model for one reviewed article body. */
export const ArticleProjectionSchema = Schema.Struct({
  ...ArticleRouteFields,
  kind: Schema.Literal("article"),
  metadata: ArticleMetadataSchema,
  official: Schema.Boolean,
  parentPath: PublicPathSchema,
  references: Schema.Array(ArticleReferenceSchema),
  sitemap: Schema.Literal(true),
}).pipe(
  Schema.filter(
    (projection) => projection.parentPath === `articles/${projection.category}`,
    {
      message: () =>
        "Expected the article parent path to match its category route.",
    }
  ),
  Schema.filter(hasCoherentArticleGraph, {
    message: () =>
      "Expected article graph identities to match its stable source keys.",
  })
);
export type ArticleProjection = typeof ArticleProjectionSchema.Type;

/** Combines source-owned routing with decoded metadata and references. */
export function makeArticleProjection(input: {
  readonly metadata: ArticleMetadata;
  readonly official: boolean;
  readonly references: readonly ArticleReference[];
  readonly route: ArticleRoute;
}) {
  return ArticleProjectionSchema.make({
    ...input.route,
    kind: "article",
    metadata: input.metadata,
    official: input.official,
    parentPath: PublicPathSchema.make(`articles/${input.route.category}`),
    references: [...input.references],
    sitemap: true,
  });
}

/** Serializes one article projection with stable signed field order. */
export function canonicalizeArticleProjection(projection: ArticleProjection) {
  return JSON.stringify({
    articleSlug: projection.articleSlug,
    category: projection.category,
    contentKey: projection.contentKey,
    graph: canonicalizeLearningGraphIdentity(projection.graph),
    kind: projection.kind,
    locale: projection.locale,
    metadata: {
      authors: projection.metadata.authors.map(({ name }) => ({ name })),
      date: projection.metadata.date,
      ...(projection.metadata.description === undefined
        ? {}
        : { description: projection.metadata.description }),
      title: projection.metadata.title,
    },
    official: projection.official,
    parentPath: projection.parentPath,
    publicPath: projection.publicPath,
    references: projection.references.map((reference) => ({
      authors: reference.authors,
      ...(reference.citation === undefined
        ? {}
        : { citation: reference.citation }),
      ...(reference.details === undefined
        ? {}
        : { details: reference.details }),
      ...(reference.publication === undefined
        ? {}
        : { publication: reference.publication }),
      title: reference.title,
      ...(reference.url === undefined ? {} : { url: reference.url }),
      year: reference.year,
    })),
    sitemap: projection.sitemap,
  });
}
