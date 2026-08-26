import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import type { RawSources } from "#corpus/quran/source/model";
import { parseQuranSources } from "#corpus/quran/source/parse";

const sourceRoot = resolve(import.meta.dirname, "../sources");
const FIRST_ARABIC_LINE_PATTERN = /^.*$/mu;
const FIRST_SURAH_PATTERN = /<sura number="1">[\s\S]*?<\/sura>/u;
const FIRST_VERSE_PATTERN = /<aya number="1">[\s\S]*?<\/aya>/u;
const LAST_SURAH_PATTERN = /\s*<sura number="114">[\s\S]*?<\/sura>/u;
const TAFSIR_TRANSLATION_PATTERN = /"translation":"(?:\\.|[^"])*"/u;
const TRANSLATION_PATTERN =
  /<translation><!\[CDATA\[[\s\S]*?\]\]><\/translation>/u;
const englishSource = readFileSync(
  resolve(sourceRoot, "quranenc/en.xml"),
  "utf8"
);
const rawSources: RawSources = {
  arabic: readFileSync(resolve(sourceRoot, "tanzil/text.txt"), "utf8"),
  metadata: readFileSync(resolve(sourceRoot, "tanzil/data.xml"), "utf8"),
  tafsir: Array.from({ length: 114 }, (_, index) =>
    readFileSync(
      resolve(sourceRoot, `quranenc/tafsir/${index + 1}.json`),
      "utf8"
    )
  ),
  translations: {
    en: englishSource,
    id: readFileSync(resolve(sourceRoot, "quranenc/id.xml"), "utf8"),
  },
};

/** Parses one complete source set only at the test runner boundary. */
function parse(sources: RawSources) {
  return Effect.runPromise(parseQuranSources(sources));
}

/** Returns one typed parser rejection at the test runner boundary. */
function reject(sources: RawSources) {
  return Effect.runPromise(parseQuranSources(sources).pipe(Effect.flip));
}

/** Replaces one Tafsir response without mutating the canonical fixture. */
function withTafsir(index: number, source: string): RawSources {
  return {
    ...rawSources,
    tafsir: rawSources.tafsir.map((current, currentIndex) =>
      currentIndex === index ? source : current
    ),
  };
}

/** Replaces the English source without mutating other official bytes. */
function withEnglish(english: string): RawSources {
  return {
    ...rawSources,
    translations: { ...rawSources.translations, en: english },
  };
}

describe("Quran source parsing", () => {
  it("derives all 114 surahs and 6,236 verses from official bytes", async () => {
    const surahs = await parse(rawSources);

    expect(surahs).toHaveLength(114);
    expect(
      surahs.reduce((count, surah) => count + surah.verses.length, 0)
    ).toBe(6236);
  });

  it("preserves the complete German translation exactly", async () => {
    const german = readFileSync(
      resolve(sourceRoot, "german/translation.xml"),
      "utf8"
    );
    const surahs = await parse({
      ...rawSources,
      translations: { ...rawSources.translations, de: german },
    });

    expect(surahs[0]?.verses[0]?.translation.de).toEqual({
      footnotes: "",
      text: "Im Namen Allahs, des Allerbarmers, des Barmherzigen.",
    });
  });

  it("rejects missing and empty Arabic verses", async () => {
    const copyright =
      "\n\n\n# PLEASE DO NOT REMOVE OR CHANGE THIS COPYRIGHT BLOCK";
    const errors = await Promise.all([
      reject({
        ...rawSources,
        arabic: rawSources.arabic.replace(copyright, ""),
      }),
      reject({
        ...rawSources,
        arabic: rawSources.arabic.replace(FIRST_ARABIC_LINE_PATTERN, ""),
      }),
    ]);

    expect(errors.map(({ detail }) => detail)).toEqual([
      "Tanzil Arabic text is incomplete.",
      "Tanzil Arabic text is incomplete.",
    ]);
  });

  it("rejects empty, misnumbered, and unexpected translation surahs", async () => {
    const empty = englishSource.replace(
      FIRST_SURAH_PATTERN,
      '<sura number="1"></sura>'
    );
    const misnumbered = englishSource.replace(
      '<sura number="1">',
      '<sura number="2">'
    );
    const unexpected = englishSource.replace(
      "</sura_list>",
      '<sura number="115">unexpected</sura></sura_list>'
    );
    const errors = await Promise.all([
      reject(withEnglish(empty)),
      reject(withEnglish(misnumbered)),
      reject(withEnglish(unexpected)),
    ]);

    expect(
      errors.every(({ detail }) => detail.startsWith("Invalid QuranEnc surah"))
    ).toBe(true);
  });

  it("rejects a translation surah with a missing verse", async () => {
    const incomplete = englishSource.replace(FIRST_VERSE_PATTERN, "");
    const error = await reject(withEnglish(incomplete));

    expect(error.detail).toBe("Incomplete QuranEnc surah 1.");
  });

  it("rejects every invalid translation verse field", async () => {
    const emptyBody = englishSource.replace(
      FIRST_VERSE_PATTERN,
      '<aya number="1"></aya>'
    );
    const wrongNumber = englishSource.replace(
      '<aya number="1">',
      '<aya number="2">'
    );
    const missingText = englishSource.replace(TRANSLATION_PATTERN, "");
    const emptyText = englishSource.replace(
      TRANSLATION_PATTERN,
      "<translation></translation>"
    );
    const missingFootnotes = englishSource.replace(
      "<footnotes></footnotes>",
      ""
    );
    const errors = await Promise.all(
      [emptyBody, wrongNumber, missingText, emptyText, missingFootnotes].map(
        (english) => reject(withEnglish(english))
      )
    );

    expect(
      errors.every(({ detail }) => detail === "Invalid QuranEnc verse 1:1.")
    ).toBe(true);
  });

  it("rejects a translation that omits a complete surah", async () => {
    const incomplete = englishSource.replace(LAST_SURAH_PATTERN, "");
    const error = await reject(withEnglish(incomplete));

    expect(error.detail).toBe("QuranEnc translation is incomplete.");
  });

  it("rejects invalid JSON and invalid Tafsir response contracts", async () => {
    const errors = await Promise.all([
      reject(withTafsir(0, "{")),
      reject(withTafsir(0, "{}")),
    ]);

    expect(errors.map(({ detail }) => detail)).toEqual([
      "Invalid QuranEnc response for surah 1.",
      "Invalid QuranEnc response for surah 1.",
    ]);
  });

  it("rejects incomplete and unexpected Tafsir surahs", async () => {
    const [first] = rawSources.tafsir;
    if (first === undefined) {
      throw new Error("Expected the first Tafsir fixture.");
    }
    const errors = await Promise.all([
      reject(withTafsir(0, '{"result":[]}')),
      reject({ ...rawSources, tafsir: [...rawSources.tafsir, first] }),
    ]);

    expect(errors.map(({ detail }) => detail)).toEqual([
      "Incomplete QuranEnc tafsir surah 1.",
      "Incomplete QuranEnc tafsir surah 115.",
    ]);
  });

  it("rejects every invalid Tafsir verse identity field", async () => {
    const first = rawSources.tafsir[0] ?? "";
    const wrongSurah = first.replace('"sura":"1"', '"sura":"2"');
    const wrongVerse = first.replace('"aya":"1"', '"aya":"2"');
    const emptyText = first.replace(
      TAFSIR_TRANSLATION_PATTERN,
      '"translation":""'
    );
    const errors = await Promise.all(
      [wrongSurah, wrongVerse, emptyText].map((source) =>
        reject(withTafsir(0, source))
      )
    );

    expect(
      errors.every(
        ({ detail }) => detail === "Invalid QuranEnc tafsir verse 1:1."
      )
    ).toBe(true);
  });

  it("rejects an incomplete Tafsir source inventory", async () => {
    const error = await reject({
      ...rawSources,
      tafsir: rawSources.tafsir.slice(0, -1),
    });

    expect(error.detail).toBe("QuranEnc tafsir is incomplete.");
  });

  it("rejects source metadata that cannot address a merged verse", async () => {
    const metadata = rawSources.metadata.replace('start="7"', 'start="999999"');
    const error = await reject({ ...rawSources, metadata });

    expect(error.detail).toBe("Incomplete merged Quran verse 2:1.");
  });
});
