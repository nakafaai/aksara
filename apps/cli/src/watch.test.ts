import { realpathSync } from "node:fs";
import { basename, relative } from "node:path";
import { FileSystem, Error as PlatformError } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import {
  Deferred,
  Effect,
  Fiber,
  Option,
  Ref,
  Stream,
  TestClock,
  TestContext,
} from "effect";
import { afterEach, describe, expect, it } from "vitest";
import { PreviewProviderError } from "#cli/provider";
import { selectPreviewDocument } from "#cli/repository";
import { makeRepositoryTracker, REPOSITORY_ROOT } from "#test/real";
import { runWatch } from "#test/session";

const repositories = makeRepositoryTracker();
const questionPath =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/question.en.mdx";
const answerPath =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/answer.en.mdx";

afterEach(() => {
  repositories.clear();
});

describe("selected document watch", () => {
  it("filters siblings, refreshes the selected file, and stays active", async () => {
    const repository = repositories.create();
    const aksaraRoot = realpathSync(repository.aksaraRoot);
    const selected = await Effect.runPromise(
      selectPreviewDocument(
        aksaraRoot,
        relative(aksaraRoot, realpathSync(repository.documentPath))
      ).pipe(Effect.provide(NodeContext.layer))
    );
    const events = Stream.concat(
      Stream.make(
        FileSystem.WatchEventUpdate({ path: "id.mdx" }),
        FileSystem.WatchEventUpdate({
          path: basename(selected.files[0].absolutePath),
        })
      ),
      Stream.never
    );
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const count = yield* Ref.make(0);
        const watcher = yield* runWatch(selected, events, () =>
          Ref.update(count, (value) => value + 1)
        ).pipe(Effect.fork);
        yield* TestClock.adjust("75 millis");
        const refreshes = yield* Ref.get(count);
        const watcherExit = yield* Fiber.poll(watcher);
        yield* Fiber.interrupt(watcher);
        return { refreshes, watcherExit };
      }).pipe(Effect.provide(TestContext.TestContext))
    );

    expect(result.refreshes).toBe(1);
    expect(Option.isNone(result.watcherExit)).toBe(true);
  });

  it("invalidates every burst save while retaining only the latest queued compile", {
    timeout: 10_000,
  }, async () => {
    const repository = repositories.create();
    const aksaraRoot = realpathSync(repository.aksaraRoot);
    const selected = await Effect.runPromise(
      selectPreviewDocument(
        aksaraRoot,
        relative(aksaraRoot, realpathSync(repository.documentPath))
      ).pipe(Effect.provide(NodeContext.layer))
    );
    const focused = {
      directories: [],
      document: selected.document,
      files: [selected.files[0]],
      sources: [selected.sources[0]],
    } satisfies typeof selected;
    const event = FileSystem.WatchEventUpdate({
      path: basename(focused.files[0].absolutePath),
    });
    const observed = await Effect.runPromise(
      Effect.gen(function* () {
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
            Effect.zipRight(
              generation === 1
                ? Deferred.succeed(firstStarted, undefined).pipe(
                    Effect.zipRight(Deferred.await(releaseFirst))
                  )
                : Effect.when(
                    Deferred.succeed(latestRefreshed, undefined),
                    () => generation === 5
                  )
            )
          );
        const watcher = yield* runWatch(
          focused,
          events,
          refresh,
          new Map(),
          invalidate
        ).pipe(Effect.fork);
        yield* Deferred.await(firstStarted);
        yield* Deferred.await(latestInvalidated);
        yield* Effect.sleep("150 millis");
        yield* Deferred.succeed(releaseFirst, undefined);
        yield* Deferred.await(latestRefreshed);
        const result = {
          generations: yield* Ref.get(generations),
          refreshed: yield* Ref.get(refreshed),
        };
        yield* Fiber.interrupt(watcher);
        return result;
      })
    );

    expect(observed).toEqual({ generations: 5, refreshed: [1, 5] });
  });

  it("watches one question body closure and its choices dependency", {
    timeout: 30_000,
  }, async () => {
    const selected = await Effect.runPromise(
      selectPreviewDocument(realpathSync(REPOSITORY_ROOT), answerPath).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    const events = Stream.concat(
      Stream.make(FileSystem.WatchEventUpdate({ path: "choices.ts" })),
      Stream.never
    );
    const refreshes = await Effect.runPromise(
      Effect.gen(function* () {
        const count = yield* Ref.make(0);
        const watcher = yield* runWatch(selected, events, () =>
          Ref.update(count, (value) => value + 1)
        ).pipe(Effect.fork);
        yield* TestClock.adjust("75 millis");
        const result = yield* Ref.get(count);
        yield* Fiber.interrupt(watcher);
        return result;
      }).pipe(Effect.provide(TestContext.TestContext))
    );

    expect(selected.files.map(({ sourcePath }) => sourcePath)).toEqual([
      questionPath,
      "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/choices.ts",
      "packages/corpus/tryout/registry.ts",
      "packages/corpus/tryout/indonesia/snbt/source.ts",
      "packages/corpus/tryout/indonesia/country.ts",
      "packages/corpus/tryout/schema.ts",
      "packages/corpus/locale/source.ts",
      "packages/corpus/route/schema.ts",
      answerPath,
    ]);
    expect(refreshes).toBe(1);
  });

  it("requires a restart instead of compiling stale topology", async () => {
    const selected = await Effect.runPromise(
      selectPreviewDocument(realpathSync(REPOSITORY_ROOT), questionPath).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const refreshes = yield* Ref.make(0);
        const error = yield* runWatch(
          selected,
          Stream.make(FileSystem.WatchEventUpdate({ path: "source.ts" })),
          () => Ref.update(refreshes, (value) => value + 1)
        ).pipe(Effect.flip);
        return { error, refreshes: yield* Ref.get(refreshes) };
      })
    );

    expect(result.error).toMatchObject({
      _tag: "PreviewRestartError",
      sourcePath: "packages/corpus/tryout/indonesia/snbt/source.ts",
    });
    expect(result.refreshes).toBe(0);
  });

  it("rejects persistent strict-directory membership changes", async () => {
    const selected = await Effect.runPromise(
      selectPreviewDocument(realpathSync(REPOSITORY_ROOT), questionPath).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    const [directory] = selected.directories;
    expect(directory).toBeDefined();
    if (directory === undefined) {
      return;
    }
    const changedFiles = new Map([
      [directory.absolutePath, [...directory.files, "draft.mdx"]],
    ]);
    const error = await Effect.runPromise(
      runWatch(
        selected,
        Stream.make(FileSystem.WatchEventCreate({ path: "draft.mdx" })),
        () => Effect.void,
        changedFiles
      ).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "PreviewRestartError",
      sourcePath: directory.sourcePath,
    });
  });

  it("ignores unselected events after stable membership is restored", async () => {
    const selected = await Effect.runPromise(
      selectPreviewDocument(realpathSync(REPOSITORY_ROOT), questionPath).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    const error = await Effect.runPromise(
      runWatch(
        selected,
        Stream.make(FileSystem.WatchEventCreate({ path: "draft.mdx" })),
        () => Effect.die("refresh must not run")
      ).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ reason: "ended" });
  });

  it("distinguishes provider, filesystem, and ended watch failures", async () => {
    const repository = repositories.create();
    const aksaraRoot = realpathSync(repository.aksaraRoot);
    const selected = await Effect.runPromise(
      selectPreviewDocument(
        aksaraRoot,
        relative(aksaraRoot, realpathSync(repository.documentPath))
      ).pipe(Effect.provide(NodeContext.layer))
    );
    const selectedEvent = FileSystem.WatchEventUpdate({
      path: basename(selected.files[0].absolutePath),
    });
    const provider = await Effect.runPromise(
      runWatch(selected, Stream.make(selectedEvent), () =>
        Effect.fail(new PreviewProviderError({ stage: "encode" }))
      ).pipe(Effect.flip)
    );
    const fileError = new PlatformError.SystemError({
      method: "watch",
      module: "FileSystem",
      reason: "Unknown",
    });
    const filesystem = await Effect.runPromise(
      runWatch(selected, Stream.fail(fileError), () => Effect.void).pipe(
        Effect.flip
      )
    );
    const ended = await Effect.runPromise(
      runWatch(selected, Stream.empty, () => Effect.void).pipe(Effect.flip)
    );

    expect(provider).toMatchObject({ _tag: "PreviewProviderError" });
    expect(filesystem).toMatchObject({ reason: "filesystem" });
    expect(ended).toMatchObject({ reason: "ended" });
  });
});
