import { assert, describe, expect, it } from "@effect/vitest";
import {
  CONTENT_CACHE_GLOBAL_TAG,
  type ContentCacheChange,
  ContentCacheRequestSchema,
  MAX_CONTENT_CACHE_ARTIFACTS,
  makeContentFamilyCacheTag,
} from "@nakafa/aksara-contracts/cache/content";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
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
      family: body.family,
      releaseId: body.releaseId,
      revalidated: true,
      tags: body.tags,
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

/** Builds one production cache input from exact family-aware changes. */
const cacheInput = (
  changes: readonly ContentCacheChange[] = [{ family: "material" }]
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
          family: "material",
          releaseId: "release-next",
          tags: [
            CONTENT_CACHE_GLOBAL_TAG,
            makeContentFamilyCacheTag("material"),
          ],
        });
      })
  );

  it.effect("partitions more than 98 exact family artifacts", () =>
    Effect.gen(function* () {
      const { invalidate, requests } = makeInvalidation();
      const hashes = Array.from(
        { length: MAX_CONTENT_CACHE_ARTIFACTS + 1 },
        (_, index) =>
          Sha256HashSchema.make(
            `sha256:${index.toString(16).padStart(64, "0")}`
          )
      );
      yield* invalidate(
        cacheInput(
          hashes.map((artifactHash) => ({
            artifactHash,
            family: "material",
          }))
        )
      );
      expect(requests).toHaveLength(2);
      const payloads = requests.map((request) =>
        Schema.decodeUnknownSync(ContentCacheRequestSchema)(
          requestJson(request)
        )
      );
      const [firstBatch, secondBatch] = payloads;
      const finalHash = Sha256HashSchema.make(
        `sha256:${MAX_CONTENT_CACHE_ARTIFACTS.toString(16).padStart(64, "0")}`
      );
      assert(firstBatch !== undefined, "Expected the first cache batch.");
      assert(secondBatch !== undefined, "Expected the second cache batch.");
      expect(firstBatch.tags.slice(0, 3)).toEqual([
        CONTENT_CACHE_GLOBAL_TAG,
        makeContentFamilyCacheTag("material"),
        `content-artifact:${hashes[0]}`,
      ]);
      expect(secondBatch.tags).toEqual([
        CONTENT_CACHE_GLOBAL_TAG,
        makeContentFamilyCacheTag("material"),
        `content-artifact:${finalHash}`,
      ]);
      expect(firstBatch.tags).toHaveLength(MAX_CONTENT_CACHE_ARTIFACTS + 2);
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
