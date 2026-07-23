import { Schema } from "effect";
import { ReleaseIdSchema } from "#contracts/ids";

/** Exact material-runtime tags invalidated after one release activation. */
export const MATERIAL_CACHE_TAGS = [
  "content-runtime",
  "content-family:material",
] as const;

/** Exact ordered cache-tag vocabulary shared by Aksara and Nakafa. */
export const MaterialCacheTagsSchema = Schema.Tuple(
  Schema.Literal(MATERIAL_CACHE_TAGS[0]),
  Schema.Literal(MATERIAL_CACHE_TAGS[1])
);

/** One release-bound material cache invalidation request. */
export const MaterialCacheRequestSchema = Schema.Struct({
  releaseId: ReleaseIdSchema,
  tags: MaterialCacheTagsSchema,
});

/** Nakafa proof that one exact release-bound invalidation completed. */
export const MaterialCacheReceiptSchema = Schema.Struct({
  releaseId: ReleaseIdSchema,
  revalidated: Schema.Literal(true),
  tags: MaterialCacheTagsSchema,
});

export type MaterialCacheRequest = typeof MaterialCacheRequestSchema.Type;
export type MaterialCacheReceipt = typeof MaterialCacheReceiptSchema.Type;
