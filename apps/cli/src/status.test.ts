import type { HttpClientRequest } from "@effect/platform";
import { HttpClient } from "@effect/platform";
import { ConfigProvider, Effect, HashMap, Logger } from "effect";
import { describe, expect, it } from "vitest";
import { runStatusCommand } from "#cli/status";
import { captureClient, requestJson, webResponse } from "#test/http";
import { stateBundle, stateCurrent, stateRecovery } from "#test/state";

const statusValues = new Map([
  ["AKSARA_PUBLICATION_ENDPOINT", "https://content.example.test/api/publish"],
  ["AKSARA_PUBLICATION_TOKEN", "publication-token"],
]);

interface StatusLog {
  readonly annotations: Readonly<Record<string, unknown>>;
  readonly message: unknown;
}

/** Returns authoritative state for one captured request. */
function statusResponse(
  request: HttpClientRequest.HttpClientRequest,
  value: unknown = { active: null, candidate: null, recovery: null }
) {
  return webResponse(
    request,
    JSON.stringify({
      ok: true,
      operation: "current",
      value,
    }),
    { headers: { "content-type": "application/json" }, status: 200 }
  );
}

/** Runs status through isolated Config and HTTP capabilities. */
function runStatus(client: HttpClient.HttpClient, logs?: StatusLog[]) {
  const program = runStatusCommand().pipe(
    Effect.withConfigProvider(ConfigProvider.fromMap(statusValues)),
    Effect.provideService(HttpClient.HttpClient, client)
  );
  if (logs === undefined) {
    return Effect.runPromise(program);
  }
  const logger = Logger.make(({ annotations, message }) => {
    logs.push({
      annotations: Object.fromEntries(HashMap.toEntries(annotations)),
      message,
    });
  });
  return Effect.runPromise(
    program.pipe(Effect.provide(Logger.replace(Logger.defaultLogger, logger)))
  );
}

describe("status command", () => {
  it("reads current state with publication credentials only", async () => {
    const captured = captureClient((incoming) =>
      Effect.succeed(statusResponse(incoming))
    );

    await expect(runStatus(captured.client)).resolves.toBeUndefined();
    expect(captured.requests).toHaveLength(1);
    const [request] = captured.requests;
    if (!request) {
      throw new Error("Expected one status request.");
    }
    expect(request.headers.authorization).toBe("Bearer publication-token");
    expect(requestJson(request)).toEqual({ operation: "current" });
  });

  it("sanitizes target protocol failures", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(
        webResponse(request, "{}", {
          headers: { "content-type": "application/json" },
          status: 200,
        })
      )
    );

    await expect(
      Effect.runPromise(
        runStatusCommand().pipe(
          Effect.withConfigProvider(ConfigProvider.fromMap(statusValues)),
          Effect.provideService(HttpClient.HttpClient, captured.client),
          Effect.flip
        )
      )
    ).resolves.toMatchObject({
      _tag: "ProductionError",
      failure: "PublicationTargetProtocolError",
      stage: "state",
    });
  });

  it("reports coherent candidate and recovery identities", async () => {
    const target = stateBundle("release-candidate");
    const current = stateCurrent({
      active: null,
      candidate: { ...target, phase: "verified" },
      recovery: stateRecovery(target),
    });
    const captured = captureClient((request) =>
      Effect.succeed(statusResponse(request, current))
    );
    const logs: StatusLog[] = [];

    await expect(runStatus(captured.client, logs)).resolves.toBeUndefined();
    expect(captured.requests).toHaveLength(1);
    expect(logs).toEqual([
      {
        annotations: {
          active: "empty",
          candidate: `release-candidate:${target.release.manifestHash}`,
          candidatePhase: "verified",
          recovery: `recovery-next:${target.release.manifestHash}`,
          recoveryPhase: "verified",
        },
        message: ["Content publication status loaded."],
      },
    ]);
  });
});
