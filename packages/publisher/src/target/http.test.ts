import {
  HttpClient,
  HttpClientError,
  type HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import { MAX_PROJECTION_BATCH_BYTES } from "@nakafa/aksara-contracts/transport/limits";
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
  transportRequests,
  transportSuccess,
} from "#test/transport";

const endpoint = new URL("https://publish.test.invalid/content");
const token = Redacted.make("test-secret-token");

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
      const pending =
        decoded.operation === "finalize" && decoded.afterIndex === -1;
      return webResponse(request, transportSuccess(decoded, pending));
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
    makeHttpPublicationTarget({
      allowInsecureLoopback: false,
      endpoint,
      timeout,
      token,
    }).pipe(Effect.provideService(HttpClient.HttpClient, client))
  );
}

/** Invokes the matching target operation for one decoded wire request. */
function invokeTarget(
  target: typeof PublicationTarget.Service,
  request: (typeof transportRequests)[number]
) {
  return Match.value(request).pipe(
    Match.discriminatorsExhaustive("operation")({
      activate: (value) => target.activate(value.release),
      cleanup: (value) => target.cleanup(value),
      finalize: (value) => target.finalize(value.release),
      rollbackPage: (value) => target.rollbackPage(value),
      stageArtifactBatch: (value) => target.stageArtifactBatch(value),
      stageItemBatch: (value) => target.stageItemBatch(value),
      stageProjectionBatch: (value) => target.stageProjectionBatch(value),
      stageRelease: (value) => target.stageRelease(value.release),
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
    expect(captured.requests).toHaveLength(11);
    for (const request of captured.requests) {
      expect(request.method).toBe("POST");
      expect(request.url).toBe(endpoint.toString());
      expect(request.headers.authorization).toBe("Bearer test-secret-token");
      expect(request.headers.accept).toBe("application/json");
      expect(request.body.contentType).toBe("application/json");
    }
    expect(
      Layer.isLayer(
        httpPublicationTargetLayer({
          allowInsecureLoopback: false,
          endpoint,
          timeout: "1 second",
          token,
        })
      )
    ).toBe(true);
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

  it("maps impossible request encoding failure to a permanent protocol error", async () => {
    const captured = capturedClient();
    const target = await makeTarget(captured.client);
    vi.spyOn(JSON, "stringify").mockImplementationOnce(() => {
      throw new TypeError("Test request encoding failure.");
    });
    const error = await Effect.runPromise(
      target.stageRelease(transportRelease).pipe(Effect.flip)
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
    const malformed = HttpClient.make((request) =>
      Effect.succeed(
        HttpClientResponse.fromWeb(request, new Response("{", { status: 200 }))
      )
    );
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

    const failed = HttpClient.make((request) =>
      Effect.fail(
        new HttpClientError.RequestError({ reason: "Transport", request })
      )
    );
    const failedTarget = await makeTarget(failed);
    const failedError = await Effect.runPromise(
      failedTarget.stageRelease(transportRelease).pipe(Effect.flip)
    );
    expect(failedError).toMatchObject({
      _tag: "PublicationTargetTransportError",
      detail: { reason: "network" },
      stage: "release",
    });
    expect(JSON.stringify(failedError)).not.toContain("test-secret-token");
  });

  it("short-circuits transient status without reading an untyped body", async () => {
    const transient = HttpClient.make((request) =>
      Effect.succeed(
        HttpClientResponse.fromWeb(request, new Response(null, { status: 503 }))
      )
    );
    const target = await makeTarget(transient);
    const error = await Effect.runPromise(
      target.stageRelease(transportRelease).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationTargetTransportError",
      detail: { reason: "transient-status", status: 503 },
      stage: "release",
    });
  });

  it("times out a stalled ingress with the exact operation stage", async () => {
    const stalled = HttpClient.make(() => Effect.never);
    const target = await makeTarget(stalled, "1 millis");
    const error = await Effect.runPromise(
      target.verify(transportRelease).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationTargetTransportError",
      detail: { reason: "timeout" },
      stage: "verify",
    });
  });
});
