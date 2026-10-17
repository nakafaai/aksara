import { createServer } from "node:http";
import { NodeHttpServer, NodeServices } from "@effect/platform-node";
import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import {
  Array as Arr,
  Effect,
  Record as Rec,
  Redacted,
  Schema,
  Stream,
} from "effect";
import {
  FetchHttpClient,
  HttpClient,
  HttpClientRequest,
  type HttpClientResponse,
} from "effect/http";
import { isInetAddress } from "effect/net/NetAddress";
import { openPreviewProvider, type PreviewProvider } from "#cli/provider";
import { makePreviewHttp, type PreviewHttpState } from "#cli/provider/http";
import { makePreviewReady, PREVIEW_REPOSITORIES } from "#test/preview";
import { makeRepositoryTracker } from "#test/real";

/** Temporary repositories owned by provider behavior tests. */
const providerRepositories = makeRepositoryTracker();

/** Fixed bearer value shared by provider transport fixtures. */
export const PREVIEW_PROVIDER_TEST_TOKEN = "test-preview-provider-token";

/** Test-only failure while exercising a real preview provider boundary. */
export class PreviewProviderTestError extends Schema.TaggedError<
  PreviewProviderTestError,
  { readonly brand: unique symbol }
>()("PreviewProviderTestError", {
  cause: Schema.optional(Schema.Unknown),
  stage: Schema.Literals([
    "close",
    "fetch",
    "listen",
    "response",
    "stream",
    "wait",
  ]),
}) {}

/** Acquires one compiled real document and removes its repository on release. */
function acquirePreviewReady() {
  return Effect.acquireRelease(
    providerRepositories.create().pipe(Effect.flatMap(makePreviewReady)),
    () => Effect.promise(() => providerRepositories.clear())
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
  return Arr.map(artifacts, (artifact) => ({ ...compiled, artifact }));
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
  init: Parameters<typeof makePreviewRequest>[1] = {}
) {
  const headers = new Headers(init.headers);
  headers.set("authorization", `Bearer ${token}`);
  return requestPreviewHttp(new URL(path, provider.origin), {
    ...init,
    headers,
  });
}

/** Builds one HttpClient request from the URL, method, and headers a test sends. */
function makePreviewRequest(
  url: string | URL,
  init: {
    readonly headers?: ConstructorParameters<typeof Headers>[0];
    readonly method?: "GET" | "POST";
  } = {}
) {
  return HttpClientRequest.make(init.method ?? "GET")(url, {
    headers: Rec.fromEntries(new Headers(init.headers)),
  });
}

/** Performs one interruptible request against a test-owned preview server. */
export const requestPreviewHttp = Effect.fn("AksaraCliTest.requestPreviewHttp")(
  function* (
    url: string | URL,
    init?: Parameters<typeof makePreviewRequest>[1]
  ) {
    const client = yield* HttpClient.HttpClient;
    return yield* client
      .execute(makePreviewRequest(url, init))
      .pipe(
        Effect.mapError(
          (cause) => new PreviewProviderTestError({ cause, stage: "fetch" })
        )
      );
  },
  Effect.provide(FetchHttpClient.layer)
);

/** Reads one successful provider response body as unknown JSON. */
export const responseJson = Effect.fn("AksaraCliTest.responseJson")(
  (response: HttpClientResponse.HttpClientResponse) =>
    response.json.pipe(
      Effect.mapError(
        (cause) => new PreviewProviderTestError({ cause, stage: "response" })
      )
    )
);

/** Reads one successful provider response body as text. */
export const responseText = Effect.fn("AksaraCliTest.responseText")(
  (response: HttpClientResponse.HttpClientResponse) =>
    response.text.pipe(
      Effect.mapError(
        (cause) => new PreviewProviderTestError({ cause, stage: "response" })
      )
    )
);

/** Reads one successful provider event-stream chunk. */
export const readProviderEvent = Effect.fn("AksaraCliTest.readProviderEvent")(
  (reader: ReadableStreamDefaultReader<Uint8Array>) =>
    Effect.tryPromise({
      catch: (cause) =>
        new PreviewProviderTestError({ cause, stage: "stream" }),
      try: () => reader.read(),
    })
);

/** Cancels one provider event reader through the Effect error channel. */
export const cancelProviderEvent = Effect.fn(
  "AksaraCliTest.cancelProviderEvent"
)((reader: ReadableStreamDefaultReader<Uint8Array>) =>
  Effect.tryPromise({
    catch: (cause) => new PreviewProviderTestError({ cause, stage: "stream" }),
    try: () => reader.cancel(),
  })
);

/** Acquires one response stream reader and cancels it during test cleanup. */
export const openPreviewHttpReader = Effect.fn(
  "AksaraCliTest.openPreviewHttpReader"
)((response: HttpClientResponse.HttpClientResponse) =>
  Effect.acquireRelease(
    Effect.sync(() => Stream.toReadableStream(response.stream).getReader()),
    (reader) => cancelProviderEvent(reader).pipe(Effect.orDie)
  )
);

/**
 * Serves one loopback transport inside the caller's scope. Its release ends
 * every event stream before the listener closes.
 */
export const openPreviewHttpServer = Effect.fn(
  "AksaraCliTest.openPreviewHttpServer"
)(function* (state: PreviewHttpState, heartbeatIntervalMs?: number) {
  const http = yield* makePreviewHttp({
    ...(heartbeatIntervalMs === undefined ? {} : { heartbeatIntervalMs }),
    readState: () => state,
    token: PREVIEW_PROVIDER_TEST_TOKEN,
  });
  const server = yield* NodeHttpServer.make(createServer, {
    host: "127.0.0.1",
    port: 0,
  });
  yield* server.serve(http.handle);
  yield* Effect.addFinalizer(() => http.close);
  const { address } = server;
  if (!isInetAddress(address)) {
    return yield* new PreviewProviderTestError({ stage: "listen" });
  }
  return { http, origin: new URL(`http://127.0.0.1:${address.port}`) };
});
