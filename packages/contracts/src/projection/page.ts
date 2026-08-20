import { Schema } from "effect";
import { DateOnlySchema } from "#contracts/date";
import { ContentKeySchema, PublicPathSchema } from "#contracts/ids";
import { AppLocaleSchema, ArtifactLocaleSchema } from "#contracts/locale";
import { isLowerKebab } from "#contracts/text/syntax";

/** Stable source-owned identity for one reviewed public site page. */
export const PageKeySchema = Schema.String.pipe(
  Schema.check(Schema.makeFilter(isLowerKebab)),
  Schema.brand("@NakafaAI/AksaraPageKey")
);
export type PageKey = typeof PageKeySchema.Type;

/** Exact metadata consumed by human, agent, and sitemap page surfaces. */
export const PageMetadataSchema = Schema.Struct({
  description: Schema.Trimmed.check(Schema.isNonEmpty()),
  lastModified: DateOnlySchema,
  title: Schema.Trimmed.check(Schema.isNonEmpty()),
});
export type PageMetadata = typeof PageMetadataSchema.Type;

const PublicPageRouteFields = {
  appLocale: AppLocaleSchema,
  artifactLocale: ArtifactLocaleSchema,
  contentKey: ContentKeySchema,
  pageKey: PageKeySchema,
  publicPath: PublicPathSchema,
};

/** Checks stable page identity separately from its locale-owned public path. */
function hasCoherentPageRoute(input: {
  readonly contentKey: string;
  readonly pageKey: string;
}) {
  return input.contentKey === `pages/${input.pageKey}`;
}

/** Public page bodies use the same locale for routes and artifacts. */
function hasCoherentPageLocales(input: {
  readonly appLocale: string;
  readonly artifactLocale: string;
}) {
  return input.appLocale === input.artifactLocale;
}

/** Stable identity and locale-owned public route for one reviewed site page. */
export const PublicPageRouteSchema = Schema.Struct(PublicPageRouteFields).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentPageLocales, {
      message: "Expected public page route and artifact locales to match.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentPageRoute, {
      message: "Expected the public page content key to match its page key.",
    })
  )
);
export type PublicPageRoute = typeof PublicPageRouteSchema.Type;

/** Canonical signed read model for one reviewed public site page. */
export const PublicPageProjectionSchema = Schema.Struct({
  ...PublicPageRouteFields,
  kind: Schema.Literal("public-page"),
  metadata: PageMetadataSchema,
  sitemap: Schema.Literal(true),
}).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentPageLocales, {
      message: "Expected public page route and artifact locales to match.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentPageRoute, {
      message: "Expected the public page content key to match its page key.",
    })
  )
);
export type PublicPageProjection = typeof PublicPageProjectionSchema.Type;

/** Combines one reviewed page route with its strict localized metadata. */
export function makePublicPageProjection(input: {
  readonly metadata: PageMetadata;
  readonly route: PublicPageRoute;
}) {
  return PublicPageProjectionSchema.make({
    ...input.route,
    kind: "public-page",
    metadata: input.metadata,
    sitemap: true,
  });
}

/** Serializes one public page projection with stable signed field order. */
export function canonicalizePublicPageProjection(
  projection: PublicPageProjection
) {
  return JSON.stringify({
    appLocale: projection.appLocale,
    artifactLocale: projection.artifactLocale,
    contentKey: projection.contentKey,
    kind: projection.kind,
    metadata: {
      description: projection.metadata.description,
      lastModified: projection.metadata.lastModified,
      title: projection.metadata.title,
    },
    pageKey: projection.pageKey,
    publicPath: projection.publicPath,
    sitemap: projection.sitemap,
  });
}
