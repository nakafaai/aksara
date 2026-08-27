import { assert, beforeEach, describe, expect, it } from "@effect/vitest";
import {
  CONTENT_CACHE_GLOBAL_TAG,
  type ContentCacheChange,
  ContentCacheRequestSchema,
  MAX_CONTENT_CACHE_ARTIFACTS,
  makeContentFamilyCacheTag,
} from "@nakafa/aksara-contracts/cache/content";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Fiber, Redacted, Schema, Stream } from "effect";
import { TestClock } from "effect/testing";
import {
  HttpClient,
  HttpClientError,
  HttpClientRequest,
} from "effect/unstable/http";
import { vi } from "vitest";
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
const RELEASE = gitBundle("release-next").release;
vi.mock("#cli/production/renderer", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("#cli/production/renderer")>();
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
/** Creates one activation service through its captured HTTP boundary. */
function makeActivation(
  respond: Parameters<typeof captureClient>[0] = (request) =>
    Effect.succeed(cacheResponse(request)),
  endpoint = new URL("https://www.example.test/api/internal/content/renderer")
) {
  const captured = captureClient(respond);
  return makeProductionActivation({
    endpoint,
    token: Redacted.make("renderer-token"),
  }).pipe(
    Effect.provideService(HttpClient.HttpClient, captured.client),
    Effect.map((activation) => ({
      activation,
      requests: captured.requests,
    }))
  );
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
  release = RELEASE,
  changes: readonly ContentCacheChange[] = [{ family: "material" }]
) => ({ cacheChanges: Stream.fromIterable(changes), release });
beforeEach(() => {
  calls.endpoint = "";
  calls.fetches = 0;
  calls.renderer = RENDERER_MANIFEST;
  calls.token = "";
});
describe("production activation", () => {
  it.effect(
    "fetches and validates the live renderer immediately before commit",
    () =>
      Effect.gen(function* () {
        const { activation } = yield* makeActivation();
        expect(yield* activation.verify(RELEASE)).toBeUndefined();
        expect(calls).toMatchObject({
          endpoint: "https://www.example.test/api/internal/content/renderer",
          fetches: 1,
          token: "renderer-token",
        });
      })
  );
  it.effect("fails closed without exposing renderer mismatch details", () =>
    Effect.gen(function* () {
      const { activation } = yield* makeActivation();
      calls.renderer = {
        ...RENDERER_MANIFEST,
        hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      };
      expect(yield* Effect.flip(activation.verify(RELEASE))).toMatchObject({
        _tag: "PublicationActivationError",
        phase: "preflight",
        releaseId: "release-next",
      });
      expect(calls.fetches).toBe(1);
    })
  );
  it.effect(
    "invalidates the exact authenticated cache endpoint after commit",
    () =>
      Effect.gen(function* () {
        const { activation, requests } = yield* makeActivation();
        expect(yield* activation.invalidate(cacheInput())).toBeUndefined();
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
      const { activation, requests } = yield* makeActivation();
      const hashes = Array.from(
        { length: MAX_CONTENT_CACHE_ARTIFACTS + 1 },
        (_, index) =>
          Sha256HashSchema.make(
            `sha256:${index.toString(16).padStart(64, "0")}`
          )
      );
      yield* activation.invalidate(
        cacheInput(
          undefined,
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
      const { activation, requests } = yield* makeActivation(
        undefined,
        endpoint
      );
      expect(
        yield* Effect.flip(activation.invalidate(cacheInput()))
      ).toMatchObject({
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
        const { activation, requests } = yield* makeActivation((request) =>
          Effect.succeed(cacheResponse(request, { status }))
        );
        expect(
          yield* Effect.flip(activation.invalidate(cacheInput()))
        ).toMatchObject({ phase: "cache" });
        expect(requests).toHaveLength(1);
      })
  );
  it.effect.each([404, 408, 429, 503])(
    "retries transient cache response %d within the bounded policy",
    (status) =>
      Effect.gen(function* () {
        const { activation, requests } = yield* makeActivation((request) =>
          Effect.succeed(cacheResponse(request, { status }))
        );
        const failure = yield* runAfter(
          Effect.flip(activation.invalidate(cacheInput())),
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
        const network = yield* makeActivation((request) =>
          Effect.fail(
            new HttpClientError.HttpClientError({
              reason: new HttpClientError.TransportError({ request }),
            })
          )
        );
        const networkFailure = yield* runAfter(
          Effect.flip(network.activation.invalidate(cacheInput(RELEASE))),
          1000
        );
        expect(networkFailure).toMatchObject({ phase: "cache" });
        const mismatch = yield* makeActivation((request) =>
          Effect.succeed(
            cacheResponse(
              request,
              {},
              HttpClientRequest.post("https://www.example.test/other")
            )
          )
        );
        const uncached = yield* makeActivation((request) =>
          Effect.succeed(webResponse(request, "{}"))
        );
        expect(
          yield* mismatch.activation
            .invalidate(cacheInput(RELEASE))
            .pipe(Effect.flip)
        ).toMatchObject({ phase: "cache" });
        expect(
          yield* uncached.activation
            .invalidate(cacheInput(RELEASE))
            .pipe(Effect.flip)
        ).toMatchObject({ phase: "cache" });
        const stalled = yield* makeActivation(() => Effect.never);
        const timeout = yield* runAfter(
          Effect.flip(stalled.activation.invalidate(cacheInput(RELEASE))),
          30_100
        );
        expect(timeout).toMatchObject({ phase: "cache" });
      })
  );
});
