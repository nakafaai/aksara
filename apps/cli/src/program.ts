import { Effect } from "effect";
import { runAbortCommand } from "#cli/abort";
import { runAcceptCommand } from "#cli/accept";
import { type PreviewArguments, parseCliArguments } from "#cli/args";
import { runCleanupCommand } from "#cli/cleanup";
import { readPreviewEnvironment } from "#cli/env";
import { NakafaAppLive } from "#cli/nakafa";
import { runProductionCommand } from "#cli/production";
import { runRecoverCommand } from "#cli/recover";
import { openLocalPreview } from "#cli/session";
import { runStatusCommand } from "#cli/status";

/** Opens the actual-app preview for one already decoded document request. */
function runPreview(input: {
  readonly cwd: string;
  readonly preview: PreviewArguments;
}) {
  return Effect.gen(function* () {
    const environment = yield* readPreviewEnvironment();
    const session = yield* openLocalPreview({
      cwd: input.cwd,
      environment,
      requestedDocument: input.preview.document,
    });
    return yield* session.run;
  }).pipe(Effect.provide(NakafaAppLive), Effect.scoped);
}

/** Creates the single CLI boundary program for preview and production commands. */
export function makeCliProgram(input: {
  readonly args: readonly string[];
  readonly cwd: string;
}) {
  return Effect.gen(function* () {
    const args = yield* parseCliArguments(input.args);
    if (args.command === "preview") {
      return yield* runPreview({ cwd: input.cwd, preview: args });
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
      return yield* runStatusCommand();
    }
    return yield* runProductionCommand({ args, cwd: input.cwd });
  });
}
