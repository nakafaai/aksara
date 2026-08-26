import type { HttpClientRequest } from "effect/unstable/http";

export const DEVELOPER_API_INDEX_URL = "https://api.nakafa.com/v1";
export const DEVELOPER_MCP_ENDPOINT = "https://mcp.nakafa.com/mcp";
export const DEVELOPER_MCP_PROTOCOL_VERSION = "2026-07-28";
export const DEVELOPER_MCP_SERVER_VERSION = "1.0.1";
export const DEVELOPER_TEST_RELEASE_SHA = "d".repeat(40);

export const DEVELOPER_OPENAPI_BODY = {
  info: { title: "Nakafa Public API", version: "1.0.0" },
  openapi: "3.1.1",
  paths: {
    "/openapi.json": { get: { operationId: "getNakafaOpenApi" } },
    "/v1": { get: { operationId: "getNakafaApiIndex" } },
    "/v1/content": { get: { operationId: "getNakafaContent" } },
    "/v1/health": { get: { operationId: "getNakafaApiHealth" } },
    "/v1/quran/{surah}": {
      get: { operationId: "getNakafaQuranReference" },
    },
    "/v1/search": { get: { operationId: "searchNakafaContent" } },
    "/v1/taxonomy": { get: { operationId: "getNakafaTaxonomy" } },
  },
};

export const DEVELOPER_NPM_BODY = {
  bin: { nakafa: "dist/main.js" },
  engines: { node: ">=24 <25" },
  name: "nakafa-cli",
  version: "0.1.0",
};

export const DEVELOPER_MCP_MANIFEST_BODY = {
  name: "io.github.nakafaai/nakafa",
  remotes: [
    {
      type: "streamable-http",
      url: DEVELOPER_MCP_ENDPOINT,
    },
  ],
  version: DEVELOPER_MCP_SERVER_VERSION,
};

/** Returns one strict successful MCP response for a requested list method. */
function mcpBody(method: string | undefined) {
  if (method === "server/discover") {
    return {
      id: 1,
      jsonrpc: "2.0",
      result: { supportedVersions: [DEVELOPER_MCP_PROTOCOL_VERSION] },
    };
  }
  if (method === "tools/list") {
    return {
      id: 2,
      jsonrpc: "2.0",
      result: {
        tools: [
          { name: "nakafa_search_content" },
          { name: "nakafa_get_content" },
          { name: "nakafa_get_taxonomy" },
          { name: "nakafa_get_quran_reference" },
        ],
      },
    };
  }
  if (method === "resources/list") {
    return {
      id: 3,
      jsonrpc: "2.0",
      result: {
        resources: [{ uri: "nakafa://usage" }, { uri: "nakafa://taxonomy" }],
      },
    };
  }
  if (method === "prompts/list") {
    return {
      id: 4,
      jsonrpc: "2.0",
      result: {
        prompts: [
          { name: "nakafa_find_lesson" },
          { name: "nakafa_answer_from_content" },
          { name: "nakafa_quran_reference" },
        ],
      },
    };
  }
  throw new Error(`Unexpected MCP method: ${method ?? "missing"}`);
}

/** Returns the canonical successful contract body for one public request. */
export function developerResponseBody(
  request: HttpClientRequest.HttpClientRequest
) {
  const url = new URL(request.url);
  if (url.hostname === "api.github.com") {
    return { status: "ahead" };
  }
  if (url.hostname === "registry.npmjs.org") {
    return DEVELOPER_NPM_BODY;
  }
  if (request.url === DEVELOPER_API_INDEX_URL) {
    return {
      authentication: "none",
      docs: "https://nakafa.com/developers",
      documentation: "https://nakafa.com/developers",
      mcp: DEVELOPER_MCP_ENDPOINT,
      name: "Nakafa Public API",
      openapi: "https://api.nakafa.com/openapi.json",
      status: "active",
      version: "1.0.0",
    };
  }
  if (url.pathname === "/openapi.json") {
    return DEVELOPER_OPENAPI_BODY;
  }
  if (request.url === DEVELOPER_MCP_ENDPOINT) {
    if (request.method === "GET") {
      return DEVELOPER_MCP_MANIFEST_BODY;
    }
    return mcpBody(request.headers["mcp-method"]);
  }
  throw new Error(`Unexpected readiness URL: ${request.url}`);
}
