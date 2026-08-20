import { Schema } from "effect";

/** Locale codes encoded into signed state created before locale separation. */
export const HistoricalAppLocaleSchema = Schema.Literals(["en", "id"]);
export type HistoricalAppLocale = typeof HistoricalAppLocaleSchema.Type;

/** Checks the exact immutable locale list stored by the historical protocol. */
function hasHistoricalAppLocales(locales: readonly HistoricalAppLocale[]) {
  return (
    locales.length === HistoricalAppLocaleSchema.literals.length &&
    locales.every(
      (locale, index) => locale === HistoricalAppLocaleSchema.literals[index]
    )
  );
}

/** Exact ordered locale list accepted only by the read-only history seam. */
export const HistoricalAppLocaleListSchema = Schema.Array(
  HistoricalAppLocaleSchema
).pipe(
  Schema.check(
    Schema.makeFilter(hasHistoricalAppLocales, {
      message: "Historical app locales must be exactly en and id.",
    })
  )
);
export type HistoricalAppLocaleList = typeof HistoricalAppLocaleListSchema.Type;
