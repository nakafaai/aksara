import type { HttpClient, HttpClientRequest } from "@effect/platform";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  computePreviewRendererProof,
  PREVIEW_RENDERER_AUTH_FORMAT,
  PreviewRendererNonceSchema,
  PreviewRendererSecretSchema,
} from "@nakafa/aksara-contracts/preview/auth";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Redacted } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { RendererCredentials } from "#cli/credentials";
import { fetchRendererManifest, waitForRenderer } from "#cli/renderer";
import { captureClient, runClient, webResponse } from "#test/http";
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
  vi.useRealTimers();
});

/** Adds the renderer endpoint's mandatory response cache directive. */
function rendererResponse(
  request: HttpClientRequest.HttpClientRequest,
  body: ConstructorParameters<typeof Response>[0] = authenticatedBody(
    request.headers[NONCE_HEADER]
  ),
  init: ResponseInit = {}
) {
  const headers = new Headers(init.headers);
  if (!headers.has("cache-control")) {
    headers.set("cache-control", "private, no-store");
  }
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return webResponse(request, body, { ...init, headers });
}

/** Signs one renderer body against the challenge on its exact request. */
function authenticatedBody(
  sourceNonce: string | undefined,
  secret = RENDERER_SECRET,
  includeUnknown = false,
  manifest: RendererManifestEnvelope = RENDERER_MANIFEST
) {
  const nonce = PreviewRendererNonceSchema.make(sourceNonce ?? "");
  const proof = Effect.runSync(
    computePreviewRendererProof({
      manifestHash: manifest.hash,
      nonce,
      secret,
    })
  );
  return JSON.stringify({
    format: PREVIEW_RENDERER_AUTH_FORMAT,
    ...(includeUnknown ? { unknown: true } : {}),
    manifest,
    proof,
  });
}

/** Returns one direct local renderer failure through an injected client. */
function rejectRenderer(client: HttpClient.HttpClient, origin: URL = ORIGIN) {
  return runClient(
    fetchRendererManifest(origin, CREDENTIALS).pipe(Effect.flip),
    client
  );
}

describe("Nakafa renderer discovery", () => {
  it("validates the exact streamed manifest and authenticated request", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(rendererResponse(request))
    );

    await expect(
      runClient(fetchRendererManifest(ORIGIN, CREDENTIALS), captured.client)
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
      [NONCE_HEADER]: expect.stringMatching(NONCE_PATTERN),
    });
  });

  it("rejects forged, structurally unknown, and unchallengeable responses", async () => {
    const foreignSecret = PreviewRendererSecretSchema.make("x".repeat(43));
    const forgedClient = captureClient((request) =>
      Effect.succeed(
        rendererResponse(
          request,
          authenticatedBody(request.headers[NONCE_HEADER], foreignSecret)
        )
      )
    );
    const forged = await rejectRenderer(forgedClient.client);
    const unknownClient = captureClient((request) =>
      Effect.succeed(
        rendererResponse(
          request,
          authenticatedBody(
            request.headers[NONCE_HEADER],
            RENDERER_SECRET,
            true
          )
        )
      )
    );
    const unknown = await rejectRenderer(unknownClient.client);
    const tamperedManifest = {
      ...RENDERER_MANIFEST,
      hash: Sha256HashSchema.make(`sha256:${"0".repeat(64)}`),
    };
    const tamperedClient = captureClient((request) =>
      Effect.succeed(
        rendererResponse(
          request,
          authenticatedBody(
            request.headers[NONCE_HEADER],
            RENDERER_SECRET,
            false,
            tamperedManifest
          )
        )
      )
    );
    const tampered = await rejectRenderer(tamperedClient.client);
    cryptoFailure.nonce = true;
    const unreachable = captureClient((request) =>
      Effect.succeed(rendererResponse(request))
    );
    const nonce = await rejectRenderer(unreachable.client);

    expect(forged).toMatchObject({ reason: "auth", retryable: false });
    expect(unknown).toMatchObject({ reason: "contract", retryable: false });
    expect(tampered).toMatchObject({ reason: "contract", retryable: false });
    expect(nonce).toMatchObject({ reason: "auth", retryable: false });
    expect(unreachable.requests).toHaveLength(0);
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

  it("bounds local startup retries and timeout", async () => {
    const localResponses = [404, 200];
    const local = captureClient((request) => {
      const status = localResponses.shift() ?? 200;
      return Effect.succeed(
        rendererResponse(
          request,
          status === 200
            ? authenticatedBody(request.headers[NONCE_HEADER])
            : null,
          { status }
        )
      );
    });
    await expect(
      runClient(waitForRenderer(ORIGIN, CREDENTIALS), local.client)
    ).resolves.toEqual(RENDERER_MANIFEST);

    vi.useFakeTimers();
    const stalled = captureClient(() => Effect.never);
    const previewTimeout = runClient(
      waitForRenderer(ORIGIN, CREDENTIALS).pipe(Effect.flip),
      stalled.client
    );
    await vi.advanceTimersByTimeAsync(180_100);
    await expect(previewTimeout).resolves.toMatchObject({ reason: "timeout" });
  });
});
