import { Schema } from "effect";

/**
 * Typed failure for the standalone lesson voice checker.
 *
 * Every failure names a machine-readable reason so the CLI boundary maps it
 * to a stable process exit code without parsing message text. The unions use
 * the array form because the installed Effect release candidate only matches
 * the first member of a variadic multi-member literal.
 */
export class LessonVoiceCheckError extends Schema.TaggedError<LessonVoiceCheckError>()(
  "LessonVoiceCheckError",
  {
    detail: Schema.String,
    reason: Schema.Union([
      Schema.Literal("empty-root"),
      Schema.Literal("invalid-arguments"),
      Schema.Literal("unparseable-document"),
      Schema.Literal("unreadable-entry"),
    ]),
  }
) {}
