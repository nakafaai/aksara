import { Buffer } from "node:buffer";
import type { StageOperation } from "@nakafa/aksara-contracts/transport/group";
import {
  MAX_ARTIFACT_BATCH_BYTES,
  MAX_ITEM_BATCH_BYTES,
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PUBLICATION_REQUEST_BYTES,
  MAX_ROUTE_BATCH_BYTES,
  MAX_SNAPSHOT_BATCH_BYTES,
  MAX_STAGE_GROUP_BYTES,
} from "@nakafa/aksara-contracts/transport/limits";
import {
  type PublicationRequest,
  PublicationRequestSchema,
} from "@nakafa/aksara-contracts/transport/request";
import type { PublicationSuccess } from "@nakafa/aksara-contracts/transport/response";
import { Effect, Schema } from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "effect/unstable/http";
import type { ValidatedHttpConfig } from "#publisher/target/config";
import {
  type PublicationTargetFailure,
  PublicationTargetProtocolError,
  PublicationTargetRejectedError,
  PublicationTargetTransportError,
  publicationNetworkError,
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
  [Operation in
    | PublicationRequest["operation"]
    | StageOperation["operation"]]: number;
}> = {
  abort: MAX_PUBLICATION_REQUEST_BYTES,
  accept: MAX_PUBLICATION_REQUEST_BYTES,
  activate: MAX_PUBLICATION_REQUEST_BYTES,
  activateRecovery: MAX_PUBLICATION_REQUEST_BYTES,
  cleanup: MAX_PUBLICATION_REQUEST_BYTES,
  current: MAX_PUBLICATION_REQUEST_BYTES,
  headPage: MAX_PUBLICATION_REQUEST_BYTES,
  recovery: MAX_PUBLICATION_REQUEST_BYTES,
  rollbackPage: MAX_PUBLICATION_REQUEST_BYTES,
  routePage: MAX_PUBLICATION_REQUEST_BYTES,
  stageArtifactBatch: MAX_ARTIFACT_BATCH_BYTES,
  stageGroup: MAX_STAGE_GROUP_BYTES,
  stageItemBatch: MAX_ITEM_BATCH_BYTES,
  stageProjectionBatch: MAX_PROJECTION_BATCH_BYTES,
  stageRecovery: MAX_PUBLICATION_REQUEST_BYTES,
  stageRelease: MAX_PUBLICATION_REQUEST_BYTES,
  stageRollbackProjectionBatch: MAX_PROJECTION_BATCH_BYTES,
  stageRouteBatch: MAX_ROUTE_BATCH_BYTES,
  stageSnapshot: MAX_PUBLICATION_REQUEST_BYTES,
  stageSnapshotBatch: MAX_SNAPSHOT_BATCH_BYTES,
  stageTryoutRuntimeBundle: MAX_PUBLICATION_REQUEST_BYTES,
  status: MAX_PUBLICATION_REQUEST_BYTES,
  verify: MAX_PUBLICATION_REQUEST_BYTES,
};

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
  const hasOversizedChild =
    request.operation === "stageGroup" &&
    request.requests.some(
      (child) =>
        Buffer.byteLength(JSON.stringify(child), "utf8") >
        REQUEST_BYTE_LIMITS[child.operation]
    );
  if (bytes <= REQUEST_BYTE_LIMITS[request.operation] && !hasOversizedChild) {
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
): Effect.Effect<PublicationSuccess, PublicationTargetFailure> {
  return Effect.gen(function* () {
    const body = yield* Schema.encodeEffect(
      Schema.fromJsonString(PublicationRequestSchema),
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
      const response = yield* scopedClient.execute(outgoing).pipe(
        Effect.provideService(FetchHttpClient.RequestInit, {
          redirect: "manual",
        }),
        Effect.mapError(() =>
          publicationNetworkError(targetStage(request.operation))
        )
      );
      if (
        response.request.url !== config.endpoint.toString() ||
        (response.status >= 300 && response.status < 400)
      ) {
        return yield* protocolError(request, "response-evidence");
      }
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
      Effect.timeoutOrElse({
        duration: config.timeout,
        orElse: () =>
          Effect.fail(
            new PublicationTargetTransportError({
              detail: { reason: "timeout" },
              stage: targetStage(request.operation),
            })
          ),
      }),
      Effect.scoped
    );
  });
}
