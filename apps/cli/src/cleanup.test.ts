import { assert, describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { ConfigProvider, Effect } from "effect";
import type { HttpClientRequest } from "effect/unstable/http";
import { HttpClient } from "effect/unstable/http";
import { runCleanupCommand } from "#cli/cleanup";
import { captureClient, requestJson, webResponse } from "#test/http";

const releaseId = ReleaseIdSchema.make("release-cleanup");
const cleanupValues = new Map([
  ["AKSARA_PUBLICATION_ENDPOINT", "https://content.example.test/api/publish"],
  ["AKSARA_PUBLICATION_TOKEN", "publication-token"],
]);

/** Returns one strict cleanup response for the captured target request. */
function cleanupResponse(
  request: HttpClientRequest.HttpClientRequest,
  value: {
    readonly complete: boolean;
    readonly deletedArtifacts: number;
    readonly releaseId: string;
    readonly retryAt?: number;
  }
) {
  return webResponse(
    request,
    JSON.stringify({ ok: true, operation: "cleanup", value }),
    { headers: { "content-type": "application/json" }, status: 200 }
  );
}

/** Builds cleanup with isolated Config and HTTP capabilities. */
function cleanupProgram(
  client: HttpClient.HttpClient,
  values: ReadonlyMap<string, string> = cleanupValues
) {
  return runCleanupCommand({ command: "cleanup", releaseId }).pipe(
    Effect.provideService(
      ConfigProvider.ConfigProvider,
      ConfigProvider.fromUnknown(Object.fromEntries(values), {
        preserveEmptyStrings: true,
      })
    ),
    Effect.provideService(HttpClient.HttpClient, client)
  );
}

describe("cleanup command", () => {
  it.effect(
    "uses only target credentials and returns cumulative evidence",
    () =>
      Effect.gen(function* () {
        const captured = captureClient((incoming) =>
          Effect.succeed(
            cleanupResponse(incoming, {
              complete: true,
              deletedArtifacts: 3,
              releaseId,
            })
          )
        );

        expect(yield* cleanupProgram(captured.client)).toEqual({
          complete: true,
          deletedArtifacts: 3,
          releaseId,
        });
        expect(captured.requests).toHaveLength(1);
        const [request] = captured.requests;
        assert(request !== undefined, "Expected one cleanup request.");
        expect(request.headers.authorization).toBe("Bearer publication-token");
        expect(requestJson(request)).toEqual({
          operation: "cleanup",
          releaseId,
        });
      })
  );

  it.effect(
    "preserves the typed retention defer without requiring signing",
    () =>
      Effect.gen(function* () {
        const retryAt = 1_800_000_000_000;
        const captured = captureClient((request) =>
          Effect.succeed(
            cleanupResponse(request, {
              complete: false,
              deletedArtifacts: 0,
              releaseId,
              retryAt,
            })
          )
        );

        expect(
          yield* cleanupProgram(captured.client).pipe(Effect.flip)
        ).toMatchObject({
          _tag: "ReleaseCleanupDeferredError",
          releaseId,
          retryAt,
        });
        expect(captured.requests).toHaveLength(1);
      })
  );

  it.effect("sanitizes target protocol failures at the cleanup stage", () =>
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
        yield* cleanupProgram(captured.client).pipe(Effect.flip)
      ).toMatchObject({
        _tag: "ProductionError",
        failure: "PublicationTargetProtocolError",
        stage: "cleanup",
      });
    })
  );

  it.effect("sanitizes missing target configuration before network IO", () =>
    Effect.gen(function* () {
      const captured = captureClient(() => Effect.die("Unexpected request."));
      expect(
        yield* cleanupProgram(captured.client, new Map()).pipe(Effect.flip)
      ).toMatchObject({
        _tag: "ProductionError",
        failure: "ProductionEnvironmentError",
        stage: "environment",
      });
      expect(captured.requests).toHaveLength(0);
    })
  );
});
