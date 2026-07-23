import type { HttpClientRequest } from "@effect/platform";
import { HttpClient } from "@effect/platform";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { ConfigProvider, Effect } from "effect";
import { describe, expect, it } from "vitest";
import { runAcceptCommand } from "#cli/accept";
import { captureClient, requestJson, webResponse } from "#test/http";

const releaseId = ReleaseIdSchema.make("release-active");
const recoveryId = ReleaseIdSchema.make("recovery-active");
const acceptValues = new Map([
  ["AKSARA_PUBLICATION_ENDPOINT", "https://content.example.test/api/publish"],
  ["AKSARA_PUBLICATION_TOKEN", "publication-token"],
]);

/** Returns one strict retained-recovery discard response. */
function acceptResponse(request: HttpClientRequest.HttpClientRequest) {
  return webResponse(
    request,
    JSON.stringify({
      ok: true,
      operation: "accept",
      value: {
        complete: true,
        processedItems: 3,
        releaseId: recoveryId,
        totalItems: 3,
      },
    }),
    { headers: { "content-type": "application/json" }, status: 200 }
  );
}

/** Runs acceptance through isolated Config and HTTP capabilities. */
function runAccept(client: HttpClient.HttpClient) {
  return Effect.runPromise(
    runAcceptCommand({ command: "accept", recoveryId, releaseId }).pipe(
      Effect.withConfigProvider(ConfigProvider.fromMap(acceptValues)),
      Effect.provideService(HttpClient.HttpClient, client)
    )
  );
}

/** Returns one sanitized acceptance failure. */
function rejectAccept(client: HttpClient.HttpClient) {
  return Effect.runPromise(
    runAcceptCommand({ command: "accept", recoveryId, releaseId }).pipe(
      Effect.withConfigProvider(ConfigProvider.fromMap(acceptValues)),
      Effect.provideService(HttpClient.HttpClient, client),
      Effect.flip
    )
  );
}

describe("accept command", () => {
  it("discards only the exact retained inverse without signing inputs", async () => {
    const captured = captureClient((incoming) =>
      Effect.succeed(acceptResponse(incoming))
    );

    await expect(runAccept(captured.client)).resolves.toEqual({
      complete: true,
      processedItems: 3,
      releaseId: recoveryId,
      totalItems: 3,
    });
    expect(captured.requests).toHaveLength(1);
    const [request] = captured.requests;
    if (!request) {
      throw new Error("Expected one acceptance request.");
    }
    expect(request.headers.authorization).toBe("Bearer publication-token");
    expect(requestJson(request)).toEqual({
      operation: "accept",
      recoveryId,
      releaseId,
    });
  });

  it("sanitizes target protocol failures at the acceptance stage", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(
        webResponse(request, "{}", {
          headers: { "content-type": "application/json" },
          status: 200,
        })
      )
    );

    await expect(rejectAccept(captured.client)).resolves.toMatchObject({
      _tag: "ProductionError",
      failure: "PublicationTargetProtocolError",
      stage: "accept",
    });
  });
});
