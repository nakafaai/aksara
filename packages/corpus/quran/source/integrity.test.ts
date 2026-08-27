import { NodeServices } from "@effect/platform-node";
import { layer } from "@effect/vitest";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { Effect, Path, Stream } from "effect";
import { expect } from "vitest";

import { loadVerifiedQuranSource } from "#corpus/quran/source/integrity";

layer(NodeServices.layer)("Quran source integrity", (it) => {
  it.effect(
    "authenticates exact official bytes and replays the validated registry",
    () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const repositoryRoot = path.resolve(import.meta.dirname, "../../../..");
        const verified = yield* loadVerifiedQuranSource(repositoryRoot);
        const surahs = yield* verified.source.pipe(Stream.runCollect);

        expect(verified.summary).toMatchObject({
          byteCount: 13_030_246,
          fileCount: 119,
        });
        expect(surahs).toHaveLength(QURAN_SURAH_COUNT);
        expect(
          surahs.reduce((count, surah) => count + surah.verses.length, 0)
        ).toBe(QURAN_VERSE_COUNT);
        const [first] = surahs;
        expect(first?.verses[0]?.translation.de?.text).toBe(
          "Im Namen Allahs, des Allerbarmers, des Barmherzigen."
        );
      }),
    30_000
  );
});
