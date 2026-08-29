import type { CliArguments } from "#cli/args";
import { runGenesisCommand } from "#cli/genesis/run";
import { runTryoutAbortCommand } from "#cli/migration/abort";
import { runTryoutCleanupCommand } from "#cli/migration/cleanup";
import { runTryoutMigrationCommand } from "#cli/migration/seal";

export type MigrationArguments = Extract<
  CliArguments,
  {
    readonly command:
      | "abort-tryout-history"
      | "cleanup-tryout-history"
      | "genesis"
      | "migrate-tryout-history";
  }
>;

/** Narrows commands owned by the one-time try-out migration boundary. */
export function isMigrationCommand(
  args: CliArguments
): args is MigrationArguments {
  return (
    args.command === "abort-tryout-history" ||
    args.command === "cleanup-tryout-history" ||
    args.command === "genesis" ||
    args.command === "migrate-tryout-history"
  );
}

/** Dispatches one temporary try-out migration operation. */
export function runMigrationCommand(args: MigrationArguments) {
  if (args.command === "genesis") {
    return runGenesisCommand(args);
  }
  if (args.command === "cleanup-tryout-history") {
    return runTryoutCleanupCommand(args);
  }
  if (args.command === "abort-tryout-history") {
    return runTryoutAbortCommand(args);
  }
  return runTryoutMigrationCommand(args);
}
