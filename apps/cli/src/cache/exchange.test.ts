import {
  FetchHttpClient,
  HttpClient,
  HttpClientError,
  HttpClientRequest,
} from "@effect/platform";
import {
  MATERIAL_CACHE_TAGS,
  type MaterialCacheRequest,
} from "@nakafa/aksara-contracts/cache/material";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Redacted } from "effect";
import { describe, expect, it } from "vitest";
import { invalidateMaterialCache } from "#cli/cache/exchange";
import { captureClient, requestJson, runClient, webResponse } from "#test/http";

const ENDPOINT = new URL("https://www.example.test/api/internal/content/cache");
const TOKEN = Redacted.make("cache-token");
const REQUEST: MaterialCacheRequest = {
  releaseId: ReleaseIdSchema.make("test-cache-release"),
  tags: MATERIAL_CACHE_TAGS,
};

/** Creates one exact private cache receipt for a captured request. */
function cacheResponse(
  request: HttpClientRequest.HttpClientRequest,
  body: ConstructorParameters<typeof Response>[0] = JSON.stringify({
    releaseId: REQUEST.releaseId,
    revalidated: true,
    tags: REQUEST.tags,
  }),
  init: ResponseInit = {}
) {
  const headers = new Headers(init.headers);
  if (!headers.has("cache-control")) {
    headers.set("cache-control", "private, no-store");
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json; charset=utf-8");
  }
  return webResponse(request, body, { ...init, headers });
}

/** Returns one typed exchange failure through the supplied HTTP client. */
function reject(client: HttpClient.HttpClient) {
  return runClient(
    invalidateMaterialCache(client, ENDPOINT, TOKEN, REQUEST).pipe(Effect.flip),
    client
  );
}

describe("cache invalidation exchange", () => {
  it("sends exact JSON tags and accepts their private no-store receipt", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(cacheResponse(request))
    );

    await expect(
      runClient(
        invalidateMaterialCache(captured.client, ENDPOINT, TOKEN, REQUEST),
        captured.client
      )
    ).resolves.toBeUndefined();
    expect(captured.requests).toHaveLength(1);
    expect(captured.requests[0]).toMatchObject({
      headers: {
        accept: "application/json",
        authorization: "Bearer cache-token",
        "cache-control": "no-store",
        "content-type": "application/json",
      },
      method: "POST",
      url: ENDPOINT.href,
    });
    const [capturedRequest] = captured.requests;
    expect(capturedRequest).toBeDefined();
    if (capturedRequest === undefined) {
      return;
    }
    expect(requestJson(capturedRequest)).toEqual(REQUEST);
  });

  it("disables native redirect following at the fetch adapter", async () => {
    let redirect: NonNullable<
      Parameters<typeof globalThis.fetch>[1]
    >["redirect"];
    /** Captures the fetch policy while returning one valid exact receipt. */
    const fetch: typeof globalThis.fetch = (_input, init) => {
      redirect = init?.redirect;
      return Promise.resolve(
        new Response(
          JSON.stringify({
            releaseId: REQUEST.releaseId,
            revalidated: true,
            tags: REQUEST.tags,
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

    await expect(
      Effect.runPromise(
        Effect.gen(function* () {
          const client = yield* HttpClient.HttpClient;
          yield* invalidateMaterialCache(client, ENDPOINT, TOKEN, REQUEST);
        }).pipe(
          Effect.provide(FetchHttpClient.layer),
          Effect.provideService(FetchHttpClient.Fetch, fetch)
        )
      )
    ).resolves.toBeUndefined();
    expect(redirect).toBe("manual");
  });

  it("rejects an invalid outgoing request before the HTTP boundary", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(cacheResponse(request))
    );
    const invalidRequest = { ...REQUEST };
    Reflect.set(invalidRequest, "releaseId", "INVALID");

    await expect(
      runClient(
        invalidateMaterialCache(
          captured.client,
          ENDPOINT,
          TOKEN,
          invalidRequest
        ).pipe(Effect.flip),
        captured.client
      )
    ).resolves.toMatchObject({ retryable: false });
    expect(captured.requests).toHaveLength(0);
  });

  it.each([404, 408, 429, 503, 400, 401, 302])(
    "classifies cache response status %d",
    async (status) => {
      const captured = captureClient((request) =>
        Effect.succeed(cacheResponse(request, null, { status }))
      );
      const error = await reject(captured.client);

      expect(error.retryable).toBe(
        status === 404 || status === 408 || status === 429 || status >= 500
      );
    }
  );

  it("rejects network and redirected request identities", async () => {
    const network = HttpClient.make((request) =>
      Effect.fail(
        new HttpClientError.RequestError({ reason: "Transport", request })
      )
    );
    const redirected = captureClient(() =>
      Effect.succeed(
        cacheResponse(HttpClientRequest.post("https://www.example.test/other"))
      )
    );

    await expect(reject(network)).resolves.toMatchObject({ retryable: true });
    await expect(reject(redirected.client)).resolves.toMatchObject({
      retryable: false,
    });
  });

  it.each([
    [
      JSON.stringify({
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: REQUEST.tags,
      }),
      { "cache-control": "no-store", "content-type": "application/json" },
    ],
    [
      JSON.stringify({
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: REQUEST.tags,
      }),
      { "cache-control": "private", "content-type": "application/json" },
    ],
    [
      JSON.stringify({
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: REQUEST.tags,
      }),
      {
        "cache-control": "private, no-store",
        "content-type": "text/plain",
      },
    ],
    [
      JSON.stringify({
        releaseId: REQUEST.releaseId,
        revalidated: false,
        tags: REQUEST.tags,
      }),
      undefined,
    ],
    [
      JSON.stringify({
        extra: true,
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: REQUEST.tags,
      }),
      undefined,
    ],
    [
      JSON.stringify({
        releaseId: "test-other-release",
        revalidated: true,
        tags: REQUEST.tags,
      }),
      undefined,
    ],
    [
      JSON.stringify({
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: ["content-runtime"],
      }),
      undefined,
    ],
    ["{", undefined],
    [Uint8Array.from([0xc3, 0x28]), undefined],
    [null, undefined],
    [
      JSON.stringify({
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: REQUEST.tags,
      }),
      { "content-length": "invalid" },
    ],
    [
      JSON.stringify({
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: REQUEST.tags,
      }),
      { "content-length": "-1" },
    ],
    [
      JSON.stringify({
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: REQUEST.tags,
      }),
      { "content-length": String(32 * 1024 + 1) },
    ],
    ["x".repeat(32 * 1024 + 1), undefined],
  ] as const)(
    "rejects one invalid private JSON receipt",
    async (body, headers) => {
      const init = headers === undefined ? {} : { headers };
      const captured = captureClient((request) =>
        Effect.succeed(cacheResponse(request, body, init))
      );

      await expect(reject(captured.client)).resolves.toMatchObject({
        retryable: false,
      });
    }
  );

  it("treats a response stream failure as retryable", async () => {
    const stream = new ReadableStream({
      /** Injects one transport failure while reading the receipt body. */
      pull(controller) {
        controller.error(new Error("Test receipt stream failure."));
      },
    });
    const captured = captureClient((request) =>
      Effect.succeed(cacheResponse(request, stream))
    );

    await expect(reject(captured.client)).resolves.toMatchObject({
      retryable: true,
    });
  });
});
