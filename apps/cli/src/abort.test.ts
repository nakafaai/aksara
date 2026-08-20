import { ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import { describe, expect, it } from "@nakafa/testing/effect";
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

/** Runs abort through isolated Config and HTTP capabilities. */
function runAbort(client: HttpClient.HttpClient) {
  return Effect.runPromise(
    runAbortCommand({ command: "abort", releaseId }).pipe(
      Effect.provideService(
        ConfigProvider.ConfigProvider,
        ConfigProvider.fromUnknown(Object.fromEntries(abortValues))
      ),
      Effect.provideService(HttpClient.HttpClient, client)
    )
  );
}

/** Returns the typed failure from isolated abort capabilities. */
function rejectAbort(client: HttpClient.HttpClient) {
  return Effect.runPromise(
    runAbortCommand({ command: "abort", releaseId }).pipe(
      Effect.provideService(
        ConfigProvider.ConfigProvider,
        ConfigProvider.fromUnknown(Object.fromEntries(abortValues))
      ),
      Effect.provideService(HttpClient.HttpClient, client),
      Effect.flip
    )
  );
}

describe("abort command", () => {
  it("uses only target credentials and returns cumulative evidence", async () => {
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

    await expect(runAbort(captured.client)).resolves.toEqual({
      complete: true,
      processedItems: 3,
      releaseId,
      totalItems: 3,
    });
    expect(captured.requests).toHaveLength(1);
    const [request] = captured.requests;
    if (!request) {
      throw new Error("Expected one abort request.");
    }
    expect(request.headers.authorization).toBe("Bearer publication-token");
    expect(requestJson(request)).toEqual({
      operation: "abort",
      releaseId,
    });
  });

  it("drains more than one hundred target pages in one command", async () => {
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

    await expect(runAbort(captured.client)).resolves.toEqual({
      complete: true,
      processedItems: totalItems,
      releaseId,
      totalItems,
    });
    expect(captured.requests).toHaveLength(totalItems);
  });

  it("sanitizes target protocol failures at the abort stage", async () => {
    const captured = captureClient((request) =>
      Effect.succeed(
        webResponse(request, "{}", {
          headers: { "content-type": "application/json" },
          status: 200,
        })
      )
    );

    await expect(rejectAbort(captured.client)).resolves.toMatchObject({
      _tag: "ProductionError",
      failure: "PublicationTargetProtocolError",
      stage: "abort",
    });
  });
});
