import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { type Sha256Hash, Sha256HashSchema } from "#contracts/ids";
import { canonicalizeQuranAttribution } from "#contracts/quran/attribution";
import {
  type QuranRowPayload,
  type QuranRuntimeVerse,
  QuranSnapshotRowSchema,
} from "#contracts/quran/snapshot/row";
import type { QuranTafsirAccess } from "#contracts/quran/source";

const ROW_DOMAIN = "nakafa.aksara.quran-row";

/** Node could not compute a deterministic Quran row identity. */
export class QuranRowHashError extends Schema.TaggedError<QuranRowHashError>()(
  "QuranRowHashError",
  { scope: Schema.Literals(["digest", "row"]) }
) {}

/** Serializes one published translation list in signed field order. */
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

/** Serializes signed Tafsir access without trusting object insertion order. */
function canonicalizeTafsirAccess(access: QuranTafsirAccess) {
  return {
    appLocale: access.appLocale,
    kind: access.kind,
    notice: access.notice,
    sourceId: access.sourceId,
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
      sources: payload.sources.map(canonicalizeQuranAttribution),
      tafsirAccess: payload.tafsirAccess.map(canonicalizeTafsirAccess),
    });
  }
  if (payload.kind === "quran-surah") {
    return JSON.stringify({
      kind: payload.kind,
      name: {
        arabic: payload.name.arabic,
        meaning: {
          appLocale: payload.name.meaning.appLocale,
          text: payload.name.meaning.text,
        },
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
export const hashQuranRow = Effect.fn("AksaraContracts.hashQuranRow")(
  (payload: QuranRowPayload) =>
    Effect.try({
      catch: () => new QuranRowHashError({ scope: "row" }),
      try: () =>
        Sha256HashSchema.make(
          `sha256:${createHash("sha256")
            .update(`${ROW_DOMAIN}\n${canonicalizeQuranRow(payload)}`)
            .digest("hex")}`
        ),
    })
);

/** Creates one snapshot-bound current row. */
export const bindQuranRow = Effect.fn("AksaraContracts.bindQuranRow")(
  function* (snapshotId: Sha256Hash, payload: QuranRowPayload) {
    const rowHash = yield* hashQuranRow(payload);
    return QuranSnapshotRowSchema.make({ payload, rowHash, snapshotId });
  }
);
