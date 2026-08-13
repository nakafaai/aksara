/** Signed public route change and item wire contracts. */
import { Schema } from "effect";
import {
  ContentKeySchema,
  PublicPathSchema,
  ReleaseIdSchema,
} from "#contracts/ids";
import { AppLocaleSchema } from "#contracts/locale";
import { ReleaseItemIndexSchema } from "#contracts/release/spec";

/** One public route bound to a stable locale-specific content identity. */
export const ContentRouteBindSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  contentKey: ContentKeySchema,
  operation: Schema.Literal("bind"),
  publicPath: PublicPathSchema,
});
export type ContentRouteBind = typeof ContentRouteBindSchema.Type;

/** One public route removed without deleting its stable content identity. */
export const ContentRouteDeleteSchema = Schema.Struct({
  appLocale: AppLocaleSchema,
  operation: Schema.Literal("delete"),
  publicPath: PublicPathSchema,
});
export type ContentRouteDelete = typeof ContentRouteDeleteSchema.Type;

/** Complete immutable public-route change vocabulary for one release. */
export const ContentRouteChangeSchema = Schema.Union(
  ContentRouteBindSchema,
  ContentRouteDeleteSchema
);
export type ContentRouteChange = typeof ContentRouteChangeSchema.Type;

/** One ordered route change authenticated by the signed release manifest. */
export const ContentRouteItemSchema = Schema.Struct({
  change: ContentRouteChangeSchema,
  index: ReleaseItemIndexSchema,
  releaseId: ReleaseIdSchema,
});
export type ContentRouteItem = typeof ContentRouteItemSchema.Type;

/** Serializes one route change in stable wire field order. */
export function canonicalizeContentRouteChange(change: ContentRouteChange) {
  if (change.operation === "delete") {
    return `{"appLocale":${JSON.stringify(change.appLocale)},"operation":"delete","publicPath":${JSON.stringify(change.publicPath)}}`;
  }
  return `{"appLocale":${JSON.stringify(change.appLocale)},"contentKey":${JSON.stringify(change.contentKey)},"operation":"bind","publicPath":${JSON.stringify(change.publicPath)}}`;
}

/** Serializes one indexed route item for signed digest computation. */
export function canonicalizeContentRouteItem(item: ContentRouteItem) {
  return `{"change":${canonicalizeContentRouteChange(item.change)},"index":${item.index},"releaseId":${JSON.stringify(item.releaseId)}}`;
}
