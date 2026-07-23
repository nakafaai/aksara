import { HttpClient } from "@effect/platform";
import { CommandExecutor } from "@effect/platform/CommandExecutor";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { makePreviewCredentials } from "#cli/credentials";
import { NakafaApp, NakafaAppLive } from "#cli/nakafa";
import type { PreviewProvider } from "#cli/provider";
import { makeTestExecutor } from "#test/command";
import { captureClient, webResponse } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";

describe("Nakafa app service", () => {
  it("wires renderer discovery and child startup implementations", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(
        webResponse(request, JSON.stringify(RENDERER_MANIFEST), {
          headers: {
            "cache-control": "no-store",
            "content-type": "application/json",
          },
        })
      )
    );
    const credentials = await Effect.runPromise(makePreviewCredentials());
    const provider: PreviewProvider = {
      eventsPath: "/v1/events",
      failed: () => Effect.void,
      manifestPath: "/v1/manifest",
      origin: new URL("https://127.0.0.1"),
      pending: () => Effect.void,
      ready: () => Effect.void,
    };
    const executor = makeTestExecutor(() => Effect.succeed({ stdout: "" }));
    const result = await Effect.runPromise(
      NakafaApp.pipe(
        Effect.flatMap((app) =>
          Effect.all([
            app.fetchRenderer(
              new URL("http://localhost:31234"),
              credentials.token
            ),
            app
              .start({ credentials, provider, root: "/code/nakafa.com" })
              .pipe(Effect.flip),
          ])
        ),
        Effect.provide(NakafaAppLive),
        Effect.provideService(CommandExecutor, executor),
        Effect.provideService(HttpClient.HttpClient, captured.client),
        Effect.scoped
      )
    );

    expect(result[0]).toEqual(RENDERER_MANIFEST);
    expect(result[1]).toMatchObject({ reason: "child-env" });
    expect(captured.requests).toHaveLength(1);
  });
});
