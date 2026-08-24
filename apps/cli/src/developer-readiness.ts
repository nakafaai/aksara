import {
  decodePageSources,
  NAKAFA_AGENT_IMPLEMENTATION_SHA,
} from "@nakafa/aksara-corpus/pages/source";
import { isJsonType, readText } from "@nakafa/aksara-utilities/http/response";
import { Config, Effect, Option, Schema } from "effect";
import { HttpClient, HttpClientRequest } from "effect/unstable/http";
import {
  DEVELOPER_API_ORIGIN,
  DEVELOPER_MCP_ENDPOINT,
  DEVELOPER_MCP_PROTOCOL_VERSION,
  DEVELOPER_NAKAFA_CLI_VERSION,
  DeveloperApiIndexSchema,
  DeveloperMcpDiscoverSchema,
  DeveloperMcpPromptsSchema,
  DeveloperMcpResourcesSchema,
  DeveloperMcpToolsSchema,
  DeveloperNpmPackageSchema,
  DeveloperOpenApiSchema,
  DeveloperReadinessError,
  type DeveloperSurface,
  GitHubComparisonSchema,
} from "#cli/developer-readiness/contract";

const MAXIMUM_RESPONSE_BYTES = 2 * 1024 * 1024;
const READINESS_REQUEST_TIMEOUT = "30 seconds";
const GITHUB_USER_AGENT =
  "aksara-release-gate/1.0.0 (+https://github.com/nakafaai/aksara)";

/** Creates one stable typed failure for a public readiness surface. */
function readinessError(
  surface: DeveloperSurface,
  reason: DeveloperReadinessError["reason"],
  status = 0
) {
  return new DeveloperReadinessError({ reason, status, surface });
}

/** Reads one bounded, non-redirected JSON response from a public release gate. */
const fetchReadinessJson = Effect.fn("AksaraCli.fetchReadinessJson")(
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
      return yield* Effect.try({
        catch: () => readinessError(surface, "contract", response.status),
        try: () => JSON.parse(body) as unknown,
      });
    }).pipe(
      Effect.scoped,
      Effect.timeoutOrElse({
        duration: READINESS_REQUEST_TIMEOUT,
        orElse: () => Effect.fail(readinessError(surface, "timeout")),
      })
    )
);

/** Builds one non-cacheable JSON GET request. */
function jsonGet(url: string) {
  return HttpClientRequest.get(url).pipe(
    HttpClientRequest.acceptJson,
    HttpClientRequest.setHeader("cache-control", "no-store")
  );
}

/** Builds one current-protocol stateless MCP request. */
function mcpRequest(id: number, method: string) {
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

/** Maps strict external schema decoding to the owning readiness surface. */
function decodeContract<S extends Schema.Constraint>(
  schema: S,
  surface: DeveloperSurface,
  input: unknown
) {
  return Schema.decodeUnknownEffect(schema)(input).pipe(
    Effect.mapError(() => readinessError(surface, "contract"))
  );
}

/** Proves the reviewed Nakafa implementation is merged into current main. */
const verifyGitHubRevision = Effect.fn("AksaraCli.verifyGitHubRevision")(
  function* () {
    const token = yield* Config.option(Config.redacted("GITHUB_TOKEN"));
    let request = jsonGet(
      `https://api.github.com/repos/nakafaai/nakafa.com/compare/${NAKAFA_AGENT_IMPLEMENTATION_SHA}...main`
    ).pipe(
      HttpClientRequest.setHeader("accept", "application/vnd.github+json"),
      HttpClientRequest.setHeader("user-agent", GITHUB_USER_AGENT),
      HttpClientRequest.setHeader("x-github-api-version", "2022-11-28")
    );
    if (Option.isSome(token)) {
      request = HttpClientRequest.bearerToken(request, token.value);
    }
    const input = yield* fetchReadinessJson("github", request);
    return yield* decodeContract(GitHubComparisonSchema, "github", input);
  }
);

/** Proves the canonical public REST index exposes the reviewed v1 contract. */
const verifyApi = Effect.fn("AksaraCli.verifyDeveloperApi")(() =>
  fetchReadinessJson("api", jsonGet(`${DEVELOPER_API_ORIGIN}/v1`)).pipe(
    Effect.flatMap((input) =>
      decodeContract(DeveloperApiIndexSchema, "api", input)
    )
  )
);

/** Proves the canonical OpenAPI document exposes every advertised route. */
const verifyOpenApi = Effect.fn("AksaraCli.verifyDeveloperOpenApi")(() =>
  fetchReadinessJson(
    "openapi",
    jsonGet(`${DEVELOPER_API_ORIGIN}/openapi.json`)
  ).pipe(
    Effect.flatMap((input) =>
      decodeContract(DeveloperOpenApiSchema, "openapi", input)
    )
  )
);

/** Proves current MCP discovery, tools, resources, and prompts together. */
const verifyMcp = Effect.fn("AksaraCli.verifyDeveloperMcp")(function* () {
  const [discover, tools, resources, prompts] = yield* Effect.all(
    [
      fetchReadinessJson(
        "mcp",
        mcpRequest(1, "server/discover"),
        DEVELOPER_MCP_PROTOCOL_VERSION
      ),
      fetchReadinessJson(
        "mcp",
        mcpRequest(2, "tools/list"),
        DEVELOPER_MCP_PROTOCOL_VERSION
      ),
      fetchReadinessJson(
        "mcp",
        mcpRequest(3, "resources/list"),
        DEVELOPER_MCP_PROTOCOL_VERSION
      ),
      fetchReadinessJson(
        "mcp",
        mcpRequest(4, "prompts/list"),
        DEVELOPER_MCP_PROTOCOL_VERSION
      ),
    ],
    { concurrency: "unbounded" }
  );
  yield* Effect.all(
    [
      decodeContract(DeveloperMcpDiscoverSchema, "mcp", discover),
      decodeContract(DeveloperMcpToolsSchema, "mcp", tools),
      decodeContract(DeveloperMcpResourcesSchema, "mcp", resources),
      decodeContract(DeveloperMcpPromptsSchema, "mcp", prompts),
    ],
    { concurrency: "unbounded" }
  );
});

/** Proves the documented official CLI version and executable are installable. */
const verifyNpmPackage = Effect.fn("AksaraCli.verifyDeveloperNpmPackage")(() =>
  fetchReadinessJson(
    "npm",
    jsonGet("https://registry.npmjs.org/nakafa-cli/latest")
  ).pipe(
    Effect.flatMap((input) =>
      decodeContract(DeveloperNpmPackageSchema, "npm", input)
    )
  )
);

const verifyPublishedDeveloperSurface = Effect.all(
  [
    verifyGitHubRevision(),
    verifyApi(),
    verifyOpenApi(),
    verifyMcp(),
    verifyNpmPackage(),
  ],
  { concurrency: "unbounded", discard: true }
);

/** Blocks an active developer-page publication until every capability is real. */
export const runDeveloperReadinessCommand = Effect.fn(
  "AksaraCli.runDeveloperReadinessCommand"
)(function* (pageSources?: unknown) {
  const sources = yield* decodePageSources(pageSources).pipe(
    Effect.mapError(() => readinessError("catalog", "contract"))
  );
  if (!sources.some(({ pageKey }) => pageKey === "developers")) {
    yield* Effect.logInfo(
      "Nakafa developer release readiness skipped for an inactive source."
    );
    return;
  }
  yield* verifyPublishedDeveloperSurface;
  yield* Effect.logInfo("Nakafa developer release readiness verified.").pipe(
    Effect.annotateLogs({
      implementationSha: NAKAFA_AGENT_IMPLEMENTATION_SHA,
      mcpProtocolVersion: DEVELOPER_MCP_PROTOCOL_VERSION,
      nakafaCliVersion: DEVELOPER_NAKAFA_CLI_VERSION,
    })
  );
});
