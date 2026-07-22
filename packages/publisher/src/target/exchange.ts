import { Buffer } from "node:buffer";
import { HttpClient, HttpClientRequest } from "@effect/platform";
import {
  MAX_ARTIFACT_BATCH_BYTES,
  MAX_ITEM_BATCH_BYTES,
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PUBLICATION_REQUEST_BYTES,
} from "@nakafa/aksara-contracts/transport/limits";
import {
  type PublicationRequest,
  PublicationRequestSchema,
} from "@nakafa/aksara-contracts/transport/request";
import { Effect, Schema } from "effect";
import type { ValidatedHttpConfig } from "#publisher/target/config";
import {
  PublicationTargetProtocolError,
  PublicationTargetRejectedError,
  PublicationTargetTransportError,
} from "#publisher/target/errors";
import {
  interpretPublicationResponse,
  isTransientPublicationStatus,
  publicationReleaseId,
  targetStage,
  transientPublicationError,
} from "#publisher/target/protocol";
import { readPublicationResponse } from "#publisher/target/response";

const REQUEST_BYTE_LIMITS: Readonly<{
  [Operation in PublicationRequest["operation"]]: number;
}> = {
  abort: MAX_PUBLICATION_REQUEST_BYTES,
  activate: MAX_PUBLICATION_REQUEST_BYTES,
  cleanup: MAX_PUBLICATION_REQUEST_BYTES,
  current: MAX_PUBLICATION_REQUEST_BYTES,
  finalize: MAX_PUBLICATION_REQUEST_BYTES,
  headPage: MAX_PUBLICATION_REQUEST_BYTES,
  rollbackPage: MAX_PUBLICATION_REQUEST_BYTES,
  stageArtifactBatch: MAX_ARTIFACT_BATCH_BYTES,
  stageItemBatch: MAX_ITEM_BATCH_BYTES,
  stageProjectionBatch: MAX_PROJECTION_BATCH_BYTES,
  stageRelease: MAX_PUBLICATION_REQUEST_BYTES,
  status: MAX_PUBLICATION_REQUEST_BYTES,
  verify: MAX_PUBLICATION_REQUEST_BYTES,
};

/** Creates a retryable sanitized network failure for one exact operation. */
function networkError(request: PublicationRequest) {
  return new PublicationTargetTransportError({
    detail: { reason: "network" },
    stage: targetStage(request.operation),
  });
}

/** Creates a permanent sanitized protocol failure for one exact operation. */
function protocolError(
  request: PublicationRequest,
  reason: PublicationTargetProtocolError["reason"]
) {
  return new PublicationTargetProtocolError({
    reason,
    stage: targetStage(request.operation),
  });
}

/** Fails if encoded JSON exceeds its operation-specific ingress ceiling. */
function validateRequestBytes(request: PublicationRequest, bytes: number) {
  if (bytes <= REQUEST_BYTE_LIMITS[request.operation]) {
    return Effect.void;
  }
  if (request.operation === "current") {
    return Effect.fail(
      new PublicationTargetRejectedError({
        rejection: {
          code: "CONTENT_RELEASE_SIZE",
          kind: "rejected",
          operation: request.operation,
          releaseId: null,
        },
      })
    );
  }
  return Effect.fail(
    new PublicationTargetRejectedError({
      rejection: {
        code: "CONTENT_RELEASE_SIZE",
        kind: "rejected",
        operation: request.operation,
        releaseId: publicationReleaseId(request),
      },
    })
  );
}

/** Exchanges one authenticated strict JSON request with the publication target. */
export function sendPublicationRequest(
  client: HttpClient.HttpClient,
  config: ValidatedHttpConfig,
  request: PublicationRequest
) {
  return Effect.gen(function* () {
    const body = yield* Schema.encode(
      Schema.parseJson(PublicationRequestSchema),
      { onExcessProperty: "error" }
    )(request).pipe(
      Effect.mapError(() => protocolError(request, "request-encoding"))
    );
    yield* validateRequestBytes(request, Buffer.byteLength(body, "utf8"));
    const outgoing = HttpClientRequest.post(config.endpoint).pipe(
      HttpClientRequest.acceptJson,
      HttpClientRequest.bearerToken(config.token),
      HttpClientRequest.bodyText(body, "application/json")
    );
    const scopedClient = client.pipe(HttpClient.withScope);
    const exchange = Effect.gen(function* () {
      const response = yield* scopedClient
        .execute(outgoing)
        .pipe(Effect.mapError(() => networkError(request)));
      if (isTransientPublicationStatus(response.status)) {
        return yield* transientPublicationError(request, response.status);
      }
      const responseBody = yield* readPublicationResponse(request, response);
      return yield* interpretPublicationResponse(request, {
        body: responseBody,
        status: response.status,
      });
    });
    return yield* exchange.pipe(
      Effect.timeoutFail({
        duration: config.timeout,
        onTimeout: () =>
          new PublicationTargetTransportError({
            detail: { reason: "timeout" },
            stage: targetStage(request.operation),
          }),
      }),
      Effect.scoped
    );
  });
}
