import { Schema } from "effect";
import { ContentLocaleSchema, compareContentHeads } from "#contracts/content";
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

/** Compact authoritative identity used to diff one published material head. */
export const MaterialHeadSchema = Schema.Struct({
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
});
export type MaterialHead = typeof MaterialHeadSchema.Type;

/** Serializes one compact head in stable catalog field order. */
export function canonicalizeMaterialHead(head: MaterialHead) {
  return JSON.stringify({
    artifactHash: head.artifactHash,
    compilerConfigHash: head.compilerConfigHash,
    contentKey: head.contentKey,
    delivery: head.delivery,
    locale: head.locale,
    projectionHash: head.projectionHash,
    ...(head.publicPath === undefined ? {} : { publicPath: head.publicPath }),
    rendererDomain: head.rendererDomain,
    sourceHash: head.sourceHash,
    sourcePath: head.sourcePath,
  });
}

/** Requests one bounded material-head page from an exact active release. */
export const HeadPageRequestSchema = Schema.Struct({
  activeManifestHash: Sha256HashSchema,
  activeReleaseId: ReleaseIdSchema,
  cursor: HeadCursorSchema,
  family: Schema.Literal("material"),
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
  readonly heads: readonly MaterialHead[];
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
  return (
    page.heads.length > 0 &&
    page.nextCursor !== null &&
    page.nextCursor !== page.cursor
  );
}

/** Bounded canonical page proving material heads for one active release. */
export const HeadPageSchema = Schema.Struct({
  activeManifestHash: Sha256HashSchema,
  activeReleaseId: ReleaseIdSchema,
  cursor: HeadCursorSchema,
  done: Schema.Boolean,
  family: Schema.Literal("material"),
  heads: Schema.Array(MaterialHeadSchema).pipe(
    Schema.maxItems(MAX_HEAD_PAGE_COUNT)
  ),
  nextCursor: HeadCursorSchema,
}).pipe(
  Schema.filter(hasCanonicalHeadPage, {
    message: () =>
      "Expected canonical material heads with coherent cursor progress.",
  })
);
export type HeadPage = typeof HeadPageSchema.Type;
