import { Effect, Redacted } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchRendererManifest, waitForRenderer } from "#cli/renderer";
import { RENDERER_MANIFEST } from "#test/real";

const ORIGIN = new URL("http://localhost:31234");
const TOKEN = Redacted.make("renderer-test-token");

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

/** Creates a response that proves its exact renderer endpoint URL. */
function rendererResponse(
  body: ConstructorParameters<typeof Response>[0] = JSON.stringify(
    RENDERER_MANIFEST
  ),
  init: ResponseInit = {},
  url = new URL("/api/internal/content/renderer", ORIGIN).toString()
) {
  const headers = new Headers(init.headers);
  if (!headers.has("cache-control")) {
    headers.set("cache-control", "private, no-store");
  }
  const response = new Response(body, { ...init, headers });
  Object.defineProperty(response, "url", { configurable: true, value: url });
  return response;
}

/** Runs one direct renderer fetch and returns its typed failure. */
function rejectRenderer(origin: URL = ORIGIN) {
  return Effect.runPromise(
    fetchRendererManifest(origin, TOKEN).pipe(Effect.flip)
  );
}

describe("Nakafa renderer discovery", () => {
  it("validates the exact streamed manifest and request contract", async () => {
    const bytes = new TextEncoder().encode(JSON.stringify(RENDERER_MANIFEST));
    const stream = new ReadableStream<Uint8Array>({
      /** Sends two chunks to exercise bounded incremental assembly. */
      start(controller) {
        controller.enqueue(bytes.slice(0, 10));
        controller.enqueue(bytes.slice(10));
        controller.close();
      },
    });
    const fetchMock = vi.fn((_url: URL, init?: RequestInit) => {
      expect(init?.redirect).toBe("error");
      expect(new Headers(init?.headers).get("authorization")).toBe(
        "Bearer renderer-test-token"
      );
      return Promise.resolve(
        rendererResponse(stream, {
          headers: {
            "cache-control": "Private, NO-STORE",
            "content-length": String(bytes.byteLength),
          },
        })
      );
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      Effect.runPromise(fetchRendererManifest(ORIGIN, TOKEN))
    ).resolves.toEqual(RENDERER_MANIFEST);
    expect(fetchMock).toHaveBeenCalledOnce();
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
    const error = await rejectRenderer(origin);
    expect(error).toMatchObject({ reason: "origin", retryable: false });
  });

  it("classifies network, status, redirect, and cache failures", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.reject(new Error("offline")))
    );
    const network = await rejectRenderer();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => rendererResponse(null, { status: 404 }))
    );
    const missing = await rejectRenderer();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => rendererResponse(null, { status: 500 }))
    );
    const server = await rejectRenderer();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => rendererResponse(null, { status: 401 }))
    );
    const unauthorized = await rejectRenderer();
    const redirected = rendererResponse();
    Object.defineProperty(redirected, "redirected", { value: true });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => redirected)
    );
    const redirect = await rejectRenderer();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        rendererResponse(JSON.stringify(RENDERER_MANIFEST), {
          headers: { "cache-control": "private, x-no-store" },
        })
      )
    );
    const cache = await rejectRenderer();
    const missingCache = Response.json(RENDERER_MANIFEST);
    Object.defineProperty(missingCache, "url", {
      value: new URL("/api/internal/content/renderer", ORIGIN).toString(),
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => missingCache)
    );
    const absentCache = await rejectRenderer();

    expect(network).toMatchObject({ reason: "network", retryable: true });
    expect(missing).toMatchObject({ reason: "status", retryable: true });
    expect(server).toMatchObject({ reason: "status", retryable: true });
    expect(unauthorized).toMatchObject({ reason: "status", retryable: false });
    expect(redirect).toMatchObject({ reason: "redirect" });
    expect(cache).toMatchObject({ reason: "cache" });
    expect(absentCache).toMatchObject({ reason: "cache" });
  });

  it("rejects body bounds, stream errors, encoding, JSON, and contract failures", async () => {
    const cases = [
      rendererResponse(null, { headers: { "content-length": "invalid" } }),
      rendererResponse(null, { headers: { "content-length": "-1" } }),
      rendererResponse(null, { headers: { "content-length": "262145" } }),
      rendererResponse(new Uint8Array(262_145)),
      rendererResponse(
        new ReadableStream({
          /** Injects one transport failure while reading the body. */
          pull(controller) {
            controller.error(new Error("Test stream failure."));
          },
        })
      ),
      rendererResponse(Uint8Array.from([0xc3, 0x28])),
      rendererResponse("{"),
      rendererResponse("{}"),
      rendererResponse(null),
    ];
    const responses = [...cases];
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve(responses.shift() ?? rendererResponse()))
    );
    const errors = await Promise.all(cases.map(() => rejectRenderer()));

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

  it("rejects a mismatched response URL even without a redirect flag", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        rendererResponse(null, {}, "http://localhost:31234/other")
      )
    );
    await expect(rejectRenderer()).resolves.toMatchObject({
      reason: "redirect",
    });
  });

  it("retries transient responses and enforces the one-minute bound", async () => {
    const responses = [
      rendererResponse(null, { status: 404 }),
      rendererResponse(),
    ];
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => responses.shift() ?? rendererResponse())
    );
    await expect(
      Effect.runPromise(waitForRenderer(ORIGIN, TOKEN))
    ).resolves.toEqual(RENDERER_MANIFEST);

    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => rendererResponse(null, { status: 404 }))
    );
    const timeout = Effect.runPromise(
      waitForRenderer(ORIGIN, TOKEN).pipe(Effect.flip)
    );
    await vi.advanceTimersByTimeAsync(60_100);
    await expect(timeout).resolves.toMatchObject({ reason: "timeout" });
  });
});
