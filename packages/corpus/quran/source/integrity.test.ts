import { resolve } from "node:path";

import { NodeContext } from "@effect/platform-node";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";

import { AUTHORING_APP_LOCALES } from "#corpus/locale/source";
import { loadVerifiedQuranSource } from "#corpus/quran/source/integrity";

const repositoryRoot = resolve(import.meta.dirname, "../../../..");

describe("Quran source integrity", () => {
  it("authenticates exact official bytes and replays the validated registry", {
    timeout: 30_000,
  }, async () => {
    const verified = await Effect.runPromise(
      loadVerifiedQuranSource(repositoryRoot).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    const surahs = Chunk.toReadonlyArray(
      await Effect.runPromise(verified.source().pipe(Stream.runCollect))
    );

    expect(verified.summary).toMatchObject({
      byteCount: 11_506_941,
      fileCount: 118,
    });
    expect(surahs).toHaveLength(QURAN_SURAH_COUNT);
    expect(
      surahs.reduce((count, surah) => count + surah.verses.length, 0)
    ).toBe(QURAN_VERSE_COUNT);
  });

  it("authenticates all 6,236 German translations before activation", {
    timeout: 30_000,
  }, async () => {
    const verified = await Effect.runPromise(
      loadVerifiedQuranSource(repositoryRoot, AUTHORING_APP_LOCALES).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    const [first] = Chunk.toReadonlyArray(
      await Effect.runPromise(
        verified.source().pipe(Stream.take(1), Stream.runCollect)
      )
    );

    expect(verified.summary).toEqual({
      byteCount: 13_030_246,
      digest:
        "sha256:4834b7d8ca7e55e622c3e27a37c4b210af0ab58f066162603b1d76beb0dd91b8",
      fileCount: 119,
    });
    expect(first?.verses[0]?.translation.de?.text).toBe(
      "Im Namen Allahs, des Allerbarmers, des Barmherzigen."
    );
  });
});
