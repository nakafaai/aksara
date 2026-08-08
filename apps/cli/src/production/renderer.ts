import type { HttpClient } from "@effect/platform";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, type Redacted, Schedule } from "effect";
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
    Effect.timeoutFail({
      duration: RENDERER_TIMEOUT,
      onTimeout: () => makeNakafaAppError("timeout", false),
    })
  );
});
