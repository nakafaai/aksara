import { assert, describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { ConfigProvider, Effect } from "effect";
import type { HttpClientRequest } from "effect/unstable/http";
import { HttpClient } from "effect/unstable/http";
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

/** Builds acceptance with isolated Config and HTTP capabilities. */
function acceptProgram(client: HttpClient.HttpClient) {
  return runAcceptCommand({ command: "accept", recoveryId, releaseId }).pipe(
    Effect.provideService(
      ConfigProvider.ConfigProvider,
      ConfigProvider.fromUnknown(Object.fromEntries(acceptValues))
    ),
    Effect.provideService(HttpClient.HttpClient, client)
  );
}

describe("accept command", () => {
  it.effect(
    "discards only the exact retained inverse without signing inputs",
    () =>
      Effect.gen(function* () {
        const captured = captureClient((incoming) =>
          Effect.succeed(acceptResponse(incoming))
        );

        expect(yield* acceptProgram(captured.client)).toEqual({
          complete: true,
          processedItems: 3,
          releaseId: recoveryId,
          totalItems: 3,
        });
        expect(captured.requests).toHaveLength(1);
        const [request] = captured.requests;
        assert(request !== undefined, "Expected one acceptance request.");
        expect(request.headers.authorization).toBe("Bearer publication-token");
        expect(requestJson(request)).toEqual({
          operation: "accept",
          recoveryId,
          releaseId,
        });
      })
  );

  it.effect("sanitizes target protocol failures at the acceptance stage", () =>
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
        yield* acceptProgram(captured.client).pipe(Effect.flip)
      ).toMatchObject({
        _tag: "ProductionError",
        failure: "PublicationTargetProtocolError",
        stage: "accept",
      });
    })
  );
});
