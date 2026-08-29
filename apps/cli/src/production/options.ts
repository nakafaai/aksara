import { Effect } from "effect";

import type { ProductionCommand } from "#cli/production/arguments";
import { productionArgumentsError } from "#cli/production/error";

/** Raw named options collected before domain decoding. */
export interface RawProductionOptions {
  assetHash?: string;
  bundlePath?: string;
  receiptPath?: string;
  recoveryId?: string;
  releaseId?: string;
  scope: string[];
  sourceSha?: string;
}

type ProductionOption =
  | "--asset-hash"
  | "--bundle-path"
  | "--recovery-id"
  | "--release-id"
  | "--receipt-path"
  | "--scope"
  | "--source-sha";
type UniqueProductionOption = Exclude<ProductionOption, "--scope">;

const OPTION_KEYS = {
  "--asset-hash": "assetHash",
  "--bundle-path": "bundlePath",
  "--receipt-path": "receiptPath",
  "--recovery-id": "recoveryId",
  "--release-id": "releaseId",
  "--source-sha": "sourceSha",
} as const satisfies Record<UniqueProductionOption, keyof RawProductionOptions>;

/** Narrows unknown command input to one supported named option. */
function isProductionOption(
  value: string | undefined
): value is ProductionOption {
  return (
    value === "--asset-hash" ||
    value === "--bundle-path" ||
    value === "--recovery-id" ||
    value === "--receipt-path" ||
    value === "--release-id" ||
    value === "--scope" ||
    value === "--source-sha"
  );
}

/** Checks whether one command owns the selected production option. */
function acceptsOption(command: ProductionCommand, option: ProductionOption) {
  if (command === "status") {
    return false;
  }
  if (command === "genesis") {
    return option === "--bundle-path";
  }
  if (command === "cleanup-tryout-history") {
    return (
      option === "--asset-hash" ||
      option === "--release-id" ||
      option === "--receipt-path" ||
      option === "--source-sha"
    );
  }
  if (command === "migrate-tryout-history") {
    return option === "--release-id" || option === "--receipt-path";
  }
  if (command === "abort-tryout-history") {
    return option === "--release-id";
  }
  if (
    option === "--asset-hash" ||
    option === "--bundle-path" ||
    option === "--receipt-path" ||
    option === "--source-sha"
  ) {
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
