import { QuranTranslationSchema } from "@nakafa/aksara-contracts/quran/notes";
import { QURAN_VERSE_COUNT } from "@nakafa/aksara-contracts/quran/spec";
import { Effect, MutableList, Schema } from "effect";
import { quranGenerationFailure } from "#corpus/quran/source/error";
import type { SurahMetadata, Tafsir } from "#corpus/quran/source/model";

const TafsirRowSchema = Schema.Struct({
  arabic_text: Schema.String,
  aya: Schema.String,
  footnotes: Schema.NullOr(Schema.String),
  id: Schema.String,
  sura: Schema.String,
  translation: Schema.String,
});

const TafsirResponseSchema = Schema.Struct({
  result: Schema.Array(TafsirRowSchema),
});
const TafsirJsonSchema = Schema.fromJsonString(TafsirResponseSchema);

/**
 * Parses one bundle of exact QuranEnc API responses (the Indonesian Tafsir,
 * the Malay translation) into one text and its notes per verse, in order.
 */
export const parseQuranEncResponses = Effect.fn(
  "AksaraCorpus.parseQuranEncResponses"
)(function* (
  sources: readonly string[],
  metadata: readonly SurahMetadata[],
  label: string
) {
  const tafsirRows = MutableList.make<Tafsir>();
  yield* Effect.forEach(
    sources,
    (source, surahIndex) =>
      Effect.gen(function* () {
        const response = yield* Schema.decodeEffect(TafsirJsonSchema)(source, {
          onExcessProperty: "error",
        }).pipe(
          Effect.mapError(() =>
            quranGenerationFailure(
              `Invalid QuranEnc response for surah ${surahIndex + 1}.`
            )
          )
        );
        const expected = metadata[surahIndex];
        if (!expected || response.result.length !== expected.numberOfVerses) {
          return yield* quranGenerationFailure(
            `Incomplete QuranEnc ${label} surah ${surahIndex + 1}.`
          );
        }
        yield* Effect.forEach(
          response.result,
          (row, verseIndex) =>
            Effect.gen(function* () {
              if (
                Number(row.sura) !== surahIndex + 1 ||
                Number(row.aya) !== verseIndex + 1 ||
                row.translation.length === 0
              ) {
                return yield* quranGenerationFailure(
                  `Invalid QuranEnc ${label} verse ${surahIndex + 1}:${verseIndex + 1}.`
                );
              }
              MutableList.append(tafsirRows, {
                footnotes: row.footnotes,
                text: row.translation,
              });
            }),
          { discard: true }
        );
      }),
    { discard: true }
  );
  const tafsir = MutableList.toArray(tafsirRows);
  if (tafsir.length !== QURAN_VERSE_COUNT) {
    return yield* quranGenerationFailure(`QuranEnc ${label} is incomplete.`);
  }
  return tafsir;
});

/** Parses one QuranEnc response bundle into checked translation rows. */
export const parseResponseTranslation = Effect.fn(
  "AksaraCorpus.parseQuranResponseTranslation"
)(function* (sources: readonly string[], metadata: readonly SurahMetadata[]) {
  const rows = yield* parseQuranEncResponses(sources, metadata, "translation");
  return yield* Effect.forEach(rows, ({ footnotes, text }, index) =>
    Schema.decodeEffect(QuranTranslationSchema)(
      { footnotes: footnotes ?? "", text },
      { onExcessProperty: "error" }
    ).pipe(
      Effect.mapError(() =>
        quranGenerationFailure(
          `Invalid QuranEnc translation notes at verse ${index + 1}.`
        )
      )
    )
  );
});
