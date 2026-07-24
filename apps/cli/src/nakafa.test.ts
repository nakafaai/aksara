import { HttpClient } from "@effect/platform";
import {
  computePreviewRendererProof,
  PREVIEW_RENDERER_AUTH_FORMAT,
  PreviewRendererNonceSchema,
} from "@nakafa/aksara-contracts/preview/auth";
import { Effect, Redacted } from "effect";
import { describe, expect, it } from "vitest";
import { makePreviewCredentials } from "#cli/credentials";
import { NakafaApp, NakafaAppLive } from "#cli/nakafa";
import type { PreviewProvider } from "#cli/provider";
import { captureClient, webResponse } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";

describe("Nakafa app service", () => {
  it("wires renderer discovery and child startup implementations", async () => {
    const credentials = await Effect.runPromise(makePreviewCredentials());
    const captured = captureClient((request) => {
      const nonce = PreviewRendererNonceSchema.make(
        request.headers["x-aksara-preview-nonce"] ?? ""
      );
      const proof = Effect.runSync(
        computePreviewRendererProof({
          manifestHash: RENDERER_MANIFEST.hash,
          nonce,
          secret: Redacted.value(credentials.renderer.secret),
        })
      );
      return Effect.succeed(
        webResponse(
          request,
          JSON.stringify({
            format: PREVIEW_RENDERER_AUTH_FORMAT,
            manifest: RENDERER_MANIFEST,
            proof,
          }),
          {
            headers: {
              "cache-control": "no-store",
              "content-type": "application/json",
            },
          }
        )
      );
    });
    const provider: PreviewProvider = {
      eventsPath: "/v1/events",
      failed: () => Effect.succeed(true),
      manifestPath: "/v1/manifest",
      origin: new URL("https://127.0.0.1"),
      pending: () => Effect.succeed(1),
      ready: () => Effect.succeed(true),
    };
    const result = await Effect.runPromise(
      NakafaApp.pipe(
        Effect.flatMap((app) =>
          Effect.all([
            app.fetchRenderer(
              new URL("http://127.0.0.1:31234"),
              credentials.renderer
            ),
            app
              .start({ credentials, provider, root: "/code/nakafa.com" })
              .pipe(Effect.flip),
          ])
        ),
        Effect.provide(NakafaAppLive),
        Effect.provideService(HttpClient.HttpClient, captured.client),
        Effect.scoped
      )
    );

    expect(result[0]).toEqual(RENDERER_MANIFEST);
    expect(result[1]).toMatchObject({ reason: "child-env" });
    expect(captured.requests).toHaveLength(1);
  });
});
