import { QURAN_SURAH_COUNT } from "@nakafa/aksara-contracts/quran/spec";
import { Chunk, Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { quranSurahSourceStream } from "#corpus/quran/source";

describe("Quran source", () => {
  it("streams every source module once in canonical surah order", async () => {
    const sources = Chunk.toReadonlyArray(
      await Effect.runPromise(Stream.runCollect(quranSurahSourceStream))
    );

    expect(sources).toHaveLength(QURAN_SURAH_COUNT);
  });
});
