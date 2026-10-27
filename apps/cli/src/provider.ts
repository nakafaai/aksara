import { createServer } from "node:http";
import { NodeHttpServer } from "@effect/platform-node";
import {
  canonicalizeSignedContentArtifact,
  SignedContentArtifactSchema,
} from "@nakafa/aksara-contracts/content";
import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import {
  localPreviewArtifactPath,
  type PreviewArtifact,
} from "@nakafa/aksara-contracts/preview/artifact";
import type { PreviewDocument } from "@nakafa/aksara-contracts/preview/document";
import {
  LOCAL_PREVIEW_FORMAT,
  type LocalPreviewManifest,
  LocalPreviewManifestSchema,
} from "@nakafa/aksara-contracts/preview/spec";
import { ContentProjectionSchema } from "@nakafa/aksara-contracts/projection/spec";
import { Array as Arr, Effect, HashMap, Redacted, Schema } from "effect";
import { isInetAddress } from "effect/net/NetAddress";
import {
  makePreviewHttp,
  PREVIEW_EVENTS_PATH,
  PREVIEW_MANIFEST_PATH,
  type PreviewHttpState,
} from "#cli/provider/http";
import { encodeJsonText } from "#cli/text/json";

/** Loopback provider startup or state encoding failed safely. */
export class PreviewProviderError extends Schema.TaggedError<
  PreviewProviderError,
  { readonly brand: unique symbol }
>()("PreviewProviderError", {
  cause: Schema.optional(Schema.Unknown),
  stage: Schema.Literals(["coherence", "encode", "listen"]),
}) {}

type PreviewRepositories = LocalPreviewManifest["repositories"];
type PreviewFailure = Extract<
  LocalPreviewManifest,
  { readonly status: "failed" }
>["failure"];

/** One signed body and its matching renderer projection. */
const PreviewReadyResultSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
  projection: ContentProjectionSchema,
});
type PreviewReadyResult = typeof PreviewReadyResultSchema.Type;

/** The loopback listener could not start, so no provider state is ever served. */
const listenFailure = () => new PreviewProviderError({ stage: "listen" });

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
  /** Atomically exposes the signed artifact and its projection. */
  readonly ready: (input: {
    readonly generation: number;
    readonly rendererManifestHash: Sha256Hash;
    readonly repositories: PreviewRepositories;
    readonly result: PreviewReadyResult;
  }) => Effect.Effect<boolean, PreviewProviderError>;
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
        manifestJson: encodeJsonText(decoded),
      }))
    )
);

/** Converts one ordered result into its content-addressed manifest entry. */
function artifactReference(result: PreviewReadyResult): PreviewArtifact {
  return {
    artifactHash: result.artifact.artifactHash,
    artifactPath: localPreviewArtifactPath(result.artifact.artifactHash),
    projection: result.projection,
  };
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
  function* (input: {
    readonly document: PreviewDocument;
    readonly repositories: PreviewRepositories;
    readonly token: Redacted.Redacted<string>;
  }) {
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
    const http = yield* makePreviewHttp({ readState: () => state, token });
    /**
     * The bind completes on a later tick and the platform cannot cancel it, so
     * an interrupt waits for the listener and the scope then closes it.
     */
    const server = yield* Effect.uninterruptible(
      NodeHttpServer.make(createServer, { host: "127.0.0.1", port: 0 })
    ).pipe(Effect.mapError(listenFailure));
    const { address } = server;
    if (!isInetAddress(address)) {
      return yield* new PreviewProviderError({ stage: "listen" });
    }
    yield* server.serve(http.handle);
    yield* Effect.addFinalizer(() => http.close);
    /** Replaces the complete served state before notifying connected clients. */
    const update = Effect.fn("AksaraCli.updatePreviewProvider")(
      (
        next: LocalPreviewManifest,
        results: readonly PreviewReadyResult[] = []
      ) =>
        encodeManifest(next).pipe(
          Effect.flatMap((encoded) => {
            state = {
              ...encoded,
              artifacts: HashMap.fromIterable(Arr.map(results, artifactEntry)),
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
          if (!hasCoherentReadyResult(input.document, ready.result)) {
            return Effect.fail(
              new PreviewProviderError({ stage: "coherence" })
            );
          }
          return commit(
            ready.generation,
            {
              ...base,
              artifacts: [artifactReference(ready.result)],
              rendererManifestHash: ready.rendererManifestHash,
              repositories: ready.repositories,
              revision: state.manifest.revision + 1,
              status: "ready",
            },
            [ready.result]
          );
        }),
    } satisfies PreviewProvider;
  }
);
