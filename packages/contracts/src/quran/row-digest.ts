import { createHash } from "node:crypto";

import { Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { hashQuranRow, QuranHashError } from "#contracts/quran/row-hash";
import {
  QURAN_ATTRIBUTION_COUNT,
  QURAN_CHUNK_SIZE,
  QURAN_LOCALES,
  QURAN_SEARCH_COUNT,
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
  type QuranLocaleSchema,
  type QuranRowPayload,
  type QuranSnapshotRow,
} from "#contracts/quran/spec";

const RUNTIME_DOMAIN = "nakafa.aksara.quran-runtime.v2";
const SEARCH_DOMAIN = "nakafa.aksara.quran-search.v2";
const PROJECTION_DOMAIN = "nakafa.aksara.quran-projection.v2";

/** A supplied row hash does not authenticate its structured payload. */
export class QuranRowIntegrityError extends Schema.TaggedError<QuranRowIntegrityError>()(
  "QuranRowIntegrityError",
  {
    actual: Sha256HashSchema,
    expected: Sha256HashSchema,
  }
) {}

/** A structured row does not match the next deterministic snapshot identity. */
export class QuranRowOrderError extends Schema.TaggedError<QuranRowOrderError>()(
  "QuranRowOrderError",
  {
    actual: Schema.String,
    expected: Schema.String,
  }
) {}

/** Resolves the complete stable identity fields for one structured row. */
function rowIdentity(payload: QuranRowPayload) {
  if (payload.kind === "quran-attribution") {
    return `quran-attribution:${payload.sources.map(({ id }) => id).join(":")}`;
  }
  if (payload.kind === "quran-surah") {
    return `quran-surah:${payload.number}`;
  }
  if (payload.kind === "quran-chunk") {
    return [
      "quran-chunk",
      payload.surahNumber,
      payload.firstVerse,
      payload.lastVerse,
      payload.firstQuranNumber,
    ].join(":");
  }
  return [
    "quran-search",
    payload.surahNumber,
    payload.locale,
    payload.route,
    payload.graph.alignmentId,
    payload.graph.assetId,
    payload.graph.conceptId,
    payload.graph.learningObjectId,
    payload.graph.lensId,
  ].join(":");
}

/** Mutable digest state remains private to one streamed snapshot preparation. */
class QuranDigestState {
  readonly #runtime = createHash("sha256").update(`${RUNTIME_DOMAIN}\n`);
  readonly #search = createHash("sha256").update(`${SEARCH_DOMAIN}\n`);
  readonly #projection = createHash("sha256").update(`${PROJECTION_DOMAIN}\n`);
  #nextQuranNumber = 1;
  #nextSearchLocale: typeof QuranLocaleSchema.Type = QURAN_LOCALES[0];
  #nextSearchSurah = 1;
  #nextSurah = 1;
  #nextSurahVerse = 0;
  #surahVerseCount = 0;
  attributionCount = 0;
  chunkCount = 0;
  projectionCount = 0;
  runtimeCount = 0;
  searchCount = 0;

  /** Returns the only row identity valid at the current stream position. */
  expectedIdentity() {
    if (this.attributionCount === 0) {
      return "quran-attribution:tanzil-text:tanzil-metadata:quranenc-english:quranenc-indonesian:quranenc-tafsir";
    }
    if (this.#nextSurah <= QURAN_SURAH_COUNT) {
      if (this.#nextSurahVerse === 0) {
        return `quran-surah:${this.#nextSurah}`;
      }
      const lastVerse = Math.min(
        this.#nextSurahVerse + QURAN_CHUNK_SIZE - 1,
        this.#surahVerseCount
      );
      return [
        "quran-chunk",
        this.#nextSurah,
        this.#nextSurahVerse,
        lastVerse,
        this.#nextQuranNumber,
      ].join(":");
    }
    if (this.#nextSearchSurah <= QURAN_SURAH_COUNT) {
      return [
        "quran-search",
        this.#nextSearchSurah,
        this.#nextSearchLocale,
        `quran/${this.#nextSearchSurah}`,
        `alignment:quran:quran-surah:${this.#nextSearchSurah}`,
        `asset:${this.#nextSearchLocale}:quran:quran-surah:${this.#nextSearchSurah}`,
        `concept:quran:surah:${this.#nextSearchSurah}`,
        `lo:quran-surah:${this.#nextSearchSurah}`,
        "lens:quran",
      ].join(":");
    }
    return "end";
  }

  /** Advances deterministic identity state after one accepted row. */
  advance(payload: QuranRowPayload) {
    if (payload.kind === "quran-attribution") {
      return;
    }
    if (payload.kind === "quran-surah") {
      this.#surahVerseCount = payload.numberOfVerses;
      this.#nextSurahVerse = 1;
      return;
    }
    if (payload.kind === "quran-chunk") {
      this.#nextQuranNumber = payload.firstQuranNumber + payload.verses.length;
      if (payload.lastVerse === this.#surahVerseCount) {
        this.#nextSurah += 1;
        this.#nextSurahVerse = 0;
        return;
      }
      this.#nextSurahVerse = payload.lastVerse + 1;
      return;
    }
    const localeIndex = QURAN_LOCALES.indexOf(this.#nextSearchLocale);
    const nextLocale = QURAN_LOCALES[localeIndex + 1];
    if (nextLocale !== undefined) {
      this.#nextSearchLocale = nextLocale;
      return;
    }
    this.#nextSearchLocale = QURAN_LOCALES[0];
    this.#nextSearchSurah += 1;
  }

  /** Adds one authenticated, correctly ordered row to domain digests. */
  update(row: Pick<QuranSnapshotRow, "payload" | "rowHash">) {
    const expected = this.expectedIdentity();
    const actual = rowIdentity(row.payload);
    if (actual !== expected) {
      return Effect.fail(new QuranRowOrderError({ actual, expected }));
    }
    this.advance(row.payload);
    const canonical = `${row.payload.kind}\n${row.rowHash}\n`;
    return Effect.try({
      catch: () => new QuranHashError({ scope: "row" }),
      try: () => {
        this.#projection.update(canonical);
        this.projectionCount += 1;
        if (row.payload.kind === "quran-search") {
          this.#search.update(canonical);
          this.searchCount += 1;
          return;
        }
        this.#runtime.update(canonical);
        this.runtimeCount += 1;
        if (row.payload.kind === "quran-attribution") {
          this.attributionCount += 1;
        }
        if (row.payload.kind === "quran-chunk") {
          this.chunkCount += 1;
        }
      },
    });
  }

  /** Rejects an incomplete stream before consuming its digest state. */
  validateComplete() {
    const actual = [
      this.expectedIdentity(),
      this.#nextQuranNumber,
      this.attributionCount,
      this.chunkCount,
      this.runtimeCount,
      this.searchCount,
      this.projectionCount,
    ].join(":");
    const expected = [
      "end",
      QURAN_VERSE_COUNT + 1,
      QURAN_ATTRIBUTION_COUNT,
      this.chunkCount,
      QURAN_ATTRIBUTION_COUNT + QURAN_SURAH_COUNT + this.chunkCount,
      QURAN_SEARCH_COUNT,
      this.runtimeCount + this.searchCount,
    ].join(":");
    if (
      this.expectedIdentity() === "end" &&
      this.#nextQuranNumber === QURAN_VERSE_COUNT + 1 &&
      this.attributionCount === QURAN_ATTRIBUTION_COUNT &&
      this.runtimeCount ===
        QURAN_ATTRIBUTION_COUNT + QURAN_SURAH_COUNT + this.chunkCount &&
      this.searchCount === QURAN_SEARCH_COUNT &&
      this.projectionCount === this.runtimeCount + this.searchCount
    ) {
      return Effect.void;
    }
    return Effect.fail(new QuranRowOrderError({ actual, expected }));
  }

  /** Finalizes all ordered Quran row digest domains. */
  digest() {
    return {
      attributionCount: this.attributionCount,
      chunkCount: this.chunkCount,
      projectionCount: this.projectionCount,
      projectionDigest: Sha256HashSchema.make(
        `sha256:${this.#projection.digest("hex")}`
      ),
      runtimeCount: this.runtimeCount,
      runtimeDigest: Sha256HashSchema.make(
        `sha256:${this.#runtime.digest("hex")}`
      ),
      searchCount: this.searchCount,
      searchDigest: Sha256HashSchema.make(
        `sha256:${this.#search.digest("hex")}`
      ),
    };
  }
}

/** Authenticates one row before advancing ordered digest state. */
const updateQuranDigest = Effect.fn("AksaraContracts.updateQuranDigest")(
  function* (
    state: QuranDigestState,
    row: Pick<QuranSnapshotRow, "payload" | "rowHash">
  ) {
    const expected = yield* hashQuranRow(row.payload);
    if (expected !== row.rowHash) {
      return yield* new QuranRowIntegrityError({
        actual: row.rowHash,
        expected,
      });
    }
    yield* state.update(row);
  }
);

/** Digests authenticated, ordered rows without retaining the complete corpus. */
export const digestQuranRows = Effect.fn("AksaraContracts.digestQuranRows")(
  function* <E, R>(
    rows: Stream.Stream<Pick<QuranSnapshotRow, "payload" | "rowHash">, E, R>
  ) {
    const state = yield* Effect.try({
      catch: () => new QuranHashError({ scope: "row" }),
      try: () => new QuranDigestState(),
    });
    yield* rows.pipe(Stream.runForEach((row) => updateQuranDigest(state, row)));
    yield* state.validateComplete();
    return yield* Effect.try({
      catch: () => new QuranHashError({ scope: "row" }),
      try: () => state.digest(),
    });
  }
);
