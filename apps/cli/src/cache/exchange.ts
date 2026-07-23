import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  type HttpClientResponse,
} from "@effect/platform";
import {
  MaterialCacheReceiptSchema,
  type MaterialCacheRequest,
  MaterialCacheRequestSchema,
} from "@nakafa/aksara-contracts/cache/material";
import {
  hasDirectives,
  isJsonType,
  readText,
} from "@nakafa/aksara-utilities/http/response";
import { Effect, type Redacted, Schema } from "effect";

const MAX_CACHE_RECEIPT_BYTES = 32 * 1024;

const CacheRequestJsonSchema = Schema.parseJson(MaterialCacheRequestSchema);
const CacheReceiptJsonSchema = Schema.parseJson(MaterialCacheReceiptSchema);

/** One sanitized post-commit cache request failure. */
export class MaterialCacheError extends Schema.TaggedError<MaterialCacheError>()(
  "MaterialCacheError",
  { retryable: Schema.Boolean }
) {}

/** Reads and strictly validates one bounded private JSON receipt. */
const readCacheReceipt = Effect.fn("AksaraCli.readCacheReceipt")(function* (
  response: HttpClientResponse.HttpClientResponse,
  request: MaterialCacheRequest
) {
  if (
    !(
      hasDirectives(response.headers["cache-control"], [
        "private",
        "no-store",
      ]) && isJsonType(response.headers["content-type"])
    )
  ) {
    return yield* new MaterialCacheError({ retryable: false });
  }
  const body = yield* readText(response, MAX_CACHE_RECEIPT_BYTES).pipe(
    Effect.mapError(
      (error) =>
        new MaterialCacheError({ retryable: error.reason === "stream" })
    )
  );
  const receipt = yield* Schema.decode(CacheReceiptJsonSchema, {
    onExcessProperty: "error",
  })(body).pipe(
    Effect.mapError(() => new MaterialCacheError({ retryable: false }))
  );
  if (receipt.releaseId !== request.releaseId) {
    return yield* new MaterialCacheError({ retryable: false });
  }
});

/** Classifies statuses whose idempotent request may safely be retried. */
function isRetryableStatus(status: number) {
  return status === 404 || status === 408 || status === 429 || status >= 500;
}

/** Sends and validates one exact authenticated cache invalidation. */
export const invalidateMaterialCache = Effect.fn(
  "AksaraCli.invalidateMaterialCache"
)(
  (
    client: HttpClient.HttpClient,
    endpoint: URL,
    token: Redacted.Redacted<string>,
    input: MaterialCacheRequest
  ) =>
    Effect.gen(function* () {
      const body = yield* Schema.encode(CacheRequestJsonSchema)(input).pipe(
        Effect.mapError(() => new MaterialCacheError({ retryable: false }))
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
          Effect.mapError(() => new MaterialCacheError({ retryable: true }))
        );
      if (
        response.request.url !== endpoint.toString() ||
        (response.status >= 300 && response.status < 400)
      ) {
        return yield* new MaterialCacheError({ retryable: false });
      }
      if (response.status !== 200) {
        return yield* new MaterialCacheError({
          retryable: isRetryableStatus(response.status),
        });
      }
      yield* readCacheReceipt(response, input);
    }).pipe(Effect.scoped)
);
