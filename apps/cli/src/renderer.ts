import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
} from "@effect/platform";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import {
  hasDirectives,
  isJsonType,
  readText,
} from "@nakafa/aksara-utilities/http/response";
import { Effect, type Redacted, Schedule } from "effect";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";

const LOOPBACK_HOST = "localhost";
const RENDERER_PATH = "/api/internal/content/renderer";
const MAXIMUM_RENDERER_BYTES = 256 * 1024;

/** Actual authenticated renderer capability consumed by the Nakafa service. */
export type FetchRenderer = (
  origin: URL,
  token: Redacted.Redacted<string>
) => Effect.Effect<
  RendererManifestEnvelope,
  NakafaAppError,
  HttpClient.HttpClient
>;

/** Proves renderer discovery cannot leave the spawned localhost origin. */
function isNakafaOrigin(origin: URL) {
  return (
    origin.protocol === "http:" &&
    origin.hostname === LOOPBACK_HOST &&
    origin.port.length > 0 &&
    origin.pathname === "/" &&
    origin.search === "" &&
    origin.hash === "" &&
    origin.username === "" &&
    origin.password === ""
  );
}

/** Fetches and validates one exact authenticated renderer endpoint response. */
export const fetchRendererEndpoint = Effect.fn(
  "AksaraCli.fetchRendererEndpoint"
)((url: URL, token: Redacted.Redacted<string>) =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const request = HttpClientRequest.get(url).pipe(
      HttpClientRequest.acceptJson,
      HttpClientRequest.bearerToken(token),
      HttpClientRequest.setHeader("cache-control", "no-store")
    );
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
    const body = yield* Effect.try({
      catch: () => makeNakafaAppError("json", false),
      try: () => JSON.parse(source),
    });
    return yield* validateRendererManifestHash(body).pipe(
      Effect.mapError(() => makeNakafaAppError("contract", false))
    );
  }).pipe(Effect.scoped)
);

/** Reads one renderer manifest only from the spawned localhost Nakafa app. */
export const fetchRendererManifest: FetchRenderer = Effect.fn(
  "AksaraCli.fetchRendererManifest"
)((origin, token) => {
  if (!isNakafaOrigin(origin)) {
    return Effect.fail(makeNakafaAppError("origin", false));
  }
  return fetchRendererEndpoint(new URL(RENDERER_PATH, origin), token);
});

/** Retries only startup-transient renderer failures within one bounded minute. */
export const waitForRenderer: FetchRenderer = Effect.fn(
  "AksaraCli.waitForRenderer"
)((origin, token) =>
  fetchRendererManifest(origin, token).pipe(
    Effect.retry({
      schedule: Schedule.spaced("100 millis"),
      while: (error) => error.retryable,
    }),
    Effect.timeoutFail({
      duration: "60 seconds",
      onTimeout: () => makeNakafaAppError("timeout", false),
    })
  )
);
