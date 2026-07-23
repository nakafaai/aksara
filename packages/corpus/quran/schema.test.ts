import {
  QURAN_LOCALES,
  QURAN_SURAH_COUNT,
  QURAN_TAFSIR_LOCALES,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { Chunk, Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { QuranSurahSchema } from "#corpus/quran/schema";
import { quranSurahSourceStream } from "#corpus/quran/source";

const decodeSurah = Schema.decodeUnknown(QuranSurahSchema);

/** Decodes one strict Quran source only at the Vitest runner boundary. */
function decode(source: unknown) {
  return Effect.runPromise(decodeSurah(source, { onExcessProperty: "error" }));
}

/** Returns one strict Quran source failure at the Vitest runner boundary. */
function reject(source: unknown) {
  return Effect.runPromise(
    decodeSurah(source, { onExcessProperty: "error" }).pipe(Effect.flip)
  );
}

/** Returns the first real decoded surah for isolated schema failures. */
async function firstSurah() {
  const sources = await Effect.runPromise(
    quranSurahSourceStream.pipe(Stream.take(1), Stream.runCollect)
  );
  const [source] = Chunk.toReadonlyArray(sources);
  if (source === undefined) {
    throw new Error("Expected the reviewed Quran source to contain a surah.");
  }
  return decode(source);
}

describe("Quran schema", () => {
  it("strictly decodes all 114 surahs and 6,236 verses", async () => {
    const surahs = await Effect.runPromise(
      quranSurahSourceStream.pipe(
        Stream.mapEffect((source) =>
          decodeSurah(source, { onExcessProperty: "error" })
        ),
        Stream.runCollect
      )
    );
    const values = Chunk.toReadonlyArray(surahs);

    expect(values).toHaveLength(QURAN_SURAH_COUNT);
    expect(
      values.reduce((count, surah) => count + surah.verses.length, 0)
    ).toBe(QURAN_VERSE_COUNT);
    expect(QURAN_LOCALES).toEqual(["en", "id"]);
    expect(QURAN_TAFSIR_LOCALES).toEqual(["id"]);
    expect(values.every(({ tafsir }) => Object.keys(tafsir).length === 1)).toBe(
      true
    );
    expect(
      values.every(({ verses }) =>
        verses.every(({ tafsir }) => Object.keys(tafsir).length === 1)
      )
    ).toBe(true);
  });

  it("rejects empty text, unsafe audio, excess fields, and German data", async () => {
    const first = await firstSurah();
    const [firstVerse] = first.verses;
    if (firstVerse === undefined) {
      throw new Error("Expected the reviewed Quran source to contain a verse.");
    }

    const errors = await Promise.all([
      reject({ ...first, unexpectedField: true }),
      reject({ ...first, name: { ...first.name, long: "" } }),
      reject({
        ...first,
        verses: [
          {
            ...firstVerse,
            audio: { ...firstVerse.audio, primary: "http://invalid.test" },
          },
          ...first.verses.slice(1),
        ],
      }),
      reject({
        ...first,
        name: {
          ...first.name,
          translation: {
            ...first.name.translation,
            de: first.name.translation.en,
          },
        },
      }),
      reject({
        ...first,
        tafsir: { ...first.tafsir, de: first.tafsir.id },
      }),
      reject({
        ...first,
        verses: [
          {
            ...firstVerse,
            tafsir: {
              ...firstVerse.tafsir,
              de: firstVerse.tafsir.id,
            },
          },
          ...first.verses.slice(1),
        ],
      }),
    ]);
    const messages = errors.map(String);

    expect(messages[1]).toContain("Quran text cannot be empty.");
    expect(messages[2]).toContain(
      "Quran audio must use a non-empty HTTPS URL."
    );
    expect(
      messages.filter((message) => message.includes("is unexpected"))
    ).toHaveLength(4);
  });
});
