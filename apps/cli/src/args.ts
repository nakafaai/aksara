import { Effect, Schema } from "effect";

/** One exact authored document requested by the local preview command. */
export interface PreviewArguments {
  readonly document: string;
}

/** Command-line arguments do not describe one unambiguous document. */
export class PreviewArgumentsError extends Schema.TaggedError<PreviewArgumentsError>()(
  "PreviewArgumentsError",
  {
    reason: Schema.Literal("duplicate", "missing", "unknown", "value"),
  }
) {}

/** Decodes only `--document <path>` and rejects every ambiguous argument. */
export const parsePreviewArguments = Effect.fn("AksaraCli.parseArguments")(
  (args: readonly string[]) => {
    let document: string | undefined;
    for (let index = 0; index < args.length; index += 1) {
      const argument = args[index];
      if (argument !== "--document") {
        return Effect.fail(new PreviewArgumentsError({ reason: "unknown" }));
      }
      if (document !== undefined) {
        return Effect.fail(new PreviewArgumentsError({ reason: "duplicate" }));
      }
      const value = args[index + 1];
      if (!(value && value.trim().length > 0 && value !== "--document")) {
        return Effect.fail(new PreviewArgumentsError({ reason: "value" }));
      }
      document = value;
      index += 1;
    }
    if (document === undefined) {
      return Effect.fail(new PreviewArgumentsError({ reason: "missing" }));
    }
    return Effect.succeed({ document } satisfies PreviewArguments);
  }
);
