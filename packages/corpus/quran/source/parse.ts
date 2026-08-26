import {
  type QuranTranslation,
  QuranTranslationSchema,
} from "@nakafa/aksara-contracts/quran/notes";
import { Effect, Schema } from "effect";
import {
  mapLocalizedSource,
  traverseLocalizedSources,
} from "#corpus/locale/source";
import { quranGenerationFailure } from "#corpus/quran/source/error";
import {
  parseQuranMetadata,
  quranMarkerAt,
} from "#corpus/quran/source/metadata";
import type {
  RawSources,
  Surah,
  SurahMetadata,
  Tafsir,
} from "#corpus/quran/source/model";

const EXPECTED_VERSES = 6236;
const LINE_BREAK_PATTERN = /\r?\n/u;

const TafsirRowSchema = Schema.Struct({
  arabic_text: Schema.String,
  aya: Schema.String,
  footnotes: Schema.NullOr(Schema.String),
  id: Schema.String,
  sura: Schema.String,
  translation: Schema.String,
});

const TafsirResponseSchema = Schema.Struct({
  result: Schema.Array(TafsirRowSchema),
});
const TafsirJsonSchema = Schema.fromJsonString(TafsirResponseSchema);

/** Reads one exact CDATA or empty XML element without whitespace cleanup. */
function xmlText(source: string, tag: "footnotes" | "translation") {
  const cdata = source.match(
    new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`)
  );
  if (cdata) {
    return cdata[1];
  }
  return source.includes(`<${tag}></${tag}>`) ? "" : undefined;
}

/** Parses one complete QuranEnc XML translation in canonical order. */
const parseTranslation = Effect.fn("AksaraCorpus.parseQuranTranslation")(
  function* (source: string, metadata: readonly SurahMetadata[]) {
    const translations: QuranTranslation[] = [];
    const suraRows = [
      ...source.matchAll(/<sura number="(\d+)">([\s\S]*?)<\/sura>/g),
    ];
    for (const [surahIndex, suraRow] of suraRows.entries()) {
      const [, surahNumberSource, body] = suraRow;
      const surahNumber = Number(surahNumberSource);
      const expected = metadata[surahIndex];
      if (!(body && expected) || surahNumber !== expected.number) {
        return yield* quranGenerationFailure(
          `Invalid QuranEnc surah ${surahIndex + 1}.`
        );
      }
      const ayaRows = [
        ...body.matchAll(/<aya number="(\d+)">([\s\S]*?)<\/aya>/g),
      ];
      if (ayaRows.length !== expected.numberOfVerses) {
        return yield* quranGenerationFailure(
          `Incomplete QuranEnc surah ${surahNumber}.`
        );
      }
      for (const [verseIndex, ayaRow] of ayaRows.entries()) {
        const [, verseNumberSource, aya] = ayaRow;
        const number = Number(verseNumberSource);
        const text = aya ? xmlText(aya, "translation") : undefined;
        const footnotes = aya ? xmlText(aya, "footnotes") : undefined;
        if (
          number !== verseIndex + 1 ||
          text === undefined ||
          text.length === 0 ||
          footnotes === undefined
        ) {
          return yield* quranGenerationFailure(
            `Invalid QuranEnc verse ${surahNumber}:${verseIndex + 1}.`
          );
        }
        const translation = yield* Schema.decodeEffect(QuranTranslationSchema)(
          { footnotes, text },
          { onExcessProperty: "error" }
        ).pipe(
          Effect.mapError(() =>
            quranGenerationFailure(
              `Invalid QuranEnc translation notes ${surahNumber}:${verseIndex + 1}.`
            )
          )
        );
        translations.push(translation);
      }
    }
    if (translations.length !== EXPECTED_VERSES) {
      return yield* quranGenerationFailure(
        "QuranEnc translation is incomplete."
      );
    }
    return translations;
  }
);

/** Parses exact QuranEnc Al-Mukhtasar API responses in canonical order. */
const parseTafsir = Effect.fn("AksaraCorpus.parseQuranTafsir")(function* (
  sources: readonly string[],
  metadata: readonly SurahMetadata[]
) {
  const tafsir: Tafsir[] = [];
  for (const [surahIndex, source] of sources.entries()) {
    const response = yield* Schema.decodeEffect(TafsirJsonSchema)(source, {
      onExcessProperty: "error",
    }).pipe(
      Effect.mapError(() =>
        quranGenerationFailure(
          `Invalid QuranEnc response for surah ${surahIndex + 1}.`
        )
      )
    );
    const expected = metadata[surahIndex];
    if (!expected || response.result.length !== expected.numberOfVerses) {
      return yield* quranGenerationFailure(
        `Incomplete QuranEnc tafsir surah ${surahIndex + 1}.`
      );
    }
    for (const [verseIndex, row] of response.result.entries()) {
      if (
        Number(row.sura) !== surahIndex + 1 ||
        Number(row.aya) !== verseIndex + 1 ||
        row.translation.length === 0
      ) {
        return yield* quranGenerationFailure(
          `Invalid QuranEnc tafsir verse ${surahIndex + 1}:${verseIndex + 1}.`
        );
      }
      tafsir.push({ footnotes: row.footnotes, text: row.translation });
    }
  }
  if (tafsir.length !== EXPECTED_VERSES) {
    return yield* quranGenerationFailure("QuranEnc tafsir is incomplete.");
  }
  return tafsir;
});

/** Decodes every pinned source into the exact generated surah model. */
export const parseQuranSources = Effect.fn("AksaraCorpus.parseQuranSources")(
  function* (sources: RawSources) {
    const metadata = yield* parseQuranMetadata(sources.metadata);
    const copyright = sources.arabic.indexOf(
      "\n\n\n# PLEASE DO NOT REMOVE OR CHANGE THIS COPYRIGHT BLOCK"
    );
    const arabic =
      copyright >= 0
        ? sources.arabic.slice(0, copyright).split(LINE_BREAK_PATTERN)
        : [];
    if (
      arabic.length !== EXPECTED_VERSES ||
      arabic.some((text) => text.length === 0)
    ) {
      return yield* quranGenerationFailure("Tanzil Arabic text is incomplete.");
    }
    const translations = yield* traverseLocalizedSources(
      sources.translations,
      (source) => parseTranslation(source, metadata.surahs)
    );
    const tafsir = yield* parseTafsir(sources.tafsir, metadata.surahs);

    const surahs: Surah[] = [];
    for (const surah of metadata.surahs) {
      const verses: Surah["verses"][number][] = [];
      for (let index = 0; index < surah.numberOfVerses; index += 1) {
        const position = surah.start + index + 1;
        const hizbQuarter = quranMarkerAt(metadata.hizbQuarters, position);
        const juz = quranMarkerAt(metadata.juzs, position);
        const manzil = quranMarkerAt(metadata.manzils, position);
        const page = quranMarkerAt(metadata.pages, position);
        const ruku = quranMarkerAt(metadata.rukus, position);
        const arabicText = arabic[position - 1];
        const translation = mapLocalizedSource(
          translations,
          (localized) => localized[position - 1]
        );
        const englishText = translation.en;
        const indonesianText = translation.id;
        const germanText = translation.de;
        const tafsirText = tafsir[position - 1];
        if (
          !(
            hizbQuarter &&
            juz &&
            manzil &&
            page &&
            ruku &&
            arabicText &&
            englishText &&
            indonesianText &&
            tafsirText
          )
        ) {
          return yield* quranGenerationFailure(
            `Incomplete merged Quran verse ${surah.number}:${index + 1}.`
          );
        }
        const verseTranslation =
          germanText === undefined
            ? { en: englishText, id: indonesianText }
            : { de: germanText, en: englishText, id: indonesianText };
        verses.push({
          meta: {
            hizbQuarter,
            juz,
            manzil,
            page,
            ruku,
            sajda: metadata.sajdas.get(position) ?? null,
          },
          number: { inQuran: position, inSurah: index + 1 },
          tafsir: { id: tafsirText },
          text: { arabic: arabicText },
          translation: verseTranslation,
        });
      }
      surahs.push({
        name: surah.name,
        number: surah.number,
        numberOfVerses: surah.numberOfVerses,
        revelation: surah.revelation,
        verses,
      });
    }
    return surahs;
  }
);
