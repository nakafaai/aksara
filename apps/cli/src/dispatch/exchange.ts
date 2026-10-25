import { Effect, type Redacted, Schema } from "effect";
import { FetchHttpClient, HttpClient, HttpClientRequest } from "effect/http";
import { ReleaseDispatchError } from "#cli/dispatch/error";

/** The one dispatch endpoint of the repository that deploys Nakafa. */
const NAKAFA_DISPATCH_URL = new URL(
  "https://api.github.com/repos/nakafaai/nakafa.com/dispatches"
);

/** The event type that Nakafa's deploy workflow listens for. */
export const RELEASE_DISPATCH_EVENT = "aksara-release";

/** The body that GitHub's repository dispatch endpoint accepts, with the release it announces. */
const DispatchBodyJsonSchema = Schema.fromJsonString(
  Schema.Struct({
    client_payload: Schema.Struct({ releaseId: Schema.String }),
    event_type: Schema.Literal(RELEASE_DISPATCH_EVENT),
  })
);

/** Classifies statuses whose dispatch may be retried: throttling and server faults. */
function isRetryableStatus(status: number) {
  return status === 429 || status >= 500;
}

/**
 * Sends one release dispatch to Nakafa's deploy workflow with a fine-grained token.
 * GitHub answers 204 when it accepts the event, and any other answer is a failure.
 */
export const dispatchReleaseEvent = Effect.fn("AksaraCli.dispatchReleaseEvent")(
  (
    client: HttpClient.HttpClient,
    token: Redacted.Redacted<string>,
    releaseId: string
  ) =>
    Effect.gen(function* () {
      // The body is a literal of this module's own schema, so its encoding cannot fail.
      const body = yield* Schema.encodeEffect(DispatchBodyJsonSchema)({
        client_payload: { releaseId },
        event_type: RELEASE_DISPATCH_EVENT,
      }).pipe(Effect.orDie);
      const request = HttpClientRequest.post(NAKAFA_DISPATCH_URL).pipe(
        HttpClientRequest.bearerToken(token),
        HttpClientRequest.setHeader("accept", "application/vnd.github+json"),
        HttpClientRequest.setHeader("x-github-api-version", "2022-11-28"),
        HttpClientRequest.bodyText(body, "application/json")
      );
      const response = yield* client
        .pipe(HttpClient.withScope)
        .execute(request)
        .pipe(
          Effect.provideService(FetchHttpClient.RequestInit, {
            redirect: "manual",
          }),
          Effect.mapError(() => new ReleaseDispatchError({ retryable: true }))
        );
      if (
        response.request.url !== NAKAFA_DISPATCH_URL.toString() ||
        (response.status >= 300 && response.status < 400)
      ) {
        return yield* new ReleaseDispatchError({ retryable: false });
      }
      if (response.status !== 204) {
        return yield* new ReleaseDispatchError({
          retryable: isRetryableStatus(response.status),
        });
      }
    }).pipe(Effect.scoped)
);
