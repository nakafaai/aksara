import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Redacted, Schedule, Stream } from "effect";
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
) => Effect.Effect<RendererManifestEnvelope, NakafaAppError>;

/** Requires an exact no-store response directive, ignoring case and spacing. */
function hasNoStoreDirective(value: string | null) {
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
  (response: Response) => {
    const contentLength = response.headers.get("content-length");
    if (contentLength !== null) {
      const declaredBytes = Number(contentLength);
      if (
        !Number.isSafeInteger(declaredBytes) ||
        declaredBytes < 0 ||
        declaredBytes > MAXIMUM_RENDERER_BYTES
      ) {
        return Effect.fail(makeNakafaAppError("body", false));
      }
    }
    const { body } = response;
    if (!body) {
      return Effect.succeed(new Uint8Array());
    }
    return Stream.fromReadableStream({
      evaluate: () => body,
      onError: () => makeNakafaAppError("body", true),
    }).pipe(
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

/** Reads and validates one live authenticated renderer endpoint response. */
export const fetchRendererManifest: FetchRenderer = Effect.fn(
  "AksaraCli.fetchRendererManifest"
)((origin, token) =>
  Effect.gen(function* () {
    if (!isNakafaOrigin(origin)) {
      return yield* makeNakafaAppError("origin", false);
    }
    const url = new URL(RENDERER_PATH, origin);
    const response = yield* Effect.tryPromise({
      catch: () => makeNakafaAppError("network", true),
      try: (signal) =>
        fetch(url, {
          headers: { authorization: `Bearer ${Redacted.value(token)}` },
          redirect: "error",
          signal,
        }),
    });
    if (response.redirected || response.url !== url.toString()) {
      return yield* makeNakafaAppError("redirect", false);
    }
    if (response.status !== 200) {
      return yield* makeNakafaAppError(
        "status",
        response.status === 404 || response.status >= 500,
        response.status
      );
    }
    if (!hasNoStoreDirective(response.headers.get("cache-control"))) {
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
  })
);

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
