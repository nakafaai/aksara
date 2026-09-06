import { assert, describe, expect, it } from "@effect/vitest";
import {
  type ContentCacheChange,
  ContentCacheRequestSchema,
} from "@nakafa/aksara-contracts/cache/content";
import { Effect, Fiber, Redacted, Schema, Stream } from "effect";
import { TestClock } from "effect/testing";
import { HttpClientError, HttpClientRequest } from "effect/unstable/http";
import { makeProductionCacheInvalidation } from "#cli/cache/activation";
import { captureClient, requestJson, webResponse } from "#test/http";
import { gitBundle } from "#test/target";

const RELEASE = gitBundle("release-next").release;

/** Creates one successful private cache response for the captured request. */
function cacheResponse(
  request: HttpClientRequest.HttpClientRequest,
  init: ResponseInit = {},
  responseRequest = request
) {
  const body = Schema.decodeUnknownSync(ContentCacheRequestSchema)(
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
      scope: body.scope,
    }),
    { ...init, headers }
  );
}

/** Creates one cache invalidation operation through captured HTTP. */
function makeInvalidation(
  respond: Parameters<typeof captureClient>[0] = (request) =>
    Effect.succeed(cacheResponse(request)),
  endpoint = new URL("https://www.example.test/api/internal/content/renderer")
) {
  const captured = captureClient(respond);
  return {
    invalidate: makeProductionCacheInvalidation({
      client: captured.client,
      endpoint,
      token: Redacted.make("renderer-token"),
    }),
    requests: captured.requests,
  };
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

/** Builds one production cache input from exact scope-aware changes. */
const cacheInput = (
  changes: readonly ContentCacheChange[] = [{ scope: "material" }]
) => ({ cacheChanges: Stream.fromIterable(changes), release: RELEASE });

describe("production cache activation", () => {
  it.effect(
    "invalidates the exact authenticated cache endpoint after commit",
    () =>
      Effect.gen(function* () {
        const { invalidate, requests } = makeInvalidation();
        expect(yield* invalidate(cacheInput())).toBeUndefined();
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
        assert(request !== undefined, "Expected one cache request.");
        expect(requestJson(request)).toEqual({
          releaseId: "release-next",
          scope: "material",
        });
      })
  );

  it.effect(
    "invalidates each changed scope once while retaining immutable bodies",
    () =>
      Effect.gen(function* () {
        const { invalidate, requests } = makeInvalidation();
        yield* invalidate(
          cacheInput([
            ...Array.from({ length: 250 }, () =>
              ContentCacheRequestSchema.make({
                releaseId: RELEASE.manifest.releaseId,
                scope: "material",
              })
            ),
            { scope: "program" },
            { scope: "quran" },
            { scope: "program" },
          ])
        );
        expect(requests.map(requestJson)).toEqual([
          { releaseId: "release-next", scope: "material" },
          { releaseId: "release-next", scope: "program" },
          { releaseId: "release-next", scope: "quran" },
        ]);
      })
  );

  it.effect(
    "finishes the complete change stream before invalidating any cache",
    () =>
      Effect.gen(function* () {
        const { invalidate, requests } = makeInvalidation();
        const cacheChanges = Stream.make({ scope: "material" } as const).pipe(
          Stream.concat(Stream.fail("source-unavailable"))
        );
        expect(
          yield* invalidate({ cacheChanges, release: RELEASE }).pipe(
            Effect.flip
          )
        ).toBe("source-unavailable");
        expect(requests).toHaveLength(0);
      })
  );

  it.effect.each([
    new URL("https://www.example.test/renderer"),
    new URL("http://www.example.test/api/internal/content/renderer"),
  ])("rejects unsafe cache derivation from %s", (endpoint) =>
    Effect.gen(function* () {
      const { invalidate, requests } = makeInvalidation(undefined, endpoint);
      expect(yield* Effect.flip(invalidate(cacheInput()))).toMatchObject({
        phase: "cache",
        releaseId: "release-next",
      });
      expect(requests).toHaveLength(0);
    })
  );

  it.effect.each([400, 401, 302])(
    "fails one permanent cache response %d without retrying",
    (status) =>
      Effect.gen(function* () {
        const { invalidate, requests } = makeInvalidation((request) =>
          Effect.succeed(cacheResponse(request, { status }))
        );
        expect(yield* Effect.flip(invalidate(cacheInput()))).toMatchObject({
          phase: "cache",
        });
        expect(requests).toHaveLength(1);
      })
  );

  it.effect.each([404, 408, 429, 503])(
    "retries transient cache response %d within the bounded policy",
    (status) =>
      Effect.gen(function* () {
        const { invalidate, requests } = makeInvalidation((request) =>
          Effect.succeed(cacheResponse(request, { status }))
        );
        const failure = yield* runAfter(
          Effect.flip(invalidate(cacheInput())),
          1000
        );
        expect(failure).toMatchObject({ phase: "cache" });
        expect(requests).toHaveLength(4);
      })
  );

  it.effect(
    "rejects network, redirected, uncached, and timed-out responses",
    () =>
      Effect.gen(function* () {
        const network = makeInvalidation((request) =>
          Effect.fail(
            new HttpClientError.HttpClientError({
              reason: new HttpClientError.TransportError({ request }),
            })
          )
        );
        const networkFailure = yield* runAfter(
          Effect.flip(network.invalidate(cacheInput())),
          1000
        );
        expect(networkFailure).toMatchObject({ phase: "cache" });
        const mismatch = makeInvalidation((request) =>
          Effect.succeed(
            cacheResponse(
              request,
              {},
              HttpClientRequest.post("https://www.example.test/other")
            )
          )
        );
        const uncached = makeInvalidation((request) =>
          Effect.succeed(webResponse(request, "{}"))
        );
        expect(
          yield* mismatch.invalidate(cacheInput()).pipe(Effect.flip)
        ).toMatchObject({ phase: "cache" });
        expect(
          yield* uncached.invalidate(cacheInput()).pipe(Effect.flip)
        ).toMatchObject({ phase: "cache" });
        const stalled = makeInvalidation(() => Effect.never);
        const timeout = yield* runAfter(
          Effect.flip(stalled.invalidate(cacheInput())),
          30_100
        );
        expect(timeout).toMatchObject({ phase: "cache" });
      })
  );
});
