import { existsSync } from "node:fs";
import { Server } from "node:http";
import { canonicalizeSignedContentArtifact } from "@nakafa/aksara-contracts/content";
import { Effect, Redacted } from "effect";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  openPreviewProvider,
  PREVIEW_EVENTS_PATH,
  PREVIEW_MANIFEST_PATH,
  type PreviewProvider,
} from "#cli/provider";
import { makePreviewReady, PREVIEW_REPOSITORIES } from "#test/preview";
import {
  makeTestRepositories,
  RENDERER_MANIFEST,
  removeTestRepositories,
  type TestRepositories,
} from "#test/real";

const repositories: TestRepositories[] = [];

afterEach(() => {
  vi.restoreAllMocks();
  for (const repository of repositories.splice(0)) {
    if (existsSync(repository.root)) {
      removeTestRepositories(repository);
    }
  }
});

/** Creates and tracks one isolated final-corpus repository pair. */
function makeRepositories() {
  const repository = makeTestRepositories();
  repositories.push(repository);
  return repository;
}

/** Executes one callback while the scoped loopback provider is listening. */
async function withProvider(
  use: (input: {
    readonly provider: PreviewProvider;
    readonly ready: Awaited<ReturnType<typeof makePreviewReady>>;
    readonly token: string;
  }) => Promise<void>
) {
  const repository = makeRepositories();
  const ready = await makePreviewReady(repository);
  await Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const provider = yield* openPreviewProvider({
          document: ready.document,
          repositories: PREVIEW_REPOSITORIES,
          token: ready.credentials.token,
        });
        yield* Effect.tryPromise(() =>
          use({
            provider,
            ready,
            token: Redacted.value(ready.credentials.token),
          })
        );
      })
    )
  );
}

/** Sends one authenticated request to the current provider origin. */
function request(
  provider: PreviewProvider,
  token: string,
  path: string,
  init: RequestInit = {}
) {
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${token}`);
  return fetch(new URL(path, provider.origin), { ...init, headers });
}

describe("local preview provider", () => {
  it("authenticates before routing and rejects malformed request targets", async () => {
    await withProvider(async ({ provider, token }) => {
      const missing = await fetch(
        new URL(PREVIEW_MANIFEST_PATH, provider.origin)
      );
      const wrongLength = await request(
        provider,
        "wrong",
        PREVIEW_MANIFEST_PATH
      );
      const wrongToken = await request(
        provider,
        "x".repeat(token.length),
        PREVIEW_MANIFEST_PATH
      );
      const method = await request(provider, token, PREVIEW_MANIFEST_PATH, {
        method: "POST",
      });
      const manifest = await request(
        provider,
        token,
        `${PREVIEW_MANIFEST_PATH}?revision=1`
      );
      const unknown = await request(provider, token, "/v1/unknown");
      const malformed = await request(
        provider,
        token,
        "/v1/artifacts/not-a-hash"
      );
      const traversal = await request(
        provider,
        token,
        "/v1/artifacts/%2e%2e%2fmanifest"
      );

      expect([missing.status, wrongLength.status, wrongToken.status]).toEqual([
        401, 401, 401,
      ]);
      expect(method.status).toBe(405);
      expect(method.headers.get("allow")).toBe("GET");
      expect(manifest.status).toBe(200);
      expect(manifest.headers.get("cache-control")).toBe("no-store");
      expect(manifest.headers.get("x-content-type-options")).toBe("nosniff");
      await expect(manifest.json()).resolves.toMatchObject({
        revision: 1,
        status: "pending",
      });
      expect(unknown.status).toBe(404);
      expect(malformed.status).toBe(409);
      expect(traversal.status).toBe(409);
    });
  });

  it("atomically exposes ready state and clears stale artifacts", async () => {
    await withProvider(async ({ provider, ready, token }) => {
      await Effect.runPromise(
        provider.ready({
          artifact: ready.result.artifact,
          projection: ready.result.projection,
          rendererManifestHash: RENDERER_MANIFEST.hash,
        })
      );
      const readyManifestResponse = await request(
        provider,
        token,
        PREVIEW_MANIFEST_PATH
      );
      const readyManifest = await readyManifestResponse.json();
      expect(readyManifest).toMatchObject({ revision: 2, status: "ready" });
      if (
        !readyManifest ||
        typeof readyManifest !== "object" ||
        !("artifactPath" in readyManifest) ||
        typeof readyManifest.artifactPath !== "string"
      ) {
        throw new Error("Ready provider manifest omitted its artifact path.");
      }
      const artifact = await request(
        provider,
        token,
        readyManifest.artifactPath
      );
      await expect(artifact.text()).resolves.toBe(
        canonicalizeSignedContentArtifact(ready.result.artifact)
      );

      await Effect.runPromise(provider.pending());
      expect(
        (await request(provider, token, readyManifest.artifactPath)).status
      ).toBe(409);
      await Effect.runPromise(
        provider.failed({
          code: "MaterialReadError",
          message: "The selected real document is unavailable.",
        })
      );
      const failed = await request(provider, token, PREVIEW_MANIFEST_PATH);
      await expect(failed.json()).resolves.toMatchObject({
        failure: { code: "MaterialReadError" },
        revision: 4,
        status: "failed",
      });
      const encodeError = await Effect.runPromise(
        provider
          .failed({ code: "x".repeat(129), message: "Invalid bounded code." })
          .pipe(Effect.flip)
      );
      expect(encodeError).toMatchObject({
        _tag: "PreviewProviderError",
        stage: "encode",
      });
      const unchanged = await request(provider, token, PREVIEW_MANIFEST_PATH);
      await expect(unchanged.json()).resolves.toMatchObject({ revision: 4 });
    });
  });

  it("streams initial and changed revisions over authenticated SSE", async () => {
    await withProvider(async ({ provider, token }) => {
      const controller = new AbortController();
      const response = await request(provider, token, PREVIEW_EVENTS_PATH, {
        signal: controller.signal,
      });
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain(
        "text/event-stream"
      );
      const reader = response.body?.getReader();
      expect(reader).toBeDefined();
      const initial = await reader?.read();
      expect(new TextDecoder().decode(initial?.value)).toContain(
        '"revision":1'
      );
      await Effect.runPromise(provider.pending());
      const changed = await reader?.read();
      expect(new TextDecoder().decode(changed?.value)).toContain(
        '"revision":2'
      );
      controller.abort();
      await reader?.cancel().catch(() => undefined);
    });
  });

  it("fails when the operating system cannot bind or prove loopback", async () => {
    const repository = makeRepositories();
    const ready = await makePreviewReady(repository);
    const input = {
      document: ready.document,
      repositories: PREVIEW_REPOSITORIES,
      token: ready.credentials.token,
    };
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
  });

  it("closes an unfinished listener when provider acquisition is cancelled", async () => {
    const repository = makeRepositories();
    const ready = await makePreviewReady(repository);
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
      Effect.scoped(
        openPreviewProvider({
          document: ready.document,
          repositories: PREVIEW_REPOSITORIES,
          token: ready.credentials.token,
        })
      ).pipe(Effect.timeout("1 millis"), Effect.flip)
    );

    expect(cancelled._tag).toBe("TimeoutException");
    expect(close).toHaveBeenCalledOnce();
  });
});
