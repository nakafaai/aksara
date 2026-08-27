import { Schema } from "effect";

/** Locale codes encoded into signed state created before locale separation. */
export const HistoricalAppLocaleSchema = Schema.Literals(["en", "id"]);
export type HistoricalAppLocale = typeof HistoricalAppLocaleSchema.Type;

/** Exact ordered locale list accepted only by the read-only history seam. */
export const HistoricalAppLocaleListSchema = Schema.Tuple([
  Schema.Literal("en"),
  Schema.Literal("id"),
]);
export type HistoricalAppLocaleList = typeof HistoricalAppLocaleListSchema.Type;
