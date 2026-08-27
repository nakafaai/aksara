import { Server } from "node:http";
import { afterEach, assert, describe, expect, it } from "@effect/vitest";
import { canonicalizeSignedContentArtifact } from "@nakafa/aksara-contracts/content";
import { previewDocumentRoute } from "@nakafa/aksara-contracts/preview/document";
import { Effect } from "effect";
import { vi } from "vitest";
import { openPreviewProvider } from "#cli/provider";
import { PREVIEW_EVENTS_PATH, PREVIEW_MANIFEST_PATH } from "#cli/provider/http";
import { PREVIEW_REPOSITORIES } from "#test/preview";
import {
  makeIncoherentResults,
  makeProviderInput,
  readProviderEvent,
  requestProvider,
  responseJson,
  responseText,
  withProvider,
} from "#test/provider";
import { RENDERER_MANIFEST } from "#test/real";

afterEach(() => {
  vi.restoreAllMocks();
});
describe("local preview provider", () => {
  it.live(
    "atomically exposes ready state and clears stale artifacts",
    () =>
      withProvider(({ provider, ready, token }) =>
        Effect.gen(function* () {
          const [compiled] = ready.result.results;
          yield* provider.ready({
            generation: 0,
            rendererManifestHash: RENDERER_MANIFEST.hash,
            repositories: PREVIEW_REPOSITORIES,
            results: ready.result.results,
          });
          const readyManifestResponse = yield* requestProvider(
            provider,
            token,
            PREVIEW_MANIFEST_PATH
          );
          const readyManifest = yield* responseJson(readyManifestResponse);
          expect(readyManifest).toMatchObject({ revision: 2, status: "ready" });
          assert(
            readyManifest !== null &&
              typeof readyManifest === "object" &&
              "artifacts" in readyManifest &&
              Array.isArray(readyManifest.artifacts) &&
              typeof readyManifest.artifacts[0]?.artifactPath === "string",
            "Ready provider manifest omitted its artifact paths."
          );
          const [readyArtifact] = readyManifest.artifacts;
          const artifact = yield* requestProvider(
            provider,
            token,
            readyArtifact.artifactPath
          );
          expect(yield* responseText(artifact)).toBe(
            canonicalizeSignedContentArtifact(compiled.artifact)
          );
          const unknownArtifact = yield* requestProvider(
            provider,
            token,
            `/v1/artifacts/${encodeURIComponent(`sha256:${"f".repeat(64)}`)}`
          );
          expect(unknownArtifact.status).toBe(409);
          const generation = yield* provider.pending(PREVIEW_REPOSITORIES);
          expect(
            (yield* requestProvider(
              provider,
              token,
              readyArtifact.artifactPath
            )).status
          ).toBe(409);
          yield* provider.failed({
            failure: {
              code: "MaterialReadError",
              message: "The selected real document is unavailable.",
            },
            generation,
            repositories: PREVIEW_REPOSITORIES,
          });
          const failed = yield* requestProvider(
            provider,
            token,
            PREVIEW_MANIFEST_PATH
          );
          expect(yield* responseJson(failed)).toMatchObject({
            failure: { code: "MaterialReadError" },
            revision: 4,
            status: "failed",
          });
          const encodeError = yield* provider
            .failed({
              failure: {
                code: "x".repeat(129),
                message: "Invalid bounded code.",
              },
              generation,
              repositories: PREVIEW_REPOSITORIES,
            })
            .pipe(Effect.flip);
          expect(encodeError).toMatchObject({
            _tag: "PreviewProviderError",
            stage: "encode",
          });
          const unchanged = yield* requestProvider(
            provider,
            token,
            PREVIEW_MANIFEST_PATH
          );
          expect(yield* responseJson(unchanged)).toMatchObject({ revision: 4 });
        })
      ),
    30_000
  );
  it.live(
    "rejects incoherent payload identity without changing served state",
    () =>
      withProvider(({ provider, ready, token }) =>
        Effect.gen(function* () {
          const [compiled] = ready.result.results;
          const input = {
            generation: 0,
            rendererManifestHash: RENDERER_MANIFEST.hash,
            repositories: PREVIEW_REPOSITORIES,
            results: ready.result.results,
          };
          yield* provider.ready(input);
          const mismatches = makeIncoherentResults(ready);
          const errors = yield* Effect.forEach(
            mismatches,
            (result) =>
              provider.ready({ ...input, results: [result] }).pipe(Effect.flip),
            { concurrency: "unbounded" }
          );
          expect(errors).toMatchObject(
            mismatches.map(() => ({
              _tag: "PreviewProviderError",
              stage: "coherence",
            }))
          );
          const manifest = yield* requestProvider(
            provider,
            token,
            PREVIEW_MANIFEST_PATH
          );
          expect(yield* responseJson(manifest)).toMatchObject({
            revision: 2,
            status: "ready",
          });
          const servedArtifact = yield* requestProvider(
            provider,
            token,
            `/v1/artifacts/${encodeURIComponent(compiled.artifact.artifactHash)}`
          );
          expect(yield* responseText(servedArtifact)).toBe(
            canonicalizeSignedContentArtifact(compiled.artifact)
          );
        })
      ),
    30_000
  );
  it.live(
    "streams initial and changed revisions over authenticated SSE",
    () =>
      withProvider(({ provider, ready, token }) =>
        Effect.gen(function* () {
          const signal = yield* Effect.abortSignal;
          const response = yield* requestProvider(
            provider,
            token,
            PREVIEW_EVENTS_PATH,
            { signal }
          );
          expect(response.status).toBe(200);
          expect(response.headers.get("content-type")).toContain(
            "text/event-stream"
          );
          const reader = response.body?.getReader();
          assert(reader !== undefined, "Expected one provider event stream.");
          const initial = yield* readProviderEvent(reader);
          const initialEvent = new TextDecoder().decode(initial.value);
          const route = previewDocumentRoute(ready.document);
          expect(initialEvent).toContain('"revision":1');
          expect(initialEvent).toContain(
            `"route":{"appLocale":"${route.appLocale}","publicPath":"${route.publicPath}"}`
          );
          yield* provider.pending(PREVIEW_REPOSITORIES);
          const changed = yield* readProviderEvent(reader);
          expect(new TextDecoder().decode(changed.value)).toContain(
            '"revision":2'
          );
          yield* Effect.tryPromise(() => reader.cancel()).pipe(Effect.ignore);
        })
      ),
    30_000
  );
  it.live(
    "rejects stale compilation generations after a newer save",
    () =>
      withProvider(({ provider, ready, token }) =>
        Effect.gen(function* () {
          const staleGeneration = yield* provider.pending(PREVIEW_REPOSITORIES);
          const currentGeneration =
            yield* provider.pending(PREVIEW_REPOSITORIES);
          const staleReady = yield* provider.ready({
            generation: staleGeneration,
            rendererManifestHash: RENDERER_MANIFEST.hash,
            repositories: PREVIEW_REPOSITORIES,
            results: ready.result.results,
          });
          const staleFailure = yield* provider.failed({
            failure: {
              code: "MaterialReadError",
              message: "A stale compile failure.",
            },
            generation: staleGeneration,
            repositories: PREVIEW_REPOSITORIES,
          });
          const currentReady = yield* provider.ready({
            generation: currentGeneration,
            rendererManifestHash: RENDERER_MANIFEST.hash,
            repositories: PREVIEW_REPOSITORIES,
            results: ready.result.results,
          });

          expect({ currentReady, staleFailure, staleReady }).toEqual({
            currentReady: true,
            staleFailure: false,
            staleReady: false,
          });
          const manifest = yield* requestProvider(
            provider,
            token,
            PREVIEW_MANIFEST_PATH
          );
          expect(yield* responseJson(manifest)).toMatchObject({
            revision: 4,
            status: "ready",
          });
        })
      ),
    30_000
  );
  it.live(
    "fails when the operating system cannot bind or prove loopback",
    () =>
      Effect.gen(function* () {
        const input = yield* makeProviderInput;
        vi.spyOn(Server.prototype, "listen").mockImplementationOnce(function (
          this: Server
        ) {
          queueMicrotask(() =>
            this.emit("error", new Error("Test bind failure."))
          );
          return this;
        });
        const listenError = yield* Effect.scoped(
          openPreviewProvider(input)
        ).pipe(Effect.flip);
        vi.restoreAllMocks();
        vi.spyOn(Server.prototype, "address").mockReturnValueOnce(null);
        const addressError = yield* Effect.scoped(
          openPreviewProvider(input)
        ).pipe(Effect.flip);

        expect(listenError).toMatchObject({ stage: "listen" });
        expect(addressError).toMatchObject({ stage: "listen" });
      }),
    30_000
  );

  it.live(
    "closes an unfinished listener when provider acquisition is cancelled",
    () =>
      Effect.gen(function* () {
        const input = yield* makeProviderInput;
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

        const cancelled = yield* Effect.scoped(openPreviewProvider(input)).pipe(
          Effect.timeout("1 millis"),
          Effect.flip
        );

        expect(cancelled._tag).toBe("TimeoutError");
        expect(close).toHaveBeenCalledOnce();
      }),
    30_000
  );
});
