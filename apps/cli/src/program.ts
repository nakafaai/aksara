import { Effect } from "effect";
import { runAbortCommand } from "#cli/abort";
import { runAcceptCommand } from "#cli/accept";
import { parseCliArguments } from "#cli/args";
import { runCheckCommand } from "#cli/check";
import { runCleanupCommand } from "#cli/cleanup";
import { runTryoutMigrationCommand } from "#cli/migration/tryout";
import { runPreviewCommand } from "#cli/preview";
import { runProductionCommand } from "#cli/production/command";
import { runRecoverCommand } from "#cli/recover";
import { runStatusCommand } from "#cli/status";

/** Creates the single CLI boundary program for preview and production commands. */
export function makeCliProgram(input: {
  readonly args: readonly string[];
  readonly cwd: string;
}) {
  return Effect.gen(function* () {
    const args = yield* parseCliArguments(input.args);
    if (args.command === "preview") {
      return yield* runPreviewCommand({ cwd: input.cwd, preview: args });
    }
    if (args.command === "check") {
      return yield* runCheckCommand(input.cwd);
    }
    if (args.command === "abort") {
      return yield* runAbortCommand(args);
    }
    if (args.command === "accept") {
      return yield* runAcceptCommand(args);
    }
    if (args.command === "cleanup") {
      return yield* runCleanupCommand(args);
    }
    if (args.command === "recover") {
      return yield* runRecoverCommand(args);
    }
    if (args.command === "status") {
      return yield* runStatusCommand;
    }
    if (args.command === "migrate-tryout-history") {
      return yield* runTryoutMigrationCommand(args);
    }
    return yield* runProductionCommand({ args, cwd: input.cwd });
  });
}
