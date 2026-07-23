import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";

import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema, Stream } from "effect";

import type { QuranSurah } from "#corpus/quran/schema";

/** Canonical byte count proven during the lossless Quran decomposition. */
export const QURAN_SOURCE_BYTES = 19_376_634;

/** Canonical source digest proven before and after Quran decomposition. */
export const QURAN_SOURCE_DIGEST = Sha256HashSchema.make(
  "sha256:9aa95cde6f38685d313bf1e4ceb0e8b9db1fe021205202e9ee9a49e2de24fce6"
);

/** Canonical Quran source bytes differ from the reviewed decomposition proof. */
export class QuranSourceIntegrityError extends Schema.TaggedError<QuranSourceIntegrityError>()(
  "QuranSourceIntegrityError",
  {
    actualBytes: Schema.Int.pipe(Schema.positive()),
    actualDigest: Sha256HashSchema,
    expectedBytes: Schema.Int.pipe(Schema.positive()),
    expectedDigest: Sha256HashSchema,
  }
) {}

/** Node could not compute the canonical Quran source digest. */
export class QuranSourceHashError extends Schema.TaggedError<QuranSourceHashError>()(
  "QuranSourceHashError",
  {}
) {}

/** Keeps incremental source bytes private while preserving JSON array parity. */
class QuranSourceHashState {
  readonly #hash = createHash("sha256").update("[");
  bytes = 1;
  count = 0;

  /** Adds one canonical surah using JSON array separator semantics. */
  update(surah: QuranSurah) {
    const separator = this.count === 0 ? "" : ",";
    const canonical = JSON.stringify(surah);
    this.#hash.update(separator);
    this.#hash.update(canonical);
    this.bytes += Buffer.byteLength(separator, "utf8");
    this.bytes += Buffer.byteLength(canonical, "utf8");
    this.count += 1;
  }

  /** Completes the JSON array and returns its immutable source proof. */
  digest() {
    this.#hash.update("]");
    this.bytes += 1;
    return {
      bytes: this.bytes,
      digest: Sha256HashSchema.make(`sha256:${this.#hash.digest("hex")}`),
    };
  }
}

/** Computes and verifies the canonical source proof without retaining surahs. */
export const digestQuranSource = Effect.fn("AksaraCorpus.digestQuranSource")(
  function* <E, R>(source: Stream.Stream<QuranSurah, E, R>) {
    const state = yield* Effect.try({
      catch: () => new QuranSourceHashError(),
      try: () => new QuranSourceHashState(),
    });
    yield* source.pipe(
      Stream.runForEach((surah) =>
        Effect.try({
          catch: () => new QuranSourceHashError(),
          try: () => state.update(surah),
        })
      )
    );
    const summary = yield* Effect.try({
      catch: () => new QuranSourceHashError(),
      try: () => state.digest(),
    });
    if (
      summary.bytes === QURAN_SOURCE_BYTES &&
      summary.digest === QURAN_SOURCE_DIGEST
    ) {
      return summary;
    }
    return yield* new QuranSourceIntegrityError({
      actualBytes: summary.bytes,
      actualDigest: summary.digest,
      expectedBytes: QURAN_SOURCE_BYTES,
      expectedDigest: QURAN_SOURCE_DIGEST,
    });
  }
);
