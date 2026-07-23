import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "@effect/platform";
import type { PublicationCurrentRequest } from "@nakafa/aksara-contracts/transport/request";
import { Duration, Effect, Redacted } from "effect";
import { describe, expect, it } from "vitest";
import type { ValidatedHttpConfig } from "#publisher/target/config";
import { sendPublicationRequest } from "#publisher/target/exchange";
import { transportSuccess } from "#test/transport-success";

const endpoint = new URL("https://publish.test.invalid/content");
const request: PublicationCurrentRequest = { operation: "current" };
const config: ValidatedHttpConfig = {
  endpoint,
  timeout: Duration.seconds(1),
  token: Redacted.make("test-secret-token"),
};

/** Runs one direct HTTP exchange and returns its typed failure. */
function rejectedExchange(client: HttpClient.HttpClient) {
  return Effect.runPromise(
    sendPublicationRequest(client, config, request).pipe(Effect.flip)
  );
}

describe("sendPublicationRequest", () => {
  it("disables native redirect following at the fetch adapter", async () => {
    let redirect: RequestInit["redirect"];
    /** Captures the Fetch redirect policy before returning exact evidence. */
    const fetch: typeof globalThis.fetch = (_input, init) => {
      redirect = init?.redirect;
      return Promise.resolve(
        new Response(JSON.stringify(transportSuccess(request)), {
          headers: { "content-type": "application/json" },
          status: 200,
        })
      );
    };

    await expect(
      Effect.runPromise(
        Effect.gen(function* () {
          const client = yield* HttpClient.HttpClient;
          return yield* sendPublicationRequest(client, config, request);
        }).pipe(
          Effect.provide(FetchHttpClient.layer),
          Effect.provideService(FetchHttpClient.Fetch, fetch)
        )
      )
    ).resolves.toMatchObject({ ok: true, operation: "current" });
    expect(redirect).toBe("manual");
  });

  it("rejects redirect status before reading a response body", async () => {
    const client = HttpClient.make((outgoing) =>
      Effect.succeed(
        HttpClientResponse.fromWeb(
          outgoing,
          new Response(null, { status: 307 })
        )
      )
    );

    await expect(rejectedExchange(client)).resolves.toMatchObject({
      _tag: "PublicationTargetProtocolError",
      reason: "response-evidence",
      stage: "current",
    });
  });

  it("rejects success evidence bound to another destination", async () => {
    const client = HttpClient.make(() => {
      const redirectedRequest = HttpClientRequest.post(
        "https://redirect.test.invalid/content"
      );
      return Effect.succeed(
        HttpClientResponse.fromWeb(
          redirectedRequest,
          new Response(JSON.stringify(transportSuccess(request)), {
            headers: { "content-type": "application/json" },
            status: 200,
          })
        )
      );
    });

    await expect(rejectedExchange(client)).resolves.toMatchObject({
      _tag: "PublicationTargetProtocolError",
      reason: "response-evidence",
      stage: "current",
    });
  });
});
