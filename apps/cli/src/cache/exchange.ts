import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "@effect/platform";
import {
  type ContentCacheRequest,
  ContentCacheRequestSchema,
} from "@nakafa/aksara-contracts/cache/content";
import { Effect, type Redacted, Schema } from "effect";
import { ContentCacheError } from "#cli/cache/error";
import { readCacheReceipt } from "#cli/cache/receipt";

const CacheRequestJsonSchema = Schema.parseJson(ContentCacheRequestSchema);

/** Classifies statuses whose idempotent request may safely be retried. */
function isRetryableStatus(status: number) {
  return status === 404 || status === 408 || status === 429 || status >= 500;
}

/** Sends and validates one exact authenticated cache invalidation. */
export const invalidateContentCache = Effect.fn(
  "AksaraCli.invalidateContentCache"
)(
  (
    client: HttpClient.HttpClient,
    endpoint: URL,
    token: Redacted.Redacted<string>,
    input: ContentCacheRequest
  ) =>
    Effect.gen(function* () {
      const body = yield* Schema.encode(CacheRequestJsonSchema)(input).pipe(
        Effect.mapError(() => new ContentCacheError({ retryable: false }))
      );
      const request = HttpClientRequest.post(endpoint).pipe(
        HttpClientRequest.acceptJson,
        HttpClientRequest.bearerToken(token),
        HttpClientRequest.setHeader("cache-control", "no-store"),
        HttpClientRequest.bodyText(body, "application/json")
      );
      const response = yield* client
        .pipe(HttpClient.withScope)
        .execute(request)
        .pipe(
          Effect.provideService(FetchHttpClient.RequestInit, {
            redirect: "manual",
          }),
          Effect.mapError(() => new ContentCacheError({ retryable: true }))
        );
      if (
        response.request.url !== endpoint.toString() ||
        (response.status >= 300 && response.status < 400)
      ) {
        return yield* new ContentCacheError({ retryable: false });
      }
      if (response.status !== 200) {
        return yield* new ContentCacheError({
          retryable: isRetryableStatus(response.status),
        });
      }
      yield* readCacheReceipt(response, input);
    }).pipe(Effect.scoped)
);
