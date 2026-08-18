import { relative } from "node:path";
import {
  FileSystem,
  Path,
  type Error as PlatformError,
} from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import {
  ExactProcess,
  type ExactProcessInput,
} from "@nakafa/aksara-utilities/process/exact";
import { Effect, Layer, type Stream } from "effect";
import type { RunningNakafa } from "#cli/child/session";
import type { SelectedDocument } from "#cli/integrity";
import { NakafaApp } from "#cli/nakafa";
import { NAKAFA_LOOPBACK_HOST } from "#cli/origin";
import { type PreviewProvider, PreviewProviderError } from "#cli/provider";
import { type LocalPreviewSession, openLocalPreview } from "#cli/session";
import { openSelectedWatcher } from "#cli/watch";
import { RENDERER_MANIFEST, type TestRepositories } from "#test/real";

/** Builds a preview provider that records state transitions. */
export function makeProvider(control: {
  failure?: Parameters<PreviewProvider["failed"]>[0]["failure"];
  failed: number;
  failPending?: boolean;
  failedRepositories?: Parameters<PreviewProvider["failed"]>[0]["repositories"];
  pending: number;
  pendingRepositories?: Parameters<PreviewProvider["pending"]>[0];
  ready: number;
  failReady?: boolean;
  readyRepositories?: Parameters<PreviewProvider["ready"]>[0]["repositories"];
}): PreviewProvider {
  let generation = 0;
  return {
    eventsPath: "/v1/events",
    failed: (input) => {
      control.failed += 1;
      control.failure = input.failure;
      control.failedRepositories = input.repositories;
      return Effect.succeed(input.generation === generation);
    },
    manifestPath: "/v1/manifest",
    origin: new URL("http://127.0.0.1:32123"),
    pending: (repositories) => {
      control.pending += 1;
      control.pendingRepositories = repositories;
      generation += 1;
      return control.failPending
        ? Effect.fail(new PreviewProviderError({ stage: "encode" }))
        : Effect.succeed(generation);
    },
    ready: (input) => {
      control.ready += 1;
      control.readyRepositories = input.repositories;
      return control.failReady
        ? Effect.fail(new PreviewProviderError({ stage: "encode" }))
        : Effect.succeed(input.generation === generation);
    },
  };
}

/** Runs a selected-document watcher through an explicit filesystem stream. */
export function runWatch(
  selected: SelectedDocument,
  stream: Stream.Stream<FileSystem.WatchEvent, PlatformError.PlatformError>,
  refresh: (
    generation: number
  ) => Effect.Effect<
    void,
    PreviewProviderError,
    FileSystem.FileSystem | Path.Path
  >,
  directoryFiles: ReadonlyMap<string, readonly string[]> = new Map(),
  invalidate: Effect.Effect<number, PreviewProviderError> = Effect.succeed(1)
) {
  const selectedFiles = new Map(
    selected.directories.map((directory) => [
      directory.absolutePath,
      directory.files,
    ])
  );
  return openSelectedWatcher(selected, invalidate, refresh).pipe(
    Effect.flatMap((watcher) => watcher.run),
    Effect.provide([
      FileSystem.layerNoop({
        readDirectory: (directory) =>
          Effect.succeed([
            ...(directoryFiles.get(directory) ??
              selectedFiles.get(directory) ??
              []),
          ]),
        realPath: (path) => Effect.succeed(path),
        watch: () => stream,
      }),
      Path.layer,
    ])
  );
}

/** Builds the actual-app test service used by session orchestration. */
export function makeApp(
  capture: { input?: Parameters<NakafaApp["Type"]["start"]>[0] },
  child: RunningNakafa = {
    awaitExit: Effect.never,
    origin: new URL(`http://${NAKAFA_LOOPBACK_HOST}:31234`),
  },
  fetchRenderer = Effect.succeed(RENDERER_MANIFEST)
) {
  return NakafaApp.of({
    fetchRenderer: () => fetchRenderer,
    start: (input) => {
      capture.input = input;
      return Effect.succeed(child);
    },
  });
}

/** Runs a scoped local-preview session with real files and deterministic Git. */
export function runLocal<A, E>(
  repository: TestRepositories,
  app: NakafaApp["Type"],
  use: (
    session: LocalPreviewSession
  ) => Effect.Effect<A, E, FileSystem.FileSystem | Path.Path>,
  appLocale?: AppLocale
) {
  const exactProcess = ExactProcess.of({
    /** Returns deterministic clean Git evidence for both test repositories. */
    run: (input: ExactProcessInput) =>
      Effect.succeed({
        exitCode: 0,
        stderr: new Uint8Array(),
        stdout: new TextEncoder().encode(
          input.args.includes("rev-parse") ? `${"a".repeat(40)}\n` : ""
        ),
      }),
  });
  return Effect.runPromise(
    Effect.scoped(
      openLocalPreview({
        ...(appLocale === undefined ? {} : { appLocale }),
        cwd: repository.aksaraRoot,
        environment: { nakafaAppDir: repository.nakafaRoot },
        requestedDocument: relative(
          repository.aksaraRoot,
          repository.documentPath
        ),
      }).pipe(Effect.flatMap(use))
    ).pipe(
      Effect.provide([
        Layer.succeed(NakafaApp, app),
        Layer.succeed(ExactProcess, exactProcess),
        NodeContext.layer,
      ])
    )
  );
}
