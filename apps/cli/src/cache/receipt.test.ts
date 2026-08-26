import { describe, expect, it } from "@effect/vitest";
import {
  type ContentCacheRequest,
  makeArtifactCacheTag,
  makeContentCacheRequest,
} from "@nakafa/aksara-contracts/cache/content";
import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { Effect } from "effect";
import { HttpClientRequest } from "effect/unstable/http";
import { readCacheReceipt } from "#cli/cache/receipt";
import { webResponse } from "#test/http";

const REQUEST: ContentCacheRequest = makeContentCacheRequest({
  artifactHashes: [],
  family: "material",
  releaseId: ReleaseIdSchema.make("test-cache-release"),
});
const VALID_BODY = JSON.stringify({
  family: REQUEST.family,
  releaseId: REQUEST.releaseId,
  revalidated: true,
  tags: REQUEST.tags,
});

/** Creates one cache response with valid private JSON headers by default. */
function cacheResponse(
  body: ConstructorParameters<typeof Response>[0],
  headers: ConstructorParameters<typeof Headers>[0] = {}
) {
  const completeHeaders = new Headers(headers);
  if (!completeHeaders.has("cache-control")) {
    completeHeaders.set("cache-control", "private, no-store");
  }
  if (!completeHeaders.has("content-type")) {
    completeHeaders.set("content-type", "application/json; charset=utf-8");
  }
  return webResponse(
    HttpClientRequest.post(
      "https://www.example.test/api/internal/content/cache"
    ),
    body,
    { headers: completeHeaders }
  );
}

/** Returns one typed receipt failure from a chosen body and header set. */
function rejectReceipt(
  body: ConstructorParameters<typeof Response>[0],
  headers?: ConstructorParameters<typeof Headers>[0]
) {
  const response = cacheResponse(body, headers);
  return readCacheReceipt(response, REQUEST).pipe(Effect.flip);
}

describe("cache receipt", () => {
  it.effect.each([
    [
      VALID_BODY,
      { "cache-control": "no-store", "content-type": "application/json" },
    ],
    [
      VALID_BODY,
      { "cache-control": "private", "content-type": "application/json" },
    ],
    [
      VALID_BODY,
      {
        "cache-control": "private, no-store",
        "content-type": "text/plain",
      },
    ],
    [
      JSON.stringify({
        family: REQUEST.family,
        releaseId: REQUEST.releaseId,
        revalidated: false,
        tags: REQUEST.tags,
      }),
      undefined,
    ],
    [
      JSON.stringify({
        extra: true,
        family: REQUEST.family,
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: REQUEST.tags,
      }),
      undefined,
    ],
    [
      JSON.stringify({
        family: "article",
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: REQUEST.tags,
      }),
      undefined,
    ],
    [
      JSON.stringify({
        family: REQUEST.family,
        releaseId: "test-other-release",
        revalidated: true,
        tags: REQUEST.tags,
      }),
      undefined,
    ],
    [
      JSON.stringify({
        family: REQUEST.family,
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: ["content-runtime"],
      }),
      undefined,
    ],
    [
      JSON.stringify({
        family: REQUEST.family,
        releaseId: REQUEST.releaseId,
        revalidated: true,
        tags: [
          ...REQUEST.tags,
          makeArtifactCacheTag(
            Sha256HashSchema.make(`sha256:${"a".repeat(64)}`)
          ),
        ],
      }),
      undefined,
    ],
    ["{", undefined],
    [Uint8Array.from([0xc3, 0x28]), undefined],
    [null, undefined],
    [VALID_BODY, { "content-length": "invalid" }],
    [VALID_BODY, { "content-length": "-1" }],
    [VALID_BODY, { "content-length": String(32 * 1024 + 1) }],
    ["x".repeat(32 * 1024 + 1), undefined],
  ] as const)("rejects one invalid private JSON receipt", ([body, headers]) =>
    Effect.gen(function* () {
      const error = yield* rejectReceipt(body, headers);
      expect(error).toMatchObject({ retryable: false });
    })
  );

  it.effect("treats a response stream failure as retryable", () =>
    Effect.gen(function* () {
      const stream = new ReadableStream({
        /** Injects one transport failure while reading the receipt body. */
        pull(controller) {
          controller.error("Test receipt stream failure.");
        },
      });

      const error = yield* rejectReceipt(stream);
      expect(error).toMatchObject({ retryable: true });
    })
  );
});
