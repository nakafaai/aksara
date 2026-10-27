import { Schema } from "effect";
import { PublicPathSchema } from "#contracts/ids";
import { AppLocaleSchema } from "#contracts/locale";

/** Locale and public route that name one page. Route errors and previews share them. */
export const PublicRouteFields = {
  appLocale: AppLocaleSchema,
  publicPath: PublicPathSchema,
} as const;

/** Locale and existing public route refreshed by one preview update. */
export const PreviewRouteSchema = Schema.Struct(PublicRouteFields);
