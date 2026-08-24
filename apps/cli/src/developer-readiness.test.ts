import { NAKAFA_AGENT_IMPLEMENTATION_SHA } from "@nakafa/aksara-corpus/pages/source";
import { describe, expect, it } from "@nakafa/testing/effect";
import { ConfigProvider, Effect, Fiber } from "effect";
import { TestClock } from "effect/testing";
import {
  HttpClient,
  HttpClientError,
  HttpClientRequest,
} from "effect/unstable/http";
import { runDeveloperReadinessCommand } from "#cli/developer-readiness";
import {
  DEVELOPER_API_INDEX_URL,
  DEVELOPER_MCP_ENDPOINT,
  DEVELOPER_MCP_PROTOCOL_VERSION,
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
  if (request.url === DEVELOPER_MCP_ENDPOINT) {
    headers.set("mcp-protocol-version", DEVELOPER_MCP_PROTOCOL_VERSION);
  }
  return webResponse(request, JSON.stringify(body), { ...init, headers });
}

/** Builds a captured client where every developer prerequisite is ready. */
function successfulClient() {
  return captureClient((request) => Effect.succeed(jsonResponse(request)));
}

/** Supplies deterministic Config values to one readiness program. */
function readinessProgram(
  pageSources?: unknown,
  config: ReadonlyMap<string, string> = new Map()
) {
  return runDeveloperReadinessCommand(pageSources).pipe(
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
        readinessProgram(undefined, new Map([["GITHUB_TOKEN", "test-token"]])),
        captured.client
      )
    ).resolves.toBeUndefined();

    expect(captured.requests).toHaveLength(8);
    expect(captured.requests.map(({ url }) => url)).toContain(
      `https://api.github.com/repos/nakafaai/nakafa.com/compare/${NAKAFA_AGENT_IMPLEMENTATION_SHA}...main`
    );
    const gitHubRequest = captured.requests.find(({ url }) =>
      url.startsWith("https://api.github.com/")
    );
    expect(gitHubRequest?.headers.authorization).toBe("Bearer test-token");
    expect(gitHubRequest?.headers["user-agent"]).toContain(
      "aksara-release-gate"
    );
    const mcpRequests = captured.requests.filter(
      ({ url }) => url === DEVELOPER_MCP_ENDPOINT
    );
    expect(mcpRequests.map(({ headers }) => headers["mcp-method"])).toEqual([
      "server/discover",
      "tools/list",
      "resources/list",
      "prompts/list",
    ]);
    for (const request of mcpRequests) {
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
  });

  it("maps transport failure to the exact public surface", async () => {
    const client = HttpClient.make((request) =>
      Effect.fail(
        new HttpClientError.HttpClientError({
          reason: new HttpClientError.TransportError({ request }),
        })
      )
    );

    await expect(reject(client)).resolves.toMatchObject({
      _tag: "DeveloperReadinessError",
      reason: "network",
      status: 0,
    });
  });

  it("rejects redirects and unsuccessful public status codes", async () => {
    const redirect = captureClient((request) =>
      Effect.succeed(
        request.url === DEVELOPER_API_INDEX_URL
          ? jsonResponse(
              HttpClientRequest.get("https://wrong.example.com/v1"),
              {}
            )
          : jsonResponse(request)
      )
    );
    const unavailable = captureClient((request) =>
      Effect.succeed(
        request.url === DEVELOPER_API_INDEX_URL
          ? jsonResponse(request, {}, { status: 503 })
          : jsonResponse(request)
      )
    );

    await expect(reject(redirect.client)).resolves.toMatchObject({
      reason: "redirect",
      status: 200,
      surface: "api",
    });
    await expect(reject(unavailable.client)).resolves.toMatchObject({
      reason: "status",
      status: 503,
      surface: "api",
    });
  });

  it("rejects unsafe bodies and non-JSON responses", async () => {
    const oversized = captureClient((request) => {
      if (request.url !== DEVELOPER_API_INDEX_URL) {
        return Effect.succeed(jsonResponse(request));
      }
      return Effect.succeed(
        webResponse(request, "{}", {
          headers: {
            "content-length": String(3 * 1024 * 1024),
            "content-type": "application/json",
          },
        })
      );
    });
    const text = captureClient((request) =>
      Effect.succeed(
        request.url === DEVELOPER_API_INDEX_URL
          ? webResponse(request, "{}", {
              headers: { "content-type": "text/plain" },
            })
          : jsonResponse(request)
      )
    );

    await expect(reject(oversized.client)).resolves.toMatchObject({
      reason: "body",
      surface: "api",
    });
    await expect(reject(text.client)).resolves.toMatchObject({
      reason: "contract",
      surface: "api",
    });
  });

  it("rejects malformed JSON", async () => {
    const malformed = captureClient((request) =>
      Effect.succeed(
        request.url === DEVELOPER_API_INDEX_URL
          ? webResponse(request, "{", {
              headers: { "content-type": "application/json" },
            })
          : jsonResponse(request)
      )
    );
    await expect(reject(malformed.client)).resolves.toMatchObject({
      reason: "contract",
      surface: "api",
    });
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

  it("requires the current MCP protocol response header", async () => {
    const missingHeader = captureClient((request) => {
      if (request.url !== DEVELOPER_MCP_ENDPOINT) {
        return Effect.succeed(jsonResponse(request));
      }
      return Effect.succeed(
        webResponse(request, JSON.stringify(developerResponseBody(request)), {
          headers: { "content-type": "application/json" },
        })
      );
    });

    await expect(reject(missingHeader.client)).resolves.toMatchObject({
      reason: "contract",
      surface: "mcp",
    });
  });

  it("allows an inactive developer source to be withdrawn", async () => {
    const captured = successfulClient();

    await expect(
      runClient(readinessProgram([]), captured.client)
    ).resolves.toBeUndefined();
    expect(captured.requests).toHaveLength(0);
  });

  it("rejects an invalid protected page catalog", async () => {
    const captured = successfulClient();
    const error = await runClient(
      readinessProgram(null).pipe(Effect.flip),
      captured.client
    );

    expect(error).toMatchObject({
      reason: "contract",
      surface: "catalog",
    });
    expect(captured.requests).toHaveLength(0);
  });

  it.effect("bounds every public readiness request", () =>
    Effect.gen(function* () {
      const captured = captureClient((request) =>
        request.url === DEVELOPER_API_INDEX_URL
          ? Effect.never
          : Effect.succeed(jsonResponse(request))
      );
      const fiber = yield* readinessProgram().pipe(
        Effect.provideService(HttpClient.HttpClient, captured.client),
        Effect.flip,
        Effect.forkChild({ startImmediately: true })
      );
      yield* TestClock.adjust("30 seconds");
      const error = yield* Fiber.join(fiber);

      expect(error).toMatchObject({ reason: "timeout", surface: "api" });
    })
  );
});
