import type { HttpClientResponse } from "@effect/platform";
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
import { ContentCacheError } from "#cli/cache/error";

const MAX_CACHE_RECEIPT_BYTES = 32 * 1024;
const CacheReceiptJsonSchema = Schema.parseJson(ContentCacheReceiptSchema);

/** Checks that Nakafa acknowledged the exact ordered tags sent by Aksara. */
function hasExactTags(
  received: readonly string[],
  expected: readonly string[]
) {
  return (
    received.length === expected.length &&
    received.every((tag, index) => tag === expected[index])
  );
}

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
    const receipt = yield* Schema.decode(CacheReceiptJsonSchema, {
      onExcessProperty: "error",
    })(body).pipe(
      Effect.mapError(() => new ContentCacheError({ retryable: false }))
    );
    if (
      receipt.family !== request.family ||
      receipt.releaseId !== request.releaseId ||
      !hasExactTags(receipt.tags, request.tags)
    ) {
      return yield* new ContentCacheError({ retryable: false });
    }
  }
);
