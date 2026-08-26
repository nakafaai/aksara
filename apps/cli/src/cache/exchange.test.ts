import { describe, expect, it } from "@effect/vitest";
import {
  type ContentCacheRequest,
  ContentCacheRequestSchema,
  makeContentCacheRequest,
} from "@nakafa/aksara-contracts/cache/content";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Redacted, Schema } from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientError,
  HttpClientRequest,
} from "effect/unstable/http";

import { invalidateContentCache } from "#cli/cache/exchange";
import { captureClient, webResponse } from "#test/http";

const ENDPOINT = new URL("https://www.example.test/api/internal/content/cache");
const TOKEN = Redacted.make("cache-token");
const REQUEST: ContentCacheRequest = makeContentCacheRequest({
  artifactHashes: [],
  family: "material",
  releaseId: ReleaseIdSchema.make("test-cache-release"),
});

/** Creates one exact private cache receipt for a captured request. */
function cacheResponse(
  request: HttpClientRequest.HttpClientRequest,
  body: ConstructorParameters<typeof Response>[0] = JSON.stringify({
    family: REQUEST.family,
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

/** Executes one cache exchange through its exact injected HTTP client. */
const exchange = Effect.fn("AksaraCliCacheTest.exchange")(
  (client: HttpClient.HttpClient) =>
    invalidateContentCache(client, ENDPOINT, TOKEN, REQUEST).pipe(
      Effect.provideService(HttpClient.HttpClient, client)
    )
);

/** Returns one typed exchange failure through the supplied HTTP client. */
const reject = Effect.fn("AksaraCliCacheTest.reject")(
  (client: HttpClient.HttpClient) => exchange(client).pipe(Effect.flip)
);

/** Decodes strict request bytes through the production request schema. */
const decodeRequest = Effect.fn("AksaraCliCacheTest.decodeRequest")(
  (request: HttpClientRequest.HttpClientRequest) =>
    Effect.gen(function* () {
      if (request.body._tag !== "Uint8Array") {
        return yield* Effect.die("Expected one encoded JSON request body.");
      }
      const source = Buffer.from(request.body.body).toString("utf8");
      return yield* Schema.decodeEffect(
        Schema.fromJsonString(ContentCacheRequestSchema)
      )(source);
    })
);

describe("cache invalidation exchange", () => {
  it.effect(
    "sends exact JSON tags and accepts their private no-store receipt",
    () =>
      Effect.gen(function* () {
        const captured = captureClient((request) =>
          Effect.succeed(cacheResponse(request))
        );
        yield* exchange(captured.client);
        const capturedRequest = yield* Effect.fromNullishOr(
          captured.requests[0]
        );

        expect(captured.requests).toHaveLength(1);
        expect(capturedRequest).toMatchObject({
          headers: {
            accept: "application/json",
            authorization: "Bearer cache-token",
            "cache-control": "no-store",
            "content-type": "application/json",
          },
          method: "POST",
          url: ENDPOINT.href,
        });
        expect(yield* decodeRequest(capturedRequest)).toEqual(REQUEST);
      })
  );

  it.effect("disables native redirect following at the fetch adapter", () =>
    Effect.gen(function* () {
      let redirect: RequestInit["redirect"];
      /** Captures the Fetch policy while returning one valid exact receipt. */
      const fetch: typeof globalThis.fetch = (_input, init) => {
        redirect = init?.redirect;
        return Promise.resolve(
          new Response(
            JSON.stringify({
              family: REQUEST.family,
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

      yield* Effect.gen(function* () {
        const client = yield* HttpClient.HttpClient;
        yield* invalidateContentCache(client, ENDPOINT, TOKEN, REQUEST);
      }).pipe(
        Effect.provide(FetchHttpClient.layer),
        Effect.provideService(FetchHttpClient.Fetch, fetch)
      );
      expect(redirect).toBe("manual");
    })
  );

  it.effect("rejects an invalid request before the HTTP boundary", () =>
    Effect.gen(function* () {
      const captured = captureClient((request) =>
        Effect.succeed(cacheResponse(request))
      );
      const invalidRequest = { ...REQUEST };
      Reflect.set(invalidRequest, "releaseId", "INVALID");
      const error = yield* invalidateContentCache(
        captured.client,
        ENDPOINT,
        TOKEN,
        invalidRequest
      ).pipe(
        Effect.provideService(HttpClient.HttpClient, captured.client),
        Effect.flip
      );

      expect(error).toMatchObject({ retryable: false });
      expect(captured.requests).toHaveLength(0);
    })
  );

  it.effect.each([404, 408, 429, 503, 400, 401, 302])(
    "classifies cache response status %d",
    (status) =>
      Effect.gen(function* () {
        const captured = captureClient((request) =>
          Effect.succeed(cacheResponse(request, null, { status }))
        );
        const error = yield* reject(captured.client);

        expect(error.retryable).toBe(
          status === 404 || status === 408 || status === 429 || status >= 500
        );
      })
  );

  it.effect("rejects network and redirected request identities", () =>
    Effect.gen(function* () {
      const network = HttpClient.make((request) =>
        Effect.fail(
          new HttpClientError.HttpClientError({
            reason: new HttpClientError.TransportError({ request }),
          })
        )
      );
      const redirected = captureClient(() =>
        Effect.succeed(
          cacheResponse(
            HttpClientRequest.post("https://www.example.test/other")
          )
        )
      );
      const [networkError, redirectedError] = yield* Effect.all([
        reject(network),
        reject(redirected.client),
      ]);

      expect(networkError).toMatchObject({ retryable: true });
      expect(redirectedError).toMatchObject({ retryable: false });
    })
  );
});
