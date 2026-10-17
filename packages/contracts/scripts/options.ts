import { Array as Arr, Effect, Schema } from "effect";

/** A command line argument that the command does not declare, cannot take, or cannot receive a value. */
export class OptionArgumentError extends Schema.TaggedError<OptionArgumentError>()(
  "OptionArgumentError",
  { argument: Schema.String, detail: Schema.String }
) {}

/** Parses `--name value` and `--name=value` options whose names the command declares. */
export const parseOptions = Effect.fn("AksaraContracts.parseOptions")(
  function* (
    args: readonly string[],
    declared: readonly string[],
    allowPositionals: boolean
  ) {
    const values: Record<string, string> = {};
    let positionals: readonly string[] = [];
    let remaining = args;
    while (Arr.isReadonlyArrayNonEmpty(remaining)) {
      const [argument, ...later] = remaining;
      remaining = later;
      if (!argument.startsWith("--")) {
        if (!allowPositionals) {
          return yield* new OptionArgumentError({
            argument,
            detail: `Unexpected argument '${argument}'`,
          });
        }
        positionals = Arr.append(positionals, argument);
        continue;
      }
      const equals = argument.indexOf("=");
      const name =
        equals === -1 ? argument.slice(2) : argument.slice(2, equals);
      if (!Arr.contains(declared, name)) {
        return yield* new OptionArgumentError({
          argument,
          detail: `Unknown option '--${name}'`,
        });
      }
      if (equals !== -1) {
        values[name] = argument.slice(equals + 1);
        continue;
      }
      const [value] = later;
      if (value === undefined || value.startsWith("--")) {
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
