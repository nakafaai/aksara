import {
  HttpClient,
  HttpClientRequest,
  type HttpClientResponse,
} from "@effect/platform";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, type Redacted, Schedule, Stream } from "effect";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";

const LOOPBACK_HOST = "localhost";
const RENDERER_PATH = "/api/internal/content/renderer";
const MAXIMUM_RENDERER_BYTES = 256 * 1024;

interface RendererBodyState {
  readonly chunks: readonly Uint8Array[];
  readonly size: number;
}

const EMPTY_RENDERER_BODY: RendererBodyState = { chunks: [], size: 0 };

/** Actual authenticated renderer capability consumed by the Nakafa service. */
export type FetchRenderer = (
  origin: URL,
  token: Redacted.Redacted<string>
) => Effect.Effect<
  RendererManifestEnvelope,
  NakafaAppError,
  HttpClient.HttpClient
>;

/** Requires an exact no-store response directive, ignoring case and spacing. */
function hasNoStoreDirective(value: string | undefined) {
  return (
    value
      ?.split(",")
      .some((directive) => directive.trim().toLowerCase() === "no-store") ??
    false
  );
}

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

/** Reads renderer bytes incrementally and aborts before exceeding the limit. */
const readRendererBody = Effect.fn("AksaraCli.readRendererBody")(
  (response: HttpClientResponse.HttpClientResponse) => {
    const contentLength = response.headers["content-length"];
    if (contentLength !== undefined) {
      const declaredBytes = Number(contentLength);
      if (
        !Number.isSafeInteger(declaredBytes) ||
        declaredBytes < 0 ||
        declaredBytes > MAXIMUM_RENDERER_BYTES
      ) {
        return Effect.fail(makeNakafaAppError("body", false));
      }
    }
    return response.stream.pipe(
      Stream.catchAll((error) =>
        error.reason === "EmptyBody"
          ? Stream.empty
          : Stream.fail(makeNakafaAppError("body", true))
      ),
      Stream.runFoldEffect(EMPTY_RENDERER_BODY, (state, chunk) => {
        const size = state.size + chunk.byteLength;
        if (size > MAXIMUM_RENDERER_BYTES) {
          return Effect.fail(makeNakafaAppError("body", false));
        }
        return Effect.succeed({ chunks: [...state.chunks, chunk], size });
      }),
      Effect.map(({ chunks, size }) => {
        const bytes = new Uint8Array(size);
        let offset = 0;
        for (const chunk of chunks) {
          bytes.set(chunk, offset);
          offset += chunk.byteLength;
        }
        return bytes;
      })
    );
  }
);

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
      .pipe(Effect.mapError(() => makeNakafaAppError("network", true)));
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
    if (!hasNoStoreDirective(response.headers["cache-control"])) {
      return yield* makeNakafaAppError("cache", false);
    }
    const bytes = yield* readRendererBody(response);
    const body = yield* Effect.try({
      catch: () => makeNakafaAppError("json", false),
      try: () =>
        JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)),
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
