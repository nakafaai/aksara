import { type Effect, MutableList, Schema } from "effect";
import {
  HttpClient,
  type HttpClientError,
  type HttpClientRequest,
  type HttpClientResponse,
  HttpClientResponse as Response,
} from "effect/http";
import { JsonTextSchema } from "#cli/text/json";

/** Builds one official Effect HTTP response around an explicit web body. */
export function webResponse(
  request: HttpClientRequest.HttpClientRequest,
  body: ConstructorParameters<typeof globalThis.Response>[0],
  init: ResponseInit = {}
) {
  return Response.fromWeb(request, new globalThis.Response(body, init));
}

/** Captures requests while delegating deterministic test responses. */
export function captureClient(
  respond: (
    request: HttpClientRequest.HttpClientRequest
  ) => Effect.Effect<
    HttpClientResponse.HttpClientResponse,
    HttpClientError.HttpClientError
  >
) {
  const requests = MutableList.make<HttpClientRequest.HttpClientRequest>();
  const client = HttpClient.make((request) => {
    MutableList.append(requests, request);
    return respond(request);
  });
  return {
    client,
    /** Requests received so far, copied when a test reads this property. */
    get requests() {
      return MutableList.toArray(requests);
    },
  };
}

/** Decodes the strict JSON bytes written by one production HTTP request. */
export function requestJson(request: HttpClientRequest.HttpClientRequest) {
  if (request.body._tag !== "Uint8Array") {
    throw new Error("Expected a JSON request body.");
  }
  const parsed: unknown = Schema.decodeSync(JsonTextSchema)(
    Buffer.from(request.body.body).toString("utf8")
  );
  return parsed;
}
