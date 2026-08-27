import { NodeServices } from "@effect/platform-node";
import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import { Effect, Redacted, Schema } from "effect";
import { openPreviewProvider, type PreviewProvider } from "#cli/provider";
import { makePreviewReady, PREVIEW_REPOSITORIES } from "#test/preview";
import { makeRepositoryTracker } from "#test/real";

/** Temporary repositories owned by provider behavior tests. */
const providerRepositories = makeRepositoryTracker();

/** Acquires one compiled real document and removes its repository on release. */
function acquirePreviewReady() {
  return Effect.acquireRelease(
    Effect.sync(() => providerRepositories.create()).pipe(
      Effect.flatMap(makePreviewReady)
    ),
    () => Effect.sync(() => providerRepositories.clear())
  ).pipe(Effect.provide(NodeServices.layer));
}

/** Creates identity-invalid artifacts for every provider coherence boundary. */
export function makeIncoherentResults(
  ready: Effect.Success<ReturnType<typeof makePreviewReady>>
) {
  const [compiled] = ready.result.results;
  const artifacts = [
    Schema.decodeSync(SignedContentArtifactSchema)({
      ...compiled.artifact,
      payload: {
        ...compiled.artifact.payload,
        contentKey: `${compiled.artifact.payload.contentKey}-mismatch`,
      },
    }),
    Schema.decodeSync(SignedContentArtifactSchema)({
      ...compiled.artifact,
      payload: { ...compiled.artifact.payload, artifactLocale: "id" },
    }),
    Schema.decodeSync(SignedContentArtifactSchema)({
      ...compiled.artifact,
      payload: {
        ...compiled.artifact.payload,
        rendererDomain: "chemistry",
      },
    }),
  ];
  return artifacts.map((artifact) => ({ ...compiled, artifact }));
}

/** Creates one exact provider input backed by a temporary real document. */
export const makeProviderInput = acquirePreviewReady().pipe(
  Effect.map((ready) => ({
    document: ready.document,
    repositories: PREVIEW_REPOSITORIES,
    token: ready.credentials.providerToken,
  }))
);

/** Executes one callback while the scoped loopback provider is listening. */
export function withProvider<A, E, R>(
  use: (input: {
    readonly provider: PreviewProvider;
    readonly ready: Effect.Success<ReturnType<typeof makePreviewReady>>;
    readonly token: string;
  }) => Effect.Effect<A, E, R>
) {
  return Effect.gen(function* () {
    const ready = yield* acquirePreviewReady();
    const provider = yield* openPreviewProvider({
      document: ready.document,
      repositories: PREVIEW_REPOSITORIES,
      token: ready.credentials.providerToken,
    });
    return yield* use({
      provider,
      ready,
      token: Redacted.value(ready.credentials.providerToken),
    });
  });
}

/** Sends one authenticated request to the current provider origin. */
export function requestProvider(
  provider: PreviewProvider,
  token: string,
  path: string,
  init: RequestInit = {}
) {
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${token}`);
  return Effect.tryPromise(() =>
    fetch(new URL(path, provider.origin), { ...init, headers })
  ).pipe(Effect.orDie);
}

/** Reads one successful provider response body as unknown JSON. */
export const responseJson = Effect.fn("AksaraCliTest.responseJson")(
  (response: Response) =>
    Effect.tryPromise(() => response.json()).pipe(Effect.orDie)
);

/** Reads one successful provider response body as text. */
export const responseText = Effect.fn("AksaraCliTest.responseText")(
  (response: Response) =>
    Effect.tryPromise(() => response.text()).pipe(Effect.orDie)
);

/** Reads one successful provider event-stream chunk. */
export const readProviderEvent = Effect.fn("AksaraCliTest.readProviderEvent")(
  (reader: ReadableStreamDefaultReader<Uint8Array>) =>
    Effect.tryPromise(() => reader.read()).pipe(Effect.orDie)
);
