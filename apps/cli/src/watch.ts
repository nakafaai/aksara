import {
  Deferred,
  Effect,
  FileSystem,
  Option,
  Path,
  Ref,
  Result,
  Schema,
  Stream,
} from "effect";
import { PreviewEvidenceError } from "#cli/evidence";
import {
  PreviewRestartError,
  type SelectedDirectory,
  type SelectedDocument,
  verifySelectedDirectory,
} from "#cli/integrity";
import { PreviewProviderError } from "#cli/provider";

/** Filesystem watching stopped instead of preserving the authoring session. */
export class PreviewWatchError extends Schema.TaggedError<PreviewWatchError>()(
  "PreviewWatchError",
  { reason: Schema.Literals(["ended", "filesystem"]) }
) {}

interface WatchedDirectory {
  readonly files: Map<string, SelectedDocument["files"][number]>;
  topology?: SelectedDirectory;
}

interface PreparedWatchEvent {
  readonly event: FileSystem.WatchEvent;
  readonly generation: Option.Option<number>;
}

/** One acquired watcher and its subscription-ready startup barrier. */
export interface SelectedWatcher {
  /** Completes only after every selected directory subscription is acquired. */
  readonly ready: Effect.Effect<void>;
  /** Watches until a typed restart, provider, filesystem, or end failure. */
  readonly run: Effect.Effect<
    never,
    | PreviewEvidenceError
    | PreviewProviderError
    | PreviewRestartError
    | PreviewWatchError
  >;
}

/** Returns or creates the selected watch state for one physical directory. */
function watchDirectory(
  directories: Map<string, WatchedDirectory>,
  directory: string
): WatchedDirectory {
  const existing = directories.get(directory);
  if (existing !== undefined) {
    return existing;
  }
  const watched: WatchedDirectory = { files: new Map() };
  directories.set(directory, watched);
  return watched;
}

/** Builds one deduplicated directory watch plan for files and strict topology. */
function selectedDirectories(selected: SelectedDocument, path: Path.Path) {
  const directories = new Map<string, WatchedDirectory>();
  for (const file of selected.files) {
    const directory = path.dirname(file.absolutePath);
    watchDirectory(directories, directory).files.set(
      path.basename(file.absolutePath),
      file
    );
  }
  for (const topology of selected.directories) {
    watchDirectory(directories, topology.absolutePath).topology = topology;
  }
  return directories;
}

/** Decides whether one stable selected-directory event batch needs a refresh. */
const inspectWatchEvents = Effect.fn("AksaraCli.inspectWatchEvents")(function* (
  watched: WatchedDirectory,
  events: Iterable<PreparedWatchEvent>
) {
  if (watched.topology !== undefined) {
    yield* verifySelectedDirectory(watched.topology);
  }
  let generation = Option.none<number>();
  for (const event of events) {
    if (Option.isSome(event.generation)) {
      ({ generation } = event);
    }
  }
  return generation;
});

/** Invalidates selected reloads immediately and rejects restart dependencies. */
const prepareWatchEvent = Effect.fn("AksaraCli.prepareWatchEvent")(function* (
  watched: WatchedDirectory,
  event: FileSystem.WatchEvent,
  path: Path.Path,
  invalidate: Effect.Effect<number, PreviewProviderError>
) {
  const file = watched.files.get(path.basename(event.path));
  if (file === undefined) {
    return { event, generation: Option.none() } satisfies PreparedWatchEvent;
  }
  if (file.mode === "restart") {
    return yield* new PreviewRestartError({ sourcePath: file.sourcePath });
  }
  const generation = yield* invalidate;
  return {
    event,
    generation: Option.some(generation),
  } satisfies PreparedWatchEvent;
});

/** Opens selected watchers with an acquisition barrier and generation safety. */
export const openSelectedWatcher = Effect.fn("AksaraCli.openSelectedWatcher")(
  function* (
    selected: SelectedDocument,
    invalidate: Effect.Effect<number, PreviewProviderError>,
    refresh: (
      generation: number
    ) => Effect.Effect<
      void,
      PreviewEvidenceError | PreviewProviderError | PreviewRestartError,
      FileSystem.FileSystem | Path.Path
    >
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const directories = selectedDirectories(selected, path);
    const ready = yield* Deferred.make<void>();
    const acquired = yield* Ref.make(0);
    /** Completes the shared barrier after the final subscription is acquired. */
    const markReady = Ref.updateAndGet(acquired, (count) => count + 1).pipe(
      Effect.flatMap((count) =>
        count === directories.size
          ? Deferred.succeed(ready, undefined)
          : Effect.void
      )
    );
    const streams = [...directories].map(([directory, watched]) =>
      Stream.fromPull(
        Stream.toPull(fileSystem.watch(directory)).pipe(Effect.tap(markReady))
      ).pipe(
        Stream.mapEffect((event) =>
          prepareWatchEvent(watched, event, path, invalidate)
        ),
        Stream.groupedWithin(1024, "75 millis"),
        Stream.mapEffect((events) => inspectWatchEvents(watched, events))
      )
    );
    const run = Stream.mergeAll(streams, { concurrency: "unbounded" }).pipe(
      Stream.filterMap((generation) =>
        Result.fromOption(generation, () => undefined)
      ),
      Stream.buffer({ capacity: 1, strategy: "sliding" }),
      Stream.runForEach((generation) =>
        refresh(generation).pipe(
          Effect.provideService(FileSystem.FileSystem, fileSystem),
          Effect.provideService(Path.Path, path)
        )
      ),
      Effect.provideService(FileSystem.FileSystem, fileSystem),
      Effect.provideService(Path.Path, path),
      Effect.mapError((error) =>
        error instanceof PreviewEvidenceError ||
        error instanceof PreviewProviderError ||
        error instanceof PreviewRestartError
          ? error
          : new PreviewWatchError({ reason: "filesystem" })
      ),
      Effect.andThen(Effect.fail(new PreviewWatchError({ reason: "ended" }))),
      Effect.scoped
    );
    return {
      ready: Deferred.await(ready),
      run,
    } satisfies SelectedWatcher;
  }
);
