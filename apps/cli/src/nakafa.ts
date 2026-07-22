import { CommandExecutor } from "@effect/platform/CommandExecutor";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Context, Effect, Layer, type Redacted } from "effect";
import type * as Scope from "effect/Scope";
import type { NakafaAppError } from "#cli/app-error";
import {
  type NakafaStartInput,
  type RunningNakafa,
  startNakafa,
} from "#cli/child";
import { waitForRenderer } from "#cli/renderer";

/** Injectable actual-app boundary used by the preview orchestration. */
export class NakafaApp extends Context.Tag("AksaraCliNakafaApp")<
  NakafaApp,
  {
    /** Fetches the exact live renderer envelope through its internal route. */
    readonly fetchRenderer: (
      origin: URL,
      token: Redacted.Redacted<string>
    ) => Effect.Effect<RendererManifestEnvelope, NakafaAppError>;
    /** Starts the actual Nakafa Next development app on IPv4 loopback. */
    readonly start: (
      input: NakafaStartInput
    ) => Effect.Effect<RunningNakafa, NakafaAppError, Scope.Scope>;
  }
>() {}

/** Actual Nakafa process and renderer endpoint implementation. */
export const NakafaAppLive = Layer.effect(
  NakafaApp,
  CommandExecutor.pipe(
    Effect.map((executor) =>
      NakafaApp.of({
        fetchRenderer: waitForRenderer,
        start: (input) => startNakafa(executor, input),
      })
    )
  )
);
