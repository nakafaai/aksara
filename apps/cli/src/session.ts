import type { FileSystem, Path } from "@effect/platform";
import { previewDocumentRoute } from "@nakafa/aksara-contracts/preview/document";
import { Effect, Either, Fiber, Ref } from "effect";
import type { RunningNakafa } from "#cli/child";
import { describeDocumentFailure } from "#cli/diagnostic";
import {
  makePreviewDocumentCompiler,
  type PreviewCompileResult,
  type PreviewDocumentCompiler,
  type PreviewDocumentResult,
} from "#cli/document";
import type { PreviewEnvironment } from "#cli/env";
import type { PreviewEvidenceError } from "#cli/evidence";
import { PreviewRestartError } from "#cli/integrity";
import type { PreviewProvider, PreviewProviderError } from "#cli/provider";
import { openRendererSession } from "#cli/renderer-session";
import { openSelectedWatcher, type PreviewWatchError } from "#cli/watch";

/** Controls one scoped provider, compiler, watcher, and actual Nakafa child. */
export interface LocalPreviewSession {
  /** Watches the selected path until the child exits or filesystem watch fails. */
  readonly run: Effect.Effect<
    never,
    | PreviewEvidenceError
    | PreviewProviderError
    | PreviewRestartError
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

type PreviewRepositories = Parameters<PreviewProvider["pending"]>[0];

/** Publishes one typed failure without leaking nested unknown causes. */
function publishDocumentFailure(
  provider: PreviewProvider,
  generation: number,
  repositories: PreviewRepositories,
  error: Parameters<typeof describeDocumentFailure>[0]
) {
  const failure = describeDocumentFailure(error);
  return provider
    .failed({
      failure: failure.publicFailure,
      generation,
      repositories,
    })
    .pipe(
      Effect.flatMap((committed) =>
        committed
          ? Effect.logError(failure.diagnostic).pipe(
              Effect.annotateLogs({
                failureCode: failure.publicFailure.code,
              })
            )
          : Effect.void
      )
    );
}

/** Records one exact successful artifact without exposing its signature. */
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

/** Records every body committed together for the selected preview document. */
function logDocumentCompilation(document: PreviewDocumentResult) {
  return Effect.forEach(document.results, logCompilation, {
    concurrency: "unbounded",
    discard: true,
  });
}

/** Compiles one atomic state after clearing the old changed-route artifacts. */
export function refreshDocument(
  compiler: PreviewDocumentCompiler,
  provider: PreviewProvider,
  rendererManifestHash: Parameters<
    PreviewProvider["ready"]
  >[0]["rendererManifestHash"],
  generation: number,
  repositoryEvidence: Effect.Effect<PreviewRepositories, PreviewEvidenceError>
) {
  return Effect.gen(function* () {
    const outcome = yield* compiler.compile().pipe(Effect.either);
    if (Either.isLeft(outcome) && outcome.left instanceof PreviewRestartError) {
      return yield* outcome.left;
    }
    const currentRepositories = yield* repositoryEvidence;
    if (Either.isLeft(outcome)) {
      yield* publishDocumentFailure(
        provider,
        generation,
        currentRepositories,
        outcome.left
      );
      return currentRepositories;
    }
    const verification = yield* compiler
      .verify(outcome.right)
      .pipe(Effect.either);
    if (
      Either.isLeft(verification) &&
      verification.left instanceof PreviewRestartError
    ) {
      return yield* verification.left;
    }
    if (Either.isLeft(verification)) {
      yield* publishDocumentFailure(
        provider,
        generation,
        currentRepositories,
        verification.left
      );
      return currentRepositories;
    }
    const committed = yield* provider.ready({
      generation,
      rendererManifestHash,
      repositories: currentRepositories,
      results: outcome.right.results,
    });
    if (committed) {
      yield* logDocumentCompilation(outcome.right);
    }
    return currentRepositories;
  });
}

/** Opens the real final-corpus preview without filesystem or published fallback. */
export const openLocalPreview = Effect.fn("AksaraCli.openLocalPreview")(
  function* (input: OpenPreviewInput) {
    const renderer = yield* openRendererSession({
      cwd: input.cwd,
      environment: input.environment,
      selection: {
        kind: "document",
        requestedPath: input.requestedDocument,
      },
    });
    const repositoryRef = yield* Ref.make(renderer.repositories);
    const compiler = yield* makePreviewDocumentCompiler({
      aksaraRoot: renderer.aksaraRoot,
      rendererManifest: renderer.manifest,
      selected: renderer.selected,
      signer: renderer.credentials.signer,
    });
    const mutex = yield* Effect.makeSemaphore(1);
    /** Serializes the active compile while the watcher retains its latest save. */
    const refresh = (generation: number) =>
      mutex.withPermits(1)(
        Effect.gen(function* () {
          const currentRepositories = yield* refreshDocument(
            compiler,
            renderer.provider,
            renderer.manifest.hash,
            generation,
            renderer.repositoryEvidence
          );
          yield* Ref.set(repositoryRef, currentRepositories);
        })
      );
    /** Clears served artifacts before queueing one selected-source refresh. */
    const invalidate = Ref.get(repositoryRef).pipe(
      Effect.flatMap(renderer.provider.pending)
    );
    const watcher = yield* openSelectedWatcher(
      renderer.selected,
      invalidate,
      refresh
    );
    const watcherFiber = yield* watcher.run.pipe(Effect.forkScoped);
    yield* watcher.ready.pipe(
      Effect.raceFirst(renderer.child.awaitExit),
      Effect.raceFirst(Fiber.join(watcherFiber))
    );
    const initialGeneration = yield* invalidate;
    yield* refresh(initialGeneration).pipe(
      Effect.raceFirst(renderer.child.awaitExit),
      Effect.raceFirst(Fiber.join(watcherFiber))
    );
    const route = previewDocumentRoute(renderer.selected.document);
    yield* Effect.logInfo("Local preview provider is ready.").pipe(
      Effect.annotateLogs({
        origin: renderer.provider.origin.toString(),
        url: new URL(
          `/${route.locale}/${route.publicPath}`,
          renderer.child.origin
        ).toString(),
      })
    );
    return {
      run: Fiber.join(watcherFiber).pipe(
        Effect.raceFirst(renderer.child.awaitExit)
      ),
    } satisfies LocalPreviewSession;
  }
);
