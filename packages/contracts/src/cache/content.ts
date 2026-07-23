import { Schema } from "effect";
import { type ContentFamily, ContentFamilySchema } from "#contracts/content";
import {
  type ReleaseId,
  ReleaseIdSchema,
  type Sha256Hash,
  Sha256HashSchema,
} from "#contracts/ids";

/** Global content-runtime tag always invalidated before narrower tags. */
export const CONTENT_CACHE_GLOBAL_TAG = "content-runtime";

const ARTIFACT_CACHE_PREFIX = "content-artifact:";
const FAMILY_CACHE_PREFIX = "content-family:";

/** Maximum exact artifact tags carried with global and family cache tags. */
export const MAX_CONTENT_CACHE_ARTIFACTS = 98;

/** One immutable published-artifact cache tag derived only from its hash. */
export const ArtifactCacheTagSchema = Schema.String.pipe(
  Schema.filter(
    (tag) =>
      tag.startsWith(ARTIFACT_CACHE_PREFIX) &&
      Schema.is(Sha256HashSchema)(tag.slice(ARTIFACT_CACHE_PREFIX.length)),
    {
      message: () =>
        "Expected content-artifact followed by one canonical SHA-256 hash.",
    }
  ),
  Schema.brand("@NakafaAI/AksaraArtifactCacheTag")
);
export type ArtifactCacheTag = typeof ArtifactCacheTagSchema.Type;

/** One exact content-family cache tag derived from the family contract. */
export const ContentFamilyCacheTagSchema = Schema.String.pipe(
  Schema.filter(
    (tag) =>
      tag.startsWith(FAMILY_CACHE_PREFIX) &&
      Schema.is(ContentFamilySchema)(tag.slice(FAMILY_CACHE_PREFIX.length)),
    { message: () => "Expected one canonical content-family cache tag." }
  ),
  Schema.brand("@NakafaAI/AksaraContentFamilyCacheTag")
);
export type ContentFamilyCacheTag = typeof ContentFamilyCacheTagSchema.Type;

/** Checks one cache request carries no redundant exact artifact tags. */
function hasUniqueArtifactTags(tags: readonly string[]) {
  const artifacts = tags.slice(2);
  return new Set(artifacts).size === artifacts.length;
}

/**
 * Ordered cache tags shared by Aksara and Nakafa.
 *
 * Global and exact family tags come first; remaining tags name exact changed
 * artifacts while keeping one invalidation request at or below 100 tags.
 */
export const ContentCacheTagsSchema = Schema.Tuple(
  [Schema.Literal(CONTENT_CACHE_GLOBAL_TAG), ContentFamilyCacheTagSchema],
  ArtifactCacheTagSchema
).pipe(
  Schema.maxItems(MAX_CONTENT_CACHE_ARTIFACTS + 2),
  Schema.filter(hasUniqueArtifactTags, {
    message: () => "Expected unique exact artifact cache tags.",
  })
);
export type ContentCacheTags = typeof ContentCacheTagsSchema.Type;

/** One changed family plus its optional newly published immutable artifact. */
export const ContentCacheChangeSchema = Schema.Struct({
  artifactHash: Schema.optional(Sha256HashSchema),
  family: ContentFamilySchema,
});
export type ContentCacheChange = typeof ContentCacheChangeSchema.Type;

/** Derives the canonical cache tag for one already-canonical artifact hash. */
export function makeArtifactCacheTag(hash: Sha256Hash): ArtifactCacheTag {
  return ArtifactCacheTagSchema.make(`${ARTIFACT_CACHE_PREFIX}${hash}`);
}

/** Derives the canonical cache tag for one implemented content family. */
export function makeContentFamilyCacheTag(
  family: ContentFamily
): ContentFamilyCacheTag {
  return ContentFamilyCacheTagSchema.make(`${FAMILY_CACHE_PREFIX}${family}`);
}

/** Checks the explicit family and ordered family cache tag cannot disagree. */
function hasCoherentFamily(input: {
  readonly family: ContentFamily;
  readonly tags: ContentCacheTags;
}) {
  return input.tags[1] === makeContentFamilyCacheTag(input.family);
}

/** One release-bound, family-exact cache invalidation request. */
export const ContentCacheRequestSchema = Schema.Struct({
  family: ContentFamilySchema,
  releaseId: ReleaseIdSchema,
  tags: ContentCacheTagsSchema,
}).pipe(
  Schema.filter(hasCoherentFamily, {
    message: () => "Expected the cache family to match its ordered family tag.",
  })
);
export type ContentCacheRequest = typeof ContentCacheRequestSchema.Type;

/** Nakafa proof that one exact release-bound invalidation completed. */
export const ContentCacheReceiptSchema = Schema.Struct({
  family: ContentFamilySchema,
  releaseId: ReleaseIdSchema,
  revalidated: Schema.Literal(true),
  tags: ContentCacheTagsSchema,
}).pipe(
  Schema.filter(hasCoherentFamily, {
    message: () => "Expected the cache family to match its ordered family tag.",
  })
);
export type ContentCacheReceipt = typeof ContentCacheReceiptSchema.Type;

/** Builds one ordered invalidation request for one exact content family. */
export function makeContentCacheRequest(input: {
  readonly artifactHashes: readonly Sha256Hash[];
  readonly family: ContentFamily;
  readonly releaseId: ReleaseId;
}): ContentCacheRequest {
  return ContentCacheRequestSchema.make({
    family: input.family,
    releaseId: input.releaseId,
    tags: [
      CONTENT_CACHE_GLOBAL_TAG,
      makeContentFamilyCacheTag(input.family),
      ...input.artifactHashes.map(makeArtifactCacheTag),
    ],
  });
}
