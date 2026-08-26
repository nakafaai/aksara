import { GitCommitShaSchema } from "@nakafa/aksara-contracts/ids";
import { Schema } from "effect";

/** Canonical public REST host whose index and OpenAPI contract are gated. */
export const DEVELOPER_API_ORIGIN = "https://api.nakafa.com";

/** Canonical current-protocol MCP endpoint whose capabilities are gated. */
export const DEVELOPER_MCP_ENDPOINT = "https://mcp.nakafa.com/mcp";

/** Current MCP wire revision required by the reviewed developer page. */
export const DEVELOPER_MCP_PROTOCOL_VERSION = "2026-07-28";

/** Current Nakafa MCP implementation version required by the release gate. */
export const DEVELOPER_MCP_SERVER_VERSION = "1.0.1";

/** Public response header that identifies the exact deployed Nakafa revision. */
export const DEVELOPER_RELEASE_SHA_HEADER = "x-nakafa-release-sha";

/** Exact deployed Nakafa revision exposed by the canonical edge. */
export const DeveloperReleaseShaSchema = GitCommitShaSchema;

/** First official CLI version required by the reviewed developer page. */
export const DEVELOPER_NAKAFA_CLI_VERSION = "0.1.0";

export const DeveloperSurfaceSchema = Schema.Literals([
  "api",
  "github",
  "mcp",
  "npm",
  "openapi",
]);
export type DeveloperSurface = typeof DeveloperSurfaceSchema.Type;

/** A protected developer-page release prerequisite is not ready. */
export class DeveloperReadinessError extends Schema.TaggedError<DeveloperReadinessError>()(
  "DeveloperReadinessError",
  {
    reason: Schema.Literals([
      "body",
      "contract",
      "network",
      "redirect",
      "status",
      "timeout",
    ]),
    status: Schema.Int,
    surface: DeveloperSurfaceSchema,
  }
) {}

export const GitHubComparisonSchema = Schema.Struct({
  status: Schema.Literals(["ahead", "identical"]),
});

export const DeveloperApiIndexSchema = Schema.Struct({
  authentication: Schema.Literal("none"),
  docs: Schema.Literal("https://nakafa.com/developers"),
  documentation: Schema.Literal("https://nakafa.com/developers"),
  mcp: Schema.Literal(DEVELOPER_MCP_ENDPOINT),
  name: Schema.Literal("Nakafa Public API"),
  openapi: Schema.Literal(`${DEVELOPER_API_ORIGIN}/openapi.json`),
  status: Schema.Literal("active"),
  version: Schema.Literal("1.0.0"),
});

export const DeveloperOpenApiSchema = Schema.Struct({
  info: Schema.Struct({
    title: Schema.Literal("Nakafa Public API"),
    version: Schema.Literal("1.0.0"),
  }),
  openapi: Schema.Literal("3.1.1"),
  paths: Schema.Struct({
    "/openapi.json": Schema.Struct({
      get: Schema.Struct({
        operationId: Schema.Literal("getNakafaOpenApi"),
      }),
    }),
    "/v1": Schema.Struct({
      get: Schema.Struct({
        operationId: Schema.Literal("getNakafaApiIndex"),
      }),
    }),
    "/v1/content": Schema.Struct({
      get: Schema.Struct({
        operationId: Schema.Literal("getNakafaContent"),
      }),
    }),
    "/v1/health": Schema.Struct({
      get: Schema.Struct({
        operationId: Schema.Literal("getNakafaApiHealth"),
      }),
    }),
    "/v1/quran/{surah}": Schema.Struct({
      get: Schema.Struct({
        operationId: Schema.Literal("getNakafaQuranReference"),
      }),
    }),
    "/v1/search": Schema.Struct({
      get: Schema.Struct({
        operationId: Schema.Literal("searchNakafaContent"),
      }),
    }),
    "/v1/taxonomy": Schema.Struct({
      get: Schema.Struct({
        operationId: Schema.Literal("getNakafaTaxonomy"),
      }),
    }),
  }),
});

export const DeveloperMcpDiscoverSchema = Schema.Struct({
  id: Schema.Literal(1),
  jsonrpc: Schema.Literal("2.0"),
  result: Schema.Struct({
    supportedVersions: Schema.Array(Schema.String).pipe(
      Schema.check(
        Schema.makeFilter(
          (versions) => versions.includes(DEVELOPER_MCP_PROTOCOL_VERSION),
          { message: "Expected support for the reviewed MCP protocol." }
        )
      )
    ),
  }),
});

const DeveloperMcpRemoteListSchema = Schema.Array(
  Schema.Struct({
    type: Schema.String,
    url: Schema.String,
  })
).pipe(
  Schema.check(
    Schema.makeFilter(
      (remotes) =>
        remotes.some(
          ({ type, url }) =>
            type === "streamable-http" && url === DEVELOPER_MCP_ENDPOINT
        ),
      { message: "Expected the canonical Streamable HTTP remote." }
    )
  )
);

/** Official Registry manifest published from the canonical MCP endpoint. */
export const DeveloperMcpManifestSchema = Schema.Struct({
  name: Schema.Literal("io.github.nakafaai/nakafa"),
  remotes: DeveloperMcpRemoteListSchema,
  version: Schema.Literal(DEVELOPER_MCP_SERVER_VERSION),
});

export const DeveloperMcpToolsSchema = Schema.Struct({
  id: Schema.Literal(2),
  jsonrpc: Schema.Literal("2.0"),
  result: Schema.Struct({
    tools: Schema.Tuple([
      Schema.Struct({ name: Schema.Literal("nakafa_search_content") }),
      Schema.Struct({ name: Schema.Literal("nakafa_get_content") }),
      Schema.Struct({ name: Schema.Literal("nakafa_get_taxonomy") }),
      Schema.Struct({
        name: Schema.Literal("nakafa_get_quran_reference"),
      }),
    ]),
  }),
});

export const DeveloperMcpResourcesSchema = Schema.Struct({
  id: Schema.Literal(3),
  jsonrpc: Schema.Literal("2.0"),
  result: Schema.Struct({
    resources: Schema.Tuple([
      Schema.Struct({ uri: Schema.Literal("nakafa://usage") }),
      Schema.Struct({ uri: Schema.Literal("nakafa://taxonomy") }),
    ]),
  }),
});

export const DeveloperMcpPromptsSchema = Schema.Struct({
  id: Schema.Literal(4),
  jsonrpc: Schema.Literal("2.0"),
  result: Schema.Struct({
    prompts: Schema.Tuple([
      Schema.Struct({ name: Schema.Literal("nakafa_find_lesson") }),
      Schema.Struct({ name: Schema.Literal("nakafa_answer_from_content") }),
      Schema.Struct({ name: Schema.Literal("nakafa_quran_reference") }),
    ]),
  }),
});

export const DeveloperNpmPackageSchema = Schema.Struct({
  bin: Schema.Struct({
    nakafa: Schema.Literal("dist/main.js"),
  }),
  engines: Schema.Struct({
    node: Schema.Literal(">=24 <25"),
  }),
  name: Schema.Literal("nakafa-cli"),
  version: Schema.Literal(DEVELOPER_NAKAFA_CLI_VERSION),
});
