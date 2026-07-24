import { Server } from "node:http";
import { canonicalizeSignedContentArtifact } from "@nakafa/aksara-contracts/content";
import { previewDocumentRoute } from "@nakafa/aksara-contracts/preview/document";
import { Effect } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import { openPreviewProvider } from "#cli/provider";
import { PREVIEW_EVENTS_PATH, PREVIEW_MANIFEST_PATH } from "#cli/provider/http";
import { PREVIEW_REPOSITORIES } from "#test/preview";
import {
  makeIncoherentResults,
  makeProviderInput,
  providerRepositories,
  requestProvider,
  withProvider,
} from "#test/provider";
import { RENDERER_MANIFEST } from "#test/real";

afterEach(() => {
  vi.restoreAllMocks();
  providerRepositories.clear();
});

describe("local preview provider", () => {
  it("atomically exposes ready state and clears stale artifacts", async () => {
    await withProvider(async ({ provider, ready, token }) => {
      const [compiled] = ready.result.results;
      await Effect.runPromise(
        provider.ready({
          generation: 0,
          rendererManifestHash: RENDERER_MANIFEST.hash,
          repositories: PREVIEW_REPOSITORIES,
          results: ready.result.results,
        })
      );
      const readyManifestResponse = await requestProvider(
        provider,
        token,
        PREVIEW_MANIFEST_PATH
      );
      const readyManifest = await readyManifestResponse.json();
      expect(readyManifest).toMatchObject({ revision: 2, status: "ready" });
      if (
        !readyManifest ||
        typeof readyManifest !== "object" ||
        !("artifacts" in readyManifest) ||
        !Array.isArray(readyManifest.artifacts) ||
        typeof readyManifest.artifacts[0]?.artifactPath !== "string"
      ) {
        throw new Error("Ready provider manifest omitted its artifact paths.");
      }
      const [readyArtifact] = readyManifest.artifacts;
      const artifact = await requestProvider(
        provider,
        token,
        readyArtifact.artifactPath
      );
      await expect(artifact.text()).resolves.toBe(
        canonicalizeSignedContentArtifact(compiled.artifact)
      );
      const unknownArtifact = await requestProvider(
        provider,
        token,
        `/v1/artifacts/${encodeURIComponent(`sha256:${"f".repeat(64)}`)}`
      );
      expect(unknownArtifact.status).toBe(409);

      const generation = await Effect.runPromise(
        provider.pending(PREVIEW_REPOSITORIES)
      );
      expect(
        (await requestProvider(provider, token, readyArtifact.artifactPath))
          .status
      ).toBe(409);
      await Effect.runPromise(
        provider.failed({
          failure: {
            code: "MaterialReadError",
            message: "The selected real document is unavailable.",
          },
          generation,
          repositories: PREVIEW_REPOSITORIES,
        })
      );
      const failed = await requestProvider(
        provider,
        token,
        PREVIEW_MANIFEST_PATH
      );
      await expect(failed.json()).resolves.toMatchObject({
        failure: { code: "MaterialReadError" },
        revision: 4,
        status: "failed",
      });
      const encodeError = await Effect.runPromise(
        provider
          .failed({
            failure: {
              code: "x".repeat(129),
              message: "Invalid bounded code.",
            },
            generation,
            repositories: PREVIEW_REPOSITORIES,
          })
          .pipe(Effect.flip)
      );
      expect(encodeError).toMatchObject({
        _tag: "PreviewProviderError",
        stage: "encode",
      });
      const unchanged = await requestProvider(
        provider,
        token,
        PREVIEW_MANIFEST_PATH
      );
      await expect(unchanged.json()).resolves.toMatchObject({ revision: 4 });
    });
  }, 30_000);

  it("rejects incoherent payload identity without changing served state", async () => {
    await withProvider(async ({ provider, ready, token }) => {
      const [compiled] = ready.result.results;
      const input = {
        generation: 0,
        rendererManifestHash: RENDERER_MANIFEST.hash,
        repositories: PREVIEW_REPOSITORIES,
        results: ready.result.results,
      };
      await Effect.runPromise(provider.ready(input));
      const mismatches = makeIncoherentResults(ready);

      const errors = await Promise.all(
        mismatches.map((result) =>
          Effect.runPromise(
            provider.ready({ ...input, results: [result] }).pipe(Effect.flip)
          )
        )
      );
      expect(errors).toMatchObject(
        mismatches.map(() => ({
          _tag: "PreviewProviderError",
          stage: "coherence",
        }))
      );

      const manifest = await requestProvider(
        provider,
        token,
        PREVIEW_MANIFEST_PATH
      );
      await expect(manifest.json()).resolves.toMatchObject({
        revision: 2,
        status: "ready",
      });
      const servedArtifact = await requestProvider(
        provider,
        token,
        `/v1/artifacts/${encodeURIComponent(compiled.artifact.artifactHash)}`
      );
      await expect(servedArtifact.text()).resolves.toBe(
        canonicalizeSignedContentArtifact(compiled.artifact)
      );
    });
  }, 30_000);

  it("streams initial and changed revisions over authenticated SSE", async () => {
    await withProvider(async ({ provider, ready, token }) => {
      const controller = new AbortController();
      const response = await requestProvider(
        provider,
        token,
        PREVIEW_EVENTS_PATH,
        {
          signal: controller.signal,
        }
      );
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain(
        "text/event-stream"
      );
      const reader = response.body?.getReader();
      expect(reader).toBeDefined();
      const initial = await reader?.read();
      const initialEvent = new TextDecoder().decode(initial?.value);
      const route = previewDocumentRoute(ready.document);
      expect(initialEvent).toContain('"revision":1');
      expect(initialEvent).toContain(
        `"route":{"locale":"${route.locale}","publicPath":"${route.publicPath}"}`
      );
      await Effect.runPromise(provider.pending(PREVIEW_REPOSITORIES));
      const changed = await reader?.read();
      expect(new TextDecoder().decode(changed?.value)).toContain(
        '"revision":2'
      );
      controller.abort();
      await reader?.cancel().catch(() => undefined);
    });
  }, 30_000);

  it("rejects stale compilation generations after a newer save", async () => {
    await withProvider(async ({ provider, ready, token }) => {
      const staleGeneration = await Effect.runPromise(
        provider.pending(PREVIEW_REPOSITORIES)
      );
      const currentGeneration = await Effect.runPromise(
        provider.pending(PREVIEW_REPOSITORIES)
      );
      const staleReady = await Effect.runPromise(
        provider.ready({
          generation: staleGeneration,
          rendererManifestHash: RENDERER_MANIFEST.hash,
          repositories: PREVIEW_REPOSITORIES,
          results: ready.result.results,
        })
      );
      const staleFailure = await Effect.runPromise(
        provider.failed({
          failure: {
            code: "MaterialReadError",
            message: "A stale compile failure.",
          },
          generation: staleGeneration,
          repositories: PREVIEW_REPOSITORIES,
        })
      );
      const currentReady = await Effect.runPromise(
        provider.ready({
          generation: currentGeneration,
          rendererManifestHash: RENDERER_MANIFEST.hash,
          repositories: PREVIEW_REPOSITORIES,
          results: ready.result.results,
        })
      );

      expect({ currentReady, staleFailure, staleReady }).toEqual({
        currentReady: true,
        staleFailure: false,
        staleReady: false,
      });
      const manifest = await requestProvider(
        provider,
        token,
        PREVIEW_MANIFEST_PATH
      );
      await expect(manifest.json()).resolves.toMatchObject({
        revision: 4,
        status: "ready",
      });
    });
  }, 30_000);

  it("fails when the operating system cannot bind or prove loopback", async () => {
    const input = await makeProviderInput();
    vi.spyOn(Server.prototype, "listen").mockImplementationOnce(function (
      this: Server
    ) {
      queueMicrotask(() => this.emit("error", new Error("Test bind failure.")));
      return this;
    });
    const listenError = await Effect.runPromise(
      Effect.scoped(openPreviewProvider(input)).pipe(Effect.flip)
    );
    vi.restoreAllMocks();
    vi.spyOn(Server.prototype, "address").mockReturnValueOnce(null);
    const addressError = await Effect.runPromise(
      Effect.scoped(openPreviewProvider(input)).pipe(Effect.flip)
    );

    expect(listenError).toMatchObject({ stage: "listen" });
    expect(addressError).toMatchObject({ stage: "listen" });
  }, 30_000);

  it("closes an unfinished listener when provider acquisition is cancelled", async () => {
    const input = await makeProviderInput();
    vi.spyOn(Server.prototype, "listen").mockImplementationOnce(function (
      this: Server
    ) {
      return this;
    });
    const close = vi
      .spyOn(Server.prototype, "close")
      .mockImplementationOnce(function (this: Server) {
        return this;
      });

    const cancelled = await Effect.runPromise(
      Effect.scoped(openPreviewProvider(input)).pipe(
        Effect.timeout("1 millis"),
        Effect.flip
      )
    );

    expect(cancelled._tag).toBe("TimeoutException");
    expect(close).toHaveBeenCalledOnce();
  }, 30_000);
});
