import { ACTIVE_APP_LOCALE_CODES } from "@nakafa/aksara-contracts/locale";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { Chunk, Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { QuranSurahSchema } from "#corpus/quran/schema";
import { testQuranSources } from "#corpus/test/quran";

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
function firstSurah() {
  const [source] = testQuranSources;
  if (source === undefined) {
    throw new Error("Expected the reviewed Quran source to contain a surah.");
  }
  return decode(source);
}

describe("Quran schema", () => {
  it("strictly decodes all 114 surahs and 6,236 verses", async () => {
    const surahs = await Effect.runPromise(
      Stream.fromIterable(testQuranSources).pipe(
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
    expect(ACTIVE_APP_LOCALE_CODES).toEqual(["en", "id"]);
    expect(
      values.every(({ verses }) =>
        verses.every(
          ({ tafsir, translation }) =>
            Object.keys(tafsir).length === 1 && translation.de !== undefined
        )
      )
    ).toBe(true);
  });

  it("rejects empty text, removed fields, excess fields, and German Tafsir", async () => {
    const first = await firstSurah();
    const [firstVerse] = first.verses;
    if (firstVerse === undefined) {
      throw new Error("Expected the reviewed Quran source to contain a verse.");
    }

    const errors = await Promise.all([
      reject({ ...first, unexpectedField: true }),
      reject({ ...first, name: { ...first.name, arabic: "" } }),
      reject({
        ...first,
        verses: [
          {
            ...firstVerse,
            audio: { primary: "https://invalid.test/audio.mp3" },
          },
          ...first.verses.slice(1),
        ],
      }),
      reject({
        ...first,
        tafsir: { id: "Removed surah description." },
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
    expect(
      messages.filter((message) => message.includes("is unexpected"))
    ).toHaveLength(4);
  });
});
