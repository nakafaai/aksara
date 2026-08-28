import { describe, expect, it } from "@effect/vitest";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
} from "@nakafa/aksara-contracts/locale";
import { makeQuranProvenanceManifest } from "@nakafa/aksara-contracts/quran/provenance";
import { Effect, Schema } from "effect";
import { mokhtasarCatalog } from "#corpus/quran/catalog/mokhtasar";
import {
  type QuranCatalogEntry,
  quranCatalog,
} from "#corpus/quran/catalog/registry";
import {
  quranAttributionRowFor,
  quranProvenanceRecordsFor,
} from "#corpus/quran/catalog/select";

/** Replaces one catalog entry without mutating the canonical registry. */
function replace(
  sourceId: QuranCatalogEntry["attribution"]["id"],
  replacement: QuranCatalogEntry
) {
  return quranCatalog.map((entry) =>
    entry.attribution.id === sourceId ? replacement : entry
  );
}

describe("Quran source catalog", () => {
  it.effect(
    "derives complete source, access, and provenance rows from one catalog",
    () =>
      Effect.gen(function* () {
        const attribution = yield* quranAttributionRowFor(ACTIVE_APP_LOCALES);
        const records = yield* quranProvenanceRecordsFor(ACTIVE_APP_LOCALES);
        const manifest = yield* makeQuranProvenanceManifest({
          activeAppLocales: ACTIVE_APP_LOCALES,
          records,
        });

        expect(attribution.sources).toHaveLength(10);
        expect(attribution.sources.every(({ copy }) => copy.length === 3)).toBe(
          true
        );
        expect(attribution.tafsirAccess).toMatchObject([
          {
            appLocale: "en",
            kind: "external",
            sourceId: "mokhtasar-english",
          },
          { appLocale: "id", kind: "embedded", sourceId: "quranenc-tafsir" },
          {
            appLocale: "de",
            kind: "external",
            sourceId: "mokhtasar-german",
          },
        ]);
        expect(records).toHaveLength(11);
        expect(manifest.status).toBe("approved");
      })
  );

  it.effect(
    "keeps external editions honest and covers every official locale",
    () =>
      Effect.gen(function* () {
        const attribution = yield* quranAttributionRowFor(ACTIVE_APP_LOCALES);
        const external = attribution.sources.filter(
          ({ kind }) => kind === "external"
        );

        expect(
          mokhtasarCatalog.editions.map(
            ({ appLocale, bookId, completed, version }) => ({
              appLocale,
              bookId,
              completed,
              version,
            })
          )
        ).toEqual([
          { appLocale: "en", bookId: 319, completed: true, version: 7 },
          { appLocale: "id", bookId: 219, completed: true, version: 6 },
          { appLocale: "de", bookId: 336, completed: true, version: 6 },
        ]);
        expect(external).toHaveLength(2);
        expect(
          external.every(
            (source) =>
              !("artifact" in source) && source.terms.access === "link-only"
          )
        ).toBe(true);
        expect(
          attribution.tafsirAccess.find(({ appLocale }) => appLocale === "id")
        ).toMatchObject({ kind: "embedded", sourceId: "quranenc-tafsir" });
      })
  );

  it.effect("preserves a selected locale subset without fallback records", () =>
    Effect.gen(function* () {
      const selected = yield* Schema.decodeEffect(ActiveAppLocaleListSchema)([
        "de",
      ]);
      const attribution = yield* quranAttributionRowFor(selected);

      expect(attribution.sources.map(({ id }) => id)).toEqual([
        "tanzil-text",
        "tanzil-metadata",
        "bubenheim-names",
        "quranenc-german",
        "mokhtasar-german",
      ]);
      expect(attribution.tafsirAccess).toMatchObject([
        { appLocale: "de", kind: "external", sourceId: "mokhtasar-german" },
      ]);
    })
  );

  it.effect(
    "fails typed when catalog source and copy ownership are not exact",
    () =>
      Effect.gen(function* () {
        const german = yield* Effect.fromNullishOr(
          quranCatalog.find(
            ({ attribution }) => attribution.id === "quranenc-german"
          )
        );
        const [firstCopy, ...remainingCopy] = german.attribution.copy;
        const missingCopy = {
          ...german,
          attribution: { ...german.attribution, copy: [firstCopy] },
        } satisfies QuranCatalogEntry;
        const duplicateCopy = {
          ...german,
          attribution: {
            ...german.attribution,
            copy: [firstCopy, firstCopy, ...remainingCopy],
          },
        } satisfies QuranCatalogEntry;
        const failures = yield* Effect.all(
          [
            quranAttributionRowFor(
              ACTIVE_APP_LOCALES,
              quranCatalog.filter(
                ({ attribution }) => attribution.id !== "quranenc-german"
              )
            ).pipe(Effect.flip),
            quranAttributionRowFor(ACTIVE_APP_LOCALES, [
              ...quranCatalog,
              german,
            ]).pipe(Effect.flip),
            quranAttributionRowFor(
              ACTIVE_APP_LOCALES,
              replace("quranenc-german", missingCopy)
            ).pipe(Effect.flip),
            quranAttributionRowFor(
              ACTIVE_APP_LOCALES,
              replace("quranenc-german", duplicateCopy)
            ).pipe(Effect.flip),
          ],
          { concurrency: "unbounded" }
        );

        expect(failures.map(({ reason }) => reason)).toEqual([
          "missing-source",
          "duplicate-source",
          "missing-copy",
          "duplicate-copy",
        ]);
      })
  );

  it.effect("fails typed when Tafsir access or provenance is not exact", () =>
    Effect.gen(function* () {
      const tafsir = yield* Effect.fromNullishOr(
        quranCatalog.find(
          ({ attribution }) => attribution.id === "quranenc-tafsir"
        )
      );
      const tafsirAccess = yield* Effect.fromNullishOr(tafsir.tafsirAccess);
      const text = yield* Effect.fromNullishOr(
        quranCatalog.find(({ attribution }) => attribution.id === "tanzil-text")
      );
      const german = yield* Effect.fromNullishOr(
        quranCatalog.find(
          ({ attribution }) => attribution.id === "quranenc-german"
        )
      );
      const english = yield* Effect.fromNullishOr(
        quranCatalog.find(
          ({ attribution }) => attribution.id === "quranenc-english"
        )
      );
      const withoutAccess = {
        attribution: tafsir.attribution,
        provenance: tafsir.provenance,
      } satisfies QuranCatalogEntry;
      const withoutProvenance = quranCatalog.filter(
        ({ attribution }) => attribution.id !== "quranenc-tafsir"
      );
      const duplicateAccess = replace("tanzil-text", {
        ...text,
        tafsirAccess,
      });
      const duplicateProvenance = replace("quranenc-german", {
        ...german,
        provenance: [...german.provenance, ...tafsir.provenance],
      });
      const mismatchedProvenance = quranCatalog.map((entry) => {
        if (entry.attribution.id === "quranenc-english") {
          return { ...english, provenance: german.provenance };
        }
        if (entry.attribution.id === "quranenc-german") {
          return { ...german, provenance: english.provenance };
        }
        return entry;
      });
      const failures = yield* Effect.all(
        [
          quranAttributionRowFor(
            ACTIVE_APP_LOCALES,
            replace("quranenc-tafsir", withoutAccess)
          ).pipe(Effect.flip),
          quranAttributionRowFor(ACTIVE_APP_LOCALES, duplicateAccess).pipe(
            Effect.flip
          ),
          quranProvenanceRecordsFor(ACTIVE_APP_LOCALES, withoutProvenance).pipe(
            Effect.flip
          ),
          quranProvenanceRecordsFor(
            ACTIVE_APP_LOCALES,
            duplicateProvenance
          ).pipe(Effect.flip),
          quranProvenanceRecordsFor(
            ACTIVE_APP_LOCALES,
            mismatchedProvenance
          ).pipe(Effect.flip),
        ],
        { concurrency: "unbounded" }
      );

      expect(failures.map(({ reason }) => reason)).toEqual([
        "missing-access",
        "duplicate-access",
        "missing-provenance",
        "duplicate-provenance",
        "mismatched-provenance",
      ]);
    })
  );
});
