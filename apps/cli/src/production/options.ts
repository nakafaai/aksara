import { Effect } from "effect";

import type { ProductionCommand } from "#cli/production/arguments";
import { productionArgumentsError } from "#cli/production/error";

/** Raw named options collected before domain decoding. */
export interface RawProductionOptions {
  manifestHash?: string;
  rebuild: boolean;
  recoveryId?: string;
  recoveryManifestHash?: string;
  releaseId?: string;
  scope: string[];
}

type ProductionOption =
  | "--manifest-hash"
  | "--rebuild"
  | "--recovery-id"
  | "--recovery-manifest-hash"
  | "--release-id"
  | "--scope";
type ValueProductionOption = Exclude<ProductionOption, "--rebuild">;
type UniqueProductionOption = Exclude<ValueProductionOption, "--scope">;

const OPTION_KEYS = {
  "--manifest-hash": "manifestHash",
  "--recovery-id": "recoveryId",
  "--recovery-manifest-hash": "recoveryManifestHash",
  "--release-id": "releaseId",
} as const satisfies Record<UniqueProductionOption, keyof RawProductionOptions>;

/** Narrows unknown command input to one supported named option. */
function isProductionOption(
  value: string | undefined
): value is ProductionOption {
  return (
    value === "--manifest-hash" ||
    value === "--rebuild" ||
    value === "--recovery-id" ||
    value === "--recovery-manifest-hash" ||
    value === "--release-id" ||
    value === "--scope"
  );
}

/** Checks whether one command owns the selected production option. */
function acceptsOption(command: ProductionCommand, option: ProductionOption) {
  if (command === "status") {
    return false;
  }
  if (option === "--rebuild") {
    return command === "release";
  }
  if (option === "--scope") {
    return command === "release";
  }
  if (option === "--manifest-hash" || option === "--recovery-manifest-hash") {
    return command === "audit";
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
  const options: RawProductionOptions = { rebuild: false, scope: [] };

  for (let index = 0; index < args.length; index += 1) {
    const option = args[index];
    if (!isProductionOption(option)) {
      return yield* productionArgumentsError(command, "command", "unknown");
    }
    if (!acceptsOption(command, option)) {
      return yield* productionArgumentsError(command, option, "unknown");
    }
    if (option === "--rebuild") {
      if (options.rebuild) {
        return yield* productionArgumentsError(command, option, "duplicate");
      }
      options.rebuild = true;
      continue;
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
