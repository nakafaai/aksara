import { Effect } from "effect";

import type { ProductionCommand } from "#cli/production/arguments";
import { productionArgumentsError } from "#cli/production/error";

/** Raw named options collected before domain decoding. */
export interface RawProductionOptions {
  recoveryId?: string;
  releaseId?: string;
  scope: string[];
}

type ProductionOption = "--recovery-id" | "--release-id" | "--scope";
type UniqueProductionOption = Exclude<ProductionOption, "--scope">;

const OPTION_KEYS = {
  "--recovery-id": "recoveryId",
  "--release-id": "releaseId",
} as const satisfies Record<UniqueProductionOption, keyof RawProductionOptions>;

/** Narrows unknown command input to one supported named option. */
function isProductionOption(
  value: string | undefined
): value is ProductionOption {
  return (
    value === "--recovery-id" || value === "--release-id" || value === "--scope"
  );
}

/** Checks whether one command owns the selected production option. */
function acceptsOption(command: ProductionCommand, option: ProductionOption) {
  if (command === "status") {
    return false;
  }
  if (option === "--scope") {
    return command === "release";
  }
  if (option === "--recovery-id") {
    return command !== "abort" && command !== "cleanup";
  }
  return true;
}

/** Reads strict production options without aliases or positional IDs. */
export const parseProductionOptions = Effect.fn(
  "AksaraCli.parseProductionOptions"
)(function* (command: ProductionCommand, args: readonly string[]) {
  const options: RawProductionOptions = { scope: [] };

  for (let index = 0; index < args.length; index += 1) {
    const option = args[index];
    if (!isProductionOption(option)) {
      return yield* productionArgumentsError(command, "command", "unknown");
    }
    if (!acceptsOption(command, option)) {
      return yield* productionArgumentsError(command, option, "unknown");
    }
    const value = args[index + 1];
    if (!(value && value.trim().length > 0 && !value.startsWith("--"))) {
      return yield* productionArgumentsError(command, option, "value");
    }
    if (option === "--scope") {
      options.scope.push(value);
      index += 1;
      continue;
    }
    const key = OPTION_KEYS[option];
    if (options[key] !== undefined) {
      return yield* productionArgumentsError(command, option, "duplicate");
    }
    options[key] = value;
    index += 1;
  }

  return options;
});
