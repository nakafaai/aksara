import {
  ENGLISH_APP_LOCALE_CODE,
  GERMAN_APP_LOCALE_CODE,
  INDONESIAN_APP_LOCALE_CODE,
  MALAY_APP_LOCALE_CODE,
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
import { Array as Arr, Schema } from "effect";
import {
  mokhtasarCatalog,
  mokhtasarEnglishAttribution,
  mokhtasarEnglishEdition,
  mokhtasarGermanAttribution,
  mokhtasarGermanEdition,
  mokhtasarIndonesianAttribution,
  mokhtasarIndonesianEdition,
} from "#corpus/quran/catalog/mokhtasar";
import {
  bubenheimNamesAttribution,
  kemenagNamesAttribution,
  nakafaMalayNamesAttribution,
} from "#corpus/quran/catalog/names";
import {
  quranencEnglishAttribution,
  quranencGermanAttribution,
  quranencIndonesianAttribution,
  quranencMalayAttribution,
  quranencTafsirAttribution,
} from "#corpus/quran/catalog/quranenc";
import {
  tanzilMetadataAttribution,
  tanzilTextAttribution,
} from "#corpus/quran/catalog/tanzil";

const QuranCatalogEntrySchema = Schema.Struct({
  attribution: QuranSourceAttributionSchema,
  provenance: Schema.NonEmptyArray(
    Schema.Struct({
      evidence: Schema.Trimmed.check(Schema.isNonEmpty()),
      scope: QuranProvenanceScopeSchema,
      status: QuranProvenanceStatusSchema,
    })
  ),
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
          Arr.every(
            entries,
            ({ attribution }, index) =>
              attribution.id === QURAN_SOURCE_IDS[index]
          ),
        { message: "Expected one canonical entry for every Quran source." }
      )
    )
  )
  .make([
    catalogEntry(tanzilTextAttribution, [
      {
        evidence:
          "The pinned Uthmani v1.1 bytes are generated and published verbatim with the required Tanzil attribution, update link, license notice, and unchanged raw copyright block.",
        scope: "arabic-text",
        status: "approved",
      },
    ]),
    catalogEntry(tanzilMetadataAttribution, [
      {
        evidence:
          "Surah identity, verse counts, revelation order and place, partitions, and sajda markers come only from the pinned official metadata v1.0 bytes declaring cc-by.",
        scope: "metadata",
        status: "approved",
      },
      {
        evidence:
          "Every English surah-name meaning is read directly from the pinned Tanzil metadata ename field.",
        scope: "en-surah-name",
        status: "approved",
      },
    ]),
    catalogEntry(kemenagNamesAttribution, [
      {
        evidence:
          "All 114 Indonesian surah-name meanings were transcribed from the pinned official LPMQ 2019 revision archive. Its publication record, public-use statement, published MD5, and exact SHA-256 are verified before generation.",
        scope: "id-surah-name",
        status: "approved",
      },
    ]),
    catalogEntry(bubenheimNamesAttribution, [
      {
        evidence:
          "All 114 German surah headings and stated source-footnote meanings were transcribed from the pinned official Bubenheim and Elyas PDF. The IslamHouse record, open-rights FAQ, publisher, translators, and exact PDF bytes are authenticated.",
        scope: "de-surah-name",
        status: "approved",
      },
    ]),
    catalogEntry(nakafaMalayNamesAttribution, [
      {
        evidence:
          "No official Malaysian edition lists all 114 surah-name meanings, so Nakafa wrote them from the Arabic names and reviewed each against the pinned Tanzil English and LPMQ Indonesian meanings. The pinned review record lists every value beside both references.",
        scope: "ms-surah-name",
        status: "approved",
      },
    ]),
    catalogEntry(quranencEnglishAttribution, [
      {
        evidence:
          "The official exact XML transcript, publisher, v1.0.19-xml.1 identifier, republication terms, and update endpoint are pinned without modifying content.",
        scope: "en-translation",
        status: "approved",
      },
    ]),
    catalogEntry(quranencIndonesianAttribution, [
      {
        evidence:
          "The official exact XML transcript, publisher, v1.0.1-xml.1 identifier, republication terms, and update endpoint are pinned without modifying content.",
        scope: "id-translation",
        status: "approved",
      },
    ]),
    catalogEntry(quranencGermanAttribution, [
      {
        evidence:
          "The exact Bubenheim XML transcript, named translators, v1.1.4-xml.1 identifier, QuranEnc republication terms and update endpoint, and the official IslamHouse publication record are pinned. Content bytes remain unmodified.",
        scope: "de-translation",
        status: "approved",
      },
    ]),
    catalogEntry(quranencMalayAttribution, [
      {
        evidence:
          "The 114 official QuranEnc API responses for malay_basumayyah v1.0.0, the translator, and the republication terms are pinned without modifying content. QuranEnc publishes no XML transcript for this translation.",
        scope: "ms-translation",
        status: "approved",
      },
    ]),
    catalogEntry(
      quranencTafsirAttribution,
      [
        {
          evidence:
            "All 114 official API responses are pinned as one domain-separated byte bundle; v1.0.0 publisher and republication terms are preserved without short or long reconstruction.",
          scope: "id-tafsir",
          status: "approved",
        },
      ],
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
      [
        {
          evidence: `The official public book page identifies English book ${mokhtasarEnglishEdition.bookId} as complete catalog version ${mokhtasarEnglishEdition.version}. ${mokhtasarCatalog.terms.reason}`,
          scope: "en-tafsir-access",
          status: "approved",
        },
      ],
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
      [
        {
          evidence: `The official public book page identifies German book ${mokhtasarGermanEdition.bookId} as complete catalog version ${mokhtasarGermanEdition.version}. ${mokhtasarCatalog.terms.reason}`,
          scope: "de-tafsir-access",
          status: "approved",
        },
      ],
      QuranTafsirAccessSchema.make({
        appLocale: makeAppLocale(GERMAN_APP_LOCALE_CODE),
        kind: "external",
        notice:
          "Lies die offizielle deutsche Al-Mukhtasar-Ausgabe auf der Website des Herausgebers. Nakafa verlinkt sie und übersetzt oder veröffentlicht den Tafsir nicht maschinell neu.",
        sourceId: "mokhtasar-german",
      })
    ),
    catalogEntry(
      mokhtasarIndonesianAttribution,
      [
        {
          evidence: `The official public book page identifies Indonesian book ${mokhtasarIndonesianEdition.bookId} as complete catalog version ${mokhtasarIndonesianEdition.version}, and the publisher lists no Malay edition among its Al-Mukhtasar translations. ${mokhtasarCatalog.terms.reason}`,
          scope: "ms-tafsir-access",
          status: "approved",
        },
      ],
      QuranTafsirAccessSchema.make({
        appLocale: makeAppLocale(MALAY_APP_LOCALE_CODE),
        kind: "external",
        notice:
          "Baca edisi rasmi Al-Mukhtasar dalam bahasa Indonesia di laman web penerbit. Tiada edisi bahasa Melayu lagi. Nakafa memautkannya dan tidak menterjemah atau menerbitkan semula tafsir itu secara mesin.",
        sourceId: "mokhtasar-indonesian",
      })
    ),
  ]);
