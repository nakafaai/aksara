import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import { verifyRendererPolicyTransition } from "@nakafa/aksara-contracts/release/policy";
import type { PublicationScope } from "@nakafa/aksara-contracts/release/snapshot/scope";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { validateLiveRendererManifestHash } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, type Redacted, Result, Schedule } from "effect";
import type { HttpClient } from "effect/unstable/http";
import { makeNakafaAppError, type NakafaAppError } from "#cli/app-error";
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

/** Selects the live renderer only when this release proves its full closure. */
export const selectRendererManifest = Effect.fn(
  "AksaraCli.selectRendererManifest"
)(function* (input: {
  readonly baseBundle: ContentReleaseBundle | null;
  readonly rendererManifest: unknown;
  readonly scope: PublicationScope;
}) {
  const liveRenderer = yield* validateLiveRendererManifestHash(
    input.rendererManifest
  );
  const activeBundle = input.baseBundle;
  if (
    activeBundle === null ||
    activeBundle.rendererManifest.hash === liveRenderer.hash
  ) {
    return liveRenderer;
  }
  const transition = yield* verifyRendererPolicyTransition({
    baseRendererManifestHash: activeBundle.rendererManifest.hash,
    baseTryoutSnapshotId:
      activeBundle.release.manifest.snapshots.tryout.resultSnapshotId,
    rendererManifestHash: liveRenderer.hash,
    scope: input.scope,
  }).pipe(Effect.result);
  return Result.isSuccess(transition)
    ? liveRenderer
    : activeBundle.rendererManifest;
});
