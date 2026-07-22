import { Effect } from "effect";
import { parsePreviewArguments } from "#cli/args";
import { readPreviewEnvironment } from "#cli/env";
import { NakafaAppLive } from "#cli/nakafa";
import { openLocalPreview } from "#cli/session";

/** Creates the single CLI boundary program without executing it eagerly. */
export function makePreviewProgram(input: {
  readonly args: readonly string[];
  readonly cwd: string;
}) {
  return Effect.gen(function* () {
    const args = yield* parsePreviewArguments(input.args);
    const environment = yield* readPreviewEnvironment();
    const session = yield* openLocalPreview({
      cwd: input.cwd,
      environment,
      requestedDocument: args.document,
    });
    return yield* session.run;
  }).pipe(Effect.provide(NakafaAppLive), Effect.scoped);
}
