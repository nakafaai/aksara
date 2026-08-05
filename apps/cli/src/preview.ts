import { Effect } from "effect";
import type { PreviewArguments } from "#cli/args";
import { readPreviewEnvironment } from "#cli/environment/read";
import { NakafaAppLive } from "#cli/nakafa";
import { openLocalPreview } from "#cli/session";

/** Opens the actual Nakafa preview for one already decoded document request. */
export function runPreviewCommand(input: {
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
