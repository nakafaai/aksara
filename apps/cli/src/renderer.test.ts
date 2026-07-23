import {
  FetchHttpClient,
  HttpClient,
  HttpClientError,
  HttpClientRequest,
} from "@effect/platform";
import { Effect, Redacted } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchRendererManifest, waitForRenderer } from "#cli/renderer";
import { captureClient, runClient, webResponse } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";

const ORIGIN = new URL("http://localhost:31234");
const RENDERER_URL = new URL("/api/internal/content/renderer", ORIGIN);
const TOKEN = Redacted.make("renderer-test-token");

afterEach(() => vi.useRealTimers());

/** Adds the renderer endpoint's mandatory response cache directive. */
function rendererResponse(
  request: HttpClientRequest.HttpClientRequest,
  body: ConstructorParameters<typeof Response>[0] = JSON.stringify(
    RENDERER_MANIFEST
  ),
  init: ResponseInit = {}
) {
  const headers = new Headers(init.headers);
  if (!headers.has("cache-control")) {
    headers.set("cache-control", "private, no-store");
  }
  return webResponse(request, body, { ...init, headers });
}

/** Returns one direct local renderer failure through an injected client. */
function rejectRenderer(client: HttpClient.HttpClient, origin: URL = ORIGIN) {
  return runClient(
    fetchRendererManifest(origin, TOKEN).pipe(Effect.flip),
    client
  );
}

describe("Nakafa renderer discovery", () => {
  it("validates the exact streamed manifest and authenticated request", async () => {
    const bytes = new TextEncoder().encode(JSON.stringify(RENDERER_MANIFEST));
    const stream = new ReadableStream<Uint8Array>({
      /** Sends two chunks to exercise bounded incremental assembly. */
      start(controller) {
        controller.enqueue(bytes.slice(0, 10));
        controller.enqueue(bytes.slice(10));
        controller.close();
      },
    });
    const captured = captureClient((request) =>
      Effect.succeed(
        rendererResponse(request, stream, {
          headers: {
            "cache-control": "Private, NO-STORE",
            "content-length": String(bytes.byteLength),
          },
        })
      )
    );

    await expect(
      runClient(fetchRendererManifest(ORIGIN, TOKEN), captured.client)
    ).resolves.toEqual(RENDERER_MANIFEST);
    expect(captured.requests).toHaveLength(1);
    expect(captured.requests[0]).toMatchObject({
      method: "GET",
      url: RENDERER_URL.toString(),
    });
    expect(captured.requests[0]?.headers).toMatchObject({
      accept: "application/json",
      authorization: "Bearer renderer-test-token",
      "cache-control": "no-store",
    });
  });

  it("disables native redirect following at the fetch adapter", async () => {
    let redirect: NonNullable<
      Parameters<typeof globalThis.fetch>[1]
    >["redirect"];
    /** Captures the Fetch redirect policy before returning a valid manifest. */
    const fetch: typeof globalThis.fetch = (_input, init) => {
      redirect = init?.redirect;
      return Promise.resolve(
        new Response(JSON.stringify(RENDERER_MANIFEST), {
          headers: { "cache-control": "private, no-store" },
        })
      );
    };

    await expect(
      Effect.runPromise(
        fetchRendererManifest(ORIGIN, TOKEN).pipe(
          Effect.provide(FetchHttpClient.layer),
          Effect.provideService(FetchHttpClient.Fetch, fetch)
        )
      )
    ).resolves.toEqual(RENDERER_MANIFEST);
    expect(redirect).toBe("manual");
  });

  it.each([
    new URL("https://localhost:31234"),
    new URL("http://127.0.0.1:31234"),
    new URL("http://localhost"),
    new URL("http://user@localhost:31234"),
    new URL("http://localhost:31234/other"),
    new URL("http://localhost:31234/?query=true"),
    new URL("http://localhost:31234/#fragment"),
  ])("rejects renderer origin %s", async (origin) => {
    const captured = captureClient((request) =>
      Effect.succeed(rendererResponse(request))
    );
    await expect(
      rejectRenderer(captured.client, origin)
    ).resolves.toMatchObject({
      reason: "origin",
      retryable: false,
    });
    expect(captured.requests).toHaveLength(0);
  });

  it("classifies network, status, redirect, and cache failures", async () => {
    const networkClient = HttpClient.make((request) =>
      Effect.fail(
        new HttpClientError.RequestError({ reason: "Transport", request })
      )
    );
    const network = await rejectRenderer(networkClient);
    const statuses = [404, 408, 429, 500, 400, 401, 302];
    const statusClient = captureClient((request) =>
      Effect.succeed(
        rendererResponse(request, null, { status: statuses.shift() ?? 200 })
      )
    );
    const missing = await rejectRenderer(statusClient.client);
    const timeoutStatus = await rejectRenderer(statusClient.client);
    const throttled = await rejectRenderer(statusClient.client);
    const server = await rejectRenderer(statusClient.client);
    const badRequest = await rejectRenderer(statusClient.client);
    const unauthorized = await rejectRenderer(statusClient.client);
    const redirect = await rejectRenderer(statusClient.client);
    const wrongRequest = HttpClientRequest.get("http://localhost:31234/other");
    const mismatchClient = captureClient(() =>
      Effect.succeed(rendererResponse(wrongRequest))
    );
    const mismatch = await rejectRenderer(mismatchClient.client);
    let cacheAttempt = 0;
    const cacheClient = captureClient((request) => {
      cacheAttempt += 1;
      return Effect.succeed(
        cacheAttempt === 1
          ? rendererResponse(request, JSON.stringify(RENDERER_MANIFEST), {
              headers: { "cache-control": "private, x-no-store" },
            })
          : webResponse(request, JSON.stringify(RENDERER_MANIFEST))
      );
    });
    const cache = await rejectRenderer(cacheClient.client);
    const absentCache = await rejectRenderer(cacheClient.client);

    expect(network).toMatchObject({ reason: "network", retryable: true });
    expect(missing).toMatchObject({ reason: "status", retryable: true });
    expect(timeoutStatus).toMatchObject({ reason: "status", retryable: true });
    expect(throttled).toMatchObject({ reason: "status", retryable: true });
    expect(server).toMatchObject({ reason: "status", retryable: true });
    expect(badRequest).toMatchObject({ reason: "status", retryable: false });
    expect(unauthorized).toMatchObject({ reason: "status", retryable: false });
    expect(redirect).toMatchObject({ reason: "redirect", retryable: false });
    expect(mismatch).toMatchObject({ reason: "redirect", retryable: false });
    expect(cache).toMatchObject({ reason: "cache", retryable: false });
    expect(absentCache).toMatchObject({ reason: "cache", retryable: false });
  });

  it("rejects body bounds, stream errors, encoding, JSON, and contract failures", async () => {
    const bodies: readonly [
      ConstructorParameters<typeof Response>[0],
      ResponseInit,
    ][] = [
      [null, { headers: { "content-length": "invalid" } }],
      [null, { headers: { "content-length": "-1" } }],
      [null, { headers: { "content-length": "262145" } }],
      [new Uint8Array(262_145), {}],
      [
        new ReadableStream({
          /** Injects one transport failure while reading the body. */
          pull(controller) {
            controller.error(new Error("Test stream failure."));
          },
        }),
        {},
      ],
      [Uint8Array.from([0xc3, 0x28]), {}],
      ["{", {}],
      ["{}", {}],
      [null, {}],
    ];
    const responses = [...bodies];
    const client = captureClient((request) => {
      const [body, init] = responses.shift() ?? [null, {}];
      return Effect.succeed(rendererResponse(request, body, init));
    });
    const errors = await runClient(
      Effect.forEach(
        bodies,
        () => fetchRendererManifest(ORIGIN, TOKEN).pipe(Effect.flip),
        { concurrency: 1 }
      ),
      client.client
    );

    expect(errors.map(({ reason }) => reason)).toEqual([
      "body",
      "body",
      "body",
      "body",
      "body",
      "json",
      "json",
      "contract",
      "json",
    ]);
    expect(errors[3]).toMatchObject({ retryable: false });
    expect(errors[4]).toMatchObject({ retryable: true });
  });

  it("bounds local startup retries and timeout", async () => {
    const localResponses = [404, 200];
    const local = captureClient((request) => {
      const status = localResponses.shift() ?? 200;
      return Effect.succeed(
        rendererResponse(
          request,
          status === 200 ? JSON.stringify(RENDERER_MANIFEST) : null,
          { status }
        )
      );
    });
    await expect(
      runClient(waitForRenderer(ORIGIN, TOKEN), local.client)
    ).resolves.toEqual(RENDERER_MANIFEST);

    vi.useFakeTimers();
    const stalled = captureClient(() => Effect.never);
    const previewTimeout = runClient(
      waitForRenderer(ORIGIN, TOKEN).pipe(Effect.flip),
      stalled.client
    );
    await vi.advanceTimersByTimeAsync(60_100);
    await expect(previewTimeout).resolves.toMatchObject({ reason: "timeout" });
  });
});
