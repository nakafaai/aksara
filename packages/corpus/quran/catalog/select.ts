import {
  type ActiveAppLocaleList,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  type QuranSourceId,
  QuranSourceIdSchema,
} from "@nakafa/aksara-contracts/quran/identity";
import {
  QuranProvenanceRecordSchema,
  QuranProvenanceScopeSchema,
  quranProvenanceScopes,
} from "@nakafa/aksara-contracts/quran/provenance";
import {
  QuranAttributionRowSchema,
  QuranSourceAttributionSchema,
  type QuranSourceCopy,
  quranSourceIds,
} from "@nakafa/aksara-contracts/quran/source";
import { Effect, Schema } from "effect";

import {
  type QuranCatalogEntry,
  quranCatalog,
} from "#corpus/quran/catalog/registry";

/** A catalog source, locale copy, access record, or provenance record is invalid. */
export class QuranCatalogError extends Schema.TaggedError<QuranCatalogError>()(
  "QuranCatalogError",
  {
    activeAppLocales: Schema.Array(AppLocaleSchema),
    appLocale: Schema.optional(AppLocaleSchema),
    reason: Schema.Literals([
      "duplicate-access",
      "duplicate-copy",
      "duplicate-provenance",
      "duplicate-source",
      "mismatched-provenance",
      "missing-access",
      "missing-copy",
      "missing-provenance",
      "missing-source",
    ]),
    scope: Schema.optional(QuranProvenanceScopeSchema),
    sourceId: Schema.optional(QuranSourceIdSchema),
  }
) {}

/** Resolves exactly one catalog source by stable identity. */
const requireSource = Effect.fn("AksaraCorpus.requireQuranCatalogSource")(
  function* (
    sourceId: QuranSourceId,
    activeAppLocales: ActiveAppLocaleList,
    catalog: readonly QuranCatalogEntry[]
  ) {
    const matches = catalog.filter(
      ({ attribution }) => attribution.id === sourceId
    );
    const [entry] = matches;
    if (entry === undefined || matches.length > 1) {
      return yield* new QuranCatalogError({
        activeAppLocales,
        reason: entry === undefined ? "missing-source" : "duplicate-source",
        sourceId,
      });
    }
    return entry;
  }
);

/** Selects one source and its exact localized attribution closure. */
const localizeSource = Effect.fn("AksaraCorpus.localizeQuranCatalogSource")(
  function* (
    sourceId: QuranSourceId,
    activeAppLocales: ActiveAppLocaleList,
    catalog: readonly QuranCatalogEntry[]
  ) {
    const { attribution } = yield* requireSource(
      sourceId,
      activeAppLocales,
      catalog
    );
    const copy = yield* Effect.forEach(
      activeAppLocales,
      (appLocale) => {
        const matches = attribution.copy.filter(
          (candidate) => candidate.appLocale === appLocale
        );
        const [selected] = matches;
        if (selected === undefined || matches.length > 1) {
          return Effect.fail(
            new QuranCatalogError({
              activeAppLocales,
              appLocale,
              reason:
                selected === undefined ? "missing-copy" : "duplicate-copy",
              sourceId,
            })
          );
        }
        return Effect.succeed(selected);
      },
      { concurrency: "unbounded" }
    );
    const [first, ...remaining] = copy;
    const localizedCopy: readonly [QuranSourceCopy, ...QuranSourceCopy[]] = [
      first,
      ...remaining,
    ];
    return QuranSourceAttributionSchema.make({
      ...attribution,
      copy: localizedCopy,
    });
  }
);

/** Builds the complete visible attribution and Tafsir access row. */
export const quranAttributionRowFor = Effect.fn(
  "AksaraCorpus.quranAttributionRowFor"
)(function* (
  activeAppLocales: ActiveAppLocaleList,
  catalog: readonly QuranCatalogEntry[] = quranCatalog
) {
  const sources = yield* Effect.forEach(
    quranSourceIds(activeAppLocales),
    (sourceId) => localizeSource(sourceId, activeAppLocales, catalog),
    { concurrency: "unbounded" }
  );
  const selectedAccess = yield* Effect.forEach(
    activeAppLocales,
    (appLocale) => {
      const matches = catalog.flatMap(({ tafsirAccess }) =>
        tafsirAccess?.appLocale === appLocale ? [tafsirAccess] : []
      );
      const [selected] = matches;
      if (selected === undefined || matches.length > 1) {
        return Effect.fail(
          new QuranCatalogError({
            activeAppLocales,
            appLocale,
            reason:
              selected === undefined ? "missing-access" : "duplicate-access",
          })
        );
      }
      return Effect.succeed(selected);
    },
    { concurrency: "unbounded" }
  );
  return QuranAttributionRowSchema.make({
    activeAppLocales,
    kind: "quran-attribution",
    sources,
    tafsirAccess: selectedAccess,
  });
});

/** Derives exact ordered provenance from the same canonical source catalog. */
export const quranProvenanceRecordsFor = Effect.fn(
  "AksaraCorpus.quranProvenanceRecordsFor"
)(function* (
  activeAppLocales: ActiveAppLocaleList,
  catalog: readonly QuranCatalogEntry[] = quranCatalog
) {
  return yield* Effect.forEach(
    quranProvenanceScopes(activeAppLocales),
    (scope) =>
      Effect.gen(function* () {
        const matches = catalog.filter(
          ({ provenance }) => provenance.scope === scope
        );
        const [entry] = matches;
        if (entry === undefined || matches.length > 1) {
          return yield* new QuranCatalogError({
            activeAppLocales,
            reason:
              entry === undefined
                ? "missing-provenance"
                : "duplicate-provenance",
            scope,
          });
        }
        const attribution = yield* localizeSource(
          entry.attribution.id,
          activeAppLocales,
          catalog
        );
        return yield* Schema.decodeEffect(QuranProvenanceRecordSchema)(
          {
            attribution,
            ...entry.provenance,
          },
          { onExcessProperty: "error" }
        ).pipe(
          Effect.mapError(
            () =>
              new QuranCatalogError({
                activeAppLocales,
                reason: "mismatched-provenance",
                scope,
                sourceId: entry.attribution.id,
              })
          )
        );
      }),
    { concurrency: "unbounded" }
  );
});
