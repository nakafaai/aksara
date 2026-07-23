import {
  FetchHttpClient,
  HttpClient,
  HttpClientError,
  HttpClientRequest,
} from "@effect/platform";
import {
  MATERIAL_CACHE_TAGS,
  MaterialCacheRequestSchema,
} from "@nakafa/aksara-contracts/cache/material";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Redacted, Schema } from "effect";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { makeProductionActivation } from "#cli/activation";
import { captureClient, requestJson, webResponse } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";
import { gitBundle } from "#test/target";

const calls = vi.hoisted(() => ({
  endpoint: "",
  fetches: 0,
  renderer: undefined as RendererManifestEnvelope | undefined,
  token: "",
}));

vi.mock("#cli/production-renderer", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("#cli/production-renderer")>();
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  return {
    ...original,
    fetchProductionRenderer: (
      endpoint: URL,
      token: Redacted.Redacted<string>
    ) => {
      calls.endpoint = endpoint.href;
      calls.fetches += 1;
      calls.token = TestRedacted.value(token);
      return calls.renderer === undefined
        ? TestEffect.die("Missing test renderer.")
        : TestEffect.succeed(calls.renderer);
    },
  };
});

/** Creates one successful private cache response for the captured request. */
function cacheResponse(
  request: HttpClientRequest.HttpClientRequest,
  init: ResponseInit = {},
  responseRequest = request
) {
  const body = Schema.decodeUnknownSync(MaterialCacheRequestSchema)(
    requestJson(request)
  );
  const headers = new Headers(init.headers);
  headers.set("cache-control", "private, no-store");
  headers.set("content-type", "application/json");
  return webResponse(
    responseRequest,
    JSON.stringify({
      releaseId: body.releaseId,
      revalidated: true,
      tags: body.tags,
    }),
    { ...init, headers }
  );
}

/** Creates one activation service through its captured HTTP boundary. */
async function makeActivation(
  respond: Parameters<typeof captureClient>[0] = (request) =>
    Effect.succeed(cacheResponse(request)),
  endpoint = new URL("https://www.example.test/api/internal/content/renderer")
) {
  const captured = captureClient(respond);
  const activation = await Effect.runPromise(
    makeProductionActivation({
      endpoint,
      token: Redacted.make("renderer-token"),
    }).pipe(Effect.provideService(HttpClient.HttpClient, captured.client))
  );
  return { activation, requests: captured.requests };
}

/** Runs one closed activation path and returns its typed failure. */
function runFailure<E>(program: Effect.Effect<void, E>) {
  return Effect.runPromise(program.pipe(Effect.flip));
}

afterEach(() => vi.useRealTimers());

beforeEach(() => {
  calls.endpoint = "";
  calls.fetches = 0;
  calls.renderer = RENDERER_MANIFEST;
  calls.token = "";
});

describe("production activation", () => {
  it("fetches and validates the live renderer immediately before commit", async () => {
    const { activation } = await makeActivation();
    await expect(
      Effect.runPromise(activation.verify(gitBundle("release-next").release))
    ).resolves.toBeUndefined();
    expect(calls).toMatchObject({
      endpoint: "https://www.example.test/api/internal/content/renderer",
      fetches: 1,
      token: "renderer-token",
    });
  });

  it("fails closed without exposing renderer mismatch details", async () => {
    const { activation } = await makeActivation();
    calls.renderer = {
      ...RENDERER_MANIFEST,
      hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    };
    await expect(
      runFailure(activation.verify(gitBundle("release-next").release))
    ).resolves.toMatchObject({
      _tag: "PublicationActivationError",
      phase: "preflight",
      releaseId: "release-next",
    });
    expect(calls.fetches).toBe(1);
  });

  it("invalidates the exact authenticated cache endpoint after commit", async () => {
    const { activation, requests } = await makeActivation();
    await expect(
      Effect.runPromise(
        activation.invalidate(gitBundle("release-next").release)
      )
    ).resolves.toBeUndefined();
    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({
      headers: {
        accept: "application/json",
        authorization: "Bearer renderer-token",
        "cache-control": "no-store",
      },
      method: "POST",
      url: "https://www.example.test/api/internal/content/cache",
    });
    const [request] = requests;
    expect(request).toBeDefined();
    if (request === undefined) {
      return;
    }
    expect(requestJson(request)).toEqual({
      releaseId: "release-next",
      tags: MATERIAL_CACHE_TAGS,
    });
  });

  it("disables native redirect following at the fetch adapter", async () => {
    let redirect: RequestInit["redirect"];
    /** Captures the Fetch redirect policy before returning a valid response. */
    const fetch: typeof globalThis.fetch = (_input, init) => {
      redirect = init?.redirect;
      return Promise.resolve(
        new Response(
          JSON.stringify({
            releaseId: "release-next",
            revalidated: true,
            tags: MATERIAL_CACHE_TAGS,
          }),
          {
            headers: {
              "cache-control": "private, no-store",
              "content-type": "application/json",
            },
          }
        )
      );
    };
    const activation = await Effect.runPromise(
      makeProductionActivation({
        endpoint: new URL(
          "https://www.example.test/api/internal/content/renderer"
        ),
        token: Redacted.make("renderer-token"),
      }).pipe(Effect.provide(FetchHttpClient.layer))
    );
    await expect(
      Effect.runPromise(
        activation
          .invalidate(gitBundle("release-next").release)
          .pipe(Effect.provideService(FetchHttpClient.Fetch, fetch))
      )
    ).resolves.toBeUndefined();
    expect(redirect).toBe("manual");
  });

  it.each([
    new URL("https://www.example.test/renderer"),
    new URL("http://www.example.test/api/internal/content/renderer"),
  ])("rejects unsafe cache derivation from %s", async (endpoint) => {
    const { activation, requests } = await makeActivation(undefined, endpoint);
    await expect(
      runFailure(activation.invalidate(gitBundle("release-next").release))
    ).resolves.toMatchObject({
      phase: "cache",
      releaseId: "release-next",
    });
    expect(requests).toHaveLength(0);
  });

  it.each([400, 401, 302])(
    "fails one permanent cache response %d without retrying",
    async (status) => {
      const { activation, requests } = await makeActivation((request) =>
        Effect.succeed(cacheResponse(request, { status }))
      );
      await expect(
        runFailure(activation.invalidate(gitBundle("release-next").release))
      ).resolves.toMatchObject({ phase: "cache" });
      expect(requests).toHaveLength(1);
    }
  );

  it.each([404, 408, 429, 503])(
    "retries transient cache response %d within the bounded policy",
    async (status) => {
      vi.useFakeTimers();
      const { activation, requests } = await makeActivation((request) =>
        Effect.succeed(cacheResponse(request, { status }))
      );
      const failure = runFailure(
        activation.invalidate(gitBundle("release-next").release)
      );
      await vi.advanceTimersByTimeAsync(1000);
      await expect(failure).resolves.toMatchObject({ phase: "cache" });
      expect(requests).toHaveLength(4);
    }
  );

  it("rejects network, redirected, uncached, and timed-out responses", async () => {
    const { release } = gitBundle("release-next");
    vi.useFakeTimers();
    const network = await makeActivation((request) =>
      Effect.fail(
        new HttpClientError.RequestError({ reason: "Transport", request })
      )
    );
    const networkFailure = Effect.runPromise(
      network.activation.invalidate(release).pipe(Effect.flip)
    );
    await vi.advanceTimersByTimeAsync(1000);
    await expect(networkFailure).resolves.toMatchObject({ phase: "cache" });
    const mismatch = await makeActivation((request) =>
      Effect.succeed(
        cacheResponse(
          request,
          {},
          HttpClientRequest.post("https://www.example.test/other")
        )
      )
    );
    const uncached = await makeActivation((request) =>
      Effect.succeed(webResponse(request, "{}"))
    );
    await expect(
      Effect.runPromise(
        mismatch.activation.invalidate(release).pipe(Effect.flip)
      )
    ).resolves.toMatchObject({ phase: "cache" });
    await expect(
      Effect.runPromise(
        uncached.activation.invalidate(release).pipe(Effect.flip)
      )
    ).resolves.toMatchObject({ phase: "cache" });
    const stalled = await makeActivation(() => Effect.never);
    const timeout = Effect.runPromise(
      stalled.activation.invalidate(release).pipe(Effect.flip)
    );
    await vi.advanceTimersByTimeAsync(30_100);
    await expect(timeout).resolves.toMatchObject({ phase: "cache" });
  });
});
