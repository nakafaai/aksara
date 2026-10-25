import { Effect, type Redacted, Schema } from "effect";
import { FetchHttpClient, HttpClient, HttpClientRequest } from "effect/http";
import { ReleaseDispatchError } from "#cli/dispatch/error";

/** The dispatch endpoint of Nakafa's deploy workflow. */
const NAKAFA_DEPLOY_URL = new URL(
  "https://api.github.com/repos/nakafaai/nakafa.com/actions/workflows/deploy.yml/dispatches"
);

/** The body of a production deploy: Nakafa deploys production only from main. */
const DeployBodyJsonSchema = Schema.fromJsonString(
  Schema.Struct({
    inputs: Schema.Struct({ stage: Schema.Literal("prod") }),
    ref: Schema.Literal("main"),
  })
);

/** Classifies statuses whose dispatch may be retried: throttling and server faults. */
function isRetryableStatus(status: number) {
  return status === 429 || status >= 500;
}

/**
 * Runs Nakafa's production deploy with the deploy app's installation token, so
 * the site prerenders the activated release. GitHub answers 204 when it accepts
 * the dispatch, and any other answer is a failure.
 */
export const dispatchNakafaDeploy = Effect.fn("AksaraCli.dispatchNakafaDeploy")(
  (client: HttpClient.HttpClient, token: Redacted.Redacted<string>) =>
    Effect.gen(function* () {
      // The body is a literal of this module's own schema, so its encoding cannot fail.
      const body = yield* Schema.encodeEffect(DeployBodyJsonSchema)({
        inputs: { stage: "prod" },
        ref: "main",
      }).pipe(Effect.orDie);
      const request = HttpClientRequest.post(NAKAFA_DEPLOY_URL).pipe(
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
        response.request.url !== NAKAFA_DEPLOY_URL.toString() ||
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
