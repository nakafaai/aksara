import { resolve } from "node:path";

import { NodeContext } from "@effect/platform-node";
import {
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "@nakafa/aksara-contracts/quran/spec";
import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";

import { loadVerifiedQuranSource } from "#corpus/quran/source/integrity";

const repositoryRoot = resolve(import.meta.dirname, "../../../..");

describe("Quran source integrity", () => {
  it("authenticates exact official bytes and replays the validated registry", async () => {
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
});
