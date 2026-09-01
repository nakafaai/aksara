import { describe, expect, it } from "@effect/vitest";
import { ACTIVE_APP_LOCALE_CODES } from "@nakafa/aksara-contracts/locale";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { Effect, Schema, Stream } from "effect";
import { QuranSurahSchema } from "#corpus/quran/schema";
import { testQuranSources } from "#corpus/test/quran";

const decodeSurah = Schema.decodeUnknownEffect(QuranSurahSchema);

/** Decodes one strict Quran source inside the Effect test runtime. */
function decode(source: unknown) {
  return decodeSurah(source, { onExcessProperty: "error" });
}

/** Returns one strict Quran source failure inside the Effect test runtime. */
function reject(source: unknown) {
  return decode(source).pipe(Effect.flip);
}

/** Returns the first real decoded surah for isolated schema failures. */
function firstSurah() {
  return Effect.fromNullishOr(testQuranSources[0]).pipe(Effect.flatMap(decode));
}

describe("Quran schema", () => {
  it.effect("strictly decodes all 114 surahs and 6,236 verses", () =>
    Effect.gen(function* () {
      const values = yield* Stream.fromIterable(testQuranSources).pipe(
        Stream.mapEffect((source) =>
          decodeSurah(source, { onExcessProperty: "error" })
        ),
        Stream.runCollect
      );

      expect(values).toHaveLength(QURAN_SURAH_COUNT);
      expect(
        values.reduce((count, surah) => count + surah.verses.length, 0)
      ).toBe(QURAN_VERSE_COUNT);
      expect(ACTIVE_APP_LOCALE_CODES).toEqual(["en", "id", "de"]);
      expect(
        values.every(({ verses }) =>
          verses.every(
            ({ tafsir, translation }) =>
              Object.keys(tafsir).length === 1 && translation.de !== undefined
          )
        )
      ).toBe(true);
    })
  );

  it.effect(
    "rejects empty text, removed fields, excess fields, and German Tafsir",
    () =>
      Effect.gen(function* () {
        const first = yield* firstSurah();
        const firstVerse = yield* Effect.fromNullishOr(first.verses[0]);

        const errors = yield* Effect.all(
          [
            reject({ ...first, unexpectedField: true }),
            reject({ ...first, name: { ...first.name, arabic: "" } }),
            reject({
              ...first,
              name: {
                ...first.name,
                meaning: {
                  de: first.name.meaning.de,
                  en: first.name.meaning.en,
                },
              },
            }),
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
          ],
          { concurrency: "unbounded" }
        );
        const messages = errors.map(String);

        expect(messages[1]).toContain("Quran text cannot be empty.");
        expect(messages[2]).toContain('at ["name"]["meaning"]["id"]');
        expect(
          messages.filter((message) =>
            message.includes("Expected no excess property")
          )
        ).toHaveLength(4);
      })
  );
});
