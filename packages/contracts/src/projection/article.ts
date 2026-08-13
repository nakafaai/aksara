import { Schema } from "effect";
import { ContentAuthorSchema } from "#contracts/content";
import { DateOnlySchema } from "#contracts/date";
import {
  canonicalizeLearningGraphIdentity,
  type LearningGraphIdentity,
  LearningGraphIdentitySchema,
} from "#contracts/graph/spec";
import { ContentKeySchema, PublicPathSchema } from "#contracts/ids";
import { AppLocaleSchema, ArtifactLocaleSchema } from "#contracts/locale";
import { isLowerKebab } from "#contracts/text/syntax";

/** Stable source-owned category segment used below the article route family. */
export const ArticleCategorySchema = Schema.String.pipe(
  Schema.filter(isLowerKebab),
  Schema.brand("@NakafaAI/AksaraArticleCategory")
);
export type ArticleCategory = typeof ArticleCategorySchema.Type;

/** Localized display title owned by one reviewed article category source. */
export const ArticleCategoryTitleSchema = Schema.NonEmptyTrimmedString;
export type ArticleCategoryTitle = typeof ArticleCategoryTitleSchema.Type;

/** Stable source-owned article segment used below its category route. */
export const ArticleSlugSchema = Schema.String.pipe(
  Schema.filter(isLowerKebab),
  Schema.brand("@NakafaAI/AksaraArticleSlug")
);
export type ArticleSlug = typeof ArticleSlugSchema.Type;

/** Locale-owned public route segment for one article category or body. */
export const ArticleRouteSlugSchema = Schema.String.pipe(
  Schema.filter(isLowerKebab),
  Schema.brand("@NakafaAI/AksaraArticleRouteSlug")
);
export type ArticleRouteSlug = typeof ArticleRouteSlugSchema.Type;

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
  appLocale: AppLocaleSchema,
  articleRouteSlug: ArticleRouteSlugSchema,
  articleSlug: ArticleSlugSchema,
  artifactLocale: ArtifactLocaleSchema,
  category: ArticleCategorySchema,
  categoryRouteSlug: ArticleRouteSlugSchema,
  contentKey: ContentKeySchema,
  graph: LearningGraphIdentitySchema,
  publicPath: PublicPathSchema,
};

/** Checks graph identities against the source-owned article category and slug. */
function hasCoherentArticleGraph(input: {
  readonly articleSlug: string;
  readonly category: string;
  readonly graph: LearningGraphIdentity;
  readonly appLocale: typeof AppLocaleSchema.Type;
}) {
  const lens = `article:${input.category}`;
  const object = `article:${input.category}:${input.articleSlug}`;
  return (
    input.graph.alignmentId === `alignment:${lens}:${object}` &&
    input.graph.assetId === `asset:${input.appLocale}:${lens}:${object}` &&
    input.graph.conceptId === `concept:${lens}` &&
    input.graph.learningObjectId === `lo:${object}` &&
    input.graph.lensId === `lens:${lens}`
  );
}

/** Checks stable content identity separately from locale-owned public routing. */
function hasCoherentArticleRoute(input: {
  readonly articleRouteSlug: string;
  readonly articleSlug: string;
  readonly category: string;
  readonly categoryRouteSlug: string;
  readonly contentKey: string;
  readonly publicPath: string;
}) {
  return (
    input.contentKey === `articles/${input.category}/${input.articleSlug}` &&
    input.publicPath ===
      `articles/${input.categoryRouteSlug}/${input.articleRouteSlug}`
  );
}

/** Public article bodies use the same locale for routes and artifacts. */
function hasCoherentArticleLocales(input: {
  readonly appLocale: string;
  readonly artifactLocale: string;
}) {
  return input.appLocale === input.artifactLocale;
}

/** Source-owned identity and public route for one localized article body. */
export const ArticleRouteSchema = Schema.Struct(ArticleRouteFields).pipe(
  Schema.filter(hasCoherentArticleLocales, {
    message: () =>
      "Expected public article route and artifact locales to match.",
  }),
  Schema.filter(hasCoherentArticleRoute, {
    message: () =>
      "Expected stable article identity and locale-owned public route to be coherent.",
  }),
  Schema.filter(hasCoherentArticleGraph, {
    message: () =>
      "Expected article graph identities to match its stable source keys.",
  })
);
export type ArticleRoute = typeof ArticleRouteSchema.Type;

/** Canonical published read model for one reviewed article body. */
export const ArticleProjectionSchema = Schema.Struct({
  ...ArticleRouteFields,
  categoryTitle: ArticleCategoryTitleSchema,
  kind: Schema.Literal("article"),
  metadata: ArticleMetadataSchema,
  official: Schema.Boolean,
  parentPath: PublicPathSchema,
  references: Schema.Array(ArticleReferenceSchema),
  sitemap: Schema.Literal(true),
}).pipe(
  Schema.filter(hasCoherentArticleLocales, {
    message: () =>
      "Expected public article route and artifact locales to match.",
  }),
  Schema.filter(hasCoherentArticleRoute, {
    message: () =>
      "Expected stable article identity and locale-owned public route to be coherent.",
  }),
  Schema.filter(
    (projection) =>
      projection.parentPath === `articles/${projection.categoryRouteSlug}`,
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
  readonly categoryTitle: ArticleCategoryTitle;
  readonly metadata: ArticleMetadata;
  readonly official: boolean;
  readonly references: readonly ArticleReference[];
  readonly route: ArticleRoute;
}) {
  return ArticleProjectionSchema.make({
    ...input.route,
    categoryTitle: input.categoryTitle,
    kind: "article",
    metadata: input.metadata,
    official: input.official,
    parentPath: PublicPathSchema.make(
      `articles/${input.route.categoryRouteSlug}`
    ),
    references: [...input.references],
    sitemap: true,
  });
}

/** Serializes one article projection with stable signed field order. */
export function canonicalizeArticleProjection(projection: ArticleProjection) {
  return JSON.stringify({
    appLocale: projection.appLocale,
    articleRouteSlug: projection.articleRouteSlug,
    articleSlug: projection.articleSlug,
    artifactLocale: projection.artifactLocale,
    category: projection.category,
    categoryRouteSlug: projection.categoryRouteSlug,
    categoryTitle: projection.categoryTitle,
    contentKey: projection.contentKey,
    graph: canonicalizeLearningGraphIdentity(projection.graph),
    kind: projection.kind,
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
