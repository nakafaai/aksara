import { Effect, Schema } from "effect";

import { PublicPathSchema, Sha256HashSchema } from "#contracts/ids";
import { AppLocaleSchema } from "#contracts/locale";
import { QuranSurahRowSchema } from "#contracts/quran/spec";
import {
  QuranChunkV3RowSchema,
  QuranSearchV3RowSchema,
  type QuranV3RowPayload,
  QuranV3RowPayloadSchema,
} from "#contracts/quran/v3";
import { bindQuranV3Row } from "#contracts/quran/v3-hash";
import {
  quranAttribution,
  quranTestPayloads,
  quranVerse,
} from "#contracts/test/quran";

const snapshotId = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

/** Converts one historical technical payload to explicit current locales. */
function toCurrentPayload(
  payload: ReturnType<typeof quranTestPayloads>[number]
): QuranV3RowPayload {
  if (payload.kind === "quran-chunk") {
    return Schema.decodeUnknownSync(QuranChunkV3RowSchema)({
      ...payload,
      verses: payload.verses.map((verse) => ({
        ...verse,
        tafsir: [{ appLocale: "id", ...verse.tafsir.id }],
        translations: [
          { appLocale: "en", value: verse.translation.en },
          { appLocale: "id", value: verse.translation.id },
        ],
      })),
    });
  }
  if (payload.kind === "quran-search") {
    const { locale, ...search } = payload;
    return Schema.decodeUnknownSync(QuranSearchV3RowSchema)({
      ...search,
      appLocale: AppLocaleSchema.make(locale),
    });
  }
  return Schema.decodeUnknownSync(QuranV3RowPayloadSchema)(payload);
}

/** Returns one small current payload for each Quran row kind. */
export function quranV3RepresentativePayloads() {
  const verses = [quranVerse(1, 1), quranVerse(2, 2)];
  const historical = [
    quranAttribution(),
    QuranSurahRowSchema.make({
      kind: "quran-surah",
      name: {
        arabic: "سورة 1",
        translation: "Test Surah 1",
        transliteration: "Test-Surah-1",
      },
      number: 1,
      numberOfVerses: 2,
      revelation: { order: 1, place: "Meccan" },
    }),
    Schema.decodeUnknownSync(QuranChunkV3RowSchema)({
      firstQuranNumber: 1,
      firstVerse: 1,
      kind: "quran-chunk",
      lastVerse: 2,
      surahNumber: 1,
      verses: verses.map((verse) => ({
        ...verse,
        tafsir: [{ appLocale: "id", ...verse.tafsir.id }],
        translations: [
          { appLocale: "en", value: verse.translation.en },
          { appLocale: "id", value: verse.translation.id },
        ],
      })),
    }),
    Schema.decodeUnknownSync(QuranSearchV3RowSchema)({
      appLocale: AppLocaleSchema.make("en"),
      graph: {
        alignmentId: "alignment:quran:quran-surah:1",
        assetId: "asset:en:quran:quran-surah:1",
        conceptId: "concept:quran:surah:1",
        learningObjectId: "lo:quran-surah:1",
        lensId: "lens:quran",
      },
      kind: "quran-search",
      route: PublicPathSchema.make("quran/1"),
      surahNumber: 1,
      text: "Test-only Quran search text",
      title: "Test-only Quran title",
    }),
  ];
  return historical.map((payload) =>
    Schema.decodeUnknownSync(QuranV3RowPayloadSchema)(payload)
  );
}

/** Converts the complete technical Quran projection to the current protocol. */
export function quranV3TestPayloads() {
  return quranTestPayloads().map(toCurrentPayload);
}

/** Binds the complete technical Quran projection to the current row protocol. */
export const makeQuranV3TestRecords = Effect.fn(
  "AksaraContracts.makeQuranV3TestRecords"
)(function* () {
  return yield* Effect.forEach(quranV3TestPayloads(), (payload) =>
    bindQuranV3Row(snapshotId, payload)
  );
});
