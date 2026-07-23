import { createHash } from "node:crypto";
import { Effect, Stream } from "effect";
import { isRecord } from "effect/Predicate";
import { describe, expect, it } from "vitest";

import { QURAN_SURAH_COUNT } from "#corpus/quran/schema";
import { quranSurahSourceStream } from "#corpus/quran/source";

const EXPECTED_QURAN_DIGEST =
  "9aa95cde6f38685d313bf1e4ceb0e8b9db1fe021205202e9ee9a49e2de24fce6";
const EXPECTED_QURAN_BYTES = 19_376_634;

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

describe("Quran source", () => {
  it("streams every exact source field with the preserved corpus digest", async () => {
    const hash = createHash("sha256");
    let bytes = 1;
    let count = 0;

    hash.update("[");
    await Effect.runPromise(
      quranSurahSourceStream.pipe(
        Stream.runForEach((surah) =>
          Effect.sync(() => {
            const separator = count === 0 ? "" : ",";
            const canonical = `${separator}${JSON.stringify(canonicalize(surah))}`;
            bytes += Buffer.byteLength(canonical);
            count += 1;
            hash.update(canonical);
          })
        )
      )
    );
    hash.update("]");
    bytes += 1;

    expect(count).toBe(QURAN_SURAH_COUNT);
    expect(bytes).toBe(EXPECTED_QURAN_BYTES);
    expect(hash.digest("hex")).toBe(EXPECTED_QURAN_DIGEST);
  });
});
