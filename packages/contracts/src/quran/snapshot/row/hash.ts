import { createHash } from "node:crypto";

import { Array as Arr, Effect, Schema } from "effect";

import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { type Sha256Hash, Sha256HashSchema } from "#contracts/ids";
import { canonicalizeQuranAttribution } from "#contracts/quran/attribution";
import {
  type QuranRowPayload,
  type QuranRuntimeVerse,
  QuranSnapshotRowSchema,
} from "#contracts/quran/snapshot/row";
import type { QuranTafsirAccess } from "#contracts/quran/source";
import { encodeJsonText } from "#contracts/text/json";

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
  return Arr.map(translations, (translation) => ({
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
    tafsir: Arr.map(verse.tafsir, (entry) => ({
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
    return encodeJsonText({
      activeAppLocales: payload.activeAppLocales,
      kind: payload.kind,
      sources: Arr.map(payload.sources, canonicalizeQuranAttribution),
      tafsirAccess: Arr.map(payload.tafsirAccess, canonicalizeTafsirAccess),
    });
  }
  if (payload.kind === "quran-surah") {
    return encodeJsonText({
      kind: payload.kind,
      name: {
        arabic: payload.name.arabic,
        meaning: {
          de: payload.name.meaning.de,
          en: payload.name.meaning.en,
          id: payload.name.meaning.id,
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
    return encodeJsonText({
      firstQuranNumber: payload.firstQuranNumber,
      firstVerse: payload.firstVerse,
      kind: payload.kind,
      lastVerse: payload.lastVerse,
      surahNumber: payload.surahNumber,
      verses: Arr.map(payload.verses, canonicalizeVerse),
    });
  }
  return encodeJsonText({
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
