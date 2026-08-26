import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Fiber } from "effect";
import { TestClock } from "effect/testing";
import {
  HttpClient,
  HttpClientError,
  HttpClientRequest,
} from "effect/unstable/http";
import { fetchReadinessJson, jsonGet } from "#cli/developer-readiness/request";
import { captureClient, runClient, webResponse } from "#test/http";

const TEST_API_URL = "https://api.example.test/v1";

/** Reads one test API response through the production request boundary. */
function fetchTestApi(protocolVersion?: string) {
  return fetchReadinessJson("api", jsonGet(TEST_API_URL), protocolVersion);
}

/** Returns the typed failure for one explicit test client. */
function reject(client: HttpClient.HttpClient, protocolVersion?: string) {
  return runClient(fetchTestApi(protocolVersion).pipe(Effect.flip), client);
}

describe("developer readiness requests", () => {
  it("returns parsed body and response headers", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(
        webResponse(request, JSON.stringify({ ready: true }), {
          headers: {
            "content-type": "application/json",
            "x-release": "test-release",
          },
        })
      )
    );

    await expect(runClient(fetchTestApi(), captured.client)).resolves.toEqual({
      body: { ready: true },
      headers: expect.objectContaining({ "x-release": "test-release" }),
    });
    expect(captured.requests[0]?.headers.accept).toBe("application/json");
    expect(captured.requests[0]?.headers["cache-control"]).toBe("no-store");
  });

  it("maps transport failure to the exact public surface", async () => {
    const client = HttpClient.make((request) =>
      Effect.fail(
        new HttpClientError.HttpClientError({
          reason: new HttpClientError.TransportError({ request }),
        })
      )
    );

    await expect(reject(client)).resolves.toMatchObject({
      _tag: "DeveloperReadinessError",
      reason: "network",
      status: 0,
      surface: "api",
    });
  });

  it("rejects redirects and unsuccessful status codes", async () => {
    const redirect = captureClient(() =>
      Effect.succeed(
        webResponse(
          HttpClientRequest.get("https://wrong.example.test/v1"),
          "{}",
          { headers: { "content-type": "application/json" } }
        )
      )
    );
    const unavailable = captureClient((request) =>
      Effect.succeed(
        webResponse(request, "{}", {
          headers: { "content-type": "application/json" },
          status: 503,
        })
      )
    );

    await expect(reject(redirect.client)).resolves.toMatchObject({
      reason: "redirect",
      status: 200,
    });
    await expect(reject(unavailable.client)).resolves.toMatchObject({
      reason: "status",
      status: 503,
    });
  });

  it("rejects oversized and non-JSON bodies", async () => {
    const oversized = captureClient((request) =>
      Effect.succeed(
        webResponse(request, "{}", {
          headers: {
            "content-length": String(3 * 1024 * 1024),
            "content-type": "application/json",
          },
        })
      )
    );
    const text = captureClient((request) =>
      Effect.succeed(
        webResponse(request, "{}", {
          headers: { "content-type": "text/plain" },
        })
      )
    );

    await expect(reject(oversized.client)).resolves.toMatchObject({
      reason: "body",
    });
    await expect(reject(text.client)).resolves.toMatchObject({
      reason: "contract",
    });
  });

  it("rejects malformed JSON and protocol headers", async () => {
    const malformed = captureClient((request) =>
      Effect.succeed(
        webResponse(request, "{", {
          headers: { "content-type": "application/json" },
        })
      )
    );
    const incompatible = captureClient((request) =>
      Effect.succeed(
        webResponse(request, "{}", {
          headers: {
            "content-type": "application/json",
            "mcp-protocol-version": "wrong",
          },
        })
      )
    );

    await expect(reject(malformed.client)).resolves.toMatchObject({
      reason: "contract",
    });
    await expect(
      reject(incompatible.client, "2026-07-28")
    ).resolves.toMatchObject({ reason: "contract" });
  });

  it.effect("bounds every public readiness request", () =>
    Effect.gen(function* () {
      const client = HttpClient.make(() => Effect.never);
      const fiber = yield* fetchTestApi().pipe(
        Effect.provideService(HttpClient.HttpClient, client),
        Effect.flip,
        Effect.forkChild({ startImmediately: true })
      );
      yield* TestClock.adjust("30 seconds");
      const error = yield* Fiber.join(fiber);

      expect(error).toMatchObject({ reason: "timeout", surface: "api" });
    })
  );
});
