import type { HttpClientRequest } from "@effect/platform";
import { HttpClient } from "@effect/platform";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { ConfigProvider, Effect } from "effect";
import { describe, expect, it } from "vitest";
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

/** Runs cleanup through isolated Config and HTTP capabilities. */
function runCleanup(client: HttpClient.HttpClient) {
  return Effect.runPromise(
    runCleanupCommand({ command: "cleanup", releaseId }).pipe(
      Effect.withConfigProvider(ConfigProvider.fromMap(cleanupValues)),
      Effect.provideService(HttpClient.HttpClient, client)
    )
  );
}

/** Returns the typed failure from isolated cleanup capabilities. */
function rejectCleanup(
  client: HttpClient.HttpClient,
  values: ReadonlyMap<string, string> = cleanupValues
) {
  return Effect.runPromise(
    runCleanupCommand({ command: "cleanup", releaseId }).pipe(
      Effect.withConfigProvider(ConfigProvider.fromMap(new Map(values))),
      Effect.provideService(HttpClient.HttpClient, client),
      Effect.flip
    )
  );
}

describe("cleanup command", () => {
  it("uses only target credentials and returns cumulative evidence", async () => {
    const captured = captureClient((incoming) =>
      Effect.succeed(
        cleanupResponse(incoming, {
          complete: true,
          deletedArtifacts: 3,
          releaseId,
        })
      )
    );

    await expect(runCleanup(captured.client)).resolves.toEqual({
      complete: true,
      deletedArtifacts: 3,
      releaseId,
    });
    expect(captured.requests).toHaveLength(1);
    const [request] = captured.requests;
    if (!request) {
      throw new Error("Expected one cleanup request.");
    }
    expect(request.headers.authorization).toBe("Bearer publication-token");
    expect(requestJson(request)).toEqual({
      operation: "cleanup",
      releaseId,
    });
  });

  it("preserves the typed retention defer without requiring signing", async () => {
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

    await expect(rejectCleanup(captured.client)).resolves.toMatchObject({
      _tag: "ReleaseCleanupDeferredError",
      releaseId,
      retryAt,
    });
    expect(captured.requests).toHaveLength(1);
  });

  it("sanitizes target protocol failures at the cleanup stage", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(
        webResponse(request, "{}", {
          headers: { "content-type": "application/json" },
          status: 200,
        })
      )
    );

    await expect(rejectCleanup(captured.client)).resolves.toMatchObject({
      _tag: "ProductionError",
      failure: "PublicationTargetProtocolError",
      stage: "cleanup",
    });
  });

  it("sanitizes missing target configuration before network IO", async () => {
    const captured = captureClient(() => Effect.die("Unexpected request."));
    await expect(
      rejectCleanup(captured.client, new Map())
    ).resolves.toMatchObject({
      _tag: "ProductionError",
      failure: "ProductionEnvironmentError",
      stage: "environment",
    });
    expect(captured.requests).toHaveLength(0);
  });
});
