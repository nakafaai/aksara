import { Effect, Option, Schema, Stream } from "effect";

import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
  type QuranSurah,
  QuranSurahNumberSchema,
  QuranSurahSchema,
} from "#corpus/quran/schema";
import { quranSurahSourceStream } from "#corpus/quran/source";

interface QuranRegistryState {
  readonly nextSurah: number;
  readonly nextVerse: number;
  readonly revelationSequences: ReadonlySet<number>;
}

type QuranRegistryItem =
  | { readonly _tag: "Source"; readonly source: unknown }
  | { readonly _tag: "End" };

const INITIAL_STATE: QuranRegistryState = {
  nextSurah: 1,
  nextVerse: 1,
  revelationSequences: new Set(),
};

/** One authored surah failed the exact Quran source contract. */
export class QuranSourceError extends Schema.TaggedError<QuranSourceError>()(
  "QuranSourceError",
  {
    cause: Schema.Unknown,
    position: Schema.Int.pipe(Schema.positive()),
  }
) {}

/** Quran source cardinality differs from the complete reviewed corpus. */
export class QuranCountError extends Schema.TaggedError<QuranCountError>()(
  "QuranCountError",
  {
    actual: Schema.Int.pipe(Schema.nonNegative()),
    expected: Schema.Int.pipe(Schema.positive()),
    scope: Schema.Literal("surahs", "surah-verses", "verses"),
    surahNumber: Schema.NullOr(QuranSurahNumberSchema),
  }
) {}

/** Quran source order differs from canonical surah or verse numbering. */
export class QuranSequenceError extends Schema.TaggedError<QuranSequenceError>()(
  "QuranSequenceError",
  {
    actual: Schema.Int.pipe(Schema.positive()),
    expected: Schema.Int.pipe(Schema.positive()),
    scope: Schema.Literal("surah", "surah-verse", "quran-verse"),
    surahNumber: QuranSurahNumberSchema,
  }
) {}

/** Two surah sources claim the same chronological revelation sequence. */
export class QuranRevelationError extends Schema.TaggedError<QuranRevelationError>()(
  "QuranRevelationError",
  {
    sequence: QuranSurahNumberSchema,
    surahNumber: QuranSurahNumberSchema,
  }
) {}

/** Checks one decoded surah against its local and global corpus position. */
function validateSurah(state: QuranRegistryState, surah: QuranSurah) {
  if (surah.number !== state.nextSurah) {
    return Effect.fail(
      new QuranSequenceError({
        actual: surah.number,
        expected: state.nextSurah,
        scope: "surah",
        surahNumber: surah.number,
      })
    );
  }

  if (surah.verses.length !== surah.numberOfVerses) {
    return Effect.fail(
      new QuranCountError({
        actual: surah.verses.length,
        expected: surah.numberOfVerses,
        scope: "surah-verses",
        surahNumber: surah.number,
      })
    );
  }

  for (const [index, verse] of surah.verses.entries()) {
    const expectedSurahVerse = index + 1;
    if (verse.number.inSurah !== expectedSurahVerse) {
      return Effect.fail(
        new QuranSequenceError({
          actual: verse.number.inSurah,
          expected: expectedSurahVerse,
          scope: "surah-verse",
          surahNumber: surah.number,
        })
      );
    }

    const expectedQuranVerse = state.nextVerse + index;
    if (verse.number.inQuran !== expectedQuranVerse) {
      return Effect.fail(
        new QuranSequenceError({
          actual: verse.number.inQuran,
          expected: expectedQuranVerse,
          scope: "quran-verse",
          surahNumber: surah.number,
        })
      );
    }
  }

  if (state.revelationSequences.has(surah.sequence)) {
    return Effect.fail(
      new QuranRevelationError({
        sequence: surah.sequence,
        surahNumber: surah.number,
      })
    );
  }

  const revelationSequences = new Set(state.revelationSequences);
  revelationSequences.add(surah.sequence);
  return Effect.succeed([
    {
      nextSurah: state.nextSurah + 1,
      nextVerse: state.nextVerse + surah.numberOfVerses,
      revelationSequences,
    },
    Option.some(surah),
  ] as const);
}

/** Strictly decodes and validates one stream-owned Quran surah. */
const decodeSurah = Effect.fn("AksaraCorpus.decodeQuranSurah")(function* (
  state: QuranRegistryState,
  source: unknown
) {
  const surah = yield* Schema.decodeUnknown(QuranSurahSchema)(source, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      (cause) =>
        new QuranSourceError({
          cause,
          position: state.nextSurah,
        })
    )
  );
  return yield* validateSurah(state, surah);
});

/** Verifies final corpus counts after the last streamed surah. */
function validateEnd(state: QuranRegistryState) {
  const surahCount = state.nextSurah - 1;
  if (surahCount !== QURAN_SURAH_COUNT) {
    return Effect.fail(
      new QuranCountError({
        actual: surahCount,
        expected: QURAN_SURAH_COUNT,
        scope: "surahs",
        surahNumber: null,
      })
    );
  }

  const verseCount = state.nextVerse - 1;
  if (verseCount !== QURAN_VERSE_COUNT) {
    return Effect.fail(
      new QuranCountError({
        actual: verseCount,
        expected: QURAN_VERSE_COUNT,
        scope: "verses",
        surahNumber: null,
      })
    );
  }

  return Effect.succeed([state, Option.none<QuranSurah>()] as const);
}

/** Emits the complete strictly validated Quran corpus one surah at a time. */
export function streamQuranRegistry(
  source: Stream.Stream<unknown> = quranSurahSourceStream
) {
  const items = source.pipe(
    Stream.map(
      (value): QuranRegistryItem => ({ _tag: "Source", source: value })
    ),
    Stream.concat(Stream.succeed<QuranRegistryItem>({ _tag: "End" }))
  );

  return items.pipe(
    Stream.mapAccumEffect(INITIAL_STATE, (state, item) =>
      item._tag === "Source"
        ? decodeSurah(state, item.source)
        : validateEnd(state)
    ),
    Stream.filterMap((surah) => surah)
  );
}
