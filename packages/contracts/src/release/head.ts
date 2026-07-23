import { Schema } from "effect";
import {
  ContentFamilySchema,
  ContentLocaleSchema,
  compareContentHeads,
} from "#contracts/content";
import { ContentDeliveryClassSchema } from "#contracts/delivery";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "#contracts/ids";
import { RendererDomainSchema } from "#contracts/renderer/domain";
import { MAX_HEAD_PAGE_COUNT } from "#contracts/transport/limits";

const HeadCursorSchema = Schema.NullOr(
  Schema.NonEmptyTrimmedString.pipe(Schema.maxLength(4096))
);

const ContentHeadFields = {
  artifactHash: Sha256HashSchema,
  compilerConfigHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  delivery: ContentDeliveryClassSchema,
  locale: ContentLocaleSchema,
  projectionHash: Sha256HashSchema,
  publicPath: Schema.optional(PublicPathSchema),
  rendererDomain: RendererDomainSchema,
  sourceHash: Sha256HashSchema,
  sourcePath: CorpusSourcePathSchema,
};

/** Compact authoritative identity used to diff one published article head. */
export const ArticleHeadSchema = Schema.Struct({
  ...ContentHeadFields,
  family: Schema.Literal("article"),
});
export type ArticleHead = typeof ArticleHeadSchema.Type;

/** Compact authoritative identity used to diff one published material head. */
export const MaterialHeadSchema = Schema.Struct({
  ...ContentHeadFields,
  family: Schema.Literal("material"),
});
export type MaterialHead = typeof MaterialHeadSchema.Type;

/** Compact authoritative identity used to diff one published question body. */
export const QuestionHeadSchema = Schema.Struct({
  ...ContentHeadFields,
  family: Schema.Literal("question"),
}).pipe(
  Schema.filter(({ publicPath }) => publicPath === undefined, {
    message: () => "Expected question heads to remain route-free.",
  })
);
export type QuestionHead = typeof QuestionHeadSchema.Type;

/** Complete compact-head vocabulary backed by implemented content families. */
export const ContentHeadSchema = Schema.Union(
  ArticleHeadSchema,
  MaterialHeadSchema,
  QuestionHeadSchema
);
export type ContentHead = typeof ContentHeadSchema.Type;

/** Serializes one compact head in stable catalog field order. */
export function canonicalizeContentHead(head: ContentHead) {
  return JSON.stringify({
    artifactHash: head.artifactHash,
    compilerConfigHash: head.compilerConfigHash,
    contentKey: head.contentKey,
    delivery: head.delivery,
    family: head.family,
    locale: head.locale,
    projectionHash: head.projectionHash,
    ...(head.publicPath === undefined ? {} : { publicPath: head.publicPath }),
    rendererDomain: head.rendererDomain,
    sourceHash: head.sourceHash,
    sourcePath: head.sourcePath,
  });
}

/** Requests one bounded family-owned head page from an exact active release. */
export const HeadPageRequestSchema = Schema.Struct({
  activeManifestHash: Sha256HashSchema,
  activeReleaseId: ReleaseIdSchema,
  cursor: HeadCursorSchema,
  family: ContentFamilySchema,
  limit: Schema.Number.pipe(
    Schema.int(),
    Schema.between(1, MAX_HEAD_PAGE_COUNT)
  ),
});
export type HeadPageRequest = typeof HeadPageRequestSchema.Type;

/** Checks deterministic head order and opaque cursor progress. */
function hasCanonicalHeadPage(page: {
  readonly cursor: string | null;
  readonly done: boolean;
  readonly heads: readonly ContentHead[];
  readonly nextCursor: string | null;
}) {
  const hasCanonicalOrder = page.heads.every((head, index) => {
    const previous = page.heads[index - 1];
    return previous === undefined || compareContentHeads(previous, head) < 0;
  });
  if (!hasCanonicalOrder) {
    return false;
  }
  if (page.done) {
    return page.nextCursor === null;
  }
  return page.nextCursor !== null && page.nextCursor !== page.cursor;
}

const HeadPageFields = {
  activeManifestHash: Sha256HashSchema,
  activeReleaseId: ReleaseIdSchema,
  cursor: HeadCursorSchema,
  done: Schema.Boolean,
  nextCursor: HeadCursorSchema,
};

const ArticleHeadPageSchema = Schema.Struct({
  ...HeadPageFields,
  family: Schema.Literal("article"),
  heads: Schema.Array(ArticleHeadSchema).pipe(
    Schema.maxItems(MAX_HEAD_PAGE_COUNT)
  ),
}).pipe(
  Schema.filter(hasCanonicalHeadPage, {
    message: () =>
      "Expected canonical article heads with coherent cursor progress.",
  })
);

const MaterialHeadPageSchema = Schema.Struct({
  ...HeadPageFields,
  family: Schema.Literal("material"),
  heads: Schema.Array(MaterialHeadSchema).pipe(
    Schema.maxItems(MAX_HEAD_PAGE_COUNT)
  ),
}).pipe(
  Schema.filter(hasCanonicalHeadPage, {
    message: () =>
      "Expected canonical material heads with coherent cursor progress.",
  })
);

const QuestionHeadPageSchema = Schema.Struct({
  ...HeadPageFields,
  family: Schema.Literal("question"),
  heads: Schema.Array(QuestionHeadSchema).pipe(
    Schema.maxItems(MAX_HEAD_PAGE_COUNT)
  ),
}).pipe(
  Schema.filter(hasCanonicalHeadPage, {
    message: () =>
      "Expected canonical question heads with coherent cursor progress.",
  })
);

/** Bounded canonical page proving one exact family-owned head inventory. */
export const HeadPageSchema = Schema.Union(
  ArticleHeadPageSchema,
  MaterialHeadPageSchema,
  QuestionHeadPageSchema
);
export type HeadPage = typeof HeadPageSchema.Type;
