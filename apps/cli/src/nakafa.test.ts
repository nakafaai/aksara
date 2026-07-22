import { CommandExecutor } from "@effect/platform/CommandExecutor";
import { Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { makePreviewCredentials } from "#cli/credentials";
import { NakafaApp, NakafaAppLive } from "#cli/nakafa";
import type { PreviewProvider } from "#cli/provider";
import { makeTestExecutor } from "#test/command";
import { RENDERER_MANIFEST } from "#test/real";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Nakafa app service", () => {
  it("wires renderer discovery and child startup implementations", async () => {
    const response = new Response(JSON.stringify(RENDERER_MANIFEST), {
      headers: { "cache-control": "no-store" },
    });
    Object.defineProperty(response, "url", {
      value: "http://127.0.0.1:31234/api/internal/content/renderer",
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => response)
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
              new URL("http://127.0.0.1:31234"),
              credentials.token
            ),
            app
              .start({ credentials, provider, root: "/code/nakafa.com" })
              .pipe(Effect.flip),
          ])
        ),
        Effect.provide(NakafaAppLive),
        Effect.provideService(CommandExecutor, executor),
        Effect.scoped
      )
    );

    expect(result[0]).toEqual(RENDERER_MANIFEST);
    expect(result[1]).toMatchObject({ reason: "child-env" });
  });
});
