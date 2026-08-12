import { createHash } from "node:crypto";

import { Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";
import { AppLocaleSchema } from "#contracts/locale";
import { QuranHashError } from "#contracts/quran/row-hash";
import {
  QURAN_ATTRIBUTION_COUNT,
  QURAN_CHUNK_SIZE,
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "#contracts/quran/spec";
import {
  type QuranSnapshotV3Row,
  type QuranV3RowPayload,
  quranV3SourceIds,
} from "#contracts/quran/v3";
import { verifyQuranV3RowHash } from "#contracts/quran/v3-hash";

const RUNTIME_DOMAIN = "nakafa.aksara.quran-runtime.v3";
const SEARCH_DOMAIN = "nakafa.aksara.quran-search.v3";
const PROJECTION_DOMAIN = "nakafa.aksara.quran-projection.v3";

/** A current row hash does not authenticate its structured payload. */
export class QuranV3RowIntegrityError extends Schema.TaggedError<QuranV3RowIntegrityError>()(
  "QuranV3RowIntegrityError",
  {
    actual: Sha256HashSchema,
    expected: Sha256HashSchema,
  }
) {}

/** A current row does not match the next deterministic snapshot identity. */
export class QuranV3RowOrderError extends Schema.TaggedError<QuranV3RowOrderError>()(
  "QuranV3RowOrderError",
  {
    actual: Schema.String,
    expected: Schema.String,
  }
) {}

/** Resolves one complete stable current row identity. */
function rowIdentity(payload: QuranV3RowPayload) {
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
    payload.appLocale,
    payload.route,
    payload.graph.alignmentId,
    payload.graph.assetId,
    payload.graph.conceptId,
    payload.graph.learningObjectId,
    payload.graph.lensId,
  ].join(":");
}

/** Keeps current locale closure and digest state private to one replay. */
class QuranV3DigestState {
  readonly #activeAppLocales: ActiveAppLocaleList;
  readonly #runtime = createHash("sha256").update(`${RUNTIME_DOMAIN}\n`);
  readonly #search = createHash("sha256").update(`${SEARCH_DOMAIN}\n`);
  readonly #projection = createHash("sha256").update(`${PROJECTION_DOMAIN}\n`);
  #nextQuranNumber = 1;
  #nextSearchLocale: AppLocale;
  #nextSearchSurah = 1;
  #nextSurah = 1;
  #nextSurahVerse = 0;
  #surahVerseCount = 0;
  attributionCount = 0;
  chunkCount = 0;
  projectionCount = 0;
  runtimeCount = 0;
  searchCount = 0;

  /** Initializes one isolated replay under the signed active locale set. */
  constructor(activeAppLocales: ActiveAppLocaleList) {
    this.#activeAppLocales = activeAppLocales;
    this.#nextSearchLocale = activeAppLocales[0];
  }

  /** Returns the only row identity valid at the current stream position. */
  expectedIdentity() {
    if (this.attributionCount === 0) {
      return `quran-attribution:${quranV3SourceIds(this.#activeAppLocales).join(":")}`;
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

  /** Checks translation and Tafsir entries against active locale policy. */
  validateVerseLocales(payload: QuranV3RowPayload) {
    if (payload.kind !== "quran-chunk") {
      return true;
    }
    const expectedTafsir = this.#activeAppLocales.includes(
      AppLocaleSchema.make("id")
    )
      ? ["id"]
      : [];
    return payload.verses.every(
      (verse) =>
        JSON.stringify(
          verse.translations.map((translation) => translation.appLocale)
        ) === JSON.stringify(this.#activeAppLocales) &&
        JSON.stringify(verse.tafsir.map((tafsir) => tafsir.appLocale)) ===
          JSON.stringify(expectedTafsir)
    );
  }

  /** Advances deterministic identity state after one accepted row. */
  advance(payload: QuranV3RowPayload) {
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
    const localeIndex = this.#activeAppLocales.indexOf(this.#nextSearchLocale);
    const nextLocale = this.#activeAppLocales[localeIndex + 1];
    if (nextLocale !== undefined) {
      this.#nextSearchLocale = nextLocale;
      return;
    }
    this.#nextSearchLocale = this.#activeAppLocales[0];
    this.#nextSearchSurah += 1;
  }

  /** Adds one authenticated and correctly ordered row to all digests. */
  update(row: Pick<QuranSnapshotV3Row, "payload" | "rowHash">) {
    const expected = this.expectedIdentity();
    const actual = rowIdentity(row.payload);
    if (actual !== expected || !this.validateVerseLocales(row.payload)) {
      return Effect.fail(new QuranV3RowOrderError({ actual, expected }));
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

  /** Rejects an incomplete stream before consuming digest state. */
  validateComplete() {
    const expectedSearchCount =
      QURAN_SURAH_COUNT * this.#activeAppLocales.length;
    if (
      this.expectedIdentity() === "end" &&
      this.#nextQuranNumber === QURAN_VERSE_COUNT + 1 &&
      this.attributionCount === QURAN_ATTRIBUTION_COUNT &&
      this.runtimeCount ===
        QURAN_ATTRIBUTION_COUNT + QURAN_SURAH_COUNT + this.chunkCount &&
      this.searchCount === expectedSearchCount &&
      this.projectionCount === this.runtimeCount + this.searchCount
    ) {
      return Effect.void;
    }
    return Effect.fail(
      new QuranV3RowOrderError({
        actual: this.expectedIdentity(),
        expected: "end",
      })
    );
  }

  /** Finalizes all ordered current Quran digest domains. */
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

/** Authenticates one current row before advancing ordered state. */
const updateQuranV3Digest = Effect.fn("AksaraContracts.updateQuranV3Digest")(
  function* (state: QuranV3DigestState, row: QuranSnapshotV3Row) {
    const expected = yield* verifyQuranV3RowHash(row);
    if (expected !== row.rowHash) {
      return yield* new QuranV3RowIntegrityError({
        actual: row.rowHash,
        expected,
      });
    }
    yield* state.update(row);
  }
);

/** Digests authenticated current rows under one active locale set. */
export const digestQuranV3Rows = Effect.fn("AksaraContracts.digestQuranV3Rows")(
  function* <E, R>(input: {
    readonly activeAppLocales: ActiveAppLocaleList;
    readonly rows: Stream.Stream<QuranSnapshotV3Row, E, R>;
  }) {
    const state = yield* Effect.try({
      catch: () => new QuranHashError({ scope: "row" }),
      try: () => new QuranV3DigestState(input.activeAppLocales),
    });
    yield* input.rows.pipe(
      Stream.runForEach((row) => updateQuranV3Digest(state, row))
    );
    yield* state.validateComplete();
    return yield* Effect.try({
      catch: () => new QuranHashError({ scope: "row" }),
      try: () => state.digest(),
    });
  }
);
