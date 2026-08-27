import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Context, Effect, Layer, Path } from "effect";

import { loadPinnedQuranSources } from "#corpus/quran/source/load";
import type { RawSources } from "#corpus/quran/source/model";
import { parseQuranSources } from "#corpus/quran/source/parse";

interface QuranParseFixtureValue {
  readonly completeSources: RawSources;
  readonly englishSource: string;
  readonly rawSources: RawSources;
}

class QuranParseFixture extends Context.Service<
  QuranParseFixture,
  QuranParseFixtureValue
>()("AksaraCorpus.test.QuranParseFixture") {}

/** Loads and authenticates the parser fixtures through production Effect seams. */
const loadParseFixture = Effect.fn("AksaraCorpus.test.loadQuranParseFixture")(
  function* () {
    const path = yield* Path.Path;
    const repositoryRoot = path.resolve(import.meta.dirname, "../../../..");
    const { sources } = yield* loadPinnedQuranSources(repositoryRoot);
    const translations = {
      en: sources.translations.en,
      id: sources.translations.id,
    };
    const englishSource = yield* Effect.fromNullishOr(translations.en).pipe(
      Effect.orDie
    );

    return {
      completeSources: sources,
      englishSource,
      rawSources: { ...sources, translations },
    } satisfies QuranParseFixtureValue;
  }
);

const fixtureLayer = Layer.effect(QuranParseFixture)(loadParseFixture()).pipe(
  Layer.provideMerge(NodeServices.layer)
);
const FIRST_ARABIC_LINE_PATTERN = /^.*$/mu;
const FIRST_SURAH_PATTERN = /<sura number="1">[\s\S]*?<\/sura>/u;
const FIRST_VERSE_PATTERN = /<aya number="1">[\s\S]*?<\/aya>/u;
const LAST_SURAH_PATTERN = /\s*<sura number="114">[\s\S]*?<\/sura>/u;
const TAFSIR_TRANSLATION_PATTERN = /"translation":"(?:\\.|[^"])*"/u;
const TRANSLATION_PATTERN =
  /<translation><!\[CDATA\[[\s\S]*?\]\]><\/translation>/u;

/** Returns one typed parser rejection inside the Effect test runtime. */
function reject(sources: RawSources) {
  return parseQuranSources(sources).pipe(Effect.flip);
}

/** Replaces one Tafsir response without mutating the canonical fixture. */
function withTafsir(
  fixture: QuranParseFixtureValue,
  index: number,
  source: string
): RawSources {
  return {
    ...fixture.rawSources,
    tafsir: fixture.rawSources.tafsir.map((current, currentIndex) =>
      currentIndex === index ? source : current
    ),
  };
}

/** Replaces the English source without mutating other official bytes. */
function withEnglish(fixture: QuranParseFixtureValue, english: string) {
  return {
    ...fixture.rawSources,
    translations: { ...fixture.rawSources.translations, en: english },
  };
}

layer(fixtureLayer)("Quran source parsing", (it) => {
  it.effect(
    "validates all translations and preserves the exact German source",
    () =>
      Effect.gen(function* () {
        const { completeSources } = yield* QuranParseFixture;
        const surahs = yield* parseQuranSources(completeSources);

        expect(surahs).toHaveLength(114);
        expect(
          surahs.reduce((count, surah) => count + surah.verses.length, 0)
        ).toBe(6236);
        expect(
          Object.keys(surahs[0]?.verses[0]?.translation ?? {}).sort()
        ).toEqual(["de", "en", "id"]);
        expect(surahs[0]?.verses[0]?.translation.de).toEqual({
          footnotes: "",
          text: "Im Namen Allahs, des Allerbarmers, des Barmherzigen.",
        });
      })
  );

  it.effect("rejects missing and empty Arabic verses", () =>
    Effect.gen(function* () {
      const { rawSources } = yield* QuranParseFixture;
      const copyright =
        "\n\n\n# PLEASE DO NOT REMOVE OR CHANGE THIS COPYRIGHT BLOCK";
      const errors = yield* Effect.all(
        [
          reject({
            ...rawSources,
            arabic: rawSources.arabic.replace(copyright, ""),
          }),
          reject({
            ...rawSources,
            arabic: rawSources.arabic.replace(FIRST_ARABIC_LINE_PATTERN, ""),
          }),
        ],
        { concurrency: "unbounded" }
      );

      expect(errors.map(({ detail }) => detail)).toEqual([
        "Tanzil Arabic text is incomplete.",
        "Tanzil Arabic text is incomplete.",
      ]);
    })
  );

  it.effect(
    "rejects empty, misnumbered, and unexpected translation surahs",
    () =>
      Effect.gen(function* () {
        const fixture = yield* QuranParseFixture;
        const empty = fixture.englishSource.replace(
          FIRST_SURAH_PATTERN,
          '<sura number="1"></sura>'
        );
        const misnumbered = fixture.englishSource.replace(
          '<sura number="1">',
          '<sura number="2">'
        );
        const unexpected = fixture.englishSource.replace(
          "</sura_list>",
          '<sura number="115">unexpected</sura></sura_list>'
        );
        const errors = yield* Effect.all(
          [empty, misnumbered, unexpected].map((english) =>
            reject(withEnglish(fixture, english))
          ),
          { concurrency: "unbounded" }
        );

        expect(
          errors.every(({ detail }) =>
            detail.startsWith("Invalid QuranEnc surah")
          )
        ).toBe(true);
      })
  );

  it.effect.each([
    [
      "rejects a translation surah with a missing verse",
      (source: string) => source.replace(FIRST_VERSE_PATTERN, ""),
      "Incomplete QuranEnc surah 1.",
    ],
    [
      "rejects translation markers without exact note definitions",
      (source: string) =>
        source.replace(
          TRANSLATION_PATTERN,
          "<translation><![CDATA[Broken source translation[1].]]></translation>"
        ),
      "Invalid QuranEnc translation notes 1:1.",
    ],
    [
      "rejects a translation that omits a complete surah",
      (source: string) => source.replace(LAST_SURAH_PATTERN, ""),
      "QuranEnc translation is incomplete.",
    ],
  ] as const)("%s", ([, transform, detail]) =>
    Effect.gen(function* () {
      const fixture = yield* QuranParseFixture;
      const error = yield* reject(
        withEnglish(fixture, transform(fixture.englishSource))
      );

      expect(error.detail).toBe(detail);
    })
  );

  it.effect.each([
    ["empty body", FIRST_VERSE_PATTERN, '<aya number="1"></aya>'],
    ["wrong number", '<aya number="1">', '<aya number="2">'],
    ["missing text", TRANSLATION_PATTERN, ""],
    ["empty text", TRANSLATION_PATTERN, "<translation></translation>"],
    ["missing footnotes", "<footnotes></footnotes>", ""],
  ] as const)("rejects an invalid translation verse %s", ([, pattern, value]) =>
    Effect.gen(function* () {
      const fixture = yield* QuranParseFixture;
      const english = fixture.englishSource.replace(pattern, value);
      const error = yield* reject(withEnglish(fixture, english));

      expect(error.detail).toBe("Invalid QuranEnc verse 1:1.");
    })
  );

  it.effect.each(["{", "{}"] as const)(
    "rejects invalid Tafsir response contract %#",
    (source) =>
      Effect.gen(function* () {
        const fixture = yield* QuranParseFixture;
        const error = yield* reject(withTafsir(fixture, 0, source));

        expect(error.detail).toBe("Invalid QuranEnc response for surah 1.");
      })
  );

  it.effect("rejects incomplete and unexpected Tafsir surahs", () =>
    Effect.gen(function* () {
      const fixture = yield* QuranParseFixture;
      const first = yield* Effect.fromNullishOr(
        fixture.rawSources.tafsir[0]
      ).pipe(Effect.orDie);
      const errors = yield* Effect.all(
        [
          reject(withTafsir(fixture, 0, '{"result":[]}')),
          reject({
            ...fixture.rawSources,
            tafsir: [...fixture.rawSources.tafsir, first],
          }),
        ],
        { concurrency: "unbounded" }
      );

      expect(errors.map(({ detail }) => detail)).toEqual([
        "Incomplete QuranEnc tafsir surah 1.",
        "Incomplete QuranEnc tafsir surah 115.",
      ]);
    })
  );

  it.effect("rejects every invalid Tafsir verse identity field", () =>
    Effect.gen(function* () {
      const fixture = yield* QuranParseFixture;
      const first = yield* Effect.fromNullishOr(
        fixture.rawSources.tafsir[0]
      ).pipe(Effect.orDie);
      const wrongSurah = first.replace('"sura":"1"', '"sura":"2"');
      const wrongVerse = first.replace('"aya":"1"', '"aya":"2"');
      const emptyText = first.replace(
        TAFSIR_TRANSLATION_PATTERN,
        '"translation":""'
      );
      const errors = yield* Effect.forEach(
        [wrongSurah, wrongVerse, emptyText],
        (source) => reject(withTafsir(fixture, 0, source)),
        { concurrency: "unbounded" }
      );

      expect(
        errors.every(
          ({ detail }) => detail === "Invalid QuranEnc tafsir verse 1:1."
        )
      ).toBe(true);
    })
  );

  it.effect.each([
    [
      "rejects an incomplete Tafsir source inventory",
      (sources: RawSources) => ({
        ...sources,
        tafsir: sources.tafsir.slice(0, -1),
      }),
      "QuranEnc tafsir is incomplete.",
    ],
    [
      "rejects source metadata that cannot address a merged verse",
      (sources: RawSources) => ({
        ...sources,
        metadata: sources.metadata.replace('start="7"', 'start="999999"'),
      }),
      "Incomplete merged Quran verse 2:1.",
    ],
  ] as const)("%s", ([, transform, detail]) =>
    Effect.gen(function* () {
      const { rawSources } = yield* QuranParseFixture;
      const error = yield* reject(transform(rawSources));

      expect(error.detail).toBe(detail);
    })
  );
});
