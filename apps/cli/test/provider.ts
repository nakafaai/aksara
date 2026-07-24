import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import { Effect, Redacted, Schema } from "effect";
import { openPreviewProvider, type PreviewProvider } from "#cli/provider";
import { makePreviewReady, PREVIEW_REPOSITORIES } from "#test/preview";
import { makeRepositoryTracker } from "#test/real";

/** Temporary repositories owned by provider behavior tests. */
export const providerRepositories = makeRepositoryTracker();

/** Creates identity-invalid artifacts for every provider coherence boundary. */
export function makeIncoherentResults(
  ready: Awaited<ReturnType<typeof makePreviewReady>>
) {
  const [compiled] = ready.result.results;
  const artifacts = [
    Schema.decodeUnknownSync(SignedContentArtifactSchema)({
      ...compiled.artifact,
      payload: {
        ...compiled.artifact.payload,
        contentKey: `${compiled.artifact.payload.contentKey}-mismatch`,
      },
    }),
    Schema.decodeUnknownSync(SignedContentArtifactSchema)({
      ...compiled.artifact,
      payload: { ...compiled.artifact.payload, locale: "id" },
    }),
    Schema.decodeUnknownSync(SignedContentArtifactSchema)({
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
export async function makeProviderInput() {
  const repository = providerRepositories.create();
  const ready = await makePreviewReady(repository);
  return {
    document: ready.document,
    repositories: PREVIEW_REPOSITORIES,
    token: ready.credentials.providerToken,
  };
}

/** Executes one callback while the scoped loopback provider is listening. */
export async function withProvider(
  use: (input: {
    readonly provider: PreviewProvider;
    readonly ready: Awaited<ReturnType<typeof makePreviewReady>>;
    readonly token: string;
  }) => Promise<void>
) {
  const repository = providerRepositories.create();
  const ready = await makePreviewReady(repository);
  await Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const provider = yield* openPreviewProvider({
          document: ready.document,
          repositories: PREVIEW_REPOSITORIES,
          token: ready.credentials.providerToken,
        });
        yield* Effect.tryPromise(() =>
          use({
            provider,
            ready,
            token: Redacted.value(ready.credentials.providerToken),
          })
        );
      })
    )
  );
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
  return fetch(new URL(path, provider.origin), { ...init, headers });
}
