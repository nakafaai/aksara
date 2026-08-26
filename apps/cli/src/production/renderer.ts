import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { verifyRendererPolicyTransition } from "@nakafa/aksara-contracts/release/policy";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { validateLiveRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, type Redacted, Schedule } from "effect";
import type { HttpClient } from "effect/unstable/http";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";
import type { ProductionBaseIdentity } from "#cli/production/base";
import { fetchRendererEndpoint } from "#cli/renderer/http";

const RETRY_DELAY = "5 seconds";
const RENDERER_TIMEOUT = "3 minutes";
const RENDERER_PATH = "/api/internal/content/renderer";

/** Proves one exact production renderer endpoint cannot leak credentials. */
export function isRendererEndpoint(endpoint: URL) {
  return (
    endpoint.protocol === "https:" &&
    endpoint.username === "" &&
    endpoint.password === "" &&
    endpoint.pathname === RENDERER_PATH &&
    endpoint.search === "" &&
    endpoint.hash === ""
  );
}

/** Reads one renderer manifest only from the explicit secure production URL. */
export const fetchProductionRenderer: (
  endpoint: URL,
  token: Redacted.Redacted<string>
) => Effect.Effect<
  RendererManifestEnvelope,
  NakafaAppError,
  HttpClient.HttpClient
> = Effect.fn("AksaraCli.fetchProductionRenderer")((endpoint, token) => {
  if (!isRendererEndpoint(endpoint)) {
    return Effect.fail(makeNakafaAppError("origin", false));
  }
  return fetchRendererEndpoint(endpoint, token).pipe(
    Effect.retry({
      schedule: Schedule.spaced(RETRY_DELAY),
      while: (error) => error.retryable,
    }),
    Effect.timeoutOrElse({
      duration: RENDERER_TIMEOUT,
      orElse: () => Effect.fail(makeNakafaAppError("timeout", false)),
    })
  );
});

/** Validates one renderer and closes its release scope over retained content. */
export const validateRendererTransition = Effect.fn(
  "AksaraCli.validateRendererTransition"
)(function* (input: {
  readonly base: ProductionBaseIdentity | null;
  readonly baseBundle: ContentReleaseBundle | null;
  readonly rendererManifest: unknown;
  readonly scope: PublicationScope;
}) {
  const rendererManifest = yield* validateLiveRendererManifestHash(
    input.rendererManifest
  );
  yield* verifyRendererPolicyTransition({
    baseRendererManifestHash: input.baseBundle?.rendererManifest.hash ?? null,
    baseTryoutSnapshotId: input.base?.snapshots.tryout.resultSnapshotId ?? null,
    rendererManifestHash: rendererManifest.hash,
    scope: input.scope,
  });
  return rendererManifest;
});
