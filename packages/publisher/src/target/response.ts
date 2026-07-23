import { Buffer } from "node:buffer";
import type { HttpClientResponse } from "@effect/platform";
import { MAX_PUBLICATION_RESPONSE_BYTES } from "@nakafa/aksara-contracts/transport/limits";
import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import {
  type PublicationResponse,
  PublicationResponseSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { Chunk, Effect, Schema, Stream } from "effect";
import {
  PublicationTargetProtocolError,
  PublicationTargetTransportError,
} from "#publisher/target/errors";
import { targetStage } from "#publisher/target/protocol";

interface ResponseBytes {
  readonly bytes: number;
  readonly chunks: Chunk.Chunk<Uint8Array>;
}

const PublicationResponseJsonSchema = Schema.parseJson(
  PublicationResponseSchema
);

/** Creates a retryable sanitized network failure for one exact operation. */
function networkError(request: PublicationRequest) {
  return new PublicationTargetTransportError({
    detail: { reason: "network" },
    stage: targetStage(request.operation),
  });
}

/** Creates a permanent sanitized response failure for one exact operation. */
function responseError(request: PublicationRequest) {
  return new PublicationTargetProtocolError({
    reason: "response-decoding",
    stage: targetStage(request.operation),
  });
}

/** Decodes buffered bytes only when UTF-8 and JSON are both exact. */
function decodeResponse(request: PublicationRequest, body: ResponseBytes) {
  return Effect.gen(function* () {
    const source = yield* Effect.try({
      catch: () => responseError(request),
      try: () =>
        new TextDecoder("utf-8", { fatal: true }).decode(
          Buffer.concat(Chunk.toReadonlyArray(body.chunks), body.bytes)
        ),
    });
    return yield* Schema.decode(PublicationResponseJsonSchema, {
      onExcessProperty: "error",
    })(source).pipe(Effect.mapError(() => responseError(request)));
  });
}

/** Reads response chunks with a strict post-decompression byte ceiling. */
export function readPublicationResponse(
  request: PublicationRequest,
  response: HttpClientResponse.HttpClientResponse
): Effect.Effect<
  PublicationResponse,
  PublicationTargetProtocolError | PublicationTargetTransportError
> {
  const contentType = response.headers["content-type"]?.toLowerCase();
  const mediaType = contentType?.split(";", 1)[0]?.trim();
  if (mediaType !== "application/json") {
    return Effect.fail(responseError(request));
  }
  const declared = response.headers["content-length"];
  if (declared !== undefined) {
    const bytes = Number(declared);
    if (
      !Number.isSafeInteger(bytes) ||
      bytes < 0 ||
      bytes > MAX_PUBLICATION_RESPONSE_BYTES
    ) {
      return Effect.fail(responseError(request));
    }
  }
  const initial: ResponseBytes = { bytes: 0, chunks: Chunk.empty() };
  return response.stream.pipe(
    Stream.mapError((error) =>
      error.reason === "EmptyBody"
        ? responseError(request)
        : networkError(request)
    ),
    Stream.runFoldEffect(initial, (state, chunk) => {
      const bytes = state.bytes + chunk.byteLength;
      if (bytes > MAX_PUBLICATION_RESPONSE_BYTES) {
        return Effect.fail(responseError(request));
      }
      return Effect.succeed({
        bytes,
        chunks: Chunk.append(state.chunks, chunk),
      });
    }),
    Effect.flatMap((body) => decodeResponse(request, body))
  );
}
