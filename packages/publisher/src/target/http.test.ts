import { describe, expect, it } from "@effect/vitest";
import { ContentProjectionSchema } from "@nakafa/aksara-contracts/projection/spec";
import {
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PUBLICATION_REQUEST_BYTES,
} from "@nakafa/aksara-contracts/transport/limits";
import { Effect, Fiber, Schema } from "effect";
import { TestClock } from "effect/testing";
import {
  HttpClient,
  HttpClientError,
  HttpClientResponse,
} from "effect/unstable/http";
import { vi } from "vitest";
import {
  capturedClient,
  endpoint,
  invokeTarget,
  makeTarget,
  reject,
} from "#test/http";
import { migrationProtocol } from "#test/migration/protocol";
import {
  transportRelease,
  transportRenderer,
  transportRequests,
} from "#test/transport/spec";

describe("HTTP publication target", () => {
  it.effect(
    "executes every target operation through authenticated strict JSON",
    () =>
      Effect.gen(function* () {
        const captured = capturedClient();
        const target = yield* makeTarget(captured.client);
        yield* Effect.forEach(
          transportRequests,
          (request) => invokeTarget(target, request),
          {
            concurrency: 1,
          }
        );
        expect(captured.requests).toHaveLength(22);
        for (const request of captured.requests) {
          expect(request.method).toBe("POST");
          expect(request.url).toBe(endpoint.toString());
          expect(request.headers.authorization).toBe(
            "Bearer test-secret-token"
          );
          expect(request.headers.accept).toBe("application/json");
          expect(request.body._tag).toBe("Uint8Array");
          if (request.body._tag === "Uint8Array") {
            expect(request.body.contentType).toBe("application/json");
          }
        }
      })
  );

  it.effect(
    "executes the temporary migration operation through strict JSON",
    () =>
      Effect.gen(function* () {
        const exchanges = yield* migrationProtocol();
        let requestCount = 0;
        const client = HttpClient.make((request) => {
          requestCount += 1;
          return Effect.succeed(
            HttpClientResponse.fromWeb(
              request,
              new Response(JSON.stringify(exchanges.source.response), {
                headers: { "content-type": "application/json" },
                status: 200,
              })
            )
          );
        });
        const target = yield* makeTarget(client);
        const value = yield* target.migrateTryoutHistory(
          exchanges.source.request
        );

        expect(value).toEqual(exchanges.source.response.value);
        expect(requestCount).toBe(1);
      })
  );

  it.effect("rejects oversized batches before network IO", () =>
    Effect.gen(function* () {
      const captured = capturedClient();
      const target = yield* makeTarget(captured.client);
      const projectionRequest = transportRequests.find(
        (request) => request.operation === "stageProjectionBatch"
      );
      if (projectionRequest?.operation !== "stageProjectionBatch") {
        return yield* Effect.die(
          new Error("Expected the projection batch request fixture.")
        );
      }
      const [projection] = projectionRequest.projections;
      if (projection === undefined) {
        return yield* Effect.die(new Error("Expected one projection fixture."));
      }
      const oversizedProjection = yield* Schema.decodeUnknownEffect(
        ContentProjectionSchema
      )({
        ...projection,
        metadata: {
          ...projection.metadata,
          title: "x".repeat(MAX_PROJECTION_BATCH_BYTES),
        },
      });
      const oversized = yield* reject(
        target.stageProjectionBatch({
          ...projectionRequest,
          projections: [oversizedProjection],
        })
      );
      expect(oversized).toMatchObject({
        _tag: "PublicationTargetRejectedError",
        rejection: { code: "CONTENT_RELEASE_SIZE" },
      });
      expect(captured.requests).toHaveLength(0);
    })
  );

  it.effect(
    "rejects an oversized singleton request without inventing an identity",
    () =>
      Effect.gen(function* () {
        const captured = capturedClient();
        const target = yield* makeTarget(captured.client);
        yield* Effect.sync(() =>
          vi
            .spyOn(JSON, "stringify")
            .mockImplementationOnce(() =>
              "x".repeat(MAX_PUBLICATION_REQUEST_BYTES + 1)
            )
        );
        yield* Effect.addFinalizer(() => Effect.sync(vi.restoreAllMocks));
        const error = yield* reject(target.current);
        expect(error).toMatchObject({
          _tag: "PublicationTargetRejectedError",
          rejection: {
            code: "CONTENT_RELEASE_SIZE",
            operation: "current",
            releaseId: null,
          },
        });
        expect(captured.requests).toHaveLength(0);
      })
  );

  it.effect(
    "maps impossible request encoding failure to a permanent protocol error",
    () =>
      Effect.gen(function* () {
        const captured = capturedClient();
        const target = yield* makeTarget(captured.client);
        yield* Effect.sync(() =>
          vi.spyOn(JSON, "stringify").mockImplementationOnce(() => {
            throw new TypeError("Test request encoding failure.");
          })
        );
        yield* Effect.addFinalizer(() => Effect.sync(vi.restoreAllMocks));
        const error = yield* reject(
          target.stageRelease({
            release: transportRelease,
            rendererManifest: transportRenderer,
          })
        );
        expect(error).toMatchObject({
          _tag: "PublicationTargetProtocolError",
          reason: "request-encoding",
          stage: "release",
        });
        expect(captured.requests).toHaveLength(0);
      })
  );

  it.effect("maps response decoding and client transport failures", () =>
    Effect.gen(function* () {
      let malformedSignal: AbortSignal | undefined;
      const malformed = HttpClient.make((request, _url, signal) => {
        malformedSignal = signal;
        return Effect.succeed(
          HttpClientResponse.fromWeb(
            request,
            new Response("{", { status: 200 })
          )
        );
      });
      const malformedTarget = yield* makeTarget(malformed);
      const malformedError = yield* reject(
        malformedTarget.status({
          manifestHash: transportRelease.manifestHash,
          releaseId: transportRelease.manifest.releaseId,
        })
      );
      expect(malformedError._tag).toBe("PublicationTargetProtocolError");
      expect(malformedSignal?.aborted).toBe(true);

      const failed = HttpClient.make((request) =>
        Effect.fail(
          new HttpClientError.HttpClientError({
            reason: new HttpClientError.TransportError({ request }),
          })
        )
      );
      const failedTarget = yield* makeTarget(failed);
      const failedError = yield* reject(
        failedTarget.stageRelease({
          release: transportRelease,
          rendererManifest: transportRenderer,
        })
      );
      expect(failedError).toMatchObject({
        _tag: "PublicationTargetTransportError",
        detail: { reason: "network" },
        stage: "release",
      });
      expect(JSON.stringify(failedError)).not.toContain("test-secret-token");
    })
  );

  it.effect(
    "short-circuits transient status without reading an untyped body",
    () =>
      Effect.gen(function* () {
        let transientSignal: AbortSignal | undefined;
        const transient = HttpClient.make((request, _url, signal) => {
          transientSignal = signal;
          return Effect.succeed(
            HttpClientResponse.fromWeb(
              request,
              new Response(null, { status: 503 })
            )
          );
        });
        const target = yield* makeTarget(transient);
        const error = yield* reject(
          target.stageRelease({
            release: transportRelease,
            rendererManifest: transportRenderer,
          })
        );
        expect(error).toMatchObject({
          _tag: "PublicationTargetTransportError",
          detail: { reason: "transient-status", status: 503 },
          stage: "release",
        });
        expect(transientSignal?.aborted).toBe(true);
      })
  );

  it.effect("times out a stalled ingress with the exact operation stage", () =>
    Effect.gen(function* () {
      const stalled = HttpClient.make(() => Effect.never);
      const target = yield* makeTarget(stalled, "1 millis");
      const fiber = yield* Effect.forkChild(
        reject(target.verify(transportRelease))
      );
      yield* TestClock.adjust(1);
      const error = yield* Fiber.join(fiber);
      expect(error).toMatchObject({
        _tag: "PublicationTargetTransportError",
        detail: { reason: "timeout" },
        stage: "verify",
      });
    })
  );
});
