import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

import { canonicalizeLearningGraphIdentity } from "#contracts/graph/spec";
import { type Sha256Hash, Sha256HashSchema } from "#contracts/ids";
import {
  type QuranRowPayload,
  type QuranRuntimeVerse,
  QuranSnapshotRowSchema,
} from "#contracts/quran/spec";

const ROW_DOMAIN = "nakafa.aksara.quran-row.v1";

/** Node could not complete a deterministic Quran row hash operation. */
export class QuranHashError extends Schema.TaggedError<QuranHashError>()(
  "QuranHashError",
  { scope: Schema.Literal("row") }
) {}

/** Serializes locale-indexed Quran text in fixed application order. */
function canonicalizeLocalizedText(text: {
  readonly en: string;
  readonly id: string;
}) {
  return { en: text.en, id: text.id };
}

/** Serializes one reviewed Quran audio source in fixed field order. */
function canonicalizeAudio(audio: QuranRuntimeVerse["audio"]) {
  return {
    primary: audio.primary,
    secondary: [audio.secondary[0], audio.secondary[1]],
  };
}

/** Serializes Arabic text and its reviewed transliteration. */
function canonicalizeText(text: QuranRuntimeVerse["text"]) {
  return {
    arab: text.arab,
    transliteration: { en: text.transliteration.en },
  };
}

/** Serializes one complete runtime verse without trusting object insertion. */
function canonicalizeVerse(verse: QuranRuntimeVerse) {
  return {
    audio: canonicalizeAudio(verse.audio),
    meta: {
      hizbQuarter: verse.meta.hizbQuarter,
      juz: verse.meta.juz,
      manzil: verse.meta.manzil,
      page: verse.meta.page,
      ruku: verse.meta.ruku,
      sajda: {
        obligatory: verse.meta.sajda.obligatory,
        recommended: verse.meta.sajda.recommended,
      },
    },
    number: {
      inQuran: verse.number.inQuran,
      inSurah: verse.number.inSurah,
    },
    tafsir: { id: { short: verse.tafsir.id.short } },
    text: canonicalizeText(verse.text),
    translation: canonicalizeLocalizedText(verse.translation),
  };
}

/** Produces stable JSON for one exhaustive structured Quran row payload. */
export function canonicalizeQuranRow(payload: QuranRowPayload) {
  if (payload.kind === "quran-surah") {
    return JSON.stringify({
      kind: payload.kind,
      name: {
        long: payload.name.long,
        short: payload.name.short,
        translation: canonicalizeLocalizedText(payload.name.translation),
        transliteration: canonicalizeLocalizedText(
          payload.name.transliteration
        ),
      },
      number: payload.number,
      numberOfVerses: payload.numberOfVerses,
      preBismillah:
        payload.preBismillah === null
          ? null
          : {
              audio: canonicalizeAudio(payload.preBismillah.audio),
              text: canonicalizeText(payload.preBismillah.text),
              translation: canonicalizeLocalizedText(
                payload.preBismillah.translation
              ),
            },
      revelation: {
        arab: payload.revelation.arab,
        en: payload.revelation.en,
        id: payload.revelation.id,
      },
      sequence: payload.sequence,
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
    description: payload.description,
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
