import { createHash } from "node:crypto";

import { Array as Arr, Effect, Schema, Stream } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import type { ActiveAppLocaleList, AppLocale } from "#contracts/locale";
import { AppLocaleSchema } from "#contracts/locale";
import type {
  QuranRowPayload,
  QuranSnapshotRow,
} from "#contracts/quran/snapshot/row";
import {
  hashQuranRow,
  QuranRowHashError,
} from "#contracts/quran/snapshot/row/hash";
import { quranSourceIds } from "#contracts/quran/source";
import {
  QURAN_ATTRIBUTION_COUNT,
  QURAN_CHUNK_SIZE,
  QURAN_SURAH_COUNT,
  QURAN_VERSE_COUNT,
} from "#contracts/quran/spec";
import { encodeJsonText } from "#contracts/text/json";

const RUNTIME_DOMAIN = "nakafa.aksara.quran-runtime";
const SEARCH_DOMAIN = "nakafa.aksara.quran-search";
const PROJECTION_DOMAIN = "nakafa.aksara.quran-projection";

/** A current row hash does not authenticate its structured payload. */
export class QuranRowIntegrityError extends Schema.TaggedError<QuranRowIntegrityError>()(
  "QuranRowIntegrityError",
  {
    actual: Sha256HashSchema,
    expected: Sha256HashSchema,
  }
) {}

/** A current row does not match the next deterministic snapshot identity. */
export class QuranRowOrderError extends Schema.TaggedError<QuranRowOrderError>()(
  "QuranRowOrderError",
  {
    actual: Schema.String,
    expected: Schema.String,
  }
) {}

/** Joins the parts of one row identity with colons, stringifying each part. */
function joinIdentity(parts: readonly (number | string)[]) {
  return Arr.join(Arr.map(parts, String), ":");
}

/** Resolves one complete stable current row identity. */
function rowIdentity(payload: QuranRowPayload) {
  if (payload.kind === "quran-attribution") {
    const sourceIds = Arr.map(payload.sources, ({ id }) => id);
    return `quran-attribution:${Arr.join(payload.activeAppLocales, ",")}:${Arr.join(sourceIds, ":")}`;
  }
  if (payload.kind === "quran-surah") {
    return `quran-surah:${payload.number}`;
  }
  if (payload.kind === "quran-chunk") {
    return joinIdentity([
      "quran-chunk",
      payload.surahNumber,
      payload.firstVerse,
      payload.lastVerse,
      payload.firstQuranNumber,
    ]);
  }
  return joinIdentity([
    "quran-search",
    payload.surahNumber,
    payload.appLocale,
    payload.route,
    payload.graph.alignmentId,
    payload.graph.assetId,
    payload.graph.conceptId,
    payload.graph.learningObjectId,
    payload.graph.lensId,
  ]);
}

/** Keeps current locale closure and digest state private to one replay. */
class QuranDigestState {
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
      return `quran-attribution:${Arr.join(this.#activeAppLocales, ",")}:${Arr.join(quranSourceIds(this.#activeAppLocales), ":")}`;
    }
    if (this.#nextSurah <= QURAN_SURAH_COUNT) {
      if (this.#nextSurahVerse === 0) {
        return `quran-surah:${this.#nextSurah}`;
      }
      const lastVerse = Math.min(
        this.#nextSurahVerse + QURAN_CHUNK_SIZE - 1,
        this.#surahVerseCount
      );
      return joinIdentity([
        "quran-chunk",
        this.#nextSurah,
        this.#nextSurahVerse,
        lastVerse,
        this.#nextQuranNumber,
      ]);
    }
    if (this.#nextSearchSurah <= QURAN_SURAH_COUNT) {
      return joinIdentity([
        "quran-search",
        this.#nextSearchSurah,
        this.#nextSearchLocale,
        `quran/${this.#nextSearchSurah}`,
        `alignment:quran:quran-surah:${this.#nextSearchSurah}`,
        `asset:${this.#nextSearchLocale}:quran:quran-surah:${this.#nextSearchSurah}`,
        `concept:quran:surah:${this.#nextSearchSurah}`,
        `lo:quran-surah:${this.#nextSearchSurah}`,
        "lens:quran",
      ]);
    }
    return "end";
  }

  /** Checks translation and Tafsir entries against active locale policy. */
  validateVerseLocales(payload: QuranRowPayload) {
    if (payload.kind !== "quran-chunk") {
      return true;
    }
    const expectedTafsir = this.#activeAppLocales.includes(
      AppLocaleSchema.make("id")
    )
      ? ["id"]
      : [];
    return Arr.every(
      payload.verses,
      (verse) =>
        encodeJsonText(
          Arr.map(verse.translations, (translation) => translation.appLocale)
        ) === encodeJsonText(this.#activeAppLocales) &&
        encodeJsonText(Arr.map(verse.tafsir, (tafsir) => tafsir.appLocale)) ===
          encodeJsonText(expectedTafsir)
    );
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
  update(row: Pick<QuranSnapshotRow, "payload" | "rowHash">) {
    const expected = this.expectedIdentity();
    const actual = rowIdentity(row.payload);
    if (actual !== expected || !this.validateVerseLocales(row.payload)) {
      return Effect.fail(new QuranRowOrderError({ actual, expected }));
    }
    this.advance(row.payload);
    const canonical = `${row.payload.kind}\n${row.rowHash}\n`;
    return Effect.try({
      catch: () => new QuranRowHashError({ scope: "row" }),
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
      new QuranRowOrderError({
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

/** Digests authenticated current rows under one active locale set. */
export const digestQuranRows = Effect.fn("AksaraContracts.digestQuranRows")(
  function* <E, R>(input: {
    readonly activeAppLocales: ActiveAppLocaleList;
    readonly rows: Stream.Stream<
      Pick<QuranSnapshotRow, "payload" | "rowHash">,
      E,
      R
    >;
  }) {
    const state = yield* Effect.try({
      catch: () => new QuranRowHashError({ scope: "row" }),
      try: () => new QuranDigestState(input.activeAppLocales),
    });
    yield* input.rows.pipe(
      Stream.runForEach((row) => updateQuranDigest(state, row))
    );
    yield* state.validateComplete();
    return yield* Effect.try({
      catch: () => new QuranRowHashError({ scope: "row" }),
      try: () => state.digest(),
    });
  }
);
