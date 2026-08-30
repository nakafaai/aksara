import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import {
  canonicalizeSignedContentArtifact,
  type SignedContentArtifact,
} from "@nakafa/aksara-contracts/content";
import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import type { PreviewDocument } from "@nakafa/aksara-contracts/preview/document";
import {
  LOCAL_PREVIEW_FORMAT,
  type LocalPreviewManifest,
  LocalPreviewManifestSchema,
  localPreviewArtifactPath,
  type PreviewArtifact,
} from "@nakafa/aksara-contracts/preview/spec";
import type { CurrentContentProjection } from "@nakafa/aksara-contracts/projection/spec";
import { Effect, HashMap, Redacted, Schema } from "effect";
import { isAddressInfo } from "#cli/address";
import {
  makePreviewHttp,
  PREVIEW_EVENTS_PATH,
  PREVIEW_MANIFEST_PATH,
  type PreviewHttp,
  type PreviewHttpState,
} from "#cli/provider/http";

/** Loopback provider startup or state encoding failed safely. */
export class PreviewProviderError extends Schema.TaggedError<PreviewProviderError>()(
  "PreviewProviderError",
  {
    cause: Schema.optional(Schema.Unknown),
    stage: Schema.Literals(["coherence", "encode", "listen"]),
  }
) {}

type PreviewRepositories = LocalPreviewManifest["repositories"];
type PreviewFailure = Extract<
  LocalPreviewManifest,
  { readonly status: "failed" }
>["failure"];

/** One signed body and its matching renderer projection. */
interface PreviewReadyResult {
  readonly artifact: SignedContentArtifact;
  readonly projection: CurrentContentProjection;
}

/** Ordered values exposed only after every required body succeeds together. */
export interface PreviewReadyInput {
  readonly generation: number;
  readonly rendererManifestHash: Sha256Hash;
  readonly repositories: PreviewRepositories;
  readonly results: readonly [PreviewReadyResult, ...PreviewReadyResult[]];
}

/** Scoped provider controls used by the authoring workflow. */
export interface PreviewProvider {
  readonly eventsPath: typeof PREVIEW_EVENTS_PATH;
  /** Publishes a sanitized changed-route error without retaining an artifact. */
  readonly failed: (input: {
    readonly failure: PreviewFailure;
    readonly generation: number;
    readonly repositories: PreviewRepositories;
  }) => Effect.Effect<boolean, PreviewProviderError>;
  readonly manifestPath: typeof PREVIEW_MANIFEST_PATH;
  readonly origin: URL;
  /** Clears every old artifact before a changed document starts compiling. */
  readonly pending: (
    repositories: PreviewRepositories
  ) => Effect.Effect<number, PreviewProviderError>;
  /** Atomically exposes all ordered signed artifacts and their projections. */
  readonly ready: (
    input: PreviewReadyInput
  ) => Effect.Effect<boolean, PreviewProviderError>;
}

interface PreviewProviderInput {
  readonly document: PreviewDocument;
  readonly repositories: PreviewRepositories;
  readonly token: Redacted.Redacted<string>;
}

/** Encodes one exact manifest before it can become visible to HTTP callbacks. */
const encodeManifest = Effect.fn("AksaraCli.encodePreviewManifest")(
  (manifest: LocalPreviewManifest) =>
    Schema.decodeEffect(LocalPreviewManifestSchema)(manifest, {
      onExcessProperty: "error",
    }).pipe(
      Effect.mapError(
        (cause) => new PreviewProviderError({ cause, stage: "encode" })
      ),
      Effect.map((decoded) => ({
        manifest: decoded,
        manifestJson: JSON.stringify(decoded),
      }))
    )
);

/** Starts one HTTP server and proves it bound only to IPv4 loopback. */
function listenLoopback(server: Server) {
  return Effect.callback<AddressInfo, PreviewProviderError>((resume) => {
    server.once("error", () =>
      resume(Effect.fail(new PreviewProviderError({ stage: "listen" })))
    );
    server.listen({ host: "127.0.0.1", port: 0 }, () => {
      const address = server.address();
      if (
        isAddressInfo(address) &&
        address.address === "127.0.0.1" &&
        address.family === "IPv4"
      ) {
        resume(Effect.succeed(address));
      } else {
        server.close(() =>
          resume(Effect.fail(new PreviewProviderError({ stage: "listen" })))
        );
      }
    });
    return Effect.sync(() => {
      server.close();
    });
  });
}

/** Closes event streams before stopping the scoped loopback server. */
function closeServer(server: Server, http: PreviewHttp) {
  return Effect.callback<void>((resume) => {
    http.close();
    server.close(() => resume(Effect.void));
  });
}

/** Converts one ordered result into its content-addressed manifest entry. */
function artifactReference(result: PreviewReadyResult): PreviewArtifact {
  return {
    artifactHash: result.artifact.artifactHash,
    artifactPath: localPreviewArtifactPath(result.artifact.artifactHash),
    projection: result.projection,
  };
}

/** Preserves the compiler's non-empty artifact order in the ready manifest. */
function artifactReferences(
  results: PreviewReadyInput["results"]
): readonly [PreviewArtifact, ...PreviewArtifact[]] {
  const [first, ...rest] = results;
  return [artifactReference(first), ...rest.map(artifactReference)];
}

/** Converts one signed result into an immutable hash-keyed wire entry. */
function artifactEntry(
  result: PreviewReadyResult
): readonly [Sha256Hash, string] {
  return [
    result.artifact.artifactHash,
    canonicalizeSignedContentArtifact(result.artifact),
  ];
}

/** Checks signed payload identity before its projection can become visible. */
function hasCoherentReadyResult(
  document: PreviewDocument,
  result: PreviewReadyResult
) {
  const {
    artifact: { payload },
    projection,
  } = result;
  if (payload.contentKey !== projection.contentKey) {
    return false;
  }
  if (payload.artifactLocale !== projection.artifactLocale) {
    return false;
  }
  return payload.rendererDomain === document.rendererDomain;
}

/** Opens one bearer-protected provider whose artifact state fails closed. */
export const openPreviewProvider = Effect.fn("AksaraCli.openPreviewProvider")(
  function* (input: PreviewProviderInput) {
    const base = {
      document: input.document,
      format: LOCAL_PREVIEW_FORMAT,
    } satisfies Pick<LocalPreviewManifest, "document" | "format">;
    const initial = yield* encodeManifest({
      ...base,
      repositories: input.repositories,
      revision: 1,
      status: "pending",
    });
    let state: PreviewHttpState = {
      ...initial,
      artifacts: HashMap.empty(),
    };
    let generation = 0;
    const token = Redacted.value(input.token);
    const http = makePreviewHttp({ readState: () => state, token });
    const server = createServer(http.handle);
    const address = yield* Effect.uninterruptibleMask((restore) =>
      restore(listenLoopback(server)).pipe(
        Effect.tap(() => Effect.addFinalizer(() => closeServer(server, http)))
      )
    );
    /** Replaces the complete served state before notifying connected clients. */
    const update = Effect.fn("AksaraCli.updatePreviewProvider")(
      (
        next: LocalPreviewManifest,
        results: readonly PreviewReadyResult[] = []
      ) =>
        encodeManifest(next).pipe(
          Effect.map((encoded) => {
            state = {
              ...encoded,
              artifacts: HashMap.fromIterable(results.map(artifactEntry)),
            };
            return http.publish(state);
          })
        )
    );
    /** Commits one compile result only while it owns the latest generation. */
    const commit = (
      expectedGeneration: number,
      next: LocalPreviewManifest,
      results: readonly PreviewReadyResult[] = []
    ) =>
      Effect.suspend(() =>
        expectedGeneration === generation
          ? update(next, results).pipe(Effect.as(true))
          : Effect.succeed(false)
      );
    return {
      eventsPath: PREVIEW_EVENTS_PATH,
      failed: ({ failure, generation: expectedGeneration, repositories }) =>
        commit(expectedGeneration, {
          ...base,
          failure,
          repositories,
          revision: state.manifest.revision + 1,
          status: "failed",
        }),
      manifestPath: PREVIEW_MANIFEST_PATH,
      origin: new URL(`http://127.0.0.1:${address.port}`),
      pending: (repositories) =>
        Effect.suspend(() => {
          generation += 1;
          return update({
            ...base,
            repositories,
            revision: state.manifest.revision + 1,
            status: "pending",
          }).pipe(Effect.as(generation));
        }),
      ready: (ready) =>
        Effect.suspend(() => {
          if (ready.generation !== generation) {
            return Effect.succeed(false);
          }
          if (
            !ready.results.every((result) =>
              hasCoherentReadyResult(input.document, result)
            )
          ) {
            return Effect.fail(
              new PreviewProviderError({ stage: "coherence" })
            );
          }
          return commit(
            ready.generation,
            {
              ...base,
              artifacts: artifactReferences(ready.results),
              rendererManifestHash: ready.rendererManifestHash,
              repositories: ready.repositories,
              revision: state.manifest.revision + 1,
              status: "ready",
            },
            ready.results
          );
        }),
    } satisfies PreviewProvider;
  }
);
