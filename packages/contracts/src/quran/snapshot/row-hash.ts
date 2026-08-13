import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { type Sha256Hash, Sha256HashSchema } from "#contracts/ids";
import {
  type QuranRowPayload,
  type QuranRuntimeVerse,
  type QuranSnapshotRow,
  QuranSnapshotRowSchema,
} from "#contracts/quran/snapshot/row";
import type { QuranSourceAttribution } from "#contracts/quran/source";

const ROW_DOMAIN = "nakafa.aksara.quran-row";

/** Node could not compute a deterministic Quran row identity. */
export class QuranRowHashError extends Schema.TaggedError<QuranRowHashError>()(
  "QuranRowHashError",
  { scope: Schema.Literal("digest", "row") }
) {}

/** Serializes one current translation list in signed field order. */
function canonicalizeTranslations(
  translations: QuranRuntimeVerse["translations"]
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
function canonicalizeAttribution(source: QuranSourceAttribution) {
  return {
    artifact: {
      byteCount: source.artifact.byteCount,
      digest: source.artifact.digest,
      fileCount: source.artifact.fileCount,
    },
    copy: source.copy.map((entry) => ({
      appLocale: entry.appLocale,
      notice: entry.notice,
      title: entry.title,
    })),
    id: source.id,
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
    updateUrl: source.updateUrl,
    version: source.version,
  };
}

/** Serializes one current runtime verse without insertion-order trust. */
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
export function canonicalizeQuranRow(payload: QuranRowPayload) {
  if (payload.kind === "quran-attribution") {
    return JSON.stringify({
      activeAppLocales: payload.activeAppLocales,
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
export function hashQuranRow(payload: QuranRowPayload) {
  return Effect.try({
    catch: () => new QuranRowHashError({ scope: "row" }),
    try: () =>
      Sha256HashSchema.make(
        `sha256:${createHash("sha256")
          .update(`${ROW_DOMAIN}\n${canonicalizeQuranRow(payload)}`)
          .digest("hex")}`
      ),
  });
}

/** Creates one snapshot-bound current row. */
export const bindQuranRow = Effect.fn("AksaraContracts.bindQuranRow")(
  function* (snapshotId: Sha256Hash, payload: QuranRowPayload) {
    const rowHash = yield* hashQuranRow(payload);
    return QuranSnapshotRowSchema.make({ payload, rowHash, snapshotId });
  }
);

/** Recomputes one current row hash for streamed verification. */
export function verifyQuranRowHash(
  row: Pick<QuranSnapshotRow, "payload" | "rowHash">
) {
  return hashQuranRow(row.payload);
}
