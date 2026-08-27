import { assert, describe, expect, it } from "@effect/vitest";
import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { ConfigProvider, Effect } from "effect";
import type { HttpClientRequest } from "effect/unstable/http";
import { HttpClient } from "effect/unstable/http";
import { runAbortCommand } from "#cli/abort";
import { captureClient, requestJson, webResponse } from "#test/http";

const releaseId = ReleaseIdSchema.make("release-abort");
const abortValues = new Map([
  ["AKSARA_PUBLICATION_ENDPOINT", "https://content.example.test/api/publish"],
  ["AKSARA_PUBLICATION_TOKEN", "publication-token"],
]);

/** Returns one strict abort response for the captured target request. */
function abortResponse(
  request: HttpClientRequest.HttpClientRequest,
  value: {
    readonly complete: boolean;
    readonly processedItems: number;
    readonly releaseId: string;
    readonly totalItems: number;
  }
) {
  return webResponse(
    request,
    JSON.stringify({ ok: true, operation: "abort", value }),
    { headers: { "content-type": "application/json" }, status: 200 }
  );
}

/** Builds abort with isolated Config and HTTP capabilities. */
function abortProgram(client: HttpClient.HttpClient) {
  return runAbortCommand({ command: "abort", releaseId }).pipe(
    Effect.provideService(
      ConfigProvider.ConfigProvider,
      ConfigProvider.fromUnknown(Object.fromEntries(abortValues))
    ),
    Effect.provideService(HttpClient.HttpClient, client)
  );
}

describe("abort command", () => {
  it.effect(
    "uses only target credentials and returns cumulative evidence",
    () =>
      Effect.gen(function* () {
        const captured = captureClient((incoming) =>
          Effect.succeed(
            abortResponse(incoming, {
              complete: true,
              processedItems: 3,
              releaseId,
              totalItems: 3,
            })
          )
        );

        expect(yield* abortProgram(captured.client)).toEqual({
          complete: true,
          processedItems: 3,
          releaseId,
          totalItems: 3,
        });
        expect(captured.requests).toHaveLength(1);
        const [request] = captured.requests;
        assert(request !== undefined, "Expected one abort request.");
        expect(request.headers.authorization).toBe("Bearer publication-token");
        expect(requestJson(request)).toEqual({
          operation: "abort",
          releaseId,
        });
      })
  );

  it.effect("drains more than one hundred target pages in one command", () =>
    Effect.gen(function* () {
      let processedItems = 0;
      const totalItems = 101;
      const captured = captureClient((request) =>
        Effect.sync(() => {
          processedItems += 1;
          return abortResponse(request, {
            complete: processedItems === totalItems,
            processedItems,
            releaseId,
            totalItems,
          });
        })
      );

      expect(yield* abortProgram(captured.client)).toEqual({
        complete: true,
        processedItems: totalItems,
        releaseId,
        totalItems,
      });
      expect(captured.requests).toHaveLength(totalItems);
    })
  );

  it.effect("sanitizes target protocol failures at the abort stage", () =>
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
        yield* abortProgram(captured.client).pipe(Effect.flip)
      ).toMatchObject({
        _tag: "ProductionError",
        failure: "PublicationTargetProtocolError",
        stage: "abort",
      });
    })
  );
});
