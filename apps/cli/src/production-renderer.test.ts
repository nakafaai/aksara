import type { HttpClientRequest } from "@effect/platform";
import { Effect, Redacted } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchProductionRenderer } from "#cli/production-renderer";
import { captureClient, runClient, webResponse } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";

const ENDPOINT = new URL(
  "https://www.example.test/api/internal/content/renderer"
);
const TOKEN = Redacted.make("renderer-test-token");

afterEach(() => vi.useRealTimers());

/** Creates one valid no-store renderer response for a chosen status. */
function rendererResponse(
  request: HttpClientRequest.HttpClientRequest,
  status = 200
) {
  return webResponse(request, JSON.stringify(RENDERER_MANIFEST), {
    headers: { "cache-control": "private, no-store" },
    status,
  });
}

describe("production renderer", () => {
  it("uses only the exact authenticated HTTPS endpoint", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(rendererResponse(request))
    );

    await expect(
      runClient(fetchProductionRenderer(ENDPOINT, TOKEN), captured.client)
    ).resolves.toEqual(RENDERER_MANIFEST);
    expect(captured.requests[0]?.url).toBe(ENDPOINT.toString());
  });

  it.each([
    new URL("http://www.example.test/renderer"),
    new URL("https://www.example.test/renderer"),
    new URL("https://user@www.example.test/renderer"),
    new URL("https://user:secret@www.example.test/renderer"),
    new URL("https://www.example.test/renderer?query=true"),
    new URL("https://www.example.test/renderer#fragment"),
  ])("rejects unsafe endpoint %s", async (endpoint) => {
    const captured = captureClient((request) =>
      Effect.succeed(rendererResponse(request))
    );

    await expect(
      runClient(
        fetchProductionRenderer(endpoint, TOKEN).pipe(Effect.flip),
        captured.client
      )
    ).resolves.toMatchObject({ reason: "origin", retryable: false });
    expect(captured.requests).toHaveLength(0);
  });

  it.each([408, 429, 503])(
    "retries transient status %d with the same bound",
    async (status) => {
      vi.useFakeTimers();
      const captured = captureClient((request) =>
        Effect.succeed(rendererResponse(request, status))
      );
      const exhausted = runClient(
        fetchProductionRenderer(ENDPOINT, TOKEN).pipe(Effect.flip),
        captured.client
      );

      await vi.advanceTimersByTimeAsync(1000);
      await expect(exhausted).resolves.toMatchObject({
        reason: "status",
        retryable: true,
      });
      expect(captured.requests).toHaveLength(4);
    }
  );

  it.each([400, 401, 403, 422])(
    "keeps permanent status %d single-shot",
    async (status) => {
      const captured = captureClient((request) =>
        Effect.succeed(rendererResponse(request, status))
      );

      await expect(
        runClient(
          fetchProductionRenderer(ENDPOINT, TOKEN).pipe(Effect.flip),
          captured.client
        )
      ).resolves.toMatchObject({ reason: "status", retryable: false });
      expect(captured.requests).toHaveLength(1);
    }
  );

  it("fails when the total renderer wait exceeds thirty seconds", async () => {
    vi.useFakeTimers();
    const stalled = captureClient(() => Effect.never);
    const timeout = runClient(
      fetchProductionRenderer(ENDPOINT, TOKEN).pipe(Effect.flip),
      stalled.client
    );

    await vi.advanceTimersByTimeAsync(30_100);
    await expect(timeout).resolves.toMatchObject({ reason: "timeout" });
  });
});
