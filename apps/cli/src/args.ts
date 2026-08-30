import {
  type AppLocale,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, Option, Schema } from "effect";
import { type InfoCommand, parseInfoArguments } from "#cli/about";
import {
  isProductionCommand,
  type ProductionArguments,
  parseProductionArguments,
} from "#cli/production/arguments";

/** One exact authored document requested by the local preview command. */
export interface PreviewArguments {
  readonly appLocale?: AppLocale;
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
  | { readonly command: InfoCommand }
  | ProductionArguments;

/** Command-line arguments do not describe one unambiguous document. */
export class PreviewArgumentsError extends Schema.TaggedError<PreviewArgumentsError>()(
  "PreviewArgumentsError",
  {
    reason: Schema.Literals(["duplicate", "missing", "unknown", "value"]),
  }
) {}

/** Check arguments contain unsupported positional or named values. */
export class CheckArgumentsError extends Schema.TaggedError<CheckArgumentsError>()(
  "CheckArgumentsError",
  { reason: Schema.Literal("unknown") }
) {}

const isAppLocale = Schema.is(AppLocaleSchema);

/** Decodes one document and its optional explicit application locale. */
export const parsePreviewArguments = Effect.fn("AksaraCli.parseArguments")(
  function* (args: readonly string[]) {
    let appLocale: AppLocale | undefined;
    let document: string | undefined;
    for (let index = 0; index < args.length; index += 1) {
      const argument = args[index];
      if (argument !== "--app-locale" && argument !== "--document") {
        return yield* new PreviewArgumentsError({ reason: "unknown" });
      }
      const value = args[index + 1];
      if (!(value && value.trim().length > 0 && !value.startsWith("--"))) {
        return yield* new PreviewArgumentsError({ reason: "value" });
      }
      if (argument === "--app-locale") {
        if (appLocale !== undefined) {
          return yield* new PreviewArgumentsError({ reason: "duplicate" });
        }
        if (!isAppLocale(value)) {
          return yield* new PreviewArgumentsError({ reason: "value" });
        }
        appLocale = value;
        index += 1;
        continue;
      }
      if (document !== undefined) {
        return yield* new PreviewArgumentsError({ reason: "duplicate" });
      }
      document = value;
      index += 1;
    }
    if (document === undefined) {
      return yield* new PreviewArgumentsError({ reason: "missing" });
    }
    return {
      document,
      ...(appLocale === undefined ? {} : { appLocale }),
    } satisfies PreviewArguments;
  }
);

/** Dispatches implicit preview and explicit production command arguments. */
export const parseCliArguments = Effect.fn("AksaraCli.parseCliArguments")(
  function* (args: readonly string[]) {
    const info = yield* parseInfoArguments(args);
    if (Option.isSome(info)) {
      return info.value === "help"
        ? ({ command: "help" } satisfies CliArguments)
        : ({ command: "version" } satisfies CliArguments);
    }
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
