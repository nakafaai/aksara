import type { PreviewRendererNonceSchema } from "@nakafa/aksara-contracts/preview/auth";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  hasDirectives,
  isJsonType,
  readText,
} from "@nakafa/aksara-utilities/http/response";
import { Effect, type Redacted, Schema } from "effect";
import { FetchHttpClient, HttpClient, HttpClientRequest } from "effect/http";
import { makeNakafaAppError } from "#cli/error";
import { decodeJsonText } from "#cli/text/json";

const MAXIMUM_RENDERER_BYTES = 256 * 1024;
const PREVIEW_NONCE_HEADER = "x-aksara-preview-nonce";

/** Reads one bounded renderer JSON response with redirects disabled. */
export const fetchRendererBody = Effect.fn("AksaraCli.fetchRendererBody")(
  (
    url: URL,
    /** Authentication values attached to one renderer HTTP request. */
    input: {
      readonly nonce?: typeof PreviewRendererNonceSchema.Type;
      readonly token: Redacted.Redacted<string>;
    }
  ) =>
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      let request = HttpClientRequest.get(url).pipe(
        HttpClientRequest.acceptJson,
        HttpClientRequest.bearerToken(input.token),
        HttpClientRequest.setHeader("cache-control", "no-store")
      );
      if (input.nonce) {
        request = HttpClientRequest.setHeader(
          request,
          PREVIEW_NONCE_HEADER,
          input.nonce
        );
      }
      const response = yield* client
        .pipe(HttpClient.withScope)
        .execute(request)
        .pipe(
          Effect.provideService(FetchHttpClient.RequestInit, {
            redirect: "manual",
          }),
          Effect.mapError(() => makeNakafaAppError("network", true))
        );
      if (
        response.request.url !== url.toString() ||
        (response.status >= 300 && response.status < 400)
      ) {
        return yield* makeNakafaAppError("redirect", false);
      }
      if (response.status !== 200) {
        const retryable =
          response.status === 404 ||
          response.status === 408 ||
          response.status === 429 ||
          response.status >= 500;
        return yield* makeNakafaAppError("status", retryable, response.status);
      }
      if (!hasDirectives(response.headers["cache-control"], ["no-store"])) {
        return yield* makeNakafaAppError("cache", false);
      }
      if (!isJsonType(response.headers["content-type"])) {
        return yield* makeNakafaAppError("json", false);
      }
      const source = yield* readText(response, MAXIMUM_RENDERER_BYTES).pipe(
        Effect.mapError((error) => {
          if (error.reason === "empty" || error.reason === "encoding") {
            return makeNakafaAppError("json", false);
          }
          return makeNakafaAppError("body", error.reason === "stream");
        })
      );
      return yield* Schema.decodeEffect(decodeJsonText)(source).pipe(
        Effect.mapError(() => makeNakafaAppError("json", false))
      );
    }).pipe(Effect.scoped)
);

/** Fetches and validates one production renderer manifest response. */
export const fetchRendererEndpoint = Effect.fn(
  "AksaraCli.fetchRendererEndpoint"
)((url: URL, token: Redacted.Redacted<string>) =>
  fetchRendererBody(url, { token }).pipe(
    Effect.flatMap((body) =>
      validateRendererManifestHash(body).pipe(
        Effect.mapError(() => makeNakafaAppError("contract", false))
      )
    )
  )
);
