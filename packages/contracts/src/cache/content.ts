import { Schema } from "effect";
import { ContentFamilySchema } from "#contracts/content";
import {
  ReleaseIdSchema,
  type Sha256Hash,
  Sha256HashSchema,
} from "#contracts/ids";
import { ContentSnapshotKindSchema } from "#contracts/release/snapshot/scope";

const ARTIFACT_CACHE_PREFIX = "content-artifact:";
const SCOPE_CACHE_PREFIX = "content-scope:";

/** Mutable publication dependencies owned by the signed source contracts. */
export const ContentCacheScopeSchema = Schema.Literals([
  ...ContentFamilySchema.literals,
  ...ContentSnapshotKindSchema.literals,
]);
export type ContentCacheScope = typeof ContentCacheScopeSchema.Type;

/** One immutable published-artifact cache tag derived only from its hash. */
export const ArtifactCacheTagSchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(
      (tag) =>
        tag.startsWith(ARTIFACT_CACHE_PREFIX) &&
        Schema.is(Sha256HashSchema)(tag.slice(ARTIFACT_CACHE_PREFIX.length)),
      {
        message:
          "Expected content-artifact followed by one canonical SHA-256 hash.",
      }
    )
  ),
  Schema.brand("@NakafaAI/AksaraArtifactCacheTag")
);
export type ArtifactCacheTag = typeof ArtifactCacheTagSchema.Type;

/** A changed item or snapshot invalidates its mutable selection dependency. */
export const ContentCacheChangeSchema = Schema.Struct({
  scope: ContentCacheScopeSchema,
});
export type ContentCacheChange = typeof ContentCacheChangeSchema.Type;

/** One release-bound invalidation cannot name global or immutable cache tags. */
export const ContentCacheRequestSchema = Schema.Struct({
  releaseId: ReleaseIdSchema,
  scope: ContentCacheScopeSchema,
});
export type ContentCacheRequest = typeof ContentCacheRequestSchema.Type;

/** Nakafa proof that one exact release-bound dependency was invalidated. */
export const ContentCacheReceiptSchema = Schema.Struct({
  ...ContentCacheRequestSchema.fields,
  revalidated: Schema.Literal(true),
});
export type ContentCacheReceipt = typeof ContentCacheReceiptSchema.Type;

/** Derives the canonical cache tag for one already-canonical artifact hash. */
export function makeArtifactCacheTag(hash: Sha256Hash): ArtifactCacheTag {
  return ArtifactCacheTagSchema.make(`${ARTIFACT_CACHE_PREFIX}${hash}`);
}

/** Derives the same mutable dependency tag in the reader and invalidator. */
export function makeContentCacheTag(scope: ContentCacheScope) {
  return `${SCOPE_CACHE_PREFIX}${scope}`;
}
