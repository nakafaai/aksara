import { Schema } from "effect";

/** Typed failure for a locale outside the three lesson locales. */
export class UnsupportedLessonLocale extends Schema.TaggedError<
  UnsupportedLessonLocale,
  { readonly brand: unique symbol }
>()("UnsupportedLessonLocale", {
  locale: Schema.String,
}) {}
