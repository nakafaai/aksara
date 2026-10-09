import { Array as Arr, Schema } from "effect";
import {
  type ContentFamily,
  ContentFamilySchema,
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
import { ArtifactLocaleSchema } from "#contracts/locale";
import { RendererDomainSchema } from "#contracts/renderer/domain";
import { encodeJsonText } from "#contracts/text/json";
import { MAX_HEAD_PAGE_COUNT } from "#contracts/transport/limits";

const HeadCursorSchema = Schema.NullOr(
  Schema.Trimmed.check(Schema.isNonEmpty()).pipe(
    Schema.check(Schema.isMaxLength(4096))
  )
);

const ContentHeadFields = {
  artifactHash: Sha256HashSchema,
  artifactLocale: ArtifactLocaleSchema,
  compilerConfigHash: Sha256HashSchema,
  contentKey: ContentKeySchema,
  delivery: ContentDeliveryClassSchema,
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

/** Compact authoritative identity used to diff one published page head. */
export const PageHeadSchema = Schema.Struct({
  ...ContentHeadFields,
  family: Schema.Literal("page"),
}).pipe(
  Schema.check(
    Schema.makeFilter(({ publicPath }) => publicPath !== undefined, {
      message: "Expected page heads to retain their public path.",
    })
  )
);
export type PageHead = typeof PageHeadSchema.Type;

/** Compact authoritative identity used to diff one published question body. */
export const QuestionHeadSchema = Schema.Struct({
  ...ContentHeadFields,
  family: Schema.Literal("question"),
}).pipe(
  Schema.check(
    Schema.makeFilter(({ publicPath }) => publicPath === undefined, {
      message: "Expected question heads to remain route-free.",
    })
  )
);
export type QuestionHead = typeof QuestionHeadSchema.Type;

/** Complete compact-head vocabulary backed by implemented content families. */
export const ContentHeadSchema = Schema.Union([
  ArticleHeadSchema,
  MaterialHeadSchema,
  PageHeadSchema,
  QuestionHeadSchema,
]);
export type ContentHead = typeof ContentHeadSchema.Type;

/** Serializes one compact head in stable catalog field order. */
export function canonicalizeContentHead(head: ContentHead) {
  return encodeJsonText({
    artifactHash: head.artifactHash,
    artifactLocale: head.artifactLocale,
    compilerConfigHash: head.compilerConfigHash,
    contentKey: head.contentKey,
    delivery: head.delivery,
    family: head.family,
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
  limit: Schema.Finite.pipe(
    Schema.check(Schema.isInt()),
    Schema.check(Schema.isBetween({ maximum: MAX_HEAD_PAGE_COUNT, minimum: 1 }))
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
  const hasCanonicalOrder = Arr.every(page.heads, (head, index) => {
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

/** Builds one family-owned head page whose heads share that family's shape. */
function headPageSchema<
  Family extends ContentFamily,
  Head extends Schema.Top & { readonly Type: ContentHead },
>(family: Family, head: Head) {
  return Schema.Struct({
    ...HeadPageFields,
    family: Schema.Literal(family),
    heads: Schema.Array(head).pipe(
      Schema.check(Schema.isMaxLength(MAX_HEAD_PAGE_COUNT))
    ),
  }).pipe(
    Schema.check(
      Schema.makeFilter(hasCanonicalHeadPage, {
        message: `Expected canonical ${family} heads with coherent cursor progress.`,
      })
    )
  );
}

/** Bounded canonical page proving one exact family-owned head inventory. */
export const HeadPageSchema = Schema.Union([
  headPageSchema("article", ArticleHeadSchema),
  headPageSchema("material", MaterialHeadSchema),
  headPageSchema("page", PageHeadSchema),
  headPageSchema("question", QuestionHeadSchema),
]);
export type HeadPage = typeof HeadPageSchema.Type;
