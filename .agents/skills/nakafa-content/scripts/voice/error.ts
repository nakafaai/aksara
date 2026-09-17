import { Schema } from "effect";

/**
 * Typed failure for the standalone lesson voice checker.
 *
 * Every failure names a machine-readable reason so the CLI boundary maps it
 * to a stable process exit code without parsing message text.
 */
export class LessonVoiceCheckError extends Schema.TaggedError<LessonVoiceCheckError>()(
  "LessonVoiceCheckError",
  {
    detail: Schema.String,
    reason: Schema.Literals([
      "empty-root",
      "invalid-arguments",
      "unparseable-document",
      "unreadable-entry",
    ]),
  }
) {}
