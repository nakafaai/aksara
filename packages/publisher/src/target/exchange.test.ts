import { describe, expect, it } from "@effect/vitest";
import { CurrentContentProjectionSchema } from "@nakafa/aksara-contracts/projection/spec";
import type { StageGroupRequest } from "@nakafa/aksara-contracts/transport/group";
import { MAX_PROJECTION_BATCH_BYTES } from "@nakafa/aksara-contracts/transport/limits";
import type { PublicationCurrentRequest } from "@nakafa/aksara-contracts/transport/request";
import { Duration, Effect, Redacted, Schema } from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http";
import type { ValidatedHttpConfig } from "#publisher/target/config";
import { sendPublicationRequest } from "#publisher/target/exchange";
import { transportRequests } from "#test/transport/spec";
import { transportSuccess } from "#test/transport/success";

const endpoint = new URL("https://publish.test.invalid/content");
const request: PublicationCurrentRequest = { operation: "current" };
const config: ValidatedHttpConfig = {
  endpoint,
  timeout: Duration.seconds(1),
  token: Redacted.make("test-secret-token"),
};

/** Runs one direct HTTP exchange and returns its typed failure. */
const rejectedExchange = Effect.fn("PublicationExchangeTest.reject")(
  (client: HttpClient.HttpClient) =>
    sendPublicationRequest(client, config, request).pipe(Effect.flip)
);

describe("sendPublicationRequest", () => {
  it.effect("disables native redirect following at the fetch adapter", () =>
    Effect.gen(function* () {
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

      const result = yield* Effect.gen(function* () {
        const client = yield* HttpClient.HttpClient;
        return yield* sendPublicationRequest(client, config, request);
      }).pipe(
        Effect.provide(FetchHttpClient.layer),
        Effect.provideService(FetchHttpClient.Fetch, fetch)
      );
      expect(result).toMatchObject({ ok: true, operation: "current" });
      expect(redirect).toBe("manual");
    })
  );

  it.effect("rejects redirect status before reading a response body", () =>
    Effect.gen(function* () {
      const client = HttpClient.make((outgoing) =>
        Effect.succeed(
          HttpClientResponse.fromWeb(
            outgoing,
            new Response(null, { status: 307 })
          )
        )
      );

      expect(yield* rejectedExchange(client)).toMatchObject({
        _tag: "PublicationTargetProtocolError",
        reason: "response-evidence",
        stage: "current",
      });
    })
  );

  it.effect("rejects success evidence bound to another destination", () =>
    Effect.gen(function* () {
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

      expect(yield* rejectedExchange(client)).toMatchObject({
        _tag: "PublicationTargetProtocolError",
        reason: "response-evidence",
        stage: "current",
      });
    })
  );

  it.effect("rejects an oversized grouped child before network IO", () =>
    Effect.gen(function* () {
      const groupRequest = yield* Effect.fromNullishOr(
        transportRequests.find((value) => value.operation === "stageGroup")
      );
      const projectionRequest = yield* Effect.fromNullishOr(
        groupRequest.requests.find(
          (value) => value.operation === "stageProjectionBatch"
        )
      );
      const projection = yield* Effect.fromNullishOr(
        projectionRequest.projections[0]
      );
      const oversizedProjection = yield* Schema.decodeUnknownEffect(
        CurrentContentProjectionSchema
      )({
        ...projection,
        metadata: {
          ...projection.metadata,
          title: "x".repeat(MAX_PROJECTION_BATCH_BYTES),
        },
      });
      const oversized: StageGroupRequest = {
        operation: "stageGroup",
        releaseId: groupRequest.releaseId,
        requests: [
          {
            ...projectionRequest,
            projections: [oversizedProjection],
          },
        ],
      };
      let requestCount = 0;
      const client = HttpClient.make(() =>
        Effect.sync(() => {
          requestCount += 1;
        }).pipe(
          Effect.andThen(
            Effect.die("Oversized groups must not reach network IO.")
          )
        )
      );

      expect(
        yield* sendPublicationRequest(client, config, oversized).pipe(
          Effect.flip
        )
      ).toMatchObject({
        _tag: "PublicationTargetRejectedError",
        rejection: { code: "CONTENT_RELEASE_SIZE" },
      });
      expect(requestCount).toBe(0);
    })
  );
});
