import { Array as Arr } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ENGLISH_APP_LOCALE_CODE,
  GERMAN_APP_LOCALE_CODE,
  INDONESIAN_APP_LOCALE_CODE,
  MALAY_APP_LOCALE_CODE,
  makeAppLocale,
} from "#contracts/locale";
import type { quranSourceIds } from "#contracts/quran/source";
import {
  QuranEmbeddedSourceAttributionSchema,
  QuranExternalSourceAttributionSchema,
  QuranTafsirAccessSchema,
} from "#contracts/quran/source";
import { QURAN_SURAH_COUNT } from "#contracts/quran/spec";

const sourceHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const english = makeAppLocale(ENGLISH_APP_LOCALE_CODE);
const indonesian = makeAppLocale(INDONESIAN_APP_LOCALE_CODE);
const german = makeAppLocale(GERMAN_APP_LOCALE_CODE);
const malay = makeAppLocale(MALAY_APP_LOCALE_CODE);

/** Builds one honest technical source attribution for signed-row tests. */
export function quranSourceAttribution(
  id: ReturnType<typeof quranSourceIds>[number]
) {
  const common = {
    copy: [
      {
        appLocale: ACTIVE_APP_LOCALES[0],
        notice: `Technical ${ACTIVE_APP_LOCALES[0]} notice for ${id}.`,
        title: `Technical ${ACTIVE_APP_LOCALES[0]} source ${id}.`,
      },
      ...Arr.map(Arr.drop(ACTIVE_APP_LOCALES, 1), (appLocale) => ({
        appLocale,
        notice: `Technical ${appLocale} notice for ${id}.`,
        title: `Technical ${appLocale} source ${id}.`,
      })),
    ],
    publisher: `Technical publisher for ${id}.`,
    retrievedAt: "2026-07-24T17:57:50Z",
    sourceUrl: `https://example.test/source/${id}`,
    updateUrl: `https://example.test/update/${id}`,
    version: "test-source",
  } as const;
  if (
    id === "mokhtasar-english" ||
    id === "mokhtasar-german" ||
    id === "mokhtasar-indonesian"
  ) {
    return QuranExternalSourceAttributionSchema.make({
      ...common,
      id,
      kind: "external",
      terms: {
        access: "link-only",
        url: `https://example.test/terms/${id}`,
      },
    });
  }
  return QuranEmbeddedSourceAttributionSchema.make({
    ...common,
    artifact: {
      byteCount: 1,
      digest: sourceHash,
      fileCount:
        id === "quranenc-tafsir" || id === "quranenc-malay"
          ? QURAN_SURAH_COUNT
          : 1,
    },
    id,
    kind: "embedded",
    terms: {
      artifact: {
        byteCount: 1,
        digest: sourceHash,
        fileCount: 1,
      },
      url: `https://example.test/terms/${id}`,
    },
  });
}

/** Builds complete test-only Tafsir access in canonical locale order. */
export function quranTafsirAccess() {
  return [
    QuranTafsirAccessSchema.make({
      appLocale: english,
      kind: "external",
      notice: "Technical English external Tafsir notice.",
      sourceId: "mokhtasar-english",
    }),
    QuranTafsirAccessSchema.make({
      appLocale: indonesian,
      kind: "embedded",
      notice: "Catatan teknis tafsir Indonesia.",
      sourceId: "quranenc-tafsir",
    }),
    QuranTafsirAccessSchema.make({
      appLocale: german,
      kind: "external",
      notice: "Technischer deutscher externer Tafsirhinweis.",
      sourceId: "mokhtasar-german",
    }),
    QuranTafsirAccessSchema.make({
      appLocale: malay,
      kind: "external",
      notice: "Catatan teknikal tafsir luar bahasa Melayu.",
      sourceId: "mokhtasar-indonesian",
    }),
  ] as const;
}
