import { describe, expect, it } from "@effect/vitest";
import {
  ConfigProvider,
  Effect,
  Logger,
  MutableHashMap,
  Record as Rec,
  References,
  Schema,
} from "effect";
import type { HttpClientRequest } from "effect/http";
import { HttpClient } from "effect/http";
import { runStatusCommand } from "#cli/status";
import { captureClient, requestJson, webResponse } from "#test/http";
import { stateBundle, stateCurrent, stateRecovery } from "#test/state";

const encodeJson = Schema.encodeSync(Schema.fromJsonString(Schema.Unknown));
const statusValues = MutableHashMap.fromIterable([
  ["AKSARA_PUBLICATION_ENDPOINT", "https://content.example.test/api/publish"],
  ["AKSARA_PUBLICATION_TOKEN", "publication-token"],
]);

const StatusLogSchema = Schema.Struct({
  annotations: Schema.Record(Schema.String, Schema.Unknown),
  message: Schema.Unknown,
});
type StatusLog = typeof StatusLogSchema.Type;

/** Returns authoritative state for one captured request. */
function statusResponse(
  request: HttpClientRequest.HttpClientRequest,
  value: unknown = {
    active: null,
    candidate: null,
    recovery: null,
    tryoutRuntimeBundle: null,
  }
) {
  return webResponse(
    request,
    encodeJson({
      ok: true,
      operation: "current",
      value,
    }),
    { headers: { "content-type": "application/json" }, status: 200 }
  );
}

/** Runs status through isolated Config and HTTP capabilities. */
function runStatus(client: HttpClient.HttpClient, logs?: StatusLog[]) {
  const program = runStatusCommand.pipe(
    Effect.provideService(
      ConfigProvider.ConfigProvider,
      ConfigProvider.fromUnknown(Rec.fromEntries(statusValues))
    ),
    Effect.provideService(HttpClient.HttpClient, client)
  );
  if (logs === undefined) {
    return program;
  }
  const logger = Logger.make(({ fiber, message }) => {
    logs.push({
      annotations: { ...fiber.getRef(References.CurrentLogAnnotations) },
      message,
    });
  });
  return program.pipe(Effect.provide(Logger.layer([logger])));
}

describe("status command", () => {
  it.effect("reads current state with publication credentials only", () =>
    Effect.gen(function* () {
      const captured = captureClient((incoming) =>
        Effect.succeed(statusResponse(incoming))
      );

      expect(yield* runStatus(captured.client)).toBeUndefined();
      expect(captured.requests).toHaveLength(1);
      const [request] = captured.requests;
      if (!request) {
        throw new Error("Expected one status request.");
      }
      expect(request.headers.authorization).toBe("Bearer publication-token");
      expect(requestJson(request)).toEqual({ operation: "current" });
    })
  );

  it.effect("sanitizes target protocol failures", () =>
    Effect.gen(function* () {
      const captured = captureClient((request) =>
        Effect.succeed(
          webResponse(request, "{}", {
            headers: { "content-type": "application/json" },
            status: 200,
          })
        )
      );

      expect(
        yield* runStatusCommand.pipe(
          Effect.provideService(
            ConfigProvider.ConfigProvider,
            ConfigProvider.fromUnknown(Rec.fromEntries(statusValues))
          ),
          Effect.provideService(HttpClient.HttpClient, captured.client),
          Effect.flip
        )
      ).toMatchObject({
        _tag: "ProductionError",
        failure: "PublicationTargetProtocolError",
        stage: "state",
      });
    })
  );

  it.effect("reports coherent candidate and recovery identities", () =>
    Effect.gen(function* () {
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

      expect(yield* runStatus(captured.client, logs)).toBeUndefined();
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
    })
  );
});
