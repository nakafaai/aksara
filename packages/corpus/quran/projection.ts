import {
  type LearningGraphIdentityError,
  makeLearningGraphIdentity,
} from "@nakafa/aksara-contracts/graph/identity";
import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocale,
  activeAppLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import {
  QuranChunkRowSchema,
  type QuranRowPayload,
  type QuranRuntimeVerse,
  QuranRuntimeVerseSchema,
  QuranSearchRowSchema,
} from "@nakafa/aksara-contracts/quran/snapshot/row";
import { QuranAttributionRowSchema } from "@nakafa/aksara-contracts/quran/source";
import {
  QURAN_CHUNK_SIZE,
  QuranSurahRowSchema,
} from "@nakafa/aksara-contracts/quran/spec";
import { Effect, Schema, Stream } from "effect";
import { quranSourceAttributions } from "#corpus/quran/provenance";
import type {
  QuranCountError,
  QuranRevelationError,
  QuranSequenceError,
  QuranSourceError,
} from "#corpus/quran/registry";
import type { QuranSurah, QuranVerse } from "#corpus/quran/schema";

/** Validates one source verse against the exact runtime contract. */
function projectVerse(verse: QuranVerse) {
  return Schema.decodeUnknownSync(QuranRuntimeVerseSchema)({
    meta: verse.meta,
    number: verse.number,
    tafsir: [{ appLocale: "id", ...verse.tafsir.id }],
    text: verse.text,
    translations: ACTIVE_APP_LOCALES.map((appLocale) => ({
      appLocale,
      value: verse.translation[activeAppLocaleCode(appLocale)],
    })),
  });
}

/** Projects immutable metadata without embedding any verse bodies. */
function projectSurah(surah: QuranSurah) {
  return QuranSurahRowSchema.make({
    kind: "quran-surah",
    name: surah.name,
    number: surah.number,
    numberOfVerses: surah.numberOfVerses,
    revelation: surah.revelation,
  });
}

/** Builds deterministic contiguous chunks of at most six verses. */
function projectChunks(surah: QuranSurah) {
  const chunks: QuranRowPayload[] = [];
  for (const [index, firstSource] of surah.verses.entries()) {
    if (index % QURAN_CHUNK_SIZE !== 0) {
      continue;
    }
    const remaining = surah.verses
      .slice(index + 1, index + QURAN_CHUNK_SIZE)
      .map(projectVerse);
    const verses: [QuranRuntimeVerse, ...QuranRuntimeVerse[]] = [
      projectVerse(firstSource),
      ...remaining,
    ];
    const [first] = verses;
    const last = verses.reduce((_previous, verse) => verse);
    chunks.push(
      QuranChunkRowSchema.make({
        firstQuranNumber: first.number.inQuran,
        firstVerse: first.number.inSurah,
        kind: "quran-chunk",
        lastVerse: last.number.inSurah,
        surahNumber: surah.number,
        verses: [first, ...verses.slice(1)],
      })
    );
  }
  return chunks;
}

/** Builds one search row only from exact source-owned text. */
const projectSearch = Effect.fn("AksaraCorpus.projectQuranSearch")(function* (
  surah: QuranSurah,
  appLocale: ActiveAppLocale
) {
  const appLocaleCode = activeAppLocaleCode(appLocale);
  const title = `${surah.number}. ${surah.name.transliteration}`;
  const verseText = surah.verses
    .map((verse) => {
      const translation = verse.translation[appLocaleCode];
      const values = [
        verse.number.inSurah.toString(),
        verse.text.arabic,
        translation.text,
        translation.footnotes,
      ];
      if (appLocale === "id") {
        values.push(verse.tafsir.id.text);
        if (verse.tafsir.id.footnotes !== null) {
          values.push(verse.tafsir.id.footnotes);
        }
      }
      return values.join(" ");
    })
    .join(" ");
  const graph = yield* makeLearningGraphIdentity({
    appLocale,
    concept: ["quran", "surah", surah.number.toString()],
    learningObject: ["quran-surah", surah.number.toString()],
    lens: ["quran"],
  });
  return QuranSearchRowSchema.make({
    appLocale,
    graph,
    kind: "quran-search",
    route: PublicPathSchema.make(`quran/${surah.number}`),
    surahNumber: surah.number,
    text: [
      title,
      surah.name.arabic,
      surah.name.translation,
      surah.revelation.place,
      verseText,
    ].join(" "),
    title,
  });
});

/** Emits metadata followed by bounded chunks for one reviewed surah. */
function streamSurahRuntime(surah: QuranSurah) {
  return Stream.fromIterable([projectSurah(surah), ...projectChunks(surah)]);
}

/** Emits both complete locale-specific search rows for one surah. */
function streamSurahSearch(surah: QuranSurah) {
  return Stream.fromIterable(ACTIVE_APP_LOCALES).pipe(
    Stream.mapEffect((appLocale) => projectSearch(surah, appLocale))
  );
}

/** Expected failures emitted while validating the authored Quran registry. */
export type QuranRegistryError =
  | QuranCountError
  | QuranRevelationError
  | QuranSequenceError
  | QuranSourceError;

/** Expected graph derivation failure for one locale-specific Quran row. */
export type QuranProjectionError =
  | LearningGraphIdentityError
  | QuranRegistryError;

/** Replay factory for the complete strictly validated Quran registry. */
export type QuranRegistrySource = () => Stream.Stream<
  QuranSurah,
  QuranRegistryError
>;

/** Emits all runtime rows first and all search rows second deterministically. */
export function streamQuranRows(source: QuranRegistrySource) {
  const attribution = Stream.succeed(
    QuranAttributionRowSchema.make({
      activeAppLocales: ACTIVE_APP_LOCALES,
      kind: "quran-attribution",
      sources: quranSourceAttributions,
    })
  );
  const runtime = attribution.pipe(
    Stream.concat(source().pipe(Stream.flatMap(streamSurahRuntime)))
  );
  const search = source().pipe(Stream.flatMap(streamSurahSearch));
  return runtime.pipe(Stream.concat(search));
}
