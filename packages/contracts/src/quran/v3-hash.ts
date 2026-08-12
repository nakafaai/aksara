import { createHash } from "node:crypto";

import { Effect } from "effect";

import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { type Sha256Hash, Sha256HashSchema } from "#contracts/ids";
import { QuranHashError } from "#contracts/quran/row-hash";
import {
  type QuranRuntimeVerseV3,
  type QuranSnapshotV3Row,
  QuranSnapshotV3RowSchema,
  type QuranSourceAttributionV3,
  type QuranV3RowPayload,
} from "#contracts/quran/v3";

const ROW_DOMAIN = "nakafa.aksara.quran-row.v3";

/** Serializes one current translation list in signed field order. */
function canonicalizeTranslations(
  translations: QuranRuntimeVerseV3["translations"]
) {
  return translations.map((translation) => ({
    appLocale: translation.appLocale,
    value: {
      footnotes: translation.value.footnotes,
      text: translation.value.text,
    },
  }));
}

/** Serializes one visible current source attribution. */
function canonicalizeAttribution(source: QuranSourceAttributionV3) {
  return {
    artifact: {
      byteCount: source.artifact.byteCount,
      digest: source.artifact.digest,
      fileCount: source.artifact.fileCount,
    },
    id: source.id,
    notice: source.notice,
    publisher: source.publisher,
    retrievedAt: source.retrievedAt,
    sourceUrl: source.sourceUrl,
    terms: {
      artifact: {
        byteCount: source.terms.artifact.byteCount,
        digest: source.terms.artifact.digest,
        fileCount: source.terms.artifact.fileCount,
      },
      url: source.terms.url,
    },
    title: source.title,
    updateUrl: source.updateUrl,
    version: source.version,
  };
}

/** Serializes one current runtime verse without insertion-order trust. */
function canonicalizeVerse(verse: QuranRuntimeVerseV3) {
  return {
    meta: {
      hizbQuarter: verse.meta.hizbQuarter,
      juz: verse.meta.juz,
      manzil: verse.meta.manzil,
      page: verse.meta.page,
      ruku: verse.meta.ruku,
      sajda: verse.meta.sajda,
    },
    number: {
      inQuran: verse.number.inQuran,
      inSurah: verse.number.inSurah,
    },
    tafsir: verse.tafsir.map((entry) => ({
      appLocale: entry.appLocale,
      footnotes: entry.footnotes,
      text: entry.text,
    })),
    text: { arabic: verse.text.arabic },
    translations: canonicalizeTranslations(verse.translations),
  };
}

/** Produces stable JSON for one exhaustive current Quran payload. */
export function canonicalizeQuranV3Row(payload: QuranV3RowPayload) {
  if (payload.kind === "quran-attribution") {
    return JSON.stringify({
      kind: payload.kind,
      sources: payload.sources.map(canonicalizeAttribution),
    });
  }
  if (payload.kind === "quran-surah") {
    return JSON.stringify({
      kind: payload.kind,
      name: {
        arabic: payload.name.arabic,
        translation: payload.name.translation,
        transliteration: payload.name.transliteration,
      },
      number: payload.number,
      numberOfVerses: payload.numberOfVerses,
      revelation: {
        order: payload.revelation.order,
        place: payload.revelation.place,
      },
    });
  }
  if (payload.kind === "quran-chunk") {
    return JSON.stringify({
      firstQuranNumber: payload.firstQuranNumber,
      firstVerse: payload.firstVerse,
      kind: payload.kind,
      lastVerse: payload.lastVerse,
      surahNumber: payload.surahNumber,
      verses: payload.verses.map(canonicalizeVerse),
    });
  }
  return JSON.stringify({
    appLocale: payload.appLocale,
    graph: canonicalizeLearningGraphIdentity(payload.graph),
    kind: payload.kind,
    route: payload.route,
    surahNumber: payload.surahNumber,
    text: payload.text,
    title: payload.title,
  });
}

/** Computes one current row's domain-separated identity. */
export function hashQuranV3Row(payload: QuranV3RowPayload) {
  return Effect.try({
    catch: () => new QuranHashError({ scope: "row" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(`${ROW_DOMAIN}\n${canonicalizeQuranV3Row(payload)}`)
          .digest("hex")}`
      ),
  });
}

/** Creates one snapshot-bound current row. */
export const bindQuranV3Row = Effect.fn("AksaraContracts.bindQuranV3Row")(
  function* (snapshotId: Sha256Hash, payload: QuranV3RowPayload) {
    const rowHash = yield* hashQuranV3Row(payload);
    return QuranSnapshotV3RowSchema.make({ payload, rowHash, snapshotId });
  }
);

/** Recomputes one current row hash for streamed verification. */
export function verifyQuranV3RowHash(row: QuranSnapshotV3Row) {
  return hashQuranV3Row(row.payload);
}
