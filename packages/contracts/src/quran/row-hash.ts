import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { type Sha256Hash, Sha256HashSchema } from "#contracts/ids";
import type { QuranSourceAttribution } from "#contracts/quran/source";
import {
  QURAN_LOCALES,
  QURAN_TAFSIR_LOCALES,
  type QuranRowPayload,
  type QuranRuntimeVerse,
  QuranSnapshotRowSchema,
} from "#contracts/quran/spec";

const ROW_DOMAIN = "nakafa.aksara.quran-row.v2";

/** Node could not complete a deterministic Quran row hash operation. */
export class QuranHashError extends Schema.TaggedError<QuranHashError>()(
  "QuranHashError",
  { scope: Schema.Literal("row") }
) {}

/** Serializes locale-indexed QuranEnc translations in fixed order. */
function canonicalizeTranslations(
  translations: QuranRuntimeVerse["translation"]
) {
  return Object.fromEntries(
    QURAN_LOCALES.map((locale) => [
      locale,
      {
        footnotes: translations[locale].footnotes,
        text: translations[locale].text,
      },
    ])
  );
}

/** Serializes one visible official-source attribution in fixed field order. */
function canonicalizeAttribution(source: QuranSourceAttribution) {
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

/** Serializes only complete reviewed Tafsir locales in contract order. */
function canonicalizeTafsir(tafsir: QuranRuntimeVerse["tafsir"]) {
  return Object.fromEntries(
    QURAN_TAFSIR_LOCALES.map((locale) => [
      locale,
      {
        footnotes: tafsir[locale].footnotes,
        text: tafsir[locale].text,
      },
    ])
  );
}

/** Serializes one complete runtime verse without trusting object insertion. */
function canonicalizeVerse(verse: QuranRuntimeVerse) {
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
    tafsir: canonicalizeTafsir(verse.tafsir),
    text: { arabic: verse.text.arabic },
    translation: canonicalizeTranslations(verse.translation),
  };
}

/** Produces stable JSON for one exhaustive structured Quran row payload. */
export function canonicalizeQuranRow(payload: QuranRowPayload) {
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
    graph: canonicalizeLearningGraphIdentity(payload.graph),
    kind: payload.kind,
    locale: payload.locale,
    route: payload.route,
    surahNumber: payload.surahNumber,
    text: payload.text,
    title: payload.title,
  });
}

/** Computes one row's domain-separated content identity. */
export function hashQuranRow(payload: QuranRowPayload) {
  return Effect.try({
    catch: () => new QuranHashError({ scope: "row" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(`${ROW_DOMAIN}\n${canonicalizeQuranRow(payload)}`)
          .digest("hex")}`
      ),
  });
}

/** Creates one snapshot-bound row after verifying its payload hash. */
export const bindQuranRow = Effect.fn("AksaraContracts.bindQuranRow")(
  function* (snapshotId: Sha256Hash, payload: QuranRowPayload) {
    const rowHash = yield* hashQuranRow(payload);
    return QuranSnapshotRowSchema.make({ payload, rowHash, snapshotId });
  }
);
