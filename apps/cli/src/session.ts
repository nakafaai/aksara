import { FileSystem, Path } from "@effect/platform";
import type { PreviewRepository } from "@nakafa/aksara-contracts/preview/spec";
import { Effect, Fiber, Schema, Stream } from "effect";
import type { RunningNakafa } from "#cli/child";
import { makePreviewCredentials } from "#cli/credentials";
import {
  makePreviewDocumentCompiler,
  type PreviewCompileResult,
  type PreviewDocumentCompiler,
  type PreviewDocumentError,
} from "#cli/document";
import type { PreviewEnvironment } from "#cli/env";
import { readRepositoryEvidence } from "#cli/evidence";
import { NakafaApp } from "#cli/nakafa";
import {
  openPreviewProvider,
  type PreviewProvider,
  PreviewProviderError,
} from "#cli/provider";
import {
  findAksaraRoot,
  resolveNakafaRoot,
  type SelectedDocument,
  selectPreviewDocument,
} from "#cli/repository";

/** Filesystem watching stopped instead of preserving the authoring session. */
export class PreviewWatchError extends Schema.TaggedError<PreviewWatchError>()(
  "PreviewWatchError",
  { reason: Schema.Literal("ended", "filesystem") }
) {}

/** Controls one scoped provider, compiler, watcher, and actual Nakafa child. */
export interface LocalPreviewSession {
  readonly origin: URL;
  /** Recompiles the selected route and publishes only the new complete state. */
  readonly refresh: () => Effect.Effect<
    void,
    PreviewProviderError,
    FileSystem.FileSystem | Path.Path
  >;
  /** Watches the selected path until the child exits or filesystem watch fails. */
  readonly run: Effect.Effect<
    never,
    | PreviewProviderError
    | PreviewWatchError
    | Effect.Effect.Error<RunningNakafa["awaitExit"]>,
    FileSystem.FileSystem | Path.Path
  >;
}

interface OpenPreviewInput {
  readonly cwd: string;
  readonly environment: PreviewEnvironment;
  readonly requestedDocument: string;
}

/** Returns a stable public failure tag without serializing unknown causes. */
function failureCode(error: PreviewDocumentError) {
  return error._tag.slice(0, 128);
}

/** Records the exact successful artifact without exposing its signature. */
function logCompilation(result: PreviewCompileResult) {
  return Effect.logInfo("Selected document compilation succeeded.").pipe(
    Effect.annotateLogs({
      artifactHash: result.artifact.artifactHash,
      compileKind: result.compileKind,
      contentKey: result.projection.contentKey,
      locale: result.projection.locale,
    })
  );
}

/** Compiles one state after clearing the old changed-route artifact first. */
export function refreshDocument(
  compiler: PreviewDocumentCompiler,
  provider: PreviewProvider,
  rendererManifestHash: Parameters<
    PreviewProvider["ready"]
  >[0]["rendererManifestHash"]
) {
  return provider.pending().pipe(
    Effect.zipRight(
      compiler.compile().pipe(
        Effect.matchEffect({
          onFailure: (error) => {
            const code = failureCode(error);
            return provider
              .failed({
                code,
                message: `The selected document failed with ${code}.`,
              })
              .pipe(
                Effect.zipRight(
                  Effect.logError("Selected document compilation failed.").pipe(
                    Effect.annotateLogs({ code })
                  )
                )
              );
          },
          onSuccess: (result) =>
            provider
              .ready({
                artifact: result.artifact,
                projection: result.projection,
                rendererManifestHash,
              })
              .pipe(Effect.zipRight(logCompilation(result))),
        })
      )
    )
  );
}

/** Converts exact repository evidence into concise structured CLI output. */
function logEvidence(
  repository: "aksara" | "nakafa",
  evidence: PreviewRepository
) {
  return Effect.logInfo("Preview repository evidence.").pipe(
    Effect.annotateLogs({
      dirty: evidence.dirty,
      repository,
      sha: evidence.sha,
    })
  );
}

/** Watches only the selected filename so sibling locale saves do no work. */
export function watchSelectedDocument(
  selected: SelectedDocument,
  refresh: Effect.Effect<
    void,
    PreviewProviderError,
    FileSystem.FileSystem | Path.Path
  >
) {
  return Effect.gen(function* () {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const directory = path.dirname(selected.absolutePath);
    const fileName = path.basename(selected.absolutePath);
    return yield* fileSystem.watch(directory).pipe(
      Stream.filter((event) => path.basename(event.path) === fileName),
      Stream.debounce("75 millis"),
      Stream.runForEach(() => refresh),
      Effect.mapError((error) =>
        error instanceof PreviewProviderError
          ? error
          : new PreviewWatchError({ reason: "filesystem" })
      ),
      Effect.zipRight(Effect.fail(new PreviewWatchError({ reason: "ended" })))
    );
  });
}

/** Opens the real final-corpus preview without filesystem or published fallback. */
export const openLocalPreview = Effect.fn("AksaraCli.openLocalPreview")(
  function* (input: OpenPreviewInput) {
    const app = yield* NakafaApp;
    const aksaraRoot = yield* findAksaraRoot(input.cwd);
    const nakafaRoot = yield* resolveNakafaRoot(
      aksaraRoot,
      input.environment.nakafaAppDir
    );
    const selected = yield* selectPreviewDocument(
      aksaraRoot,
      input.requestedDocument
    );
    const [aksara, nakafa] = yield* Effect.all(
      [
        readRepositoryEvidence("aksara", aksaraRoot),
        readRepositoryEvidence("nakafa", nakafaRoot),
      ],
      { concurrency: 2 }
    );
    yield* Effect.all([
      logEvidence("aksara", aksara),
      logEvidence("nakafa", nakafa),
    ]);
    const credentials = yield* makePreviewCredentials();
    const provider = yield* openPreviewProvider({
      document: selected.document,
      repositories: { aksara, nakafa },
      token: credentials.token,
    });
    const child = yield* app.start({
      credentials,
      provider,
      root: nakafaRoot,
    });
    const rendererManifest = yield* app
      .fetchRenderer(child.origin, credentials.token)
      .pipe(Effect.raceFirst(child.awaitExit));
    const compiler = yield* makePreviewDocumentCompiler({
      aksaraRoot,
      rendererManifest,
      selected,
      signer: credentials.signer,
    });
    const mutex = yield* Effect.makeSemaphore(1);
    /** Recompiles and atomically replaces the selected document state. */
    const refresh = () =>
      mutex.withPermits(1)(
        refreshDocument(compiler, provider, rendererManifest.hash)
      );
    const watcher = yield* watchSelectedDocument(selected, refresh()).pipe(
      Effect.forkScoped
    );
    yield* refresh().pipe(
      Effect.raceFirst(child.awaitExit),
      Effect.raceFirst(Fiber.join(watcher))
    );
    yield* Effect.logInfo("Local preview provider is ready.").pipe(
      Effect.annotateLogs({
        origin: provider.origin.toString(),
        url: new URL(
          `/${selected.document.route.locale}/${selected.document.route.publicPath}`,
          child.origin
        ).toString(),
      })
    );
    return {
      origin: provider.origin,
      refresh,
      run: Fiber.join(watcher).pipe(Effect.raceFirst(child.awaitExit)),
    } satisfies LocalPreviewSession;
  }
);
