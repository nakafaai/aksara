import { assert, describe, expect, it } from "@effect/vitest";
import { Effect, Redacted } from "effect";
import { HttpClientError } from "effect/http";
import { dispatchNakafaDeploy } from "#cli/dispatch/exchange";
import { encodeJsonText } from "#cli/text/json";
import { captureClient, requestJson, webResponse } from "#test/http";

const TOKEN = Redacted.make("dispatch-token");

/** Dispatches one deploy through a client that answers every request with the given status. */
function dispatchWithStatus(status: number) {
  const captured = captureClient((request) =>
    Effect.succeed(webResponse(request, null, { status }))
  );
  return {
    captured,
    dispatch: dispatchNakafaDeploy(captured.client, TOKEN),
  };
}

/** Returns the typed failure of one dispatch that the status answered. */
const failureFor = (status: number) =>
  Effect.flip(dispatchWithStatus(status).dispatch);

describe("release dispatch exchange", () => {
  it.effect(
    "runs the production deploy from main with the bearer token and GitHub's headers",
    () =>
      Effect.gen(function* () {
        const { captured, dispatch } = dispatchWithStatus(204);
        expect(yield* dispatch).toBeUndefined();

        const [request] = captured.requests;
        assert(request !== undefined, "The dispatch sent no request.");
        expect(request.method).toBe("POST");
        expect(request.url).toBe(
          "https://api.github.com/repos/nakafaai/nakafa.com/actions/workflows/deploy.yml/dispatches"
        );
        expect(request.headers).toMatchObject({
          accept: "application/vnd.github+json",
          authorization: "Bearer dispatch-token",
          "user-agent": "nakafa-aksara",
          "x-github-api-version": "2022-11-28",
        });
        expect(requestJson(request)).toEqual({
          inputs: { stage: "prod" },
          ref: "main",
        });
      })
  );

  it.effect("retries throttling and server faults only", () =>
    Effect.gen(function* () {
      expect(yield* failureFor(429)).toMatchObject({
        retryable: true,
        status: 429,
      });
      expect(yield* failureFor(503)).toMatchObject({
        retryable: true,
        status: 503,
      });
      expect(yield* failureFor(404)).toMatchObject({
        retryable: false,
        status: 404,
      });
      expect(yield* failureFor(422)).toMatchObject({
        retryable: false,
        status: 422,
      });
      expect(yield* failureFor(200)).toMatchObject({
        detail: null,
        retryable: false,
        status: 200,
      });
    })
  );

  it.effect(
    "keeps GitHub's reason for a refusal, from its JSON message or its plain text",
    () =>
      Effect.gen(function* () {
        const refusal = (status: number, body: string) =>
          Effect.flip(
            dispatchNakafaDeploy(
              captureClient((request) =>
                Effect.succeed(webResponse(request, body, { status }))
              ).client,
              TOKEN
            )
          );
        expect(
          yield* refusal(
            403,
            encodeJsonText({
              documentation_url: "https://docs.github.com/rest",
              message: "Resource not accessible by integration",
            })
          )
        ).toMatchObject({
          detail: "Resource not accessible by integration",
          retryable: false,
          status: 403,
        });
        expect(
          yield* refusal(
            403,
            "Request forbidden by administrative rules. Please make sure your request has a User-Agent header"
          )
        ).toMatchObject({
          detail:
            "Request forbidden by administrative rules. Please make sure your request has a User-Agent header",
          status: 403,
        });
      })
  );

  it.effect("treats a redirect as a non-retryable failure", () =>
    Effect.gen(function* () {
      const captured = captureClient((request) =>
        Effect.succeed(
          webResponse(request, null, {
            headers: { location: "https://example.test" },
            status: 302,
          })
        )
      );
      expect(
        yield* Effect.flip(dispatchNakafaDeploy(captured.client, TOKEN))
      ).toMatchObject({ detail: null, retryable: false, status: 302 });
    })
  );

  it.effect("marks a transport failure retryable", () =>
    Effect.gen(function* () {
      const captured = captureClient((request) =>
        Effect.fail(
          new HttpClientError.HttpClientError({
            reason: new HttpClientError.TransportError({ request }),
          })
        )
      );
      expect(
        yield* Effect.flip(dispatchNakafaDeploy(captured.client, TOKEN))
      ).toMatchObject({ detail: null, retryable: true, status: null });
    })
  );
});
