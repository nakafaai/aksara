import { NAKAFA_AGENT_IMPLEMENTATION_SHA } from "@nakafa/aksara-corpus/pages/source";
import { Config, Effect, Option, Schema } from "effect";
import { HttpClientRequest } from "effect/unstable/http";
import {
  DEVELOPER_API_ORIGIN,
  DEVELOPER_MCP_ENDPOINT,
  DEVELOPER_MCP_PROTOCOL_VERSION,
  DEVELOPER_NAKAFA_CLI_VERSION,
  DEVELOPER_RELEASE_SHA_HEADER,
  DeveloperApiIndexSchema,
  DeveloperMcpDiscoverSchema,
  DeveloperMcpManifestSchema,
  DeveloperMcpPromptsSchema,
  DeveloperMcpResourcesSchema,
  DeveloperMcpToolsSchema,
  DeveloperNpmPackageSchema,
  DeveloperOpenApiSchema,
  DeveloperReleaseShaSchema,
  type DeveloperSurface,
  GitHubComparisonSchema,
} from "#cli/developer-readiness/contract";
import {
  fetchReadinessJson,
  jsonGet,
  mcpRequest,
  type ReadinessJsonResponse,
  readinessError,
} from "#cli/developer-readiness/request";

const GITHUB_USER_AGENT =
  "aksara-release-gate/1.0.0 (+https://github.com/nakafaai/aksara)";

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

/** Decodes the exact Nakafa release carried by one canonical edge response. */
function decodeReleaseSha(
  surface: DeveloperSurface,
  response: ReadinessJsonResponse
) {
  return decodeContract(
    DeveloperReleaseShaSchema,
    surface,
    response.headers[DEVELOPER_RELEASE_SHA_HEADER]
  );
}

/** Proves one GitHub revision is equal to or an ancestor of another. */
const verifyGitHubRevision = Effect.fn("AksaraCli.verifyGitHubRevision")(
  function* (base: string, head: string) {
    const token = yield* Config.option(Config.redacted("GITHUB_TOKEN"));
    let request = jsonGet(
      `https://api.github.com/repos/nakafaai/nakafa.com/compare/${base}...${head}`
    ).pipe(
      HttpClientRequest.setHeader("accept", "application/vnd.github+json"),
      HttpClientRequest.setHeader("user-agent", GITHUB_USER_AGENT),
      HttpClientRequest.setHeader("x-github-api-version", "2022-11-28")
    );
    if (Option.isSome(token)) {
      request = HttpClientRequest.bearerToken(request, token.value);
    }
    const response = yield* fetchReadinessJson("github", request);
    return yield* decodeContract(
      GitHubComparisonSchema,
      "github",
      response.body
    );
  }
);

/** Proves the canonical public REST index and returns its deployed revision. */
const verifyApi = Effect.fn("AksaraCli.verifyDeveloperApi")(function* () {
  const response = yield* fetchReadinessJson(
    "api",
    jsonGet(`${DEVELOPER_API_ORIGIN}/v1`)
  );
  yield* decodeContract(DeveloperApiIndexSchema, "api", response.body);
  return yield* decodeReleaseSha("api", response);
});

/** Proves the canonical OpenAPI document exposes every advertised route. */
const verifyOpenApi = Effect.fn("AksaraCli.verifyDeveloperOpenApi")(
  function* () {
    const response = yield* fetchReadinessJson(
      "openapi",
      jsonGet(`${DEVELOPER_API_ORIGIN}/openapi.json`)
    );
    yield* decodeContract(DeveloperOpenApiSchema, "openapi", response.body);
  }
);

/** Proves the MCP manifest, discovery, tools, resources, and prompts together. */
const verifyMcp = Effect.fn("AksaraCli.verifyDeveloperMcp")(function* () {
  const [manifest, discover, tools, resources, prompts] = yield* Effect.all(
    [
      fetchReadinessJson("mcp", jsonGet(DEVELOPER_MCP_ENDPOINT)),
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
      decodeContract(DeveloperMcpManifestSchema, "mcp", manifest.body),
      decodeContract(DeveloperMcpDiscoverSchema, "mcp", discover.body),
      decodeContract(DeveloperMcpToolsSchema, "mcp", tools.body),
      decodeContract(DeveloperMcpResourcesSchema, "mcp", resources.body),
      decodeContract(DeveloperMcpPromptsSchema, "mcp", prompts.body),
    ],
    { concurrency: "unbounded", discard: true }
  );
  return yield* Effect.all(
    [manifest, discover, tools, resources, prompts].map((response) =>
      decodeReleaseSha("mcp", response)
    ),
    { concurrency: "unbounded" }
  );
});

/** Proves the documented official CLI version and executable are installable. */
const verifyNpmPackage = Effect.fn("AksaraCli.verifyDeveloperNpmPackage")(
  function* () {
    const response = yield* fetchReadinessJson(
      "npm",
      jsonGet(
        `https://registry.npmjs.org/nakafa-cli/${DEVELOPER_NAKAFA_CLI_VERSION}`
      )
    );
    yield* decodeContract(DeveloperNpmPackageSchema, "npm", response.body);
  }
);

/** Proves every public developer capability and its exact deployed revision. */
export const verifyPublishedDeveloperSurface = Effect.fn(
  "AksaraCli.verifyPublishedDeveloperSurface"
)(function* () {
  const verified = yield* Effect.all(
    {
      apiReleaseSha: verifyApi(),
      mcpReleaseShas: verifyMcp(),
      npm: verifyNpmPackage(),
      openapi: verifyOpenApi(),
    },
    { concurrency: "unbounded" }
  );
  const deployedRevisions = new Set([
    verified.apiReleaseSha,
    ...verified.mcpReleaseShas,
  ]);
  yield* Effect.forEach(
    deployedRevisions,
    (releaseSha) =>
      Effect.all(
        [
          verifyGitHubRevision(NAKAFA_AGENT_IMPLEMENTATION_SHA, releaseSha),
          verifyGitHubRevision(releaseSha, "main"),
        ],
        { concurrency: "unbounded", discard: true }
      ),
    { concurrency: "unbounded", discard: true }
  );
});
