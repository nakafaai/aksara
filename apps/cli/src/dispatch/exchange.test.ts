import { assert, describe, expect, it } from "@effect/vitest";
import { Effect, Redacted } from "effect";
import { HttpClientError } from "effect/http";
import {
  dispatchReleaseEvent,
  RELEASE_DISPATCH_EVENT,
} from "#cli/dispatch/exchange";
import { captureClient, requestJson, webResponse } from "#test/http";

const TOKEN = Redacted.make("dispatch-token");
const RELEASE_ID = "release-2026-10-25";

/** Dispatches one release through a client that answers every request with the given status. */
function dispatchWithStatus(status: number) {
  const captured = captureClient((request) =>
    Effect.succeed(webResponse(request, null, { status }))
  );
  return {
    captured,
    dispatch: dispatchReleaseEvent(captured.client, TOKEN, RELEASE_ID),
  };
}

/** Returns the typed failure of one dispatch that the status answered. */
const failureFor = (status: number) =>
  Effect.flip(dispatchWithStatus(status).dispatch);

describe("release dispatch exchange", () => {
  it.effect(
    "posts the release event with the bearer token and GitHub's headers",
    () =>
      Effect.gen(function* () {
        const { captured, dispatch } = dispatchWithStatus(204);
        expect(yield* dispatch).toBeUndefined();

        const [request] = captured.requests;
        assert(request !== undefined, "The dispatch sent no request.");
        expect(request.method).toBe("POST");
        expect(request.url).toBe(
          "https://api.github.com/repos/nakafaai/nakafa.com/dispatches"
        );
        expect(request.headers).toMatchObject({
          accept: "application/vnd.github+json",
          authorization: "Bearer dispatch-token",
          "x-github-api-version": "2022-11-28",
        });
        expect(requestJson(request)).toEqual({
          client_payload: { releaseId: RELEASE_ID },
          event_type: RELEASE_DISPATCH_EVENT,
        });
      })
  );

  it.effect("retries throttling and server faults only", () =>
    Effect.gen(function* () {
      expect(yield* failureFor(429)).toMatchObject({ retryable: true });
      expect(yield* failureFor(503)).toMatchObject({ retryable: true });
      expect(yield* failureFor(404)).toMatchObject({ retryable: false });
      expect(yield* failureFor(422)).toMatchObject({ retryable: false });
      expect(yield* failureFor(200)).toMatchObject({ retryable: false });
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
        yield* Effect.flip(
          dispatchReleaseEvent(captured.client, TOKEN, RELEASE_ID)
        )
      ).toMatchObject({ retryable: false });
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
        yield* Effect.flip(
          dispatchReleaseEvent(captured.client, TOKEN, RELEASE_ID)
        )
      ).toMatchObject({ retryable: true });
    })
  );
});
