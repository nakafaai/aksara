import {
  HttpClient,
  HttpClientError,
  type HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import {
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PUBLICATION_REQUEST_BYTES,
} from "@nakafa/aksara-contracts/transport/limits";
import { PublicationRequestSchema } from "@nakafa/aksara-contracts/transport/request";
import type { PublicationResponse } from "@nakafa/aksara-contracts/transport/response";
import { Effect, Layer, Match, Redacted, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";
import type { PublicationTarget } from "#publisher/publication/spec";
import type { HttpPublicationTargetConfig } from "#publisher/target/config";
import {
  httpPublicationTargetLayer,
  makeHttpPublicationTarget,
} from "#publisher/target/http";
import {
  transportRelease,
  transportRenderer,
  transportRequests,
} from "#test/transport";
import { transportSuccess } from "#test/transport-success";

const endpoint = new URL("https://publish.test.invalid/content");
const token = Redacted.make("test-secret-token");

/** Builds the one authenticated target configuration used by HTTP tests. */
function targetConfig(
  timeout: HttpPublicationTargetConfig["timeout"] = "1 second"
) {
  return { allowInsecureLoopback: false, endpoint, timeout, token };
}

/** Decodes the schema-encoded JSON body captured by a fake HTTP client. */
function decodeRequest(request: HttpClientRequest.HttpClientRequest) {
  if (request.body._tag !== "Uint8Array") {
    return Effect.die("Expected one encoded JSON request body.");
  }
  const source = Buffer.from(request.body.body).toString("utf8");
  return Schema.decode(Schema.parseJson(PublicationRequestSchema))(source);
}

/** Builds one web response visible through Effect's official client adapter. */
function webResponse(
  request: HttpClientRequest.HttpClientRequest,
  body: PublicationResponse,
  status = 200
) {
  return HttpClientResponse.fromWeb(
    request,
    new Response(JSON.stringify(body), {
      headers: { "content-type": "application/json" },
      status,
    })
  );
}

/** Creates a captured client whose responses are derived from strict requests. */
function capturedClient() {
  const requests: HttpClientRequest.HttpClientRequest[] = [];
  const client = HttpClient.make((request) =>
    Effect.gen(function* () {
      requests.push(request);
      const decoded = yield* decodeRequest(request).pipe(Effect.orDie);
      return webResponse(request, transportSuccess(decoded));
    })
  );
  return { client, requests };
}

/** Constructs the target with an injected client and deterministic timeout. */
function makeTarget(
  client: HttpClient.HttpClient,
  timeout: HttpPublicationTargetConfig["timeout"] = "1 second"
) {
  return Effect.runPromise(
    makeHttpPublicationTarget(targetConfig(timeout)).pipe(
      Effect.provideService(HttpClient.HttpClient, client)
    )
  );
}

/** Invokes the matching target operation for one decoded wire request. */
function invokeTarget(
  target: typeof PublicationTarget.Service,
  request: (typeof transportRequests)[number]
) {
  return Match.value(request).pipe(
    Match.discriminatorsExhaustive("operation")({
      abort: (value) => target.abort(value),
      accept: (value) => target.accept(value),
      activate: (value) => target.activate(value.release),
      activateRecovery: (value) => target.activateRecovery(value.release),
      cleanup: (value) => target.cleanup(value),
      current: () => target.current(),
      headPage: (value) => target.headPage(value),
      recovery: (value) => target.recovery(value),
      rollbackPage: (value) => target.rollbackPage(value),
      routePage: (value) => target.routePage(value),
      stageArtifactBatch: (value) => target.stageArtifactBatch(value),
      stageItemBatch: (value) => target.stageItemBatch(value),
      stageProjectionBatch: (value) => target.stageProjectionBatch(value),
      stageRecovery: (value) =>
        target.stageRecovery({
          release: value.release,
          rendererManifest: value.rendererManifest,
        }),
      stageRelease: (value) =>
        target.stageRelease({
          release: value.release,
          rendererManifest: value.rendererManifest,
        }),
      stageRouteBatch: (value) => target.stageRouteBatch(value),
      status: (value) => target.status(value),
      verify: (value) => target.verify(value.release),
    })
  );
}

describe("HTTP publication target", () => {
  it("executes every target operation through authenticated strict JSON", async () => {
    const captured = capturedClient();
    const target = await makeTarget(captured.client);
    await Effect.runPromise(
      Effect.forEach(
        transportRequests,
        (request) => invokeTarget(target, request),
        {
          concurrency: 1,
        }
      )
    );
    expect(captured.requests).toHaveLength(18);
    for (const request of captured.requests) {
      expect(request.method).toBe("POST");
      expect(request.url).toBe(endpoint.toString());
      expect(request.headers.authorization).toBe("Bearer test-secret-token");
      expect(request.headers.accept).toBe("application/json");
      expect(request.body.contentType).toBe("application/json");
    }
    expect(Layer.isLayer(httpPublicationTargetLayer(targetConfig()))).toBe(
      true
    );
  });

  it("rejects oversized batches before network IO", async () => {
    const captured = capturedClient();
    const target = await makeTarget(captured.client);
    const projectionRequest = transportRequests.find(
      (request) => request.operation === "stageProjectionBatch"
    );
    expect(projectionRequest?.operation).toBe("stageProjectionBatch");
    if (projectionRequest?.operation !== "stageProjectionBatch") {
      return;
    }
    const [projection] = projectionRequest.projections;
    const oversized = await Effect.runPromise(
      target
        .stageProjectionBatch({
          ...projectionRequest,
          projections: [
            {
              ...projection,
              metadata: {
                ...projection.metadata,
                title: "x".repeat(MAX_PROJECTION_BATCH_BYTES),
              },
            },
          ],
        })
        .pipe(Effect.flip)
    );
    expect(oversized).toMatchObject({
      _tag: "PublicationTargetRejectedError",
      rejection: { code: "CONTENT_RELEASE_SIZE" },
    });
    expect(captured.requests).toHaveLength(0);
  });

  it("rejects an oversized singleton request without inventing an identity", async () => {
    const captured = capturedClient();
    const target = await makeTarget(captured.client);
    vi.spyOn(JSON, "stringify").mockImplementationOnce(() =>
      "x".repeat(MAX_PUBLICATION_REQUEST_BYTES + 1)
    );
    const error = await Effect.runPromise(Effect.flip(target.current()));
    vi.restoreAllMocks();
    expect(error).toMatchObject({
      _tag: "PublicationTargetRejectedError",
      rejection: {
        code: "CONTENT_RELEASE_SIZE",
        operation: "current",
        releaseId: null,
      },
    });
    expect(captured.requests).toHaveLength(0);
  });

  it("maps impossible request encoding failure to a permanent protocol error", async () => {
    const captured = capturedClient();
    const target = await makeTarget(captured.client);
    vi.spyOn(JSON, "stringify").mockImplementationOnce(() => {
      throw new TypeError("Test request encoding failure.");
    });
    const error = await Effect.runPromise(
      target
        .stageRelease({
          release: transportRelease,
          rendererManifest: transportRenderer,
        })
        .pipe(Effect.flip)
    );
    vi.restoreAllMocks();
    expect(error).toMatchObject({
      _tag: "PublicationTargetProtocolError",
      reason: "request-encoding",
      stage: "release",
    });
    expect(captured.requests).toHaveLength(0);
  });

  it("maps response decoding and client transport failures", async () => {
    let malformedSignal: AbortSignal | undefined;
    const malformed = HttpClient.make((request, _url, signal) => {
      malformedSignal = signal;
      return Effect.succeed(
        HttpClientResponse.fromWeb(request, new Response("{", { status: 200 }))
      );
    });
    const malformedTarget = await makeTarget(malformed);
    const malformedError = await Effect.runPromise(
      malformedTarget
        .status({
          manifestHash: transportRelease.manifestHash,
          releaseId: transportRelease.manifest.releaseId,
        })
        .pipe(Effect.flip)
    );
    expect(malformedError._tag).toBe("PublicationTargetProtocolError");
    expect(malformedSignal?.aborted).toBe(true);

    const failed = HttpClient.make((request) =>
      Effect.fail(
        new HttpClientError.RequestError({ reason: "Transport", request })
      )
    );
    const failedTarget = await makeTarget(failed);
    const failedError = await Effect.runPromise(
      failedTarget
        .stageRelease({
          release: transportRelease,
          rendererManifest: transportRenderer,
        })
        .pipe(Effect.flip)
    );
    expect(failedError).toMatchObject({
      _tag: "PublicationTargetTransportError",
      detail: { reason: "network" },
      stage: "release",
    });
    expect(JSON.stringify(failedError)).not.toContain("test-secret-token");
  });

  it("short-circuits transient status without reading an untyped body", async () => {
    let transientSignal: AbortSignal | undefined;
    const transient = HttpClient.make((request, _url, signal) => {
      transientSignal = signal;
      return Effect.succeed(
        HttpClientResponse.fromWeb(request, new Response(null, { status: 503 }))
      );
    });
    const target = await makeTarget(transient);
    const error = await Effect.runPromise(
      target
        .stageRelease({
          release: transportRelease,
          rendererManifest: transportRenderer,
        })
        .pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationTargetTransportError",
      detail: { reason: "transient-status", status: 503 },
      stage: "release",
    });
    expect(transientSignal?.aborted).toBe(true);
  });

  it("times out a stalled ingress with the exact operation stage", async () => {
    const stalled = HttpClient.make(() => Effect.never);
    const target = await makeTarget(stalled, "1 millis");
    const error = await Effect.runPromise(
      Effect.flip(target.verify(transportRelease))
    );
    expect(error).toMatchObject({
      _tag: "PublicationTargetTransportError",
      detail: { reason: "timeout" },
      stage: "verify",
    });
  });
});
