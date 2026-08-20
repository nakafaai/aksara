import { resolve } from "node:path";

import { NodeServices } from "@effect/platform-node";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Stream } from "effect";

import { loadVerifiedQuranSource } from "#corpus/quran/source/integrity";

const repositoryRoot = resolve(import.meta.dirname, "../../../..");

describe("Quran source integrity", () => {
  it("authenticates exact official bytes and replays the validated registry", {
    timeout: 30_000,
  }, async () => {
    const verified = await Effect.runPromise(
      loadVerifiedQuranSource(repositoryRoot).pipe(
        Effect.provide(NodeServices.layer)
      )
    );
    const surahs = await Effect.runPromise(
      verified.source.pipe(Stream.runCollect)
    );

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
  });
});
