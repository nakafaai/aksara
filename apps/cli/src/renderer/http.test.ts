import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { PreviewRendererNonceSchema } from "@nakafa/aksara-contracts/preview/auth";
import { canonicalizeRendererManifestContract } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Redacted } from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientError,
  HttpClientRequest,
} from "effect/unstable/http";
import { fetchRendererBody, fetchRendererEndpoint } from "#cli/renderer/http";
import { captureClient, runClient, webResponse } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";

const RENDERER_URL = new URL(
  "http://127.0.0.1:31234/api/internal/content/renderer"
);
const TOKEN = Redacted.make("renderer-test-token");
const NONCE = PreviewRendererNonceSchema.make("n".repeat(43));
const NONCE_HEADER = "x-aksara-preview-nonce";

/** Builds one hash-valid historical subset that is not a complete live manifest. */
function historicalRendererManifest() {
  const domains = RENDERER_MANIFEST.domains.slice(0, -1);
  const contract = {
    base: RENDERER_MANIFEST.base,
    domains,
    publishedDomains: RENDERER_MANIFEST.publishedDomains,
  };
  return {
    ...RENDERER_MANIFEST,
    domains,
    hash: `sha256:${createHash("sha256")
      .update(canonicalizeRendererManifestContract(contract))
      .digest("hex")}`,
  };
}

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
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return webResponse(request, body, { ...init, headers });
}

/** Returns one renderer transport failure through an injected client. */
function rejectRenderer(client: HttpClient.HttpClient) {
  return runClient(
    fetchRendererBody(RENDERER_URL, { nonce: NONCE, token: TOKEN }).pipe(
      Effect.flip
    ),
    client
  );
}

describe("renderer HTTP", () => {
  it("reads bounded streamed JSON and sends exact credentials", async () => {
    const bytes = new TextEncoder().encode(JSON.stringify(RENDERER_MANIFEST));
    const captured = captureClient((request) => {
      const stream = new ReadableStream<Uint8Array>({
        /** Sends two chunks to exercise bounded incremental assembly. */
        start(controller) {
          controller.enqueue(bytes.slice(0, 10));
          controller.enqueue(bytes.slice(10));
          controller.close();
        },
      });
      return Effect.succeed(
        rendererResponse(request, stream, {
          headers: {
            "cache-control": "Private, NO-STORE",
            "content-length": String(bytes.byteLength),
          },
        })
      );
    });

    await expect(
      runClient(
        fetchRendererBody(RENDERER_URL, { nonce: NONCE, token: TOKEN }),
        captured.client
      )
    ).resolves.toEqual(RENDERER_MANIFEST);
    expect(captured.requests[0]).toMatchObject({
      method: "GET",
      url: RENDERER_URL.toString(),
    });
    expect(captured.requests[0]?.headers).toMatchObject({
      accept: "application/json",
      authorization: "Bearer renderer-test-token",
      "cache-control": "no-store",
      [NONCE_HEADER]: NONCE,
    });
  });

  it("disables native redirect following at the fetch adapter", async () => {
    let redirect: NonNullable<
      Parameters<typeof globalThis.fetch>[1]
    >["redirect"];
    /** Captures redirect policy before returning one valid JSON response. */
    const fetch: typeof globalThis.fetch = (_input, init) => {
      redirect = init?.redirect;
      return Promise.resolve(
        new Response(JSON.stringify(RENDERER_MANIFEST), {
          headers: {
            "cache-control": "private, no-store",
            "content-type": "application/json",
          },
        })
      );
    };

    await expect(
      Effect.runPromise(
        fetchRendererBody(RENDERER_URL, { token: TOKEN }).pipe(
          Effect.provide(FetchHttpClient.layer),
          Effect.provideService(FetchHttpClient.Fetch, fetch)
        )
      )
    ).resolves.toEqual(RENDERER_MANIFEST);
    expect(redirect).toBe("manual");
  });

  it("classifies network, status, redirect, and cache failures", async () => {
    const networkClient = HttpClient.make((request) =>
      Effect.fail(
        new HttpClientError.HttpClientError({
          reason: new HttpClientError.TransportError({ request }),
        })
      )
    );
    const network = await rejectRenderer(networkClient);
    const statuses = [404, 408, 429, 500, 400, 401, 302];
    const statusResponses = [...statuses];
    const statusClient = captureClient((request) =>
      Effect.succeed(
        rendererResponse(request, null, {
          status: statusResponses.shift() ?? 200,
        })
      )
    );
    const statusErrors = await runClient(
      Effect.forEach(
        statuses,
        () =>
          fetchRendererBody(RENDERER_URL, {
            nonce: NONCE,
            token: TOKEN,
          }).pipe(Effect.flip),
        { concurrency: 1 }
      ),
      statusClient.client
    );
    const wrongRequest = HttpClientRequest.get("http://127.0.0.1:31234/other");
    const mismatchClient = captureClient(() =>
      Effect.succeed(rendererResponse(wrongRequest, "{}"))
    );
    const mismatch = await rejectRenderer(mismatchClient.client);
    let cacheAttempt = 0;
    const cacheClient = captureClient((request) => {
      cacheAttempt += 1;
      return Effect.succeed(
        cacheAttempt === 1
          ? rendererResponse(request, "{}", {
              headers: { "cache-control": "private, x-no-store" },
            })
          : webResponse(request, "{}")
      );
    });
    const cache = await rejectRenderer(cacheClient.client);
    const absentCache = await rejectRenderer(cacheClient.client);

    expect(network).toMatchObject({ reason: "network", retryable: true });
    expect(
      statusErrors.map(({ reason, retryable }) => [reason, retryable])
    ).toEqual([
      ["status", true],
      ["status", true],
      ["status", true],
      ["status", true],
      ["status", false],
      ["status", false],
      ["redirect", false],
    ]);
    expect(mismatch).toMatchObject({ reason: "redirect", retryable: false });
    expect(cache).toMatchObject({ reason: "cache", retryable: false });
    expect(absentCache).toMatchObject({ reason: "cache", retryable: false });
  });

  it("rejects body bounds, stream errors, encoding, and JSON failures", async () => {
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
      ["{}", { headers: { "content-type": "text/plain" } }],
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
        () =>
          fetchRendererBody(RENDERER_URL, {
            nonce: NONCE,
            token: TOKEN,
          }).pipe(Effect.flip),
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
      "json",
      "json",
    ]);
    expect(errors[3]).toMatchObject({ retryable: false });
    expect(errors[4]).toMatchObject({ retryable: true });
  });

  it("rejects an invalid production renderer contract", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(rendererResponse(request, "{}"))
    );

    await expect(
      runClient(
        fetchRendererEndpoint(RENDERER_URL, TOKEN).pipe(Effect.flip),
        captured.client
      )
    ).resolves.toMatchObject({ reason: "contract", retryable: false });
  });

  it("rejects a hash-valid historical subset from the live endpoint", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(
        rendererResponse(request, JSON.stringify(historicalRendererManifest()))
      )
    );

    await expect(
      runClient(
        fetchRendererEndpoint(RENDERER_URL, TOKEN).pipe(Effect.flip),
        captured.client
      )
    ).resolves.toMatchObject({ reason: "contract", retryable: false });
  });
});
