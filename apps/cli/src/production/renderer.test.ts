import { describe, expect, it } from "@effect/vitest";
import { Effect, Fiber, Redacted } from "effect";
import { TestClock } from "effect/testing";
import type { HttpClientRequest } from "effect/unstable/http";
import { HttpClient } from "effect/unstable/http";
import { fetchProductionRenderer } from "#cli/production/renderer";
import { captureClient, webResponse } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";

const ENDPOINT = new URL(
  "https://www.example.test/api/internal/content/renderer"
);
const TOKEN = Redacted.make("renderer-test-token");

/** Creates one valid no-store renderer response for a chosen status. */
function rendererResponse(
  request: HttpClientRequest.HttpClientRequest,
  status = 200
) {
  return webResponse(request, JSON.stringify(RENDERER_MANIFEST), {
    headers: {
      "cache-control": "private, no-store",
      "content-type": "application/json",
    },
    status,
  });
}

/** Runs one program after advancing the native Effect test clock. */
function runAfter<A, E>(program: Effect.Effect<A, E>, milliseconds: number) {
  return Effect.gen(function* () {
    const fiber = yield* Effect.forkChild(program);
    yield* Effect.yieldNow;
    yield* TestClock.adjust(milliseconds);
    return yield* Fiber.join(fiber);
  });
}

describe("production renderer", () => {
  it.effect("uses only the exact authenticated HTTPS endpoint", () =>
    Effect.gen(function* () {
      const captured = captureClient((request) =>
        Effect.succeed(rendererResponse(request))
      );

      expect(
        yield* fetchProductionRenderer(ENDPOINT, TOKEN).pipe(
          Effect.provideService(HttpClient.HttpClient, captured.client)
        )
      ).toEqual(RENDERER_MANIFEST);
      expect(captured.requests[0]?.url).toBe(ENDPOINT.toString());
    })
  );

  it.effect.each([
    new URL("http://www.example.test/renderer"),
    new URL("https://www.example.test/renderer"),
    new URL("https://user@www.example.test/renderer"),
    new URL("https://user:secret@www.example.test/renderer"),
    new URL("https://www.example.test/renderer?query=true"),
    new URL("https://www.example.test/renderer#fragment"),
  ])("rejects unsafe endpoint %s", (endpoint) =>
    Effect.gen(function* () {
      const captured = captureClient((request) =>
        Effect.succeed(rendererResponse(request))
      );

      expect(
        yield* fetchProductionRenderer(endpoint, TOKEN).pipe(
          Effect.flip,
          Effect.provideService(HttpClient.HttpClient, captured.client)
        )
      ).toMatchObject({ reason: "origin", retryable: false });
      expect(captured.requests).toHaveLength(0);
    })
  );

  it.effect.each([408, 429, 503, 530])(
    "recovers from transient status %d within the total bound",
    (status) =>
      Effect.gen(function* () {
        let attempt = 0;
        const captured = captureClient((request) => {
          attempt += 1;
          return Effect.succeed(
            rendererResponse(request, attempt < 3 ? status : 200)
          );
        });
        const recovered = yield* runAfter(
          fetchProductionRenderer(ENDPOINT, TOKEN).pipe(
            Effect.provideService(HttpClient.HttpClient, captured.client)
          ),
          10_100
        );

        expect(recovered).toEqual(RENDERER_MANIFEST);
        expect(captured.requests).toHaveLength(3);
      })
  );

  it.effect.each([400, 401, 403, 422])(
    "keeps permanent status %d single-shot",
    (status) =>
      Effect.gen(function* () {
        const captured = captureClient((request) =>
          Effect.succeed(rendererResponse(request, status))
        );

        expect(
          yield* fetchProductionRenderer(ENDPOINT, TOKEN).pipe(
            Effect.flip,
            Effect.provideService(HttpClient.HttpClient, captured.client)
          )
        ).toMatchObject({ reason: "status", retryable: false });
        expect(captured.requests).toHaveLength(1);
      })
  );

  it.effect("fails when the total renderer wait exceeds three minutes", () =>
    Effect.gen(function* () {
      const stalled = captureClient(() => Effect.never);
      const timeout = yield* runAfter(
        fetchProductionRenderer(ENDPOINT, TOKEN).pipe(
          Effect.flip,
          Effect.provideService(HttpClient.HttpClient, stalled.client)
        ),
        180_100
      );

      expect(timeout).toMatchObject({ reason: "timeout" });
    })
  );
});
