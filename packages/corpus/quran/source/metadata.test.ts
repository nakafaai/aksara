import { NodeServices } from "@effect/platform-node";
import { expect, layer } from "@effect/vitest";
import { Context, Effect, FileSystem, Layer, Path } from "effect";

import {
  parseQuranMetadata,
  quranMarkerAt,
} from "#corpus/quran/source/metadata";

class QuranMetadataSource extends Context.Service<
  QuranMetadataSource,
  string
>()("AksaraCorpus.test.QuranMetadataSource") {}

const metadataLayer = Layer.effect(QuranMetadataSource)(
  Effect.gen(function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    return yield* fileSystem.readFileString(
      path.resolve(import.meta.dirname, "../sources/tanzil/data.xml")
    );
  })
).pipe(Layer.provideMerge(NodeServices.layer));
const LAST_SURAH_PATTERN = /\s*<sura index="114"[^>]+\/>/u;

/** Returns one typed metadata rejection inside the Effect test runtime. */
function reject(source: string) {
  return parseQuranMetadata(source).pipe(Effect.flip);
}

layer(metadataLayer)("Quran metadata parsing", (it) => {
  it.effect("parses the complete ordered Tanzil metadata model", () =>
    Effect.gen(function* () {
      const source = yield* QuranMetadataSource;
      const metadata = yield* parseQuranMetadata(source);

      expect(metadata.surahs).toHaveLength(114);
      expect(metadata.surahs[1]?.name).toEqual({
        arabic: "البقرة",
        meaning: { appLocale: "en", text: "The Cow" },
        transliteration: "Al-Baqara",
      });
      expect(metadata.sajdas).toHaveLength(15);
      expect(quranMarkerAt(metadata.juzs, 0)).toBeUndefined();
      expect(quranMarkerAt(metadata.juzs, 1)).toBe(1);
      expect(quranMarkerAt(metadata.juzs, 6236)).toBe(30);
    })
  );

  it.effect("rejects incomplete and malformed surah attributes", () =>
    Effect.gen(function* () {
      const source = yield* QuranMetadataSource;
      const errors = yield* Effect.all(
        [
          reject(source.replace('name="الفاتحة"', 'name=""')),
          reject(source.replace('ename="The Opening"', 'ename=""')),
          reject(source.replace('tname="Al-Faatiha"', 'tname=""')),
          reject(source.replace('type="Meccan"', 'type="Other"')),
          reject(source.replace('order="5"', 'order="invalid"')),
        ],
        { concurrency: "unbounded" }
      );

      expect(
        errors.every(({ detail }) =>
          detail.startsWith("Invalid Tanzil surah metadata:")
        )
      ).toBe(true);
    })
  );

  it.effect(
    "rejects incomplete, unordered, and miscounted surah inventories",
    () =>
      Effect.gen(function* () {
        const source = yield* QuranMetadataSource;
        const withoutLast = source.replace(LAST_SURAH_PATTERN, "");
        const errors = yield* Effect.all(
          [
            reject(withoutLast),
            reject(source.replace('sura index="2"', 'sura index="3"')),
            reject(source.replace('index="1" ayas="7"', 'index="1" ayas="8"')),
          ],
          { concurrency: "unbounded" }
        );

        expect(errors.map(({ detail }) => detail)).toEqual([
          "Tanzil surah inventory is incomplete.",
          "Tanzil surah inventory is incomplete.",
          "Tanzil surah inventory is incomplete.",
        ]);
      })
  );

  it.effect("rejects invalid marker indexes and verse positions", () =>
    Effect.gen(function* () {
      const source = yield* QuranMetadataSource;
      const errors = yield* Effect.all(
        [
          reject(source.replace('<juz index="1"', '<juz index="x"')),
          reject(
            source.replace(
              '<juz index="1" sura="1" aya="1" />',
              '<juz index="1" sura="0" aya="1" />'
            )
          ),
        ],
        { concurrency: "unbounded" }
      );

      expect(
        errors.every(({ detail }) =>
          detail.startsWith("Invalid Tanzil juz marker:")
        )
      ).toBe(true);
    })
  );

  it.effect("rejects absent and misplaced first partition markers", () =>
    Effect.gen(function* () {
      const source = yield* QuranMetadataSource;
      const errors = yield* Effect.all(
        [
          reject(source.replace(/\s*<manzil [^>]+\/>/gu, "")),
          reject(
            source.replace(
              '<ruku index="1" sura="1" aya="1" />',
              '<ruku index="1" sura="1" aya="2" />'
            )
          ),
        ],
        { concurrency: "unbounded" }
      );

      expect(errors.map(({ detail }) => detail)).toEqual([
        "Missing first Tanzil manzil marker.",
        "Missing first Tanzil ruku marker.",
      ]);
    })
  );

  it.effect("rejects invalid sajda positions and classifications", () =>
    Effect.gen(function* () {
      const source = yield* QuranMetadataSource;
      const errors = yield* Effect.all(
        [
          reject(
            source.replace(
              '<sajda index="1" sura="7" aya="206"',
              '<sajda index="1" sura="0" aya="206"'
            )
          ),
          reject(source.replace('type="recommended"', 'type="other"')),
        ],
        { concurrency: "unbounded" }
      );

      expect(
        errors.every(({ detail }) =>
          detail.startsWith("Invalid Tanzil sajda marker:")
        )
      ).toBe(true);
    })
  );
});
