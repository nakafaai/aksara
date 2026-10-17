import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Schema } from "effect";

/** One exact official source file or bundle could not be authenticated. */
export class QuranSourceFileError extends Schema.TaggedError<
  QuranSourceFileError,
  { readonly brand: unique symbol }
>()("QuranSourceFileError", {
  detail: Schema.String,
}) {}

/** A source load requested a locale subset that has no honest physical bundle. */
export class QuranSourceLocaleError extends Schema.TaggedError<
  QuranSourceLocaleError,
  { readonly brand: unique symbol }
>()("QuranSourceLocaleError", {
  appLocales: Schema.Array(AppLocaleSchema),
}) {}

/** Maps one failed digest of pinned Quran source bytes to a source error that names what failed. */
export function digestFailure(detail: string) {
  return () => new QuranSourceFileError({ detail });
}
