import { it } from "@effect/vitest";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { Effect, Stream } from "effect";
import { describe, expect } from "vitest";
import {
  QuranCountError,
  QuranRevelationError,
  QuranSourceError,
  streamQuranRegistry,
} from "#corpus/quran/registry";
import type { QuranSurah } from "#corpus/quran/schema";
import { testQuranRegistry } from "#corpus/test/quran";

/** Collects one registry stream inside the Effect test runtime. */
function collect(source = testQuranRegistry) {
  return Stream.runCollect(source);
}

/** Returns one typed registry failure inside the Effect test runtime. */
function reject(source: ReturnType<typeof streamQuranRegistry>) {
  return Stream.runCollect(source).pipe(Effect.flip);
}

/** Returns the first two real decoded surahs for isolated invariant failures. */
function firstTwoSurahs() {
  return collect(testQuranRegistry.pipe(Stream.take(2)));
}

/** Replaces one verse while retaining the exact real surah fields. */
function withVerse(surah: QuranSurah, verse: QuranSurah["verses"][number]) {
  return { ...surah, verses: [verse, ...surah.verses.slice(1)] };
}

describe("Quran registry", () => {
  it.effect("emits every canonical surah, verse, and revelation order", () =>
    Effect.gen(function* () {
      const surahs = yield* collect();
      const verses = surahs.flatMap(({ verses: sourceVerses }) => sourceVerses);

      expect(surahs).toHaveLength(QURAN_SURAH_COUNT);
      expect(verses).toHaveLength(QURAN_VERSE_COUNT);
      expect(surahs.map(({ number }) => number)).toEqual(
        Array.from({ length: QURAN_SURAH_COUNT }, (_, index) => index + 1)
      );
      expect(
        surahs
          .map(({ revelation }) => revelation.order)
          .sort((left, right) => left - right)
      ).toEqual(
        Array.from({ length: QURAN_SURAH_COUNT }, (_, index) => index + 1)
      );
      expect(verses.map(({ number }) => number.inQuran)).toEqual(
        Array.from({ length: QURAN_VERSE_COUNT }, (_, index) => index + 1)
      );
    })
  );

  it.effect(
    "maps strict source and corpus count failures to typed errors",
    () =>
      Effect.gen(function* () {
        const [first] = yield* firstTwoSurahs();
        const surahs = yield* collect();
        const last = surahs.at(-1);
        if (first === undefined) {
          return yield* Effect.die(
            "Expected the reviewed Quran source to contain a surah."
          );
        }
        if (last === undefined) {
          return yield* Effect.die(
            "Expected the reviewed Quran source to contain 114 surahs."
          );
        }
        const shortenedLast = {
          ...last,
          numberOfVerses: last.numberOfVerses - 1,
          verses: last.verses.slice(0, -1),
        };

        const [sourceError, surahCountError, verseCountError] =
          yield* Effect.all(
            [
              reject(
                streamQuranRegistry(
                  Stream.succeed({ ...first, unexpectedField: true })
                )
              ),
              reject(streamQuranRegistry(Stream.empty)),
              reject(
                streamQuranRegistry(
                  Stream.fromIterable([...surahs.slice(0, -1), shortenedLast])
                )
              ),
            ],
            { concurrency: "unbounded" }
          );

        expect(sourceError).toBeInstanceOf(QuranSourceError);
        expect(surahCountError).toMatchObject({
          _tag: "QuranCountError",
          actual: 0,
          expected: QURAN_SURAH_COUNT,
          scope: "surahs",
        });
        expect(verseCountError).toMatchObject({
          _tag: "QuranCountError",
          actual: QURAN_VERSE_COUNT - 1,
          expected: QURAN_VERSE_COUNT,
          scope: "verses",
        });
      })
  );

  it.effect("rejects declared, local, and global verse invariant drift", () =>
    Effect.gen(function* () {
      const [first] = yield* firstTwoSurahs();
      const firstVerse = first?.verses[0];
      if (!(first && firstVerse)) {
        return yield* Effect.die("Expected the first reviewed Quran verse.");
      }

      const errors = yield* Effect.all(
        [
          reject(
            streamQuranRegistry(
              Stream.succeed({
                ...first,
                numberOfVerses: first.verses.length - 1,
              })
            )
          ),
          reject(
            streamQuranRegistry(
              Stream.succeed(
                withVerse(first, {
                  ...firstVerse,
                  number: { ...firstVerse.number, inSurah: 2 },
                })
              )
            )
          ),
          reject(
            streamQuranRegistry(
              Stream.succeed(
                withVerse(first, {
                  ...firstVerse,
                  number: { ...firstVerse.number, inQuran: 2 },
                })
              )
            )
          ),
        ],
        { concurrency: "unbounded" }
      );

      expect(errors[0]).toMatchObject({
        _tag: "QuranCountError",
        scope: "surah-verses",
      });
      expect(errors.slice(1)).toMatchObject([
        { _tag: "QuranSequenceError", scope: "surah-verse" },
        { _tag: "QuranSequenceError", scope: "quran-verse" },
      ]);
      expect(errors[0]).toBeInstanceOf(QuranCountError);
    })
  );

  it.effect("rejects surah order and duplicate revelation orders", () =>
    Effect.gen(function* () {
      const [first, second] = yield* firstTwoSurahs();
      if (!(first && second)) {
        return yield* Effect.die("Expected two reviewed Quran surahs.");
      }

      const [sequenceError, revelationError] = yield* Effect.all(
        [
          reject(streamQuranRegistry(Stream.succeed({ ...first, number: 2 }))),
          reject(
            streamQuranRegistry(
              Stream.fromIterable([
                first,
                {
                  ...second,
                  revelation: {
                    ...second.revelation,
                    order: first.revelation.order,
                  },
                },
              ])
            )
          ),
        ],
        { concurrency: "unbounded" }
      );

      expect(sequenceError).toMatchObject({
        _tag: "QuranSequenceError",
        scope: "surah",
      });
      expect(revelationError).toBeInstanceOf(QuranRevelationError);
    })
  );
});
