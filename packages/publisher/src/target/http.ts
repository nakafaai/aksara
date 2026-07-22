import { HttpClient } from "@effect/platform";
import type {
  PublicationReceipt,
  SignedContentRelease,
} from "@nakafa/aksara-contracts/release";
import type {
  ActivateReleaseRequest,
  FinalizeReleaseRequest,
  PublicationAbortRequest,
  PublicationCleanupRequest,
  PublicationCurrentRequest,
  PublicationHeadPageRequest,
  PublicationRequest,
  PublicationRollbackRequest,
  PublicationStatusRequest,
  VerifyReleaseRequest,
} from "@nakafa/aksara-contracts/transport/request";
import {
  ActivateReleaseSuccessSchema,
  FinalizeReleaseSuccessSchema,
  PublicationAbortSuccessSchema,
  PublicationCleanupSuccessSchema,
  PublicationCurrentSuccessSchema,
  PublicationHeadPageSuccessSchema,
  PublicationRollbackSuccessSchema,
  PublicationStatusSuccessSchema,
  VerifyReleaseSuccessSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { Effect, Layer, Schema } from "effect";
import { PublicationTarget } from "#publisher/publication/spec";
import {
  type HttpPublicationTargetConfig,
  validateHttpConfig,
} from "#publisher/target/config";
import type { PublicationTargetFailure } from "#publisher/target/errors";
import { sendPublicationRequest } from "#publisher/target/exchange";

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
    abort: (input) => {
      const request: PublicationAbortRequest = {
        ...input,
        operation: "abort",
      };
      return send(request).pipe(
        Effect.flatMap((response) =>
          decodeSuccess(PublicationAbortSuccessSchema, response)
        ),
        Effect.map((response) => response.value)
      );
    },
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
    current: () => {
      const request: PublicationCurrentRequest = { operation: "current" };
      return send(request).pipe(
        Effect.flatMap((response) =>
          decodeSuccess(PublicationCurrentSuccessSchema, response)
        ),
        Effect.map((response) => response.value)
      );
    },
    finalize: (release) => finalizeRelease(release),
    headPage: (input) => {
      const request: PublicationHeadPageRequest = {
        ...input,
        operation: "headPage",
      };
      return send(request).pipe(
        Effect.flatMap((response) =>
          decodeSuccess(PublicationHeadPageSuccessSchema, response)
        ),
        Effect.map((response) => response.value)
      );
    },
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
    stageRelease: (input) =>
      send({ ...input, operation: "stageRelease" }).pipe(Effect.asVoid),
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
