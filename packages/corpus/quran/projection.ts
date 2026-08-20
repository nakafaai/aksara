import {
  type LearningGraphIdentityError,
  makeLearningGraphIdentity,
} from "@nakafa/aksara-contracts/graph/identity";
import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  type AppLocale,
  AppLocaleSchema,
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
import { Effect, Stream } from "effect";
import {
  requireSourceLocale,
  type SourceLocaleUnavailableError,
} from "#corpus/locale/source";
import {
  type QuranAttributionLocaleError,
  quranSourceAttributionsFor,
} from "#corpus/quran/attribution";
import type {
  QuranCountError,
  QuranRevelationError,
  QuranSequenceError,
  QuranSourceError,
} from "#corpus/quran/registry";
import type { QuranSurah, QuranVerse } from "#corpus/quran/schema";

/** Validates one source verse against the selected runtime locale contract. */
const projectVerse = Effect.fn("AksaraCorpus.projectQuranVerse")(function* (
  verse: QuranVerse,
  activeAppLocales: ActiveAppLocaleList
) {
  const translations = yield* Effect.forEach(
    activeAppLocales,
    (appLocale) =>
      requireSourceLocale(
        verse.translation,
        appLocale,
        `Quran verse ${verse.number.inQuran}`
      ).pipe(Effect.map((value) => ({ appLocale, value }))),
    { concurrency: "unbounded" }
  );
  return QuranRuntimeVerseSchema.make({
    meta: verse.meta,
    number: verse.number,
    tafsir: activeAppLocales.includes(AppLocaleSchema.make("id"))
      ? [{ appLocale: "id", ...verse.tafsir.id }]
      : [],
    text: verse.text,
    translations,
  });
});

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
const projectChunks = Effect.fn("AksaraCorpus.projectQuranChunks")(function* (
  surah: QuranSurah,
  activeAppLocales: ActiveAppLocaleList
) {
  const projectedVerses = yield* Effect.forEach(
    surah.verses,
    (verse) => projectVerse(verse, activeAppLocales),
    { concurrency: "unbounded" }
  );
  const chunks: QuranRowPayload[] = [];
  for (const [index, firstVerse] of projectedVerses.entries()) {
    if (index % QURAN_CHUNK_SIZE !== 0) {
      continue;
    }
    const remaining = projectedVerses.slice(
      index + 1,
      index + QURAN_CHUNK_SIZE
    );
    const verses: [QuranRuntimeVerse, ...QuranRuntimeVerse[]] = [
      firstVerse,
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
});

/** Builds one search row only from exact source-owned text. */
const projectSearch = Effect.fn("AksaraCorpus.projectQuranSearch")(function* (
  surah: QuranSurah,
  appLocale: AppLocale
) {
  const title = `${surah.number}. ${surah.name.transliteration}`;
  const verseText = (yield* Effect.forEach(
    surah.verses,
    (verse) =>
      requireSourceLocale(
        verse.translation,
        appLocale,
        `Quran search verse ${verse.number.inQuran}`
      ).pipe(
        Effect.map((translation) => {
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
      ),
    { concurrency: "unbounded" }
  )).join(" ");
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
function streamSurahRuntime(
  surah: QuranSurah,
  activeAppLocales: ActiveAppLocaleList
) {
  return Stream.fromEffect(projectChunks(surah, activeAppLocales)).pipe(
    Stream.flatMap((chunks) =>
      Stream.fromIterable([projectSurah(surah), ...chunks])
    )
  );
}

/** Emits complete locale-specific search rows for one surah. */
function streamSurahSearch(
  surah: QuranSurah,
  activeAppLocales: ActiveAppLocaleList
) {
  return Stream.fromIterable(activeAppLocales).pipe(
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
  | QuranAttributionLocaleError
  | QuranRegistryError
  | SourceLocaleUnavailableError;

/** Replay factory for the complete strictly validated Quran registry. */
export type QuranRegistrySource = Stream.Stream<QuranSurah, QuranRegistryError>;

/** Emits all runtime rows first and all search rows second deterministically. */
export function streamQuranRows(
  source: QuranRegistrySource,
  activeAppLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  const attribution = Stream.fromEffect(
    quranSourceAttributionsFor(activeAppLocales).pipe(
      Effect.map((sources) =>
        QuranAttributionRowSchema.make({
          activeAppLocales,
          kind: "quran-attribution",
          sources,
        })
      )
    )
  );
  const runtime = attribution.pipe(
    Stream.concat(
      source.pipe(
        Stream.flatMap((surah) => streamSurahRuntime(surah, activeAppLocales))
      )
    )
  );
  const search = source.pipe(
    Stream.flatMap((surah) => streamSurahSearch(surah, activeAppLocales))
  );
  return runtime.pipe(Stream.concat(search));
}
