import { NAKAFA_AGENT_IMPLEMENTATION_SHA } from "@nakafa/aksara-corpus/pages/source";
import { describe, expect, it } from "@nakafa/testing/effect";
import { ConfigProvider, Effect } from "effect";
import type { HttpClient, HttpClientRequest } from "effect/unstable/http";
import { DEVELOPER_RELEASE_SHA_HEADER } from "#cli/developer-readiness/contract";
import { verifyPublishedDeveloperSurface } from "#cli/developer-readiness/verify";
import {
  DEVELOPER_API_INDEX_URL,
  DEVELOPER_MCP_ENDPOINT,
  DEVELOPER_MCP_PROTOCOL_VERSION,
  DEVELOPER_TEST_RELEASE_SHA,
  developerResponseBody,
} from "#test/developer";
import { captureClient, requestJson, runClient, webResponse } from "#test/http";

/** Wraps one test contract body in its required protocol headers. */
function jsonResponse(
  request: HttpClientRequest.HttpClientRequest,
  body: unknown = developerResponseBody(request),
  init: ResponseInit = {}
) {
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json; charset=utf-8");
  if (
    request.url === DEVELOPER_API_INDEX_URL ||
    request.url === DEVELOPER_MCP_ENDPOINT
  ) {
    headers.set(DEVELOPER_RELEASE_SHA_HEADER, DEVELOPER_TEST_RELEASE_SHA);
  }
  if (request.url === DEVELOPER_MCP_ENDPOINT && request.method === "POST") {
    headers.set("mcp-protocol-version", DEVELOPER_MCP_PROTOCOL_VERSION);
  }
  return webResponse(request, JSON.stringify(body), { ...init, headers });
}

/** Builds a captured client where every developer prerequisite is ready. */
function successfulClient() {
  return captureClient((request) => Effect.succeed(jsonResponse(request)));
}

/** Supplies deterministic Config values to one readiness program. */
function readinessProgram(config: ReadonlyMap<string, string> = new Map()) {
  return verifyPublishedDeveloperSurface().pipe(
    Effect.provideService(
      ConfigProvider.ConfigProvider,
      ConfigProvider.fromUnknown(Object.fromEntries(config))
    )
  );
}

/** Returns one typed readiness failure through an explicit test client. */
function reject(client: HttpClient.HttpClient) {
  return runClient(readinessProgram().pipe(Effect.flip), client);
}

describe("Nakafa developer release readiness", () => {
  it("proves the reviewed revision, public contracts, and npm package", async () => {
    const captured = successfulClient();

    await expect(
      runClient(
        readinessProgram(new Map([["GITHUB_TOKEN", "test-token"]])),
        captured.client
      )
    ).resolves.toBeUndefined();

    expect(captured.requests).toHaveLength(9);
    const gitHubRequests = captured.requests.filter(({ url }) =>
      url.startsWith("https://api.github.com/")
    );
    expect(gitHubRequests.map(({ url }) => url)).toEqual(
      expect.arrayContaining([
        `https://api.github.com/repos/nakafaai/nakafa.com/compare/${NAKAFA_AGENT_IMPLEMENTATION_SHA}...${DEVELOPER_TEST_RELEASE_SHA}`,
        `https://api.github.com/repos/nakafaai/nakafa.com/compare/${DEVELOPER_TEST_RELEASE_SHA}...main`,
      ])
    );
    for (const request of gitHubRequests) {
      expect(request.headers.authorization).toBe("Bearer test-token");
      expect(request.headers["user-agent"]).toContain("aksara-release-gate");
    }
    const mcpRequests = captured.requests.filter(
      ({ url }) => url === DEVELOPER_MCP_ENDPOINT
    );
    expect(mcpRequests).toHaveLength(4);
    const protocolRequests = mcpRequests.filter(
      ({ method }) => method === "POST"
    );
    expect(
      protocolRequests.map(({ headers }) => headers["mcp-method"])
    ).toEqual([
      "server/discover",
      "tools/list",
      "resources/list",
      "prompts/list",
    ]);
    for (const request of protocolRequests) {
      expect(request.headers["mcp-protocol-version"]).toBe(
        DEVELOPER_MCP_PROTOCOL_VERSION
      );
      expect(requestJson(request)).toMatchObject({
        jsonrpc: "2.0",
        method: request.headers["mcp-method"],
        params: {
          _meta: {
            "io.modelcontextprotocol/protocolVersion":
              DEVELOPER_MCP_PROTOCOL_VERSION,
          },
        },
      });
    }
    expect(captured.requests).toContainEqual(
      expect.objectContaining({
        url: "https://registry.npmjs.org/nakafa-cli/0.1.0",
      })
    );
  });

  it("maps incompatible external contracts to their public surface", async () => {
    const incompatible = captureClient((request) =>
      Effect.succeed(
        request.url === DEVELOPER_API_INDEX_URL
          ? jsonResponse(request, { name: "Wrong API" })
          : jsonResponse(request)
      )
    );

    await expect(reject(incompatible.client)).resolves.toMatchObject({
      reason: "contract",
      surface: "api",
    });
  });

  it("accepts additional MCP protocol revisions", async () => {
    const compatible = captureClient((request) => {
      if (request.headers["mcp-method"] !== "server/discover") {
        return Effect.succeed(jsonResponse(request));
      }
      return Effect.succeed(
        jsonResponse(request, {
          id: 1,
          jsonrpc: "2.0",
          result: {
            supportedVersions: ["2027-01-01", DEVELOPER_MCP_PROTOCOL_VERSION],
          },
        })
      );
    });

    await expect(
      runClient(readinessProgram(), compatible.client)
    ).resolves.toBeUndefined();
  });

  it("requires an exact deployed revision on API and MCP responses", async () => {
    const missingRelease = captureClient((request) => {
      if (request.url !== DEVELOPER_API_INDEX_URL) {
        return Effect.succeed(jsonResponse(request));
      }
      return Effect.succeed(
        webResponse(request, JSON.stringify(developerResponseBody(request)), {
          headers: { "content-type": "application/json" },
        })
      );
    });

    await expect(reject(missingRelease.client)).resolves.toMatchObject({
      reason: "contract",
      surface: "api",
    });
  });
});
