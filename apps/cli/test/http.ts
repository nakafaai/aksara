import {
  HttpClient,
  type HttpClientError,
  type HttpClientRequest,
  type HttpClientResponse,
  HttpClientResponse as Response,
} from "@effect/platform";
import { Effect } from "effect";

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
  const requests: HttpClientRequest.HttpClientRequest[] = [];
  const client = HttpClient.make((request) => {
    requests.push(request);
    return respond(request);
  });
  return { client, requests };
}

/** Decodes the strict JSON bytes written by one production HTTP request. */
export function requestJson(request: HttpClientRequest.HttpClientRequest) {
  if (request.body._tag !== "Uint8Array") {
    throw new Error("Expected a JSON request body.");
  }
  const parsed: unknown = JSON.parse(
    Buffer.from(request.body.body).toString("utf8")
  );
  return parsed;
}

/** Runs one HTTP-dependent test program through an explicit client. */
export function runClient<A>(
  program: Effect.Effect<A, unknown, HttpClient.HttpClient>,
  client: HttpClient.HttpClient
) {
  return Effect.runPromise(
    program.pipe(Effect.provideService(HttpClient.HttpClient, client))
  );
}
