import {
  ENGLISH_APP_LOCALE_CODE,
  GERMAN_APP_LOCALE_CODE,
  INDONESIAN_APP_LOCALE_CODE,
  makeAppLocale,
} from "@nakafa/aksara-contracts/locale";
import { QURAN_SOURCE_IDS } from "@nakafa/aksara-contracts/quran/identity";
import { QuranProvenanceScopeSchema } from "@nakafa/aksara-contracts/quran/provenance";
import { QuranProvenanceStatusSchema } from "@nakafa/aksara-contracts/quran/snapshot/spec";
import {
  type QuranSourceAttribution,
  QuranSourceAttributionSchema,
  type QuranTafsirAccess,
  QuranTafsirAccessSchema,
} from "@nakafa/aksara-contracts/quran/source";
import { Schema } from "effect";
import {
  mokhtasarCatalog,
  mokhtasarEnglishAttribution,
  mokhtasarEnglishEdition,
  mokhtasarGermanAttribution,
  mokhtasarGermanEdition,
} from "#corpus/quran/catalog/mokhtasar";
import {
  quranencEnglishAttribution,
  quranencGermanAttribution,
  quranencIndonesianAttribution,
  quranencTafsirAttribution,
} from "#corpus/quran/catalog/quranenc";
import {
  tanzilMetadataAttribution,
  tanzilTextAttribution,
} from "#corpus/quran/catalog/tanzil";

export const QuranCatalogEntrySchema = Schema.Struct({
  attribution: QuranSourceAttributionSchema,
  provenance: Schema.Struct({
    evidence: Schema.Trimmed.check(Schema.isNonEmpty()),
    scope: QuranProvenanceScopeSchema,
    status: QuranProvenanceStatusSchema,
  }),
  tafsirAccess: Schema.optional(QuranTafsirAccessSchema),
});
export type QuranCatalogEntry = typeof QuranCatalogEntrySchema.Type;

/** Builds one validated catalog entry without duplicating its attribution. */
function catalogEntry(
  attribution: QuranSourceAttribution,
  provenance: QuranCatalogEntry["provenance"],
  tafsirAccess?: QuranTafsirAccess
) {
  return QuranCatalogEntrySchema.make({
    attribution,
    provenance,
    ...(tafsirAccess === undefined ? {} : { tafsirAccess }),
  });
}

export const quranCatalog = Schema.NonEmptyArray(QuranCatalogEntrySchema)
  .pipe(
    Schema.check(
      Schema.makeFilter(
        (entries) =>
          entries.length === QURAN_SOURCE_IDS.length &&
          entries.every(
            ({ attribution }, index) =>
              attribution.id === QURAN_SOURCE_IDS[index]
          ),
        { message: "Expected one canonical entry for every Quran source." }
      )
    )
  )
  .make([
    catalogEntry(tanzilTextAttribution, {
      evidence:
        "The pinned Uthmani v1.1 bytes are generated and published verbatim with the required Tanzil attribution, update link, license notice, and unchanged raw copyright block.",
      scope: "arabic-text",
      status: "approved",
    }),
    catalogEntry(tanzilMetadataAttribution, {
      evidence:
        "Surah identity, verse counts, revelation order and place, partitions, and sajda markers come only from the pinned official metadata v1.0 bytes declaring cc-by.",
      scope: "metadata",
      status: "approved",
    }),
    catalogEntry(quranencEnglishAttribution, {
      evidence:
        "The official exact XML transcript, publisher, v1.0.19-xml.1 identifier, republication terms, and update endpoint are pinned without modifying content.",
      scope: "en-translation",
      status: "approved",
    }),
    catalogEntry(quranencIndonesianAttribution, {
      evidence:
        "The official exact XML transcript, publisher, v1.0.1-xml.1 identifier, republication terms, and update endpoint are pinned without modifying content.",
      scope: "id-translation",
      status: "approved",
    }),
    catalogEntry(quranencGermanAttribution, {
      evidence:
        "The exact Bubenheim XML transcript, named translators, v1.1.4-xml.1 identifier, QuranEnc republication terms and update endpoint, and the official IslamHouse publication record are pinned. Content bytes remain unmodified.",
      scope: "de-translation",
      status: "approved",
    }),
    catalogEntry(
      quranencTafsirAttribution,
      {
        evidence:
          "All 114 official API responses are pinned as one domain-separated byte bundle; v1.0.0 publisher and republication terms are preserved without short or long reconstruction.",
        scope: "id-tafsir",
        status: "approved",
      },
      QuranTafsirAccessSchema.make({
        appLocale: makeAppLocale(INDONESIAN_APP_LOCALE_CODE),
        kind: "embedded",
        notice:
          "Nakafa menyediakan tafsir Al-Mukhtasar per ayat berbahasa Indonesia yang diterbitkan oleh Tafsir Center for Quranic Studies melalui QuranEnc. Nakafa tidak menggunakan terjemahan mesin.",
        sourceId: "quranenc-tafsir",
      })
    ),
    catalogEntry(
      mokhtasarEnglishAttribution,
      {
        evidence: `The official public book page identifies English book ${mokhtasarEnglishEdition.bookId} as complete catalog version ${mokhtasarEnglishEdition.version}. ${mokhtasarCatalog.terms.reason}`,
        scope: "en-tafsir-access",
        status: "approved",
      },
      QuranTafsirAccessSchema.make({
        appLocale: makeAppLocale(ENGLISH_APP_LOCALE_CODE),
        kind: "external",
        notice:
          "Read the official English Al-Mukhtasar edition on the publisher's website. Nakafa links to it and does not machine-translate or republish the Tafsir.",
        sourceId: "mokhtasar-english",
      })
    ),
    catalogEntry(
      mokhtasarGermanAttribution,
      {
        evidence: `The official public book page identifies German book ${mokhtasarGermanEdition.bookId} as complete catalog version ${mokhtasarGermanEdition.version}. ${mokhtasarCatalog.terms.reason}`,
        scope: "de-tafsir-access",
        status: "approved",
      },
      QuranTafsirAccessSchema.make({
        appLocale: makeAppLocale(GERMAN_APP_LOCALE_CODE),
        kind: "external",
        notice:
          "Lies die offizielle deutsche Al-Mukhtasar-Ausgabe auf der Website des Herausgebers. Nakafa verlinkt sie und übersetzt oder veröffentlicht den Tafsir nicht maschinell neu.",
        sourceId: "mokhtasar-german",
      })
    ),
  ]);
