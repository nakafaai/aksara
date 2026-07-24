import { Schema } from "effect";

/** An exact pinned Quran source could not be decoded without alteration. */
export class QuranGenerationError extends Schema.TaggedError<QuranGenerationError>()(
  "QuranGenerationError",
  { detail: Schema.String }
) {}

/** Creates one source-specific, reviewable generation failure. */
export function quranGenerationFailure(detail: string) {
  return new QuranGenerationError({ detail });
}
