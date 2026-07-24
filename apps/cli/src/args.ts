import { Effect, Schema } from "effect";
import {
  isProductionCommand,
  type ProductionArguments,
  parseProductionArguments,
} from "#cli/production-arguments";

/** One exact authored document requested by the local preview command. */
export interface PreviewArguments {
  readonly document: string;
}

/** Read-only whole-catalog validation requested without production inputs. */
export interface CheckArguments {
  readonly command: "check";
}

/** Current CLI command decoded through its owning strict boundary. */
export type CliArguments =
  | ({ readonly command: "preview" } & PreviewArguments)
  | CheckArguments
  | ProductionArguments;

/** Command-line arguments do not describe one unambiguous document. */
export class PreviewArgumentsError extends Schema.TaggedError<PreviewArgumentsError>()(
  "PreviewArgumentsError",
  {
    reason: Schema.Literal("duplicate", "missing", "unknown", "value"),
  }
) {}

/** Check arguments contain unsupported positional or named values. */
export class CheckArgumentsError extends Schema.TaggedError<CheckArgumentsError>()(
  "CheckArgumentsError",
  { reason: Schema.Literal("unknown") }
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

/** Dispatches implicit preview and explicit production command arguments. */
export const parseCliArguments = Effect.fn("AksaraCli.parseCliArguments")(
  function* (args: readonly string[]) {
    const [command] = args;
    if (command === "check") {
      if (args.length !== 1) {
        return yield* new CheckArgumentsError({ reason: "unknown" });
      }
      return { command } satisfies CheckArguments;
    }
    if (!isProductionCommand(command)) {
      const preview = yield* parsePreviewArguments(args);
      return { command: "preview", ...preview } satisfies CliArguments;
    }
    return yield* parseProductionArguments(command, args.slice(1));
  }
);
