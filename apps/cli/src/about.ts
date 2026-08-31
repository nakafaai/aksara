import { Console, Effect, Option, Schema } from "effect";

/** Informational commands that never enter authoring or publication. */
export const InfoCommandSchema = Schema.Literals(["help", "version"]);
export type InfoCommand = typeof InfoCommandSchema.Type;

/** Informational arguments contain unsupported trailing values. */
export class InfoArgumentsError extends Schema.TaggedError<InfoArgumentsError>()(
  "InfoArgumentsError",
  { reason: Schema.Literal("unknown") }
) {}

const HELP = `Aksara CLI

Usage:
  aksara --document <path> [--app-locale <id|en|de>]
  aksara check
  aksara status
  aksara release --release-id <id> --recovery-id <id> --scope <selector> [--rebuild]
  aksara accept --release-id <id> --recovery-id <id>
  aksara recover --release-id <id> --recovery-id <id>
  aksara abort --release-id <id>
  aksara cleanup --release-id <id>

Options:
  -h, --help       Show this help
  -v, --version    Show the installed CLI version

Authoring and publication commands must run inside an Aksara checkout.
Preview and catalog checks also require the matching Nakafa checkout.`;

/** Prints one stable informational response at the outer CLI boundary. */
export const printCliInfo = Effect.fn("AksaraCli.printInfo")(
  (command: InfoCommand, version: string) =>
    Console.log(command === "help" ? HELP : version)
);

/** Decodes exact informational flags without claiming operational arguments. */
export const parseInfoArguments = Effect.fn("AksaraCli.parseInfoArguments")(
  function* (args: readonly string[]) {
    const [argument] = args;
    let command: InfoCommand | undefined;
    if (argument === "--help" || argument === "-h") {
      command = "help";
    } else if (argument === "--version" || argument === "-v") {
      command = "version";
    }
    if (command === undefined) {
      return Option.none<InfoCommand>();
    }
    if (args.length !== 1) {
      return yield* new InfoArgumentsError({ reason: "unknown" });
    }
    return Option.some(command);
  }
);
