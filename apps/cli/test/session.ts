import { relative } from "node:path";
import {
  FileSystem,
  Path,
  type Error as PlatformError,
} from "@effect/platform";
import { CommandExecutor } from "@effect/platform/CommandExecutor";
import { NodeContext } from "@effect/platform-node";
import { Effect, type Stream } from "effect";
import type { RunningNakafa } from "#cli/child";
import { NakafaApp } from "#cli/nakafa";
import { type PreviewProvider, PreviewProviderError } from "#cli/provider";
import type { SelectedDocument } from "#cli/repository";
import {
  type LocalPreviewSession,
  openLocalPreview,
  watchSelectedDocument,
} from "#cli/session";
import { inspectTestCommand, makeTestExecutor } from "#test/command";
import { RENDERER_MANIFEST, type TestRepositories } from "#test/real";

/** Builds a preview provider that records state transitions. */
export function makeProvider(control: {
  failed: number;
  pending: number;
  ready: number;
  failPending?: boolean;
}) {
  return {
    eventsPath: "/v1/events",
    failed: () => {
      control.failed += 1;
      return Effect.void;
    },
    manifestPath: "/v1/manifest",
    origin: new URL("http://127.0.0.1:32123"),
    pending: () => {
      control.pending += 1;
      return control.failPending
        ? Effect.fail(new PreviewProviderError({ stage: "encode" }))
        : Effect.void;
    },
    ready: () => {
      control.ready += 1;
      return Effect.void;
    },
  } satisfies PreviewProvider;
}

/** Runs a selected-document watcher through an explicit filesystem stream. */
export function runWatch(
  selected: SelectedDocument,
  stream: Stream.Stream<FileSystem.WatchEvent, PlatformError.PlatformError>,
  refresh: Effect.Effect<
    void,
    PreviewProviderError,
    FileSystem.FileSystem | Path.Path
  >
) {
  return watchSelectedDocument(selected, refresh).pipe(
    Effect.provide(FileSystem.layerNoop({ watch: () => stream })),
    Effect.provide(Path.layer)
  );
}

/** Builds the actual-app test service used by session orchestration. */
export function makeApp(
  capture: { input?: Parameters<NakafaApp["Type"]["start"]>[0] },
  child: RunningNakafa = {
    awaitExit: Effect.never,
    origin: new URL("http://127.0.0.1:31234"),
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
  ) => Effect.Effect<A, E, FileSystem.FileSystem | Path.Path>
) {
  const executor = makeTestExecutor((command) =>
    Effect.succeed({
      stdout: inspectTestCommand(command).args.includes("rev-parse")
        ? `${"a".repeat(40)}\n`
        : "",
    })
  );
  return Effect.runPromise(
    Effect.scoped(
      openLocalPreview({
        cwd: repository.aksaraRoot,
        environment: { nakafaAppDir: repository.nakafaRoot },
        requestedDocument: relative(
          repository.aksaraRoot,
          repository.documentPath
        ),
      }).pipe(Effect.flatMap(use))
    ).pipe(
      Effect.provideService(NakafaApp, app),
      Effect.provideService(CommandExecutor, executor),
      Effect.provide(NodeContext.layer)
    )
  );
}
