import type { QuranTranslation } from "@nakafa/aksara-contracts/quran/notes";
import { QuranTranslationSchema } from "@nakafa/aksara-contracts/quran/notes";
import {
  Array as Arr,
  Effect,
  HashMap,
  MutableList,
  Option,
  Schema,
} from "effect";
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
} from "#corpus/quran/source/model";
import {
  parseQuranEncResponses,
  parseResponseTranslation,
} from "#corpus/quran/source/quranenc";

const EXPECTED_VERSES = 6236;
const LINE_BREAK_PATTERN = /\r?\n/u;

/** Reads one exact CDATA or empty XML element without whitespace cleanup. */
function xmlText(source: string, tag: "footnotes" | "translation") {
  const cdata = source.match(
    new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`, "u")
  );
  if (cdata) {
    return cdata[1];
  }
  return source.includes(`<${tag}></${tag}>`) ? "" : undefined;
}

/** Parses one complete QuranEnc XML translation in canonical order. */
const parseTranslation = Effect.fn("AksaraCorpus.parseQuranTranslation")(
  function* (source: string, metadata: readonly SurahMetadata[]) {
    const translationRows = MutableList.make<QuranTranslation>();
    const suraRows = [
      ...source.matchAll(
        /<sura number="(?<number>\d+)">(?<body>[\s\S]*?)<\/sura>/gu
      ),
    ];
    yield* Effect.forEach(
      suraRows,
      (suraRow, surahIndex) =>
        Effect.gen(function* () {
          const [, surahNumberSource, body] = suraRow;
          const surahNumber = Number(surahNumberSource);
          const expected = metadata[surahIndex];
          if (!(body && expected) || surahNumber !== expected.number) {
            return yield* quranGenerationFailure(
              `Invalid QuranEnc surah ${surahIndex + 1}.`
            );
          }
          const ayaRows = [
            ...body.matchAll(
              /<aya number="(?<number>\d+)">(?<text>[\s\S]*?)<\/aya>/gu
            ),
          ];
          if (ayaRows.length !== expected.numberOfVerses) {
            return yield* quranGenerationFailure(
              `Incomplete QuranEnc surah ${surahNumber}.`
            );
          }
          yield* Effect.forEach(
            ayaRows,
            (ayaRow, verseIndex) =>
              Effect.gen(function* () {
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
                const translation = yield* Schema.decodeEffect(
                  QuranTranslationSchema
                )({ footnotes, text }, { onExcessProperty: "error" }).pipe(
                  Effect.mapError(() =>
                    quranGenerationFailure(
                      `Invalid QuranEnc translation notes ${surahNumber}:${verseIndex + 1}.`
                    )
                  )
                );
                MutableList.append(translationRows, translation);
              }),
            { discard: true }
          );
        }),
      { discard: true }
    );
    const translations = MutableList.toArray(translationRows);
    if (translations.length !== EXPECTED_VERSES) {
      return yield* quranGenerationFailure(
        "QuranEnc translation is incomplete."
      );
    }
    return translations;
  }
);

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
      Arr.some(arabic, (text) => text.length === 0)
    ) {
      return yield* quranGenerationFailure("Tanzil Arabic text is incomplete.");
    }
    const xmlTranslations = yield* traverseLocalizedSources(
      sources.translations,
      (source) => parseTranslation(source, metadata.surahs)
    );
    const responseTranslations = yield* traverseLocalizedSources(
      sources.responseTranslations,
      (responses) => parseResponseTranslation(responses, metadata.surahs)
    );
    const translations = { ...xmlTranslations, ...responseTranslations };
    const tafsir = yield* parseQuranEncResponses(
      sources.tafsir,
      metadata.surahs,
      "tafsir"
    );

    const surahRows = MutableList.make<Surah>();
    for (const surah of metadata.surahs) {
      const verseRows = MutableList.make<Surah["verses"][number]>();
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
        const verseTranslation = {
          ...translation,
          en: englishText,
          id: indonesianText,
        };
        MutableList.append(verseRows, {
          meta: {
            hizbQuarter,
            juz,
            manzil,
            page,
            ruku,
            sajda: Option.getOrNull(HashMap.get(metadata.sajdas, position)),
          },
          number: { inQuran: position, inSurah: index + 1 },
          tafsir: { id: tafsirText },
          text: { arabic: arabicText },
          translation: verseTranslation,
        });
      }
      const verses = MutableList.toArray(verseRows);
      MutableList.append(surahRows, {
        name: surah.name,
        number: surah.number,
        numberOfVerses: surah.numberOfVerses,
        revelation: surah.revelation,
        verses,
      });
    }
    return MutableList.toArray(surahRows);
  }
);
