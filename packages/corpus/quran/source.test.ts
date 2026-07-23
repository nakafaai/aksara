import { createHash } from "node:crypto";
import { isRecord } from "effect/Predicate";
import { describe, expect, it } from "vitest";

import { quran } from "#corpus/quran/source";

const EXPECTED_QURAN_DIGEST =
  "9aa95cde6f38685d313bf1e4ceb0e8b9db1fe021205202e9ee9a49e2de24fce6";
const EXPECTED_SURAH_COUNT = 114;
const EXPECTED_VERSE_COUNT = 6236;
const LOCALE_KEYS = ["en", "id"];
const SURAH_KEYS = [
  "name",
  "number",
  "numberOfVerses",
  "preBismillah",
  "revelation",
  "sequence",
  "tafsir",
  "verses",
];
const VERSE_KEYS = ["audio", "meta", "number", "tafsir", "text", "translation"];

/** Orders object fields recursively while preserving authored array order. */
function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }
  if (!isRecord(value)) {
    return value;
  }
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => [key, canonicalize(item)])
  );
}

/** Asserts one source object owns exactly the expected field names. */
function expectExactKeys(value: object, expected: readonly string[]) {
  expect(Object.keys(value).sort()).toEqual([...expected].sort());
}

describe("Quran source", () => {
  it("preserves every source field across the surah-owned split", () => {
    const canonical = JSON.stringify(canonicalize(quran));
    const digest = createHash("sha256").update(canonical).digest("hex");

    expect(Buffer.byteLength(canonical)).toBe(19_376_634);
    expect(digest).toBe(EXPECTED_QURAN_DIGEST);
  });

  it("contains every ordered surah and declared verse", () => {
    const surahNumbers = quran.map((surah) => surah.number);
    const actualVerses = quran.reduce(
      (total, surah) => total + surah.verses.length,
      0
    );
    const declaredVerses = quran.reduce(
      (total, surah) => total + surah.numberOfVerses,
      0
    );

    expect(quran).toHaveLength(EXPECTED_SURAH_COUNT);
    expect(new Set(surahNumbers).size).toBe(EXPECTED_SURAH_COUNT);
    expect(surahNumbers).toEqual(
      Array.from({ length: EXPECTED_SURAH_COUNT }, (_, index) => index + 1)
    );
    expect(actualVerses).toBe(EXPECTED_VERSE_COUNT);
    expect(declaredVerses).toBe(EXPECTED_VERSE_COUNT);
  });

  it("preserves the exact source shape and verse numbering", () => {
    const globalVerseNumbers: number[] = [];
    const revelationSequences: number[] = [];

    for (const surah of quran) {
      expectExactKeys(surah, SURAH_KEYS);
      expectExactKeys(surah.name, [
        "long",
        "short",
        "translation",
        "transliteration",
      ]);
      expectExactKeys(surah.name.translation, LOCALE_KEYS);
      expectExactKeys(surah.name.transliteration, LOCALE_KEYS);
      expectExactKeys(surah.revelation, ["arab", ...LOCALE_KEYS]);
      expectExactKeys(surah.tafsir, ["id"]);
      expect(surah.tafsir.id.trim()).not.toBe("");
      expect(surah.numberOfVerses).toBe(surah.verses.length);
      revelationSequences.push(surah.sequence);

      if (surah.preBismillah) {
        expectExactKeys(surah.preBismillah, ["audio", "text", "translation"]);
        expectExactKeys(surah.preBismillah.audio, ["primary", "secondary"]);
        expectExactKeys(surah.preBismillah.text, ["arab", "transliteration"]);
        expectExactKeys(surah.preBismillah.text.transliteration, ["en"]);
        expectExactKeys(surah.preBismillah.translation, LOCALE_KEYS);
      }

      for (const [verseIndex, verse] of surah.verses.entries()) {
        expectExactKeys(verse, VERSE_KEYS);
        expectExactKeys(verse.audio, ["primary", "secondary"]);
        expect(verse.audio.secondary).toHaveLength(2);
        expectExactKeys(verse.meta, [
          "hizbQuarter",
          "juz",
          "manzil",
          "page",
          "ruku",
          "sajda",
        ]);
        expectExactKeys(verse.meta.sajda, ["obligatory", "recommended"]);
        expectExactKeys(verse.number, ["inQuran", "inSurah"]);
        expectExactKeys(verse.tafsir, ["id"]);
        expectExactKeys(verse.tafsir.id, ["long", "short"]);
        expect(verse.tafsir.id.long.trim()).not.toBe("");
        expect(verse.tafsir.id.short.trim()).not.toBe("");
        expectExactKeys(verse.text, ["arab", "transliteration"]);
        expectExactKeys(verse.text.transliteration, ["en"]);
        expectExactKeys(verse.translation, LOCALE_KEYS);
        expect(verse.number.inSurah).toBe(verseIndex + 1);
        globalVerseNumbers.push(verse.number.inQuran);
      }
    }

    expect(revelationSequences.sort((left, right) => left - right)).toEqual(
      Array.from({ length: EXPECTED_SURAH_COUNT }, (_, index) => index + 1)
    );
    expect(globalVerseNumbers).toEqual(
      Array.from({ length: EXPECTED_VERSE_COUNT }, (_, index) => index + 1)
    );
  });
});
