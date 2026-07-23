import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";

import {
  QuranCountError,
  QuranRevelationError,
  QuranSourceError,
  streamQuranRegistry,
} from "#corpus/quran/registry";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
  type QuranSurah,
} from "#corpus/quran/schema";

/** Collects one registry stream only at the Vitest runner boundary. */
function collect(source = streamQuranRegistry()) {
  return Effect.runPromise(Stream.runCollect(source));
}

/** Returns one typed registry failure at the Vitest runner boundary. */
function reject(source: ReturnType<typeof streamQuranRegistry>) {
  return Effect.runPromise(Stream.runCollect(source).pipe(Effect.flip));
}

/** Returns the first two real decoded surahs for isolated invariant failures. */
function firstTwoSurahs() {
  return collect(streamQuranRegistry().pipe(Stream.take(2))).then((chunk) =>
    Chunk.toReadonlyArray(chunk)
  );
}

/** Replaces one verse while retaining the exact real surah fields. */
function withVerse(surah: QuranSurah, verse: QuranSurah["verses"][number]) {
  return { ...surah, verses: [verse, ...surah.verses.slice(1)] };
}

describe("Quran registry", () => {
  it("emits every canonical surah, verse, and revelation sequence", async () => {
    const surahs = Chunk.toReadonlyArray(await collect());
    const verses = surahs.flatMap(({ verses: sourceVerses }) => sourceVerses);

    expect(surahs).toHaveLength(QURAN_SURAH_COUNT);
    expect(verses).toHaveLength(QURAN_VERSE_COUNT);
    expect(surahs.map(({ number }) => number)).toEqual(
      Array.from({ length: QURAN_SURAH_COUNT }, (_, index) => index + 1)
    );
    expect(
      surahs.map(({ sequence }) => sequence).sort((left, right) => left - right)
    ).toEqual(
      Array.from({ length: QURAN_SURAH_COUNT }, (_, index) => index + 1)
    );
    expect(verses.map(({ number }) => number.inQuran)).toEqual(
      Array.from({ length: QURAN_VERSE_COUNT }, (_, index) => index + 1)
    );
  });

  it("maps strict source and corpus count failures to typed errors", async () => {
    const [first] = await firstTwoSurahs();
    const surahs = Chunk.toReadonlyArray(await collect());
    const last = surahs.at(-1);
    if (first === undefined) {
      throw new Error("Expected the reviewed Quran source to contain a surah.");
    }
    if (last === undefined) {
      throw new Error(
        "Expected the reviewed Quran source to contain 114 surahs."
      );
    }
    const shortenedLast = {
      ...last,
      numberOfVerses: last.numberOfVerses - 1,
      verses: last.verses.slice(0, -1),
    };

    const [sourceError, surahCountError, verseCountError] = await Promise.all([
      reject(
        streamQuranRegistry(Stream.succeed({ ...first, unexpectedField: true }))
      ),
      reject(streamQuranRegistry(Stream.empty)),
      reject(
        streamQuranRegistry(
          Stream.fromIterable([...surahs.slice(0, -1), shortenedLast])
        )
      ),
    ]);

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
  });

  it("rejects declared, local, and global verse invariant drift", async () => {
    const [first] = await firstTwoSurahs();
    const firstVerse = first?.verses[0];
    if (!(first && firstVerse)) {
      throw new Error("Expected the first reviewed Quran verse.");
    }

    const errors = await Promise.all([
      reject(
        streamQuranRegistry(
          Stream.succeed({ ...first, numberOfVerses: first.verses.length - 1 })
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
    ]);

    expect(errors[0]).toMatchObject({
      _tag: "QuranCountError",
      scope: "surah-verses",
    });
    expect(errors.slice(1)).toMatchObject([
      { _tag: "QuranSequenceError", scope: "surah-verse" },
      { _tag: "QuranSequenceError", scope: "quran-verse" },
    ]);
    expect(errors[0]).toBeInstanceOf(QuranCountError);
  });

  it("rejects surah order and duplicate revelation sequences", async () => {
    const [first, second] = await firstTwoSurahs();
    if (!(first && second)) {
      throw new Error("Expected two reviewed Quran surahs.");
    }

    const [sequenceError, revelationError] = await Promise.all([
      reject(streamQuranRegistry(Stream.succeed({ ...first, number: 2 }))),
      reject(
        streamQuranRegistry(
          Stream.fromIterable([first, { ...second, sequence: first.sequence }])
        )
      ),
    ]);

    expect(sequenceError).toMatchObject({
      _tag: "QuranSequenceError",
      scope: "surah",
    });
    expect(revelationError).toBeInstanceOf(QuranRevelationError);
  });
});
