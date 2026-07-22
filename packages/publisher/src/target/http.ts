import { Buffer } from "node:buffer";
import { HttpClient, HttpClientRequest } from "@effect/platform";
import type {
  PublicationReceipt,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import {
  MAX_ARTIFACT_BATCH_BYTES,
  MAX_ITEM_BATCH_BYTES,
  MAX_PROJECTION_BATCH_BYTES,
  MAX_PUBLICATION_REQUEST_BYTES,
} from "@nakafa/aksara-contracts/transport/limits";
import {
  type ActivateReleaseRequest,
  type FinalizeReleaseRequest,
  type PublicationCleanupRequest,
  type PublicationRequest,
  PublicationRequestSchema,
  type PublicationRollbackRequest,
  type PublicationStatusRequest,
  type VerifyReleaseRequest,
} from "@nakafa/aksara-contracts/transport/request";
import {
  ActivateReleaseSuccessSchema,
  FinalizeReleaseSuccessSchema,
  PublicationCleanupSuccessSchema,
  PublicationRollbackSuccessSchema,
  PublicationStatusSuccessSchema,
  VerifyReleaseSuccessSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { Effect, Layer, Schema } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import {
  type HttpPublicationTargetConfig,
  type ValidatedHttpConfig,
  validateHttpConfig,
} from "#publisher/target/config";
import {
  type PublicationTargetFailure,
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
  activate: MAX_PUBLICATION_REQUEST_BYTES,
  cleanup: MAX_PUBLICATION_REQUEST_BYTES,
  finalize: MAX_PUBLICATION_REQUEST_BYTES,
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

/** Sends one strict JSON request and authenticates its complete response. */
function sendPublicationRequest(
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

/** Narrows validated success evidence without defecting target failures. */
function decodeSuccess<A, I>(schema: Schema.Schema<A, I>, input: unknown) {
  return Schema.decodeUnknown(schema)(input).pipe(Effect.orDie);
}

/** Builds the Effect service backed by one authenticated HTTP endpoint. */
export const makeHttpPublicationTarget = Effect.fn(
  "AksaraPublisher.makeHttpPublicationTarget"
)(function* (configInput: HttpPublicationTargetConfig) {
  const config = yield* validateHttpConfig(configInput);
  const client = yield* HttpClient.HttpClient;
  /** Sends a request through the client captured by this service instance. */
  const send = (request: PublicationRequest) =>
    sendPublicationRequest(client, config, request);
  /** Finalizes bounded pages until the target returns its durable receipt. */
  const finalizeRelease = (
    release: SignedContentRelease,
    afterIndex = -1
  ): Effect.Effect<PublicationReceipt, PublicationTargetFailure> => {
    const request: FinalizeReleaseRequest = {
      afterIndex,
      operation: "finalize",
      release,
    };
    return send(request).pipe(
      Effect.flatMap((response) =>
        decodeSuccess(FinalizeReleaseSuccessSchema, response)
      ),
      Effect.flatMap((response) => {
        if (response.value.done) {
          return Effect.succeed(response.value.receipt);
        }
        return finalizeRelease(release, response.value.nextIndex);
      })
    );
  };

  return PublicationTarget.of({
    activate: (release) => {
      const request: ActivateReleaseRequest = {
        operation: "activate",
        release,
      };
      return send(request).pipe(
        Effect.flatMap((response) =>
          decodeSuccess(ActivateReleaseSuccessSchema, response)
        ),
        Effect.map((response) => response.value)
      );
    },
    cleanup: (input) => {
      const request: PublicationCleanupRequest = {
        ...input,
        operation: "cleanup",
      };
      return send(request).pipe(
        Effect.flatMap((response) =>
          decodeSuccess(PublicationCleanupSuccessSchema, response)
        ),
        Effect.map((response) => response.value)
      );
    },
    finalize: (release) => finalizeRelease(release),
    rollbackPage: (input) => {
      const request: PublicationRollbackRequest = {
        ...input,
        operation: "rollbackPage",
      };
      return send(request).pipe(
        Effect.flatMap((response) =>
          decodeSuccess(PublicationRollbackSuccessSchema, response)
        ),
        Effect.map((response) => response.value)
      );
    },
    stageArtifactBatch: (input) =>
      send({ ...input, operation: "stageArtifactBatch" }).pipe(Effect.asVoid),
    stageItemBatch: (input) =>
      send({ ...input, operation: "stageItemBatch" }).pipe(Effect.asVoid),
    stageProjectionBatch: (input) =>
      send({ ...input, operation: "stageProjectionBatch" }).pipe(Effect.asVoid),
    stageRelease: (release) =>
      send({ operation: "stageRelease", release }).pipe(Effect.asVoid),
    status: (input) => {
      const request: PublicationStatusRequest = {
        ...input,
        operation: "status",
      };
      return send(request).pipe(
        Effect.flatMap((response) =>
          decodeSuccess(PublicationStatusSuccessSchema, response)
        ),
        Effect.map((response) => response.value)
      );
    },
    verify: (release) => {
      const request: VerifyReleaseRequest = { operation: "verify", release };
      return send(request).pipe(
        Effect.flatMap((response) =>
          decodeSuccess(VerifyReleaseSuccessSchema, response)
        ),
        Effect.map((response) => response.value)
      );
    },
  });
});

/** Provides the publication target while capturing its HTTP dependency. */
export function httpPublicationTargetLayer(
  config: HttpPublicationTargetConfig
) {
  return Layer.effect(PublicationTarget, makeHttpPublicationTarget(config));
}
