import { Schema } from "effect";

/** Non-empty Quran text shared by authored and published row contracts. */
export const QuranMeaningfulTextSchema = Schema.String.pipe(
  Schema.check(
    Schema.isPattern(/\S/u, {
      description:
        "Authored Quran text containing at least one visible character.",
      identifier: "QuranText",
      message: "Quran text cannot be empty.",
    })
  )
);

/** Verbatim Tanzil Arabic text without compatibility fields. */
export const QuranTextSchema = Schema.Struct({
  arabic: QuranMeaningfulTextSchema,
});
