import { Effect, Option, type Redacted, Schema, String as Str } from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  type HttpClientResponse,
} from "effect/http";
import { ReleaseDispatchError } from "#cli/dispatch/error";

/** The dispatch endpoint of Nakafa's deploy workflow. */
const NAKAFA_DEPLOY_URL = new URL(
  "https://api.github.com/repos/nakafaai/nakafa.com/actions/workflows/deploy.yml/dispatches"
);

/**
 * The name the dispatch gives GitHub. GitHub refuses an API request without a
 * User-Agent with 403, and the CLI's Node HTTP client sends none of its own.
 */
const USER_AGENT = "nakafa-aksara";

/** The body of a production deploy: Nakafa deploys production only from main. */
const DeployBodyJsonSchema = Schema.fromJsonString(
  Schema.Struct({
    inputs: Schema.Struct({ stage: Schema.Literal("prod") }),
    ref: Schema.Literal("main"),
  })
);

/** GitHub's JSON answer to a refused request, whose message says why. */
const decodeGitHubRefusal = Schema.decodeUnknownOption(
  Schema.fromJsonString(Schema.Struct({ message: Schema.String }))
);

/** Classifies statuses whose dispatch may be retried: throttling and server faults. */
function isRetryableStatus(status: number) {
  return status === 429 || status >= 500;
}

/**
 * Reads why GitHub refused a dispatch: the message of its JSON answer, or the
 * plain text it sent. An empty or unreadable body has no detail.
 */
const readRefusal = (response: HttpClientResponse.HttpClientResponse) =>
  response.text.pipe(
    Effect.option,
    Effect.map((text) =>
      Option.getOrNull(
        Option.map(Option.filter(text, Str.isNonEmpty), (body) =>
          Option.match(decodeGitHubRefusal(body), {
            onNone: () => body,
            onSome: ({ message }) => message,
          })
        )
      )
    )
  );

/**
 * Runs Nakafa's production deploy with the deploy app's installation token, so
 * the site prerenders the activated release. GitHub answers 204 when it accepts
 * the dispatch, and any other answer is a failure that keeps GitHub's status and
 * reason.
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
        HttpClientRequest.setHeader("user-agent", USER_AGENT),
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
          Effect.mapError(
            () =>
              new ReleaseDispatchError({
                detail: null,
                retryable: true,
                status: null,
              })
          )
        );
      if (
        response.request.url !== NAKAFA_DEPLOY_URL.toString() ||
        (response.status >= 300 && response.status < 400)
      ) {
        return yield* new ReleaseDispatchError({
          detail: null,
          retryable: false,
          status: response.status,
        });
      }
      if (response.status !== 204) {
        return yield* new ReleaseDispatchError({
          detail: yield* readRefusal(response),
          retryable: isRetryableStatus(response.status),
          status: response.status,
        });
      }
    }).pipe(Effect.scoped)
);
