import { NodeServices } from "@effect/platform-node";
import { assert, expect, layer } from "@effect/vitest";
import {
  Deferred,
  Effect,
  Fiber,
  FileSystem,
  Path,
  PlatformError,
  Ref,
  Stream,
} from "effect";
import { TestClock } from "effect/testing";
import { PreviewProviderError } from "#cli/provider";
import { selectPreviewDocument } from "#cli/repository";
import {
  makeRepositoryTracker,
  REPOSITORY_ROOT,
  type TestRepositories,
} from "#test/real";
import { runWatch } from "#test/session";

const repositories = makeRepositoryTracker();
const questionPath =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/question.en.mdx";
const answerPath =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/answer.en.mdx";

/** Acquires one repository pair and removes it when the test scope closes. */
const acquireRepository = Effect.fn("AksaraCliTest.acquireRepository")(
  function* () {
    return yield* Effect.acquireRelease(
      Effect.sync(() => repositories.create()),
      () => Effect.sync(() => repositories.clear())
    );
  }
);

/** Selects the fixture document through the native filesystem services. */
const selectRepositoryDocument = Effect.fn(
  "AksaraCliTest.selectRepositoryDocument"
)(function* (repository: TestRepositories) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const aksaraRoot = yield* fileSystem.realPath(repository.aksaraRoot);
  const documentPath = yield* fileSystem.realPath(repository.documentPath);
  return yield* selectPreviewDocument(
    aksaraRoot,
    path.relative(aksaraRoot, documentPath)
  );
});

/** Selects one real corpus document through the native filesystem service. */
const selectRealDocument = Effect.fn("AksaraCliTest.selectRealDocument")(
  function* (sourcePath: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const aksaraRoot = yield* fileSystem.realPath(REPOSITORY_ROOT);
    return yield* selectPreviewDocument(aksaraRoot, sourcePath);
  }
);

/** Creates one portable filesystem update event. */
function updateEvent(path: string): FileSystem.WatchEvent {
  return { _tag: "Update", path };
}

/** Creates one portable filesystem create event. */
function createEvent(path: string): FileSystem.WatchEvent {
  return { _tag: "Create", path };
}

layer(NodeServices.layer)("selected document watch", (it) => {
  it.effect(
    "filters siblings, refreshes the selected file, and stays active",
    () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const repository = yield* acquireRepository();
        const selected = yield* selectRepositoryDocument(repository);
        const events = Stream.concat(
          Stream.make(
            updateEvent("id.mdx"),
            updateEvent(path.basename(selected.files[0].absolutePath))
          ),
          Stream.never
        );
        const count = yield* Ref.make(0);
        const watcher = yield* runWatch(selected, events, () =>
          Ref.update(count, (value) => value + 1)
        ).pipe(Effect.forkChild({ startImmediately: true }));
        yield* TestClock.adjust("150 millis");
        const refreshes = yield* Ref.get(count);
        const watcherRunning = watcher.pollUnsafe() === undefined;
        yield* Fiber.interrupt(watcher);
        expect(refreshes).toBe(1);
        expect(watcherRunning).toBe(true);
      })
  );

  it.effect(
    "invalidates every burst save while retaining only the latest queued compile",
    () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const repository = yield* acquireRepository();
        const selected = yield* selectRepositoryDocument(repository);
        const focused = {
          directories: [],
          document: selected.document,
          files: [selected.files[0]],
          sources: [selected.sources[0]],
        } satisfies typeof selected;
        const event = updateEvent(path.basename(focused.files[0].absolutePath));
        const firstStarted = yield* Deferred.make<void>();
        const releaseFirst = yield* Deferred.make<void>();
        const latestInvalidated = yield* Deferred.make<void>();
        const latestRefreshed = yield* Deferred.make<void>();
        const generations = yield* Ref.make(0);
        const refreshed = yield* Ref.make<number[]>([]);
        const burst = Stream.fromIterable([event, event, event, event]).pipe(
          Stream.mapEffect((next) =>
            Effect.sleep("150 millis").pipe(Effect.as(next))
          )
        );
        const events = Stream.concat(
          Stream.make(event),
          Stream.fromEffect(Deferred.await(firstStarted)).pipe(
            Stream.flatMap(() => burst)
          )
        );
        const invalidate = Ref.updateAndGet(
          generations,
          (generation) => generation + 1
        ).pipe(
          Effect.tap((generation) =>
            generation === 5
              ? Deferred.succeed(latestInvalidated, undefined)
              : Effect.void
          )
        );
        /** Holds the active compile while later generations replace each other. */
        const refresh = (generation: number) =>
          Ref.update(refreshed, (all) => [...all, generation]).pipe(
            Effect.andThen(
              generation === 1
                ? Deferred.succeed(firstStarted, undefined).pipe(
                    Effect.andThen(Deferred.await(releaseFirst))
                  )
                : Effect.when(
                    Deferred.succeed(latestRefreshed, undefined),
                    Effect.succeed(generation === 5)
                  )
            )
          );
        const watcher = yield* runWatch(
          focused,
          events,
          refresh,
          new Map(),
          invalidate
        ).pipe(Effect.forkChild({ startImmediately: true }));
        yield* TestClock.adjust("100 millis");
        yield* Deferred.await(firstStarted);
        yield* TestClock.adjust("1 second");
        yield* Deferred.await(latestInvalidated);
        yield* TestClock.adjust("150 millis");
        yield* Deferred.succeed(releaseFirst, undefined);
        yield* Deferred.await(latestRefreshed);
        expect({
          generations: yield* Ref.get(generations),
          refreshed: yield* Ref.get(refreshed),
        }).toEqual({ generations: 5, refreshed: [1, 5] });
        yield* Fiber.interrupt(watcher);
      })
  );

  it.effect(
    "watches one question body closure and its source-owned item dependency",
    () =>
      Effect.gen(function* () {
        const selected = yield* selectRealDocument(answerPath);
        const events = Stream.concat(
          Stream.make(updateEvent("item.ts")),
          Stream.never
        );
        const count = yield* Ref.make(0);
        const watcher = yield* runWatch(selected, events, () =>
          Ref.update(count, (value) => value + 1)
        ).pipe(Effect.forkChild({ startImmediately: true }));
        yield* TestClock.adjust("75 millis");
        const refreshes = yield* Ref.get(count);
        yield* Fiber.interrupt(watcher);
        expect(selected.files.map(({ sourcePath }) => sourcePath)).toEqual([
          questionPath,
          "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/item.ts",
          "packages/corpus/tryout/registry.ts",
          "packages/corpus/tryout/indonesia/snbt/source.ts",
          "packages/corpus/tryout/indonesia/country.ts",
          "packages/corpus/tryout/indonesia/snbt/readiness.ts",
          "packages/corpus/tryout/readiness.ts",
          "packages/corpus/tryout/schema.ts",
          "packages/corpus/locale/source.ts",
          "packages/corpus/route/schema.ts",
          answerPath,
        ]);
        expect(refreshes).toBe(1);
      }),
    { timeout: 30_000 }
  );

  it.effect("requires a restart instead of compiling stale topology", () =>
    Effect.gen(function* () {
      const selected = yield* selectRealDocument(questionPath);
      const refreshes = yield* Ref.make(0);
      const error = yield* runWatch(
        selected,
        Stream.make(updateEvent("source.ts")),
        () => Ref.update(refreshes, (value) => value + 1)
      ).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "PreviewRestartError",
        sourcePath: "packages/corpus/tryout/indonesia/snbt/source.ts",
      });
      expect(yield* Ref.get(refreshes)).toBe(0);
    })
  );

  it.effect("rejects persistent strict-directory membership changes", () =>
    Effect.gen(function* () {
      const selected = yield* selectRealDocument(questionPath);
      const [directory] = selected.directories;
      assert(directory !== undefined, "Expected one selected directory.");
      const changedFiles = new Map([
        [directory.absolutePath, [...directory.files, "draft.mdx"]],
      ]);
      const error = yield* runWatch(
        selected,
        Stream.make(createEvent("draft.mdx")),
        () => Effect.void,
        changedFiles
      ).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "PreviewRestartError",
        sourcePath: directory.sourcePath,
      });
    })
  );

  it.effect(
    "ignores unselected events after stable membership is restored",
    () =>
      Effect.gen(function* () {
        const selected = yield* selectRealDocument(questionPath);
        const error = yield* runWatch(
          selected,
          Stream.make(createEvent("draft.mdx")),
          () => Effect.die("refresh must not run")
        ).pipe(Effect.flip);
        expect(error).toMatchObject({ reason: "ended" });
      })
  );

  it.effect(
    "distinguishes provider, filesystem, and ended watch failures",
    () =>
      Effect.gen(function* () {
        const path = yield* Path.Path;
        const repository = yield* acquireRepository();
        const selected = yield* selectRepositoryDocument(repository);
        const event = updateEvent(
          path.basename(selected.files[0].absolutePath)
        );
        const provider = yield* runWatch(selected, Stream.make(event), () =>
          Effect.fail(new PreviewProviderError({ stage: "encode" }))
        ).pipe(Effect.flip);
        const fileError = PlatformError.systemError({
          _tag: "Unknown",
          method: "watch",
          module: "FileSystem",
        });
        const filesystem = yield* runWatch(
          selected,
          Stream.fail(fileError),
          () => Effect.void
        ).pipe(Effect.flip);
        const ended = yield* runWatch(
          selected,
          Stream.empty,
          () => Effect.void
        ).pipe(Effect.flip);
        expect(provider).toMatchObject({ _tag: "PreviewProviderError" });
        expect(filesystem).toMatchObject({ reason: "filesystem" });
        expect(ended).toMatchObject({ reason: "ended" });
      })
  );
});
