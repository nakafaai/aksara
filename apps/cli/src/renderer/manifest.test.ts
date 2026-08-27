import { afterEach, describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  computePreviewRendererProof,
  PREVIEW_RENDERER_AUTH_FORMAT,
  PreviewRendererNonceSchema,
  PreviewRendererSecretSchema,
} from "@nakafa/aksara-contracts/preview/auth";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Fiber, Redacted } from "effect";
import { TestClock } from "effect/testing";
import type { HttpClientRequest } from "effect/unstable/http";
import { HttpClient } from "effect/unstable/http";
import { vi } from "vitest";
import type { RendererCredentials } from "#cli/credentials";
import { fetchRendererManifest, waitForRenderer } from "#cli/renderer/manifest";
import { captureClient, webResponse } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";

const cryptoFailure = vi.hoisted(() => ({ nonce: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects failure only into the renderer challenge generator. */
    randomBytes(size: number) {
      if (cryptoFailure.nonce) {
        throw new TypeError("injected renderer nonce failure");
      }
      return crypto.randomBytes(size);
    },
  };
});

const ORIGIN = new URL("http://localhost:31234");
const RENDERER_URL = new URL("/api/internal/content/renderer", ORIGIN);
const RENDERER_SECRET = PreviewRendererSecretSchema.make("s".repeat(43));
const CREDENTIALS: RendererCredentials = {
  secret: Redacted.make(RENDERER_SECRET),
  token: Redacted.make("renderer-test-token"),
};
const NONCE_HEADER = "x-aksara-preview-nonce";
const NONCE_PATTERN = /^[A-Za-z0-9_-]{43}$/u;

afterEach(() => {
  cryptoFailure.nonce = false;
});

/** Signs one renderer body against the challenge on its exact request. */
function authenticatedBody(
  sourceNonce: string | undefined,
  secret = RENDERER_SECRET,
  includeUnknown = false,
  manifest: RendererManifestEnvelope = RENDERER_MANIFEST
) {
  const nonce = PreviewRendererNonceSchema.make(sourceNonce ?? "");
  return computePreviewRendererProof({
    manifestHash: manifest.hash,
    nonce,
    secret,
  }).pipe(
    Effect.orDie,
    Effect.map((proof) =>
      JSON.stringify({
        format: PREVIEW_RENDERER_AUTH_FORMAT,
        ...(includeUnknown ? { unknown: true } : {}),
        manifest,
        proof,
      })
    )
  );
}

/** Adds the renderer endpoint's mandatory response cache directive. */
function rendererResponse(
  request: HttpClientRequest.HttpClientRequest,
  body?: ConstructorParameters<typeof Response>[0],
  init: ResponseInit = {}
) {
  return Effect.gen(function* () {
    const resolvedBody =
      body === undefined
        ? yield* authenticatedBody(request.headers[NONCE_HEADER])
        : body;
    const headers = new Headers(init.headers);
    if (!headers.has("cache-control")) {
      headers.set("cache-control", "private, no-store");
    }
    if (!headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
    return webResponse(request, resolvedBody, { ...init, headers });
  });
}

/** Returns one direct local renderer failure through an injected client. */
function rejectRenderer(client: HttpClient.HttpClient, origin: URL = ORIGIN) {
  return fetchRendererManifest(origin, CREDENTIALS).pipe(
    Effect.flip,
    Effect.provideService(HttpClient.HttpClient, client)
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

describe("Nakafa renderer discovery", () => {
  it.effect(
    "validates the exact streamed manifest and authenticated request",
    () =>
      Effect.gen(function* () {
        const captured = captureClient((request) => rendererResponse(request));

        expect(
          yield* fetchRendererManifest(ORIGIN, CREDENTIALS).pipe(
            Effect.provideService(HttpClient.HttpClient, captured.client)
          )
        ).toEqual(RENDERER_MANIFEST);
        expect(captured.requests).toHaveLength(1);
        expect(captured.requests[0]).toMatchObject({
          method: "GET",
          url: RENDERER_URL.toString(),
        });
        expect(captured.requests[0]?.headers).toMatchObject({
          accept: "application/json",
          authorization: "Bearer renderer-test-token",
          "cache-control": "no-store",
          [NONCE_HEADER]: expect.stringMatching(NONCE_PATTERN),
        });
      })
  );

  it.effect(
    "rejects forged, structurally unknown, and unchallengeable responses",
    () =>
      Effect.gen(function* () {
        const foreignSecret = PreviewRendererSecretSchema.make("x".repeat(43));
        const forgedClient = captureClient((request) =>
          authenticatedBody(request.headers[NONCE_HEADER], foreignSecret).pipe(
            Effect.flatMap((body) => rendererResponse(request, body))
          )
        );
        const forged = yield* rejectRenderer(forgedClient.client);
        const unknownClient = captureClient((request) =>
          authenticatedBody(
            request.headers[NONCE_HEADER],
            RENDERER_SECRET,
            true
          ).pipe(Effect.flatMap((body) => rendererResponse(request, body)))
        );
        const unknown = yield* rejectRenderer(unknownClient.client);
        const tamperedManifest = {
          ...RENDERER_MANIFEST,
          hash: Sha256HashSchema.make(`sha256:${"0".repeat(64)}`),
        };
        const tamperedClient = captureClient((request) =>
          authenticatedBody(
            request.headers[NONCE_HEADER],
            RENDERER_SECRET,
            false,
            tamperedManifest
          ).pipe(Effect.flatMap((body) => rendererResponse(request, body)))
        );
        const tampered = yield* rejectRenderer(tamperedClient.client);
        cryptoFailure.nonce = true;
        const unreachable = captureClient((request) =>
          rendererResponse(request)
        );
        const nonce = yield* rejectRenderer(unreachable.client);

        expect(forged).toMatchObject({ reason: "auth", retryable: false });
        expect(unknown).toMatchObject({ reason: "contract", retryable: false });
        expect(tampered).toMatchObject({
          reason: "contract",
          retryable: false,
        });
        expect(nonce).toMatchObject({ reason: "auth", retryable: false });
        expect(unreachable.requests).toHaveLength(0);
      })
  );

  it.effect.each([
    new URL("https://localhost:31234"),
    new URL("http://127.0.0.1:31234"),
    new URL("http://localhost"),
    new URL("http://user@localhost:31234"),
    new URL("http://localhost:31234/other"),
    new URL("http://localhost:31234/?query=true"),
    new URL("http://localhost:31234/#fragment"),
  ])("rejects renderer origin %s", (origin) =>
    Effect.gen(function* () {
      const captured = captureClient((request) => rendererResponse(request));

      expect(yield* rejectRenderer(captured.client, origin)).toMatchObject({
        reason: "origin",
        retryable: false,
      });
      expect(captured.requests).toHaveLength(0);
    })
  );

  it.effect("bounds local startup retries and timeout", () =>
    Effect.gen(function* () {
      const localResponses = [404, 200];
      const local = captureClient((request) => {
        const status = localResponses.shift() ?? 200;
        if (status !== 200) {
          return rendererResponse(request, null, { status });
        }
        return authenticatedBody(request.headers[NONCE_HEADER]).pipe(
          Effect.flatMap((body) => rendererResponse(request, body, { status }))
        );
      });
      expect(
        yield* runAfter(
          waitForRenderer(ORIGIN, CREDENTIALS).pipe(
            Effect.provideService(HttpClient.HttpClient, local.client)
          ),
          1000
        )
      ).toEqual(RENDERER_MANIFEST);

      const stalled = captureClient(() => Effect.never);
      expect(
        yield* runAfter(
          waitForRenderer(ORIGIN, CREDENTIALS).pipe(
            Effect.flip,
            Effect.provideService(HttpClient.HttpClient, stalled.client)
          ),
          180_100
        )
      ).toMatchObject({ reason: "timeout" });
    })
  );
});
