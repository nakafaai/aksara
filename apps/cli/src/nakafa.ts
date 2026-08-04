import { HttpClient } from "@effect/platform";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Context, Effect, Layer } from "effect";
import type * as Scope from "effect/Scope";
import type { NakafaAppError } from "#cli/app-error";
import { NakafaProcess, NakafaProcessLive } from "#cli/child/process";
import {
  type NakafaStartInput,
  type RunningNakafa,
  startNakafa,
} from "#cli/child/session";
import type { RendererCredentials } from "#cli/credentials";
import { waitForRenderer } from "#cli/renderer/manifest";

/** Injectable actual-app boundary used by the preview orchestration. */
export class NakafaApp extends Context.Tag("AksaraCliNakafaApp")<
  NakafaApp,
  {
    /** Fetches the exact live renderer envelope through its internal route. */
    readonly fetchRenderer: (
      origin: URL,
      credentials: RendererCredentials
    ) => Effect.Effect<RendererManifestEnvelope, NakafaAppError>;
    /** Starts the actual Nakafa Next development app on localhost. */
    readonly start: (
      input: NakafaStartInput
    ) => Effect.Effect<RunningNakafa, NakafaAppError, Scope.Scope>;
  }
>() {}

/** Actual Nakafa process and renderer endpoint implementation. */
export const NakafaAppLive = Layer.effect(
  NakafaApp,
  Effect.all([NakafaProcess, HttpClient.HttpClient]).pipe(
    Effect.map(([processes, client]) =>
      NakafaApp.of({
        fetchRenderer: (origin, token) =>
          waitForRenderer(origin, token).pipe(
            Effect.provideService(HttpClient.HttpClient, client)
          ),
        start: (input) =>
          startNakafa(input).pipe(
            Effect.provideService(NakafaProcess, processes)
          ),
      })
    )
  )
).pipe(Layer.provide(NakafaProcessLive));
