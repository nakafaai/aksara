import { isJsonType, readText } from "@nakafa/aksara-utilities/http/response";
import { Effect, Schema } from "effect";
import { HttpClient, HttpClientRequest } from "effect/unstable/http";
import {
  DEVELOPER_MCP_ENDPOINT,
  DEVELOPER_MCP_PROTOCOL_VERSION,
  DeveloperReadinessError,
  type DeveloperSurface,
} from "#cli/developer-readiness/contract";

const MAXIMUM_RESPONSE_BYTES = 2 * 1024 * 1024;
const READINESS_REQUEST_TIMEOUT = "30 seconds";

/** Parsed response evidence retained for body and deployment validation. */
export interface ReadinessJsonResponse {
  readonly body: unknown;
  readonly headers: Readonly<Record<string, string>>;
}

/** Creates one stable typed failure for a public readiness surface. */
export function readinessError(
  surface: DeveloperSurface,
  reason: DeveloperReadinessError["reason"],
  status = 0
) {
  return new DeveloperReadinessError({ reason, status, surface });
}

/** Reads one bounded, non-redirected JSON response from a public release gate. */
export const fetchReadinessJson = Effect.fn("AksaraCli.fetchReadinessJson")(
  (
    surface: DeveloperSurface,
    request: HttpClientRequest.HttpClientRequest,
    protocolVersion?: string
  ) =>
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      const response = yield* client
        .pipe(HttpClient.withScope)
        .execute(request)
        .pipe(Effect.mapError(() => readinessError(surface, "network")));
      if (response.request.url !== request.url) {
        return yield* readinessError(surface, "redirect", response.status);
      }
      if (response.status !== 200) {
        return yield* readinessError(surface, "status", response.status);
      }
      if (!isJsonType(response.headers["content-type"])) {
        return yield* readinessError(surface, "contract", response.status);
      }
      if (
        protocolVersion !== undefined &&
        response.headers["mcp-protocol-version"] !== protocolVersion
      ) {
        return yield* readinessError(surface, "contract", response.status);
      }
      const body = yield* readText(response, MAXIMUM_RESPONSE_BYTES).pipe(
        Effect.mapError(() => readinessError(surface, "body", response.status))
      );
      const parsed = yield* Schema.decodeEffect(
        Schema.fromJsonString(Schema.Unknown)
      )(body).pipe(
        Effect.mapError(() =>
          readinessError(surface, "contract", response.status)
        )
      );
      return { body: parsed, headers: response.headers };
    }).pipe(
      Effect.scoped,
      Effect.timeoutOrElse({
        duration: READINESS_REQUEST_TIMEOUT,
        orElse: () => Effect.fail(readinessError(surface, "timeout")),
      })
    )
);

/** Builds one non-cacheable JSON GET request. */
export function jsonGet(url: string) {
  return HttpClientRequest.get(url).pipe(
    HttpClientRequest.acceptJson,
    HttpClientRequest.setHeader("cache-control", "no-store")
  );
}

/** Builds one current-protocol stateless MCP request. */
export function mcpRequest(id: number, method: string) {
  return HttpClientRequest.post(DEVELOPER_MCP_ENDPOINT).pipe(
    HttpClientRequest.setHeader(
      "accept",
      "application/json, text/event-stream"
    ),
    HttpClientRequest.setHeader("cache-control", "no-store"),
    HttpClientRequest.setHeader("mcp-method", method),
    HttpClientRequest.setHeader(
      "mcp-protocol-version",
      DEVELOPER_MCP_PROTOCOL_VERSION
    ),
    HttpClientRequest.bodyText(
      JSON.stringify({
        id,
        jsonrpc: "2.0",
        method,
        params: {
          _meta: {
            "io.modelcontextprotocol/clientCapabilities": {},
            "io.modelcontextprotocol/clientInfo": {
              name: "aksara-release-gate",
              version: "1.0.0",
            },
            "io.modelcontextprotocol/protocolVersion":
              DEVELOPER_MCP_PROTOCOL_VERSION,
          },
        },
      }),
      "application/json"
    )
  );
}
