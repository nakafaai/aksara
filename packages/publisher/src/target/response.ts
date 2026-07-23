import type { HttpClientResponse } from "@effect/platform";
import { MAX_PUBLICATION_RESPONSE_BYTES } from "@nakafa/aksara-contracts/transport/limits";
import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import {
  type PublicationResponse,
  PublicationResponseSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { isJsonType, readText } from "@nakafa/aksara-utilities/http/response";
import { Effect, Schema } from "effect";
import {
  PublicationTargetProtocolError,
  type PublicationTargetTransportError,
  publicationNetworkError,
} from "#publisher/target/errors";
import { targetStage } from "#publisher/target/protocol";

const PublicationResponseJsonSchema = Schema.parseJson(
  PublicationResponseSchema
);

/** Creates a permanent sanitized response failure for one exact operation. */
function responseError(request: PublicationRequest) {
  return new PublicationTargetProtocolError({
    reason: "response-decoding",
    stage: targetStage(request.operation),
  });
}

/** Decodes strict response text through the exact response contract. */
function decodeResponse(request: PublicationRequest, source: string) {
  return Schema.decode(PublicationResponseJsonSchema, {
    onExcessProperty: "error",
  })(source).pipe(Effect.mapError(() => responseError(request)));
}

/** Reads response chunks with a strict post-decompression byte ceiling. */
export function readPublicationResponse(
  request: PublicationRequest,
  response: HttpClientResponse.HttpClientResponse
): Effect.Effect<
  PublicationResponse,
  PublicationTargetProtocolError | PublicationTargetTransportError
> {
  if (!isJsonType(response.headers["content-type"])) {
    return Effect.fail(responseError(request));
  }
  return readText(response, MAX_PUBLICATION_RESPONSE_BYTES).pipe(
    Effect.mapError((error) =>
      error.reason === "stream"
        ? publicationNetworkError(targetStage(request.operation))
        : responseError(request)
    ),
    Effect.flatMap((body) => decodeResponse(request, body))
  );
}
