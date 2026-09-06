import {
  ContentCacheReceiptSchema,
  type ContentCacheRequest,
} from "@nakafa/aksara-contracts/cache/content";
import {
  hasDirectives,
  isJsonType,
  readText,
} from "@nakafa/aksara-utilities/http/response";
import { Effect, Schema } from "effect";
import type { HttpClientResponse } from "effect/unstable/http";
import { ContentCacheError } from "#cli/cache/error";

const MAX_CACHE_RECEIPT_BYTES = 32 * 1024;
const CacheReceiptJsonSchema = Schema.fromJsonString(ContentCacheReceiptSchema);

/** Reads and strictly validates one bounded private JSON receipt. */
export const readCacheReceipt = Effect.fn("AksaraCli.readCacheReceipt")(
  function* (
    response: HttpClientResponse.HttpClientResponse,
    request: ContentCacheRequest
  ) {
    if (
      !(
        hasDirectives(response.headers["cache-control"], [
          "private",
          "no-store",
        ]) && isJsonType(response.headers["content-type"])
      )
    ) {
      return yield* new ContentCacheError({ retryable: false });
    }
    const body = yield* readText(response, MAX_CACHE_RECEIPT_BYTES).pipe(
      Effect.mapError(
        (error) =>
          new ContentCacheError({ retryable: error.reason === "stream" })
      )
    );
    const receipt = yield* Schema.decodeEffect(CacheReceiptJsonSchema, {
      onExcessProperty: "error",
    })(body).pipe(
      Effect.mapError(() => new ContentCacheError({ retryable: false }))
    );
    if (
      receipt.scope !== request.scope ||
      receipt.releaseId !== request.releaseId
    ) {
      return yield* new ContentCacheError({ retryable: false });
    }
  }
);
