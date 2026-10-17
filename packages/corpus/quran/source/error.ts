import { Schema } from "effect";

/** An exact pinned Quran source could not be decoded without alteration. */
export class QuranGenerationError extends Schema.TaggedError<
  QuranGenerationError,
  { readonly brand: unique symbol }
>()("QuranGenerationError", { detail: Schema.String }) {}

/** Creates one source-specific, reviewable generation failure. */
export function quranGenerationFailure(detail: string) {
  return new QuranGenerationError({ detail });
}

/** Download, integrity, or atomic installation of one German source failed. */
export class GermanQuranSourceSyncError extends Schema.TaggedError<
  GermanQuranSourceSyncError,
  { readonly brand: unique symbol }
>()("GermanQuranSourceSyncError", {
  cause: Schema.Unknown,
  phase: Schema.Literals(["download", "integrity", "write"]),
  source: Schema.Trimmed.check(Schema.isNonEmpty()),
}) {}
