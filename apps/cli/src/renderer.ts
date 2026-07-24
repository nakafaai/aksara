import { randomBytes } from "node:crypto";
import type { HttpClient } from "@effect/platform";
import {
  PreviewRendererNonceSchema,
  PreviewRendererResponseSchema,
  verifyPreviewRendererProof,
} from "@nakafa/aksara-contracts/preview/auth";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { validateRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Redacted, Schedule, Schema } from "effect";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";
import type { RendererCredentials } from "#cli/credentials";
import { fetchRendererBody } from "#cli/renderer/http";

const LOOPBACK_HOST = "127.0.0.1";
const RENDERER_PATH = "/api/internal/content/renderer";
const RENDERER_RETRY_DELAY = "1 second";

/** Actual authenticated renderer capability consumed by the Nakafa service. */
export type FetchRenderer = (
  origin: URL,
  credentials: RendererCredentials
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

/** Creates one unpredictable renderer challenge without exposing crypto errors. */
const makeRendererNonce = Effect.fn("AksaraCli.makeRendererNonce")(() =>
  Effect.try({
    catch: () => makeNakafaAppError("auth", false),
    try: () =>
      PreviewRendererNonceSchema.make(randomBytes(32).toString("base64url")),
  })
);

/** Fetches and authenticates one local renderer manifest response. */
const fetchPreviewRenderer = Effect.fn("AksaraCli.fetchPreviewRenderer")(
  (url: URL, credentials: RendererCredentials) =>
    Effect.gen(function* () {
      const nonce = yield* makeRendererNonce();
      const body = yield* fetchRendererBody(url, {
        nonce,
        token: credentials.token,
      });
      const authenticated = yield* Schema.decodeUnknown(
        PreviewRendererResponseSchema,
        { onExcessProperty: "error" }
      )(body).pipe(
        Effect.mapError(() => makeNakafaAppError("contract", false))
      );
      const manifest = yield* validateRendererManifestHash(
        authenticated.manifest
      ).pipe(Effect.mapError(() => makeNakafaAppError("contract", false)));
      yield* verifyPreviewRendererProof({
        manifestHash: manifest.hash,
        nonce,
        proof: authenticated.proof,
        secret: Redacted.value(credentials.secret),
      }).pipe(Effect.mapError(() => makeNakafaAppError("auth", false)));
      return manifest;
    })
);

/** Reads one renderer manifest only from the spawned localhost Nakafa app. */
export const fetchRendererManifest: FetchRenderer = Effect.fn(
  "AksaraCli.fetchRendererManifest"
)((origin, credentials) => {
  if (!isNakafaOrigin(origin)) {
    return Effect.fail(makeNakafaAppError("origin", false));
  }
  return fetchPreviewRenderer(new URL(RENDERER_PATH, origin), credentials);
});

/** Retries only startup-transient renderer failures within one bounded minute. */
export const waitForRenderer: FetchRenderer = Effect.fn(
  "AksaraCli.waitForRenderer"
)((origin, credentials) =>
  fetchRendererManifest(origin, credentials).pipe(
    Effect.retry({
      schedule: Schedule.spaced(RENDERER_RETRY_DELAY),
      while: (error) => error.retryable,
    }),
    Effect.timeoutFail({
      duration: "60 seconds",
      onTimeout: () => makeNakafaAppError("timeout", false),
    })
  )
);
