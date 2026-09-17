import { Effect, Schema } from "effect";

import { LessonVoiceCheckError } from "#nakafa-content/voice/error";

/** Validated standalone checker options. */
const CliOptionsSchema = Schema.Struct({
  format: Schema.Literals(["json", "text"]),
  root: Schema.String,
  strictReview: Schema.Boolean,
});

export type CliOptions = typeof CliOptionsSchema.Type;

/** Parses the optional output format and lesson root arguments. */
export const parseArguments = Effect.fn("LessonVoiceCheck.parseArguments")(
  function* (arguments_: readonly string[]) {
    let format = "text";
    let root = "packages/corpus/material/lesson";
    let strictReview = false;

    for (let index = 0; index < arguments_.length; index += 1) {
      const argument = arguments_[index];
      if (argument === "--format") {
        const value = arguments_[index + 1];
        if (value === undefined) {
          return yield* new LessonVoiceCheckError({
            detail: "--format requires text or json",
            reason: "invalid-arguments",
          });
        }
        format = value;
        index += 1;
      } else if (argument === "--root") {
        const value = arguments_[index + 1];
        if (value === undefined) {
          return yield* new LessonVoiceCheckError({
            detail: "--root requires a directory",
            reason: "invalid-arguments",
          });
        }
        root = value;
        index += 1;
      } else if (argument === "--strict-review") {
        strictReview = true;
      } else {
        return yield* new LessonVoiceCheckError({
          detail: `Unknown argument: ${argument}`,
          reason: "invalid-arguments",
        });
      }
    }

    return yield* Schema.decodeUnknownEffect(CliOptionsSchema)({
      format,
      root,
      strictReview,
    }).pipe(
      Effect.mapError(
        () =>
          new LessonVoiceCheckError({
            detail: `Unsupported format: ${format}`,
            reason: "invalid-arguments",
          })
      )
    );
  }
);
