import { Array as Arr, Effect, Schema } from "effect";

/** A command line argument that the command does not declare, cannot take, or cannot receive a value. */
export class OptionArgumentError extends Schema.TaggedError<OptionArgumentError>()(
  "OptionArgumentError",
  { argument: Schema.String, detail: Schema.String }
) {}

/**
 * Whether one token is an option. A lone dash is a positional operand, as
 * Node's argument parser reads it, and every other dash-led token is an option.
 */
function isOptionToken(argument: string) {
  return argument.startsWith("-") && argument !== "-";
}

/**
 * Reads the declared name of one long option and the value that follows its
 * `=`, when it has one. Every other option token is refused.
 */
const readLongOption = Effect.fn("AksaraContracts.readLongOption")(function* (
  argument: string,
  declared: readonly string[]
) {
  if (!argument.startsWith("--")) {
    return yield* new OptionArgumentError({
      argument,
      detail: `Unknown option '${argument}'`,
    });
  }
  const equals = argument.indexOf("=");
  const name = equals === -1 ? argument.slice(2) : argument.slice(2, equals);
  if (!Arr.contains(declared, name)) {
    return yield* new OptionArgumentError({
      argument,
      detail: `Unknown option '--${name}'`,
    });
  }
  return {
    inline: equals === -1 ? undefined : argument.slice(equals + 1),
    name,
  };
});

/**
 * Parses `--name value` and `--name=value` options whose names the command declares,
 * with the same rules as Node's `util.parseArgs` in strict mode: a bare `--` ends the
 * options, an undeclared or single-dash option is refused, and a value may not start
 * with a dash unless it follows `=`.
 */
export const parseOptions = Effect.fn("AksaraContracts.parseOptions")(
  function* (
    args: readonly string[],
    declared: readonly string[],
    allowPositionals: boolean
  ) {
    const values: Record<string, string> = {};
    let positionals: readonly string[] = [];
    let endOfOptions = false;
    let remaining = args;
    while (Arr.isReadonlyArrayNonEmpty(remaining)) {
      const [argument, ...later] = remaining;
      remaining = later;
      if (!endOfOptions && argument === "--") {
        endOfOptions = true;
        continue;
      }
      if (endOfOptions || !isOptionToken(argument)) {
        if (!allowPositionals) {
          return yield* new OptionArgumentError({
            argument,
            detail: `Unexpected argument '${argument}'`,
          });
        }
        positionals = Arr.append(positionals, argument);
        continue;
      }
      const { inline, name } = yield* readLongOption(argument, declared);
      if (inline !== undefined) {
        values[name] = inline;
        continue;
      }
      const [value] = later;
      if (value === undefined || value.startsWith("-")) {
        return yield* new OptionArgumentError({
          argument,
          detail: `Option '--${name}' requires a value`,
        });
      }
      values[name] = value;
      remaining = Arr.drop(later, 1);
    }
    return { positionals, values };
  }
);
