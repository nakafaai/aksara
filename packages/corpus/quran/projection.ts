import {
  type LearningGraphIdentityError,
  makeLearningGraphIdentity,
} from "@nakafa/aksara-contracts/graph/identity";
import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import {
  QURAN_LOCALES,
  QuranChunkRowSchema,
  type QuranLocaleSchema,
  type QuranRowPayload,
  type QuranRuntimeVerse,
  QuranRuntimeVerseSchema,
  QuranSearchRowSchema,
  QuranSurahRowSchema,
} from "@nakafa/aksara-contracts/quran/spec";
import { Effect, Stream } from "effect";

import {
  type QuranCountError,
  type QuranRevelationError,
  type QuranSequenceError,
  type QuranSourceError,
  streamQuranRegistry,
} from "#corpus/quran/registry";
import type { QuranSurah, QuranVerse } from "#corpus/quran/schema";

/** Projects one authored verse while excluding its long Tafsir source. */
function projectVerse(verse: QuranVerse) {
  return QuranRuntimeVerseSchema.make({
    audio: verse.audio,
    meta: verse.meta,
    number: verse.number,
    tafsir: { id: { short: verse.tafsir.id.short } },
    text: verse.text,
    translation: verse.translation,
  });
}

/** Projects immutable metadata without embedding any verse bodies. */
function projectSurah(surah: QuranSurah) {
  return QuranSurahRowSchema.make({
    kind: "quran-surah",
    name: surah.name,
    number: surah.number,
    numberOfVerses: surah.numberOfVerses,
    preBismillah: surah.preBismillah,
    revelation: surah.revelation,
    sequence: surah.sequence,
  });
}

/** Builds deterministic contiguous chunks of at most six verses. */
function projectChunks(surah: QuranSurah) {
  const chunks: QuranRowPayload[] = [];
  for (const [index, firstSource] of surah.verses.entries()) {
    if (index % 6 !== 0) {
      continue;
    }
    const remaining = surah.verses
      .slice(index + 1, index + 6)
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

/** Resolves the exact source-owned name used by current Quran routes. */
function localizedName(
  surah: QuranSurah,
  locale: typeof QuranLocaleSchema.Type
) {
  return surah.name.transliteration[locale];
}

/** Builds one search row with parity to Nakafa's current Quran projection. */
const projectSearch = Effect.fn("AksaraCorpus.projectQuranSearch")(function* (
  surah: QuranSurah,
  locale: typeof QuranLocaleSchema.Type
) {
  const title = `${surah.number}. ${localizedName(surah, locale)}`;
  const description = surah.name.translation[locale];
  const verseText = surah.verses
    .map((verse) =>
      [
        verse.number.inSurah.toString(),
        verse.text.arab,
        verse.text.transliteration.en,
        verse.translation[locale],
      ].join(" ")
    )
    .join(" ");
  const graph = yield* makeLearningGraphIdentity({
    concept: ["quran", "surah", surah.number.toString()],
    learningObject: ["quran-surah", surah.number.toString()],
    lens: ["quran"],
    locale,
  });
  return QuranSearchRowSchema.make({
    description,
    graph,
    kind: "quran-search",
    locale,
    route: PublicPathSchema.make(`quran/${surah.number}`),
    surahNumber: surah.number,
    text: [title, description, surah.revelation[locale], verseText].join(" "),
    title,
  });
});

/** Emits metadata followed by bounded chunks for one reviewed surah. */
function streamSurahRuntime(surah: QuranSurah) {
  return Stream.fromIterable([projectSurah(surah), ...projectChunks(surah)]);
}

/** Emits both complete locale-specific search rows for one surah. */
function streamSurahSearch(surah: QuranSurah) {
  return Stream.fromIterable(QURAN_LOCALES).pipe(
    Stream.mapEffect((locale) => projectSearch(surah, locale))
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
export function streamQuranRows(
  source: QuranRegistrySource = () => streamQuranRegistry()
) {
  const runtime = source().pipe(Stream.flatMap(streamSurahRuntime));
  const search = source().pipe(Stream.flatMap(streamSurahSearch));
  return runtime.pipe(Stream.concat(search));
}
